// Blog oldal JavaScript
const posts = [
  {
    title: "Többé nem ural minket a bűn",
    date: "2025-06-17",
    author: "Fodor Szabi",
    series: "Bátorítás",
    content: "De akkor miért vétkezek továbbra is? Miért tud akkora erővel támadni engem a bűn?",
    image: "assets/images/20250617.jpg",
    link: "posts/20250617.html"
  },
  
];

// Blog bejegyzések renderelése

function renderPosts(list) {
  const grid = document.querySelector('.blog-grid');
  grid.innerHTML = '';

  list.forEach(post => {
    const card = document.createElement('article');
    card.className = 'blog-card';
    card.innerHTML = `
  <img src="${post.image}" alt="${post.title}" loading="lazy" class="blog-card-image" />
  ${post.series ? `<span class="blog-series">${post.series}</span>` : ""}
  <h3>${post.title}</h3>
  <time class="post-date" datetime="${post.date}">${new Date(post.date).toLocaleDateString('hu-HU')}</time>
  <p>${post.content}</p>
  <a href="${post.link}" class="read-more">Olvasd tovább →</a>
`;

    grid.appendChild(card);
  });
}

// Oldal betöltésekor indítjuk
renderPosts(posts);

// Keresés funkció
function populateFilters(posts) {
  const authorSelect = document.getElementById('author');
  const seriesSelect = document.getElementById('series');

  // Egyedi írók, sorozatok kigyűjtése
  const authors = [...new Set(posts.map(p => p.author))];
  const series = [...new Set(posts.map(p => p.series))];

  authors.forEach(author => {
    const option = document.createElement('option');
    option.value = author;
    option.textContent = author;
    authorSelect.appendChild(option);
  });

  series.forEach(s => {
    const option = document.createElement('option');
    option.value = s;
    option.textContent = s;
    seriesSelect.appendChild(option);
  });
}

function filterAndSortPosts() {
  const sort = document.getElementById('sort').value;
  const author = document.getElementById('author').value;
  const series = document.getElementById('series').value;

  let filtered = [...posts];

  if (author !== 'all') {
    filtered = filtered.filter(p => p.author === author);
  }
  if (series !== 'all') {
    filtered = filtered.filter(p => p.series === series);
  }

  filtered.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return sort === 'date-desc' ? dateB - dateA : dateA - dateB;
  });

  renderPosts(filtered);
}

document.addEventListener("DOMContentLoaded", () => {
  renderPosts(posts);
  populateFilters(posts);

  document.getElementById('sort').addEventListener('change', filterAndSortPosts);
  document.getElementById('author').addEventListener('change', filterAndSortPosts);
  document.getElementById('series').addEventListener('change', filterAndSortPosts);
});
