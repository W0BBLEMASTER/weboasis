(function(window) {
	var Piece = function(canvas, config)
	{
		this.initialize(canvas, config);
	}
	var p = Piece.prototype = new BasePiece();
	//
	p.initialize = function(canvas, config)
	{
		BasePiece.prototype.initialize.call(this, canvas, config);
		this.initInteraction();
		this.initSound();
	}

	p.onKeyUp = function(e)
	{
		BasePiece.prototype.onKeyUp.call(this, e);
		if (!this.config.debug) return;
		var c = String.fromCharCode(e.which);
		if (c=="R") this.reset();
	}
		
	
	/*********************************
	 *		    INTERACTION
	 ********************************/
	
	p.initInteraction = function()
	{
		this.stage.addEventListener("stagemousedown", this.handleMouseDown.bind(this));
		this.stage.addEventListener("stagemousemove", this.handleMouseMove.bind(this));
		this.stage.addEventListener("stagemouseup", this.handleMouseUp.bind(this));
	}
	p.handleMouseDown = function(e)
	{
		if (this.pointerID) return;
		this.pointerID = e.pointerID;
		var x = e.stageX, y = e.stageY;
	}
	p.handleMouseMove = function(e)
	{
		if (e.pointerID!=this.pointerID) return;
		var x = e.stageX, y = e.stageY;
	}
	p.handleMouseUp = function(e)
	{
		if (e.pointerID!=this.pointerID) return;
		this.pointerID = null;
		var x = e.stageX, y = e.stageY;
	}
	
	/*********************************
	 *		    SOUND
	 ********************************/
  
  p.initSound = function()
	{
		var sounds = [];
		var ss = this.config.sounds;
		for (var i=0;i<ss.length;i++) sounds.push(ss[i]);
		sounds = ArrayUtil.shuffle(sounds);
		SoundManager.init(sounds, this.onSoundsLoaded.bind(this));
		this.soundStarted = false;
    this.handleClickToInitiateSound = this.handleClickToInitiateSound.bind(this);
    this.stage.addEventListener("stagemousedown", this.handleClickToInitiateSound);
	}	
	p.onSoundsLoaded = function()
	{
		console.log("onSoundsLoaded");
	}
	p.playSound = function()
	{
		var soundId = SoundManager.playRandom();
		//console.log("playSound", soundId);
	}
	p.handleClickToInitiateSound = function()
	{
		//start sound on user interaction (if not already started)
		if (!this.soundStarted)
		{
			this.playSound();
			SoundManager.stop();
			this.soundStarted = true;
		}
		this.stage.removeEventListener("stagemousedown", this.handleClickToInitiateSound);
	}
	 
	/*********************************
	 *			    FLOW
	 ********************************/
	
	p.setSize = function(w,h,dpr)
	{
		this.dpr = dpr;
		w = Math.floor(w*dpr);
		h = Math.floor(h*dpr);
    //fit original size within viewport
    //and apply scale factor based on aspect ratio
		const cfg = this.config;
		const f = ArrayUtil.lookup(cfg.scaleByRatio, w/h, true);
    const os = cfg.originalSize, ow = os[0], oh = os[1];
    this.stage.x = w/2;
    this.stage.y = h/2;
    if (w/h > ow/oh) {
      this.stage.scaleX = this.stage.scaleY = h/oh * f;
    } else {
      this.stage.scaleX = this.stage.scaleY = w/ow * f;
    }
    this.width = w / this.stage.scaleX;
    this.height = h / this.stage.scaleX;
		//Chance scale with viewport area, but use square root to temper area influence
    this.chance = cfg.drop.chance * Math.sqrt((this.width * this.height) / (ow*oh));
		log("setSize",this.width, this.height, this.dpr, this.chance);
		this.reset();
	}

	p.start = function()
	{
		BasePiece.prototype.start.apply(this);
    const cfg = this.config;
		this.shape = this.stage.addChild(new createjs.Shape());
    this.shape.graphics.f("#FFFFFF").s().p(cfg.text.path);
    this.shape.x = cfg.text.position.x;
    this.shape.y = cfg.text.position.y;
	}
	
	p.reset = function()
	{
		const cfg = this.config, w = this.width, h = this.height, w2 = w/2, h2 = h/2;
    this.startTime = this.tickLast;
    this.count = 0;
	}
	
	p.update = function()
	{
    if (Math.random() < this.chance) {
      this.addDrop();
    }
		return true;
	}	
  
  p.addDrop = function() {
    const cfgd = this.config.drop, cfgo = this.config.oval;
    const w = this.width, h = this.height, w2 = w/2, h2 = h/2;
    //position and scale:
		const drop = this.stage.addChild(new createjs.Container());
    const t = Math.random();
    // yRange and scaleRange define how scale should change with y, based on original size
    const scaleMax = cfgd.scaleRange[1] / MathUtil.lerpInv(cfgd.yRange[0], h2, cfgd.yRange[1]);
    drop.x = RandomUtil.between(-w2, w2);
    drop.y = MathUtil.lerp(cfgd.yRange[0], h2, t);
    const scale = MathUtil.lerp(cfgd.scaleRange[0], scaleMax, t) * RandomUtil.between.apply(null, cfgd.scaleVariability);
    drop.scaleX = drop.scaleY = scale;
    //draw and animate:
    drop.shape = drop.addChild(new createjs.Shape());
    drop.shape.graphics.f("#ffffff").p(cfgd.path);
    drop.shape.y = cfgd.y[0];
    createjs.Tween.get(drop.shape)
    .to({y:cfgd.y[1]}, cfgd.duration, cfgd.ease)
    .call(this.playSound.bind(this))
    .call(function() { drop.shape.graphics.c().s("#ffffff").ss(cfgo.weight,0,0,10,true).p(cfgo.path); })
    .to({y:0, scaleX:cfgo.scale[0], scaleY:cfgo.scale[0], alpha:cfgo.alpha[0]}, 0)
    .to({scaleX:cfgo.scale[1], scaleY:cfgo.scale[1], alpha:cfgo.alpha[1]}, cfgo.duration, cfgo.ease)
    .call(function() { drop.parent.removeChild(drop); });    
  }
		

	window.Piece = Piece;
	

}(window));

