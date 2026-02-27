function openMenu() {
  const body = document.body;

  body.classList.add("open");
}

function closeMenu() {
  const body = document.body;

  body.classList.remove("open");
}

// template_qgwowcm
// service_hlgfoad
// 6D6FmqQfh0rPFfjcD

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
