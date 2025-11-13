# Weboasis Blogspot Theme Conversion

This document outlines the changes made to convert the static Weboasis startpage into a functional Blogspot theme.

## Project Goal

The primary goal was to adapt the `weboasis_source` project to be used as a theme on a Blogspot blog, using the `w0bblemaster/weboasis` GitHub repository as a file host for all assets.

## Summary of Changes

### 1. Asset Relinking

All local asset paths in `index.html` were updated to point to the raw files in the GitHub repository. This includes:
- CSS stylesheets (`.css`)
- JavaScript files (`.js`)
- Images and favicons (`.svg`, `.png`, etc.)

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
## DEBUG

To address issues with background images not loading on the live Blogspot theme, a debug version of the theme was created.

- **`blogspot_theme_debug.xml`**: A copy of the main theme file that links to an unminified JavaScript file.
- **`js/custom.js`**: An unminified version of `custom.min.js` where the background image paths have been converted from relative (`media/bg/bg1.jpg`) to absolute URLs (`https://raw.githubusercontent.com/W0BBLEMASTER/weboasis/master/media/bg/bg1.jpg`). This ensures the theme can locate the assets hosted on GitHub.

## BUGS
�   You tell me...
