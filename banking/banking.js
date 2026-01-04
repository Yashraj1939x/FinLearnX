function openTab(tabId, event) {
  document.querySelectorAll(".tab-content").forEach(section => {
    section.classList.remove("active");
  });

  document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.classList.remove("active");
  });

  document.getElementById(tabId).classList.add("active");
  event.target.classList.add("active");
}
