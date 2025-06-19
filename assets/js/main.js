// Preloader
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  if (preloader) {
    preloader.classList.add("hide");
    setTimeout(() => {
      preloader.style.display = "none";
    }, 400);
  }
});

// Dark mode vezérlés - csak ha a header betöltődött
document.addEventListener("partialsLoaded", () => {
  const toggleBtn = document.getElementById("theme-toggle");
  if (!toggleBtn) return;

  const icon = toggleBtn.querySelector("i");

  function applyTheme(isDark) {
    document.body.classList.toggle("dark-mode", isDark);
    icon.className = isDark ? "fa-solid fa-moon" : "fa-solid fa-sun";
  }

  const savedTheme = localStorage.getItem("theme");
  let isDark = savedTheme === "dark";

  if (!savedTheme) {
    isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  applyTheme(isDark);

  toggleBtn.addEventListener("click", () => {
    const isDarkNow = !document.body.classList.contains("dark-mode");
    applyTheme(isDarkNow);
    localStorage.setItem("theme", isDarkNow ? "dark" : "light");
  });
});
