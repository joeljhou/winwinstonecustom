const header = document.querySelector("[data-header]");
const navToggle = document.querySelector("[data-nav-toggle]");
const navLinks = document.querySelector("[data-nav-links]");

function setHeaderState() {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 20);
}

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    header?.classList.toggle("nav-open", isOpen);
  });

  navLinks.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      navLinks.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
      header?.classList.remove("nav-open");
    }
  });
}

document.querySelectorAll("[data-studio-tab]").forEach((button) => {
  button.addEventListener("click", () => {
    const target = button.dataset.studioTab;

    document.querySelectorAll("[data-studio-tab]").forEach((item) => {
      const active = item === button;
      item.classList.toggle("active", active);
      item.setAttribute("aria-selected", String(active));
    });

    document.querySelectorAll("[data-studio-panel]").forEach((panel) => {
      panel.hidden = panel.dataset.studioPanel !== target;
    });
  });
});

document.querySelectorAll("[data-preview-form]").forEach((form) => {
  const scope = form.closest("[data-studio-panel]") || document;
  const previewTitle = scope.querySelector("[data-preview-title]");
  const previewMeta = scope.querySelector("[data-preview-meta]");
  const previewText = scope.querySelector("[data-preview-text]");
  const previewImage = scope.querySelector("[data-preview-image]");
  const status = scope.querySelector("[data-preview-status]");
  const feed = document.querySelector("[data-studio-feed]");

  function updatePreview() {
    const title = form.elements.title?.value || form.dataset.fallbackTitle || "未命名草稿";
    const category = form.elements.category?.value || "草稿";
    const material = form.elements.material?.value || form.elements.author?.value || "编辑";
    const summary = form.elements.summary?.value || form.dataset.fallbackSummary || "填写用于预览的简短描述。";
    const image = form.elements.image?.value;

    if (previewTitle) previewTitle.textContent = title;
    if (previewMeta) previewMeta.textContent = `${category} / ${material}`;
    if (previewText) previewText.textContent = summary;
    if (previewImage && image) previewImage.src = image;
  }

  form.addEventListener("input", updatePreview);
  updatePreview();

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (status) {
      status.textContent = "已发布";
      status.classList.add("is-live");
    }

    if (feed) {
      const item = document.createElement("li");
      const title = form.elements.title?.value || form.dataset.fallbackTitle || "未命名草稿";
      item.innerHTML = `<strong>${title}</strong><span>已从后台预览发布</span>`;
      feed.prepend(item);
    }
  });
});
