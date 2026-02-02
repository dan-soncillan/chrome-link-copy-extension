document.getElementById("btn-copy").addEventListener("click", async (e) => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab) return;

  await navigator.clipboard.writeText(tab.url || "");

  const btn = e.currentTarget;
  btn.classList.add("copied");
  btn.querySelector(".label").textContent = "Link copied!";
  setTimeout(() => window.close(), 600);
});
