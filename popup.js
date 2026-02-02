document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("btn-copy");
  if (!btn) return;

  const label = btn.querySelector(".label");

  btn.addEventListener("click", async () => {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      if (!tab || !tab.url) return;

      await navigator.clipboard.writeText(tab.url);

      btn.classList.add("copied");
      if (label) label.textContent = "Link copied!";
      setTimeout(() => window.close(), 600);
    } catch (err) {
      if (label) label.textContent = "Copy failed";
      console.error(err);
    }
  });
});
