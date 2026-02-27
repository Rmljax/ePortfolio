function openMenu() {
  const body = document.body;

  body.classList.add("open");
}

function closeMenu() {
  const body = document.body;

  body.classList.remove("open");
}

window.addEventListener("scroll", () => {
  const scrollPos = window.scrollY;
  const navBar = document.querySelector(".nav");
  const navCon = document.querySelector(".nav__container");
  const navLinks = document.querySelectorAll(".nav__link");
  const home = document.querySelector("#home");

  if (scrollPos > 10) {
    navBar.classList.add("scrolled-past");
    navCon.classList.add("scrolled-past");
  } else {
    navBar.classList.remove("scrolled-past");
    navCon.classList.remove("scrolled-past");
  }
  if (scrollPos > home.offsetHeight - 1) {
    navLinks.forEach((navLink) => {
      navLink.classList.add("color-change");
    });
  } else {
    navLinks.forEach((navLink) => {
      navLink.classList.remove("color-change");
    });
  }
});

async function sendEmail(event) {
  event.preventDefault();
  const body = document.body;
  const loading = document.querySelector(".contact__form__loading");
  const form = document.querySelector(".contact__form");

  try {
    loading.classList.remove("hidden");

    await emailjs.sendForm(
      "service_hlgfoad",
      "template_qgwowcm",
      event.target,
      "6D6FmqQfh0rPFfjcD",
    );
    form.reset();
    loading.classList.add("hidden");

    body.classList.add(".success-open");
    setTimeout(() => {
      body.classList.remove(".success-open");
    }, 5000);
  } catch {
    loading.classList.add("hidden");
    alert(
      "An error has occured. Please try again later or contact me at Ryan.Lockenbach@gmail.com",
    );
  }
}
