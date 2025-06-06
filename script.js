const toggleBtn = document.getElementById('theme-toggle');
const icon = toggleBtn.querySelector('i');

// Betöltéskor ellenőrizzük, van-e mentett téma
window.addEventListener("load", () => {
  // Preloader eltüntetése
  const preloader = document.getElementById("preloader");
  if (preloader) {
    preloader.classList.add("hide");
    setTimeout(() => {
      preloader.style.display = "none";
    }, 400);
  }

  // Téma betöltése localStorage-ból vagy rendszerbeállításból
const savedTheme = localStorage.getItem('theme');
let isDark;

if (savedTheme) {
  isDark = savedTheme === 'dark';
} else {
  isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
}

document.body.classList.toggle('dark-mode', isDark);
icon.className = isDark ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
});

// Gombra kattintás: téma váltása + mentés
toggleBtn.addEventListener('click', () => {
  const isDark = document.body.classList.toggle('dark-mode');
  icon.className = isDark ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});


document.addEventListener("DOMContentLoaded", () => {
  fetch("blog.json")
    .then(response => response.json())
    .then(posts => {
      const blogGrid = document.querySelector(".blog-grid");
      blogGrid.innerHTML = "";

      posts.forEach(post => {
        const card = document.createElement("article");
        card.className = "blog-card";
        card.setAttribute("data-date", post.date);
        card.setAttribute("data-author", post.author);
        card.setAttribute("data-series", post.series);

        card.innerHTML = `
          <img src="${post.img}" alt="${post.title}" loading="lazy">
          ${post.series ? `<span class="blog-series">${post.series}</span>` : ""}
          <h2>${post.title}</h2>
          <time class="post-date" datetime="${post.date}">${post.date}</time>
          <p>${post.desc}</p>
          <a href="${post.link}">Olvasd tovább →</a>
        `;

        blogGrid.appendChild(card);
      });

      // Szűrés csak miután minden kártya betöltődött
      initFilters();
    })
    .catch(error => {
      console.error("Nem sikerült betölteni a blogokat:", error);
    });
});

function initFilters() {
  const sortSelect = document.getElementById("sort");
  const authorSelect = document.getElementById("author");
  const seriesSelect = document.getElementById("series");
  const blogGrid = document.querySelector(".blog-grid");
  const blogCards = Array.from(blogGrid.querySelectorAll(".blog-card"));

  const authors = new Set();
  const seriesList = new Set();

  blogCards.forEach(card => {
    const author = card.dataset.author;
    const series = card.dataset.series;
    if (author) authors.add(author);
    if (series) seriesList.add(series);
  });

  authors.forEach(author => {
    const option = document.createElement("option");
    option.value = author;
    option.textContent = author;
    authorSelect.appendChild(option);
  });

  seriesList.forEach(series => {
    const option = document.createElement("option");
    option.value = series;
    option.textContent = series;
    seriesSelect.appendChild(option);
  });

  function applyFilters() {
    const sortOrder = sortSelect.value;
    const selectedAuthor = authorSelect.value;
    const selectedSeries = seriesSelect.value;

    const filtered = blogCards
      .filter(card => {
        const authorMatch = selectedAuthor === "all" || card.dataset.author === selectedAuthor;
        const seriesMatch = selectedSeries === "all" || card.dataset.series === selectedSeries;
        return authorMatch && seriesMatch;
      })
      .sort((a, b) => {
        const dateA = new Date(a.dataset.date);
        const dateB = new Date(b.dataset.date);
        return sortOrder === "date-desc" ? dateB - dateA : dateA - dateB;
      });

    blogGrid.innerHTML = "";
    filtered.forEach(card => blogGrid.appendChild(card));
  }

  // Eseményfigyelők
  sortSelect.addEventListener("change", applyFilters);
  authorSelect.addEventListener("change", applyFilters);
  seriesSelect.addEventListener("change", applyFilters);
}







