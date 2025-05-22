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

  // Téma betöltése localStorage-ból
  const savedTheme = localStorage.getItem('theme');
  const isDark = savedTheme === 'dark';
  if (isDark) {
    document.body.classList.add('dark-mode');
    icon.className = 'fa-solid fa-moon';
  } else {
    icon.className = 'fa-solid fa-sun';
  }
});

// Gombra kattintás: téma váltása + mentés
toggleBtn.addEventListener('click', () => {
  const isDark = document.body.classList.toggle('dark-mode');
  icon.className = isDark ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});


document.addEventListener('DOMContentLoaded', () => {
  const tooltip = document.getElementById('tooltip');
  let verses = {};

  fetch('verses.json')
  .then(res => res.json())
  .then(data => {
      verses = data;

      document.querySelectorAll('.scripture').forEach(el => {
        el.addEventListener('mouseenter', () => {
          const key = el.getAttribute('data-ref');
          tooltip.textContent = verses[key] || 'Nincs magyarázat';

          tooltip.style.display = 'block';

          const rect = el.getBoundingClientRect();
          tooltip.style.left = `${rect.left + window.scrollX}px`;
          tooltip.style.top = `${rect.bottom + window.scrollY + 5}px`;
        });

        el.addEventListener('mouseleave', () => {
          tooltip.style.display = 'none';
        });
      });
     })
  .catch(err => {
    console.error('Nem sikerült betölteni a verses.json-t', err);
  });
});



const burgerBtn = document.getElementById('burger');
const navLinks = document.querySelector('.nav-links');

if (burgerBtn && navLinks) {
  burgerBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
    });
  });
}


