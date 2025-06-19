document.addEventListener("DOMContentLoaded", () => {
  const includes = document.querySelectorAll("[data-include]");

  includes.forEach(el => {
    const file = el.getAttribute("data-include");

    fetch(file)
      .then(res => {
        if (!res.ok) throw new Error(`Include hiba: ${file}`);
        return res.text();
      })
      .then(data => {
        el.innerHTML = data;
        // Ha szükséges: újraindíthatod a témaváltó gomb JS-t itt
      })
      .catch(err => {
        el.innerHTML = `<p style="color:red;">Hiba a "${file}" betöltésekor</p>`;
        console.error(err);
      });
  });
});