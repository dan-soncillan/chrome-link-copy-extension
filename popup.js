async function copyText(format) {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab) return;

  const title = tab.title || "";
  const url = tab.url || "";

  let text;
  switch (format) {
    case "markdown":
      text = `[${title}](${url})`;
      break;
    case "url":
      text = url;
      break;
    case "title-url":
      text = `${title}\n${url}`;
      break;
  }

  await navigator.clipboard.writeText(text);
  return format;
}

function flashButton(btn) {
  btn.classList.add("copied");
  const orig = btn.querySelector(".label").textContent;
  btn.querySelector(".label").textContent = "Copied!";
  setTimeout(() => {
    btn.classList.remove("copied");
    btn.querySelector(".label").textContent = orig;
  }, 1000);
}

document.getElementById("btn-md").addEventListener("click", async (e) => {
  await copyText("markdown");
  flashButton(e.currentTarget);
});

document.getElementById("btn-url").addEventListener("click", async (e) => {
  await copyText("url");
  flashButton(e.currentTarget);
});

document.getElementById("btn-title-url").addEventListener("click", async (e) => {
  await copyText("title-url");
  flashButton(e.currentTarget);
});
