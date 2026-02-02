chrome.commands.onCommand.addListener(async (command) => {
  if (command !== "copy-link") return;

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab) return;

  try {
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: (url) => {
        navigator.clipboard.writeText(url).then(() => {
          const existing = document.getElementById("__qlc-toast");
          if (existing) existing.remove();

          const toast = document.createElement("div");
          toast.id = "__qlc-toast";

          // Link chain SVG icon
          const svg = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4ade80" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`;

          toast.innerHTML = svg + `<span style="color:#e8e8e8;font-size:13px;font-weight:500">Link copied to clipboard</span>`;

          Object.assign(toast.style, {
            position: "fixed",
            top: "16px",
            right: "16px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background: "rgba(24, 24, 27, 0.92)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            padding: "10px 16px",
            borderRadius: "24px",
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            zIndex: "2147483647",
            boxShadow: "0 2px 16px rgba(0,0,0,0.3)",
            opacity: "0",
            transform: "translateY(-8px)",
            transition: "opacity 0.25s ease, transform 0.25s ease",
            pointerEvents: "none",
            border: "1px solid rgba(74, 222, 128, 0.4)",
          });

          document.body.appendChild(toast);
          requestAnimationFrame(() => {
            toast.style.opacity = "1";
            toast.style.transform = "translateY(0)";
          });

          setTimeout(() => {
            toast.style.opacity = "0";
            toast.style.transform = "translateY(-8px)";
            setTimeout(() => toast.remove(), 250);
          }, 1800);
        });
      },
      args: [tab.url || ""],
    });
  } catch {
    // chrome:// pages etc.
  }
});
