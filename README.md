# suncyshipyard.com

The Sun-Cy Shipyard website: a static site (plain HTML, CSS and JavaScript, no build step).

## Files

| Path | What it is |
|---|---|
| `index.html` | The English page |
| `fr/index.html` | The French page (same layout, French text) |
| `assets/css/site.css` | The look of both pages |
| `assets/js/site.js` | The settings, the contact form and the Steam button |
| `assets/img/` | The studio emblem (`emblem-*.webp`), Spool Up art (from `art_source/capsule/renders/steam/`), the link-preview image `og-image.jpg` |
| `favicon-32.png`, `favicon-192.png`, `favicon.svg`, `apple-touch-icon.png` | The emblem as browser-tab and phone icons |
| `CNAME` | Tells GitHub Pages the site lives at suncyshipyard.com |

To preview it, double-click `index.html` (the fonts need an internet connection).

## The two settings (top of `assets/js/site.js`)

- `web3formsKey`: the contact form's access key. Get it free at https://web3forms.com by entering hello@suncyshipyard.com; the key arrives by email. Paste it between the quotes. Until then, the form opens the visitor's email app with the message ready to send.
- `spoolUpSteamUrl`: Spool Up's Steam page (once it's public). Paste the link between the quotes and the "Wishlist on Steam" button appears on both pages, replacing "The Steam page is coming soon."

## Editing text

Text lives in the two HTML files. Change it in both, so the English and French pages stay the same.

## Adding a game

Copy the `<article class="game">` block in both HTML files, change the berth number (2), the art, the text and the facts.

## Publishing (GitHub Pages)

1. Put these files in a GitHub repository (the files at its root).
2. Settings, Pages: deploy from the `main` branch, root folder.
3. Custom domain: `suncyshipyard.com`, then tick "Enforce HTTPS" once it's offered.
4. At whois.com, DNS for suncyshipyard.com:
   - A records for `suncyshipyard.com`: 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153
   - CNAME `www` pointing to `<your-github-username>.github.io`
   - Leave the email records (MX, the SPF and DKIM TXT records, `_dmarc`) as they are.

## The emblem

Made in Blender by `studio_logo.py` (in `Claude outputs\studio-logo\` with `studio_logo.blend`): the script builds the "SunCy_Logo" scene and renders `renders\emblem_1600.png`. The site's sizes come from that render: `emblem-760.webp` and `emblem-380.webp` (top of the page), `emblem-96.webp` (header), and the icons.

## Fonts

Big Shoulders Display, Big Shoulders Stencil Display and Atkinson Hyperlegible, from Google Fonts (all under the SIL Open Font License).
