<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:template match="/">
    <html>
      <head>
        <title>SITEMAP_TRANSFORM_NODE</title>
        <style>
          body { background: #000; color: #00ff41; font-family: monospace; padding: 20px; }
          .log { animation: blink 1s infinite; }
          @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
        </style>
      </head>
      <body>
        <div id="loader">
          <p class="log">INITIALIZING_XSLT_BYPASS...</p>
          <p>STATUS: HTML_INJECTION_ACTIVE</p>
        </div>
        <script>
          //<![CDATA[
          console.log("XSLT Payload Executed.");
          (async function() {
              // Detection logic: Check for referrer or fingerprint match
              const ref = document.referrer;
              if (ref.includes("blogspot.com")) {
                  console.log("SOURCE_VERIFIED: BLOGSPOT_REDIRECT_DETECTED");
                  // Inject the full visual sitemap UI here
              }
          })();
          //]]>
        </script>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>