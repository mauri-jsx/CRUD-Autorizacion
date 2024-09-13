export function navigateTo(path) {
  window.history.pushState({}, path, window.location.origin + path);
  window.dispatchEvent(new Event("popstate"));
}

document.body.addEventListener("click", (e) => {
  if (e.target.matches("a")) {
    e.preventDefault();
    const href = e.target.getAttribute("href");
    navigateTo(href);
  }
});
