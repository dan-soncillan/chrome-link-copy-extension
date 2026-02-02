chrome.commands.onCommand.addListener(async (command) => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab) return;

  const title = tab.title || "";
  const url = tab.url || "";

  let text;
  if (command === "copy-link-markdown") {
    text = `[${title}](${url})`;
  } else if (command === "copy-link-plain") {
    text = url;
  } else {
    return;
  }

  try {
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: (textToCopy, format) => {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showCopyNotification(format);
        });

        function showCopyNotification(fmt) {
          const existing = document.getElementById("__qlc-toast");
          if (existing) existing.remove();

          const toast = document.createElement("div");
          toast.id = "__qlc-toast";
          toast.textContent = fmt === "copy-link-markdown" ? "Markdown link copied!" : "URL copied!";
          Object.assign(toast.style, {
            position: "fixed",
            bottom: "24px",
            right: "24px",
            background: "#1a1a2e",
            color: "#e0e0e0",
            padding: "12px 20px",
            borderRadius: "8px",
            fontSize: "14px",
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            fontWeight: "500",
            zIndex: "2147483647",
            boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
            opacity: "0",
            transform: "translateY(12px)",
            transition: "opacity 0.2s ease, transform 0.2s ease",
            pointerEvents: "none",
            border: "1px solid rgba(255,255,255,0.1)",
          });

          document.body.appendChild(toast);
          requestAnimationFrame(() => {
            toast.style.opacity = "1";
            toast.style.transform = "translateY(0)";
          });

          setTimeout(() => {
            toast.style.opacity = "0";
            toast.style.transform = "translateY(12px)";
            setTimeout(() => toast.remove(), 200);
          }, 1500);
        }
      },
      args: [text, command],
    });
  } catch {
    // chrome:// pages etc. — fall back to offscreen or ignore
  }
});
