
// ============================================================
// Dr. Pawan Mishra - Academic Website
// Main JavaScript
// ============================================================


// ------------------------------------------------------------
// Helper functions
// ------------------------------------------------------------

const $ = (selector, root = document) =>
  root.querySelector(selector);

const $$ = (selector, root = document) =>
  [...root.querySelectorAll(selector)];


// ------------------------------------------------------------
// Mobile Navigation
// ------------------------------------------------------------

const nav = $('#nav');
const menuToggle = $('#menuToggle');

if (menuToggle && nav) {

  menuToggle.addEventListener('click', () => {

    const open = nav.classList.toggle('open');

    menuToggle.setAttribute(
      'aria-expanded',
      String(open)
    );

    menuToggle.innerHTML = open
      ? '<i class="fa-solid fa-xmark"></i>'
      : '<i class="fa-solid fa-bars"></i>';

  });


  // Close mobile menu after clicking a navigation link

  $$('#nav a').forEach(link => {

    link.addEventListener('click', () => {

      nav.classList.remove('open');

      menuToggle.setAttribute(
        'aria-expanded',
        'false'
      );

      menuToggle.innerHTML =
        '<i class="fa-solid fa-bars"></i>';

    });

  });

}


// ------------------------------------------------------------
// Dark / Light Mode
// ------------------------------------------------------------

const themeToggle = $('#themeToggle');

const storedTheme =
  localStorage.getItem('pm-theme');


if (storedTheme === 'dark') {

  document.body.classList.add('dark');

}


function updateThemeIcon() {

  if (!themeToggle) return;

  themeToggle.innerHTML =
    document.body.classList.contains('dark')

      ? '<i class="fa-solid fa-sun"></i>'

      : '<i class="fa-solid fa-moon"></i>';

}


updateThemeIcon();


if (themeToggle) {

  themeToggle.addEventListener('click', () => {

    document.body.classList.toggle('dark');


    localStorage.setItem(
      'pm-theme',
      document.body.classList.contains('dark')
        ? 'dark'
        : 'light'
    );


    updateThemeIcon();

  });

}


// ------------------------------------------------------------
// Google Scholar Metrics
// ------------------------------------------------------------
//
// Values are displayed ONLY when numeric verified values
// are supplied in data.js.
//
// Therefore no fabricated citation count, h-index or i10-index
// will appear on the website.
// ------------------------------------------------------------

if (typeof scholarProfile !== 'undefined') {

  const scholarMap = [

    [
      '#scholarCitations',
      scholarProfile.citations
    ],

    [
      '#scholarHIndex',
      scholarProfile.hIndex
    ],

    [
      '#scholarI10Index',
      scholarProfile.i10Index
    ]

  ];


  scholarMap.forEach(([selector, value]) => {

    const element = $(selector);

    if (
      element &&
      value !== null &&
      value !== undefined &&
      value !== ''
    ) {

      element.textContent = value;

    }

  });

}


// ------------------------------------------------------------
// Publications
// ------------------------------------------------------------

const publicationList =
  $('#publicationList');

const publicationSummary =
  $('#publicationSummary');


const publicationLabels = {

  journal: 'Journal',

  conference: 'Conference',

  'book-chapter': 'Book Chapter',

  patent: 'Patent'

};


// ------------------------------------------------------------
// Publication Summary
// ------------------------------------------------------------

function renderPublicationSummary() {

  if (!publicationSummary ||
      typeof publications === 'undefined') {

    return;

  }


  const counts = publications.reduce(
    (accumulator, publication) => {

      accumulator[publication.type] =
        (accumulator[publication.type] || 0) + 1;

      return accumulator;

    },
    {}
  );


  publicationSummary.innerHTML = `

    <div class="pub-stat">

      <strong>
        ${publications.length}
      </strong>

      <span>
        Listed Records
      </span>

    </div>


    <div class="pub-stat">

      <strong>
        ${counts.journal || 0}
      </strong>

      <span>
        Journals
      </span>

    </div>


    <div class="pub-stat">

      <strong>
        ${counts.conference || 0}
      </strong>

      <span>
        Conferences
      </span>

    </div>


    <div class="pub-stat">

      <strong>
        ${counts['book-chapter'] || 0}
      </strong>

      <span>
        Book Chapters
      </span>

    </div>


    <div class="pub-stat">

      <strong>
        ${counts.patent || 0}
      </strong>

      <span>
        Patents Listed
      </span>

    </div>

  `;

}


// ------------------------------------------------------------
// Render Publications
// ------------------------------------------------------------

function renderPublications(filter = 'all') {

  if (
    !publicationList ||
    typeof publications === 'undefined'
  ) {

    return;

  }


  const filteredPublications =
    filter === 'all'

      ? publications

      : publications.filter(
          publication =>
            publication.type === filter
        );


  if (filteredPublications.length === 0) {

    publicationList.innerHTML = `

      <div class="empty-state">

        <p>
          No publications found in this category.
        </p>

      </div>

    `;

    return;

  }


  publicationList.innerHTML =
    filteredPublications.map(publication => `

      <article class="pub-card reveal">

        <div class="pub-year">

          ${publication.year}

        </div>


        <div class="pub-content">

          <span class="pub-type ${publication.type}">

            ${publicationLabels[publication.type] ||
              publication.type}

          </span>


          <h3>

            ${publication.title}

          </h3>


          <p>

            ${publication.authors}

          </p>


          <small>

            ${publication.venue}

            ${
              publication.note
                ? ` · ${publication.note}`
                : ''
            }

            ${
              publication.link
                ? ` · <a
                      href="${publication.link}"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      DOI
                    </a>`
                : ''
            }

          </small>

        </div>

      </article>

    `).join('');


  observeReveals();

}


// ------------------------------------------------------------
// Publication Filter Buttons
// ------------------------------------------------------------

function setupPublicationFilters() {

  $$('.filter').forEach(button => {

    button.addEventListener('click', () => {

      $$('.filter').forEach(
        item => item.classList.remove('active')
      );


      button.classList.add('active');


      renderPublications(
        button.dataset.filter || 'all'
      );

    });

  });

}


// ------------------------------------------------------------
// Scroll Reveal Animation
// ------------------------------------------------------------

let observer;


function observeReveals() {

  if (observer) {

    observer.disconnect();

  }


  // Older browsers may not support IntersectionObserver.
  // In that case, simply show the elements.

  if (!('IntersectionObserver' in window)) {

    $$('.reveal').forEach(
      element => element.classList.add('visible')
    );

    return;

  }


  observer = new IntersectionObserver(

    entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.classList.add('visible');

        }

      });

    },

    {
      threshold: 0.12
    }

  );


  $$('.reveal').forEach(
    element => observer.observe(element)
  );

}


// ------------------------------------------------------------
// Initialize Website
// ------------------------------------------------------------

function initializeWebsite() {

  renderPublicationSummary();

  setupPublicationFilters();

  renderPublications();

  observeReveals();

}


initializeWebsite();
