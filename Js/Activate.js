const navButtons = document.querySelectorAll(".header .navbar section button");
navButtons.forEach((button) => {
  button.addEventListener("click", () => {
    navButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
  });
});