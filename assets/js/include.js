(async () => {
  const includes = document.querySelectorAll('[data-include]');
  let loaded = 0;

  for (const el of includes) {
    const file = el.getAttribute('data-include');
    const res = await fetch(file);
    const html = await res.text();
    el.innerHTML = html;

    loaded++;
    if (loaded === includes.length) {
      // jelezzük, hogy az összes részlet betöltődött
      document.dispatchEvent(new Event('partialsLoaded'));
    }
  }
})();
