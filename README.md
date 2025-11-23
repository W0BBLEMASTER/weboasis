# Weboasis Blogspot Theme Conversion

## https://wobblemaster.blogspot.com

This document outlines the changes made to convert the static Weboasis startpage into a functional Blogspot theme.

## Project Goal

The primary goal was to adapt the `weboasis_source` project to be used as a theme on a Blogspot blog, using the `w0bblemaster/weboasis` GitHub repository as a file host for all assets.

## Summary of Changes

### 1. Asset Relinking

All local asset paths in `index.html` were updated to point to the raw files in the GitHub repository. This includes:
- CSS stylesheets (`.css`)
- JavaScript files (`.js`)
- Images and favicons (`.svg`, `.png`, etc.)

Furthermore, it was identified that linking directly to `raw.githubusercontent.com` for assets caused issues with browsers incorrectly interpreting MIME types (e.g., CSS and JavaScript files were often treated as plain text). To resolve this, all asset URLs were updated to use `https://cdn.jsdelivr.net/gh/W0BBLEMASTER/weboasis@master/`, leveraging `jsDelivr` as a CDN to ensure correct content type delivery and improve loading performance.

**Example:**
```diff
- <link rel="stylesheet" type="text/css" href="css/style.min.css" />
+ <link rel="stylesheet" type="text/css" href="https://raw.githubusercontent.com/W0BBLEMASTER/weboasis/master/css/style.min.css" />
```

### 2. Blogspot Theme Conversion (`blogspot_theme.xml`)

A new file, `blogspot_theme.xml`, was created to be the main theme file. The original `index.html` was converted into the required Blogspot XML format with the following modifications:

- **XML Structure:** The entire document was wrapped in the necessary `<html>` and `<head>` tags with Blogspot's XML namespaces.
- **Dynamic Title:** The static `<title>` was replaced with `<title><data:blog.pageTitle/></title>` for dynamic page titles.
- **Blog Post Section:** A `<b:section>` and `<b:widget id='Blog1' ...>` were added to render the actual blog posts.
- **XML-Safe Content:**
  - Inline JavaScript was wrapped in `//<![CDATA[ ... //]]>` blocks to prevent parsing errors.
  - Invalid XML entities (like `&times;` and `&nbsp;`) were replaced with their numeric equivalents (`&#215;` and `&#160;`).

## How to Use

1.  Copy the entire content of `blogspot_theme.xml`.
2.  Go to your Blogspot dashboard.
3.  Navigate to "Theme" -> "Edit HTML".
4.  Paste the content into the editor and save.

---
## DEBUG/BUGFIXES

```
PROTO3, Attempts to reimpliment searchbar functionality.
✅ The primary bug concerning assets (CSS, JavaScript, images) not loading due to incorrect MIME types when linked from `raw.githubusercontent.com` has been resolved by switching to `jsDelivr` as a CDN.
✅ Background animations now load correctly.
✅ Rightside hamburger button fixed.
✅ Searchbar fixed.
✅ Searchbar buttons loading fixed.
✅ Added Easter Egg!!!
✅ Fixed chat button by redirecting to Windows93's Trollbox!
✅ Fixed hamburger menu links by pointing to the correct index.html files on the weboasis github repo via raw.githack.com.
```

### Background Animation Fix
The background animations were not loading correctly in the Blogspot theme. The issue was that the original code used dynamic script injection to load the animation scripts, which is blocked by Blogspot's Content Security Policy.

The following changes were made to `blogspot_theme_debug.xml` to fix this issue:
1.  A new script block was added at the end of the `<body>`.
2.  Inside this script block, a new function `runAnimation(animationName)` was defined. This function fetches the content of the selected animation script using `XMLHttpRequest` and executes it using `eval()`.
3.  A new `clearOldCanvas()` function was defined to clear the canvas before loading a new animation.
4.  The original `canvasApp()` function was overridden to prevent it from interfering with the new animation logic.
5.  The event listeners for the animation buttons were modified to call `clearOldCanvas()` and `runAnimation(animationName)`, and to set a cookie to remember the selected animation.
6.  The page reload logic was removed from the event listeners.
7.  The logic to load the animation from the cookie on page load was added.
8.  A `currentAnimationInterval` variable was added to keep track of the animation interval and clear it when a new animation is selected.

## BUGS
- System info bugs out on various browsers, (Cores and screensize).
- Mobile site leads to BlogSpot empty theme default, possibly due to UserAgent.




