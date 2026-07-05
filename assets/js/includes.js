async function loadComponent(id, file) {
  const target = document.getElementById(id);

  if (!target) {
    return;
  }

  try {
    const response = await fetch(file);

    if (!response.ok) {
      throw new Error(`Could not load ${file}`);
    }

    target.innerHTML = await response.text();
  } catch (error) {
    console.error(error);
  }
}

function setActiveNav() {
  const currentFile = window.location.pathname.split("/").pop() || "index.html";
  const currentPage = currentFile.replace(".html", "");

  document.querySelectorAll(".site-nav a[data-page]").forEach((link) => {
    if (link.dataset.page === currentPage) {
      link.classList.add("active");
    }
  });
}

function setupMobileNav() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");

  if (!toggle || !nav) {
    return;
  }

  toggle.addEventListener("click", () => {
    nav.classList.toggle("open");
    toggle.classList.toggle("open");
  });
}

function setupPortfolioRotators() {
  const cards = document.querySelectorAll("[data-rotating-images]");

  cards.forEach((card) => {
    const image = card.querySelector("img");
    const images = card.dataset.rotatingImages
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    if (!image || images.length <= 1) {
      return;
    }

    let index = 0;

    setInterval(() => {
      index = (index + 1) % images.length;
      image.classList.add("fade-out");

      setTimeout(() => {
        image.src = images[index];
        image.classList.remove("fade-out");
      }, 300);
    }, 4000);
  });
}

function setupWhatsAppForm() {
  const form = document.getElementById("whatsappForm");

  if (!form) {
    return;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("clientName").value.trim();
    const shootType = document.getElementById("shootType").value.trim();
    const message = document.getElementById("clientMessage").value.trim();

    const whatsappNumber = "27732657260";

    const whatsappMessage = `
Hi Chloe,

My name is ${name}.
I am looking for: ${shootType}.

More details:
${message || "I would like more information please."}
    `.trim();

    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank", "noopener");
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  await loadComponent("site-header", "components/header.html");
  await loadComponent("site-footer", "components/footer.html");

  setActiveNav();
  setupMobileNav();
  setupPortfolioRotators();
  setupWhatsAppForm();
});
