document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("btn-copy");
  if (!btn) return;

  btn.addEventListener("click", async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab) return;

    const url = tab.url || "";

    // Copy via content script to avoid clipboard permission issues in popup
    try {
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: (text) => navigator.clipboard.writeText(text),
        args: [url],
      });
    } catch {
      // Fallback for restricted pages
      const ta = document.createElement("textarea");
      ta.value = url;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }

    btn.classList.add("copied");
    btn.querySelector(".label").textContent = "Link copied!";
    setTimeout(() => window.close(), 600);
  });
});
