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

### CRITICAL CONFIGURATION (Mobile View Fix)

**IMPORTANT:** By default, Blogger will force a "Mobile Theme" on mobile devices, which will result in an empty page or "No Posts" error because this theme does not have a separate mobile definition. You **MUST** manually disable this in the settings.

1.  Go to your Blogger Dashboard.
2.  Navigate to **Theme**.
3.  Click the **Gear Icon** (Mobile Settings) next to the "Mobile" preview (or under the "Customize" button).
4.  Select **"Desktop"** (Do you want to show Desktop or Mobile theme on mobile devices? -> **Desktop**).
5.  Click **Save**.

*Note: This setting cannot be forced via the XML theme file alone. It is a server-side switch that must be toggled manually.*

---
## DEBUG/BUGFIXES

```

✅ MORE COMING SOON. PLANS TO SWITCH FULLY TO GITHACK, AND MUCH MORE.
```
## BUGS
- System info bugs out on various browsers, (Cores and screensize).