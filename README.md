# Dr. Pawan Mishra — Academic Website

Modern static academic website for GitHub Pages.

## Included
- `index.html` — complete website
- `assets/css/style.css` — responsive design, dark mode and components
- `assets/js/data.js` — publication records and Google Scholar profile settings
- `assets/js/script.js` — navigation, dark mode, publication category filters and animations
- `assets/images/profile.png` — supplied professional photograph
- `assets/documents/Pawan_Mishra_CV.pdf` — supplied CV

## Publication categories
The publication interface separates the supplied records into:
- Journals
- Conferences
- Book Chapters
- Patents

Use the buttons in the Publications section to filter them.

## Google Scholar
The supplied profile is linked directly:
https://scholar.google.com/citations?user=KGFELvMAAAAJ&hl=en

Google Scholar commonly blocks automated requests, so the website does **not** invent or hard-code citation, h-index or i10-index values. Once verified, edit `assets/js/data.js`:

```js
const scholarProfile = {
  url: 'https://scholar.google.com/citations?user=KGFELvMAAAAJ&hl=en',
  citations: 123,
  hIndex: 10,
  i10Index: 8,
  lastVerified: '2026-09-23'
};
```

## GitHub Pages deployment
For your existing repository `pm`, upload the **contents of this `academic-portfolio` folder** to the repository root, so the final structure is:

```text
pm/
├── index.html
└── assets/
    ├── css/style.css
    ├── js/data.js
    ├── js/script.js
    ├── images/profile.png
    └── documents/Pawan_Mishra_CV.pdf
```

Do not upload the outer `academic-portfolio` folder itself if you want the existing URL to remain:
`https://pawanmishrauoa.github.io/pm/`
