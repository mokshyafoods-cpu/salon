const services = [
  { name: "Soft glam", description: "Your features, just a little more luminous.", duration: "45 MIN", price: "NPR 4,500" },
  { name: "Special occasion", description: "A look that feels right for the whole celebration.", duration: "60 MIN", price: "NPR 7,000" },
  { name: "Bridal preview", description: "Let's find the look you'll remember forever.", duration: "90 MIN", price: "NPR 9,000" },
  { name: "Makeup lesson", description: "Easy techniques, chosen just for your face.", duration: "75 MIN", price: "NPR 6,000" },
];

const serviceGrid = document.getElementById("service-grid");
const serviceChoice = document.getElementById("service-choice");
const bookingForm = document.getElementById("booking-form");
const formNote = document.getElementById("form-note");
const menuToggle = document.getElementById("menu-toggle");
const primaryNav = document.getElementById("primary-nav");

services.forEach((service, index) => {
  const card = document.createElement("article");
  card.className = "service-card";
  card.innerHTML = `
    <span class="service-number">0${index + 1}</span>
    <h3>${service.name}</h3>
    <p>${service.description}</p>
    <div class="service-meta"><strong>${service.price} <span aria-hidden="true">·</span> ${service.duration}</strong><a href="#booking" data-service="${service.name}" aria-label="Book ${service.name}">↗</a></div>
  `;
  serviceGrid.appendChild(card);
});

serviceGrid.addEventListener("click", (event) => {
  const bookingLink = event.target.closest("[data-service]");
  if (bookingLink) serviceChoice.value = bookingLink.dataset.service;
});

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
  primaryNav.classList.toggle("is-open", !isOpen);
});

primaryNav.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    primaryNav.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
  }
});

const visitDate = document.getElementById("visit-date");
const today = new Date();
visitDate.min = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);

bookingForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(bookingForm);
  const guestName = formData.get("name").trim();
  formNote.textContent = `Thanks, ${guestName}. Your ${formData.get("service").toLowerCase()} request is ready. Email hello@museparlor.com to confirm your appointment.`;
  formNote.classList.add("is-submitted");
});

document.getElementById("year-text").textContent = `© ${new Date().getFullYear()} Muse Makeup Parlor`;