// -----------------------------
// FULLY RANDOMIZED COLOR SYSTEM
// -----------------------------

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generate a harmonious triadic palette
const baseHue = rand(0, 360);

const palette = {
  name: `hsl(${baseHue}, 85%, 55%)`,
  research: `hsl(${(baseHue + 120) % 360}, 85%, 45%)`,
  teaching: `hsl(${baseHue}, 85%, 55%)`,
  title: `hsl(${(baseHue + 240) % 360}, 85%, 50%)`,

};

// Apply to CSS variables
document.documentElement.style.setProperty("--c-name", palette.name);
document.documentElement.style.setProperty("--c-research", palette.research);
document.documentElement.style.setProperty("--c-teaching", palette.teaching);
document.documentElement.style.setProperty("--c-title", palette.title);


// Highlight active nav item
document.querySelectorAll(".nav-item").forEach(link => {
  if (link.href === window.location.href) {
    link.classList.add("active");
  }
});
const BASE_PATH = window.location.pathname.includes("/about/")
  || window.location.pathname.includes("/research/")
  || window.location.pathname.includes("/teaching/")
  ? "../"
  : "";

fetch(`${BASE_PATH}data/news.csv`);

// Debug info
console.log("🎨 Base Hue:", baseHue);
console.log("🎨 Palette:", palette);
async function loadNews() {
  try {
    const response = await fetch("data/news.csv");
    const text = await response.text();

    const lines = text.trim().split("\n");
    const rows = lines.slice(1);

    const newsList = document.getElementById("news-list");
    if (!newsList) return;

    newsList.innerHTML = "";

    rows.forEach(row => {
      const [year, ...rest] = row.split(",");
      const content = rest.join(",");

      const li = document.createElement("li");
      li.innerHTML = `<span class="news-date">${year}</span> ${content}`;
      newsList.appendChild(li);
    });

  } catch (err) {
    console.error("News load failed:", err);
  }
}

loadNews();

