'use strict';

/**
 * element toggle function
 */

const elemToggleFunc = function (elem) { elem.classList.toggle("active"); }



/**
 * header sticky & go to top
 */

const header = document.querySelector("[data-header]");
const goTopBtn = document.querySelector("[data-go-top]");

window.addEventListener("scroll", function () {

  if (window.scrollY >= 10) {
    header.classList.add("active");
    goTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    goTopBtn.classList.remove("active");
  }

});



/**
 * navbar toggle
 */

const navToggleBtn = document.querySelector("[data-nav-toggle-btn]");
const navbar = document.querySelector("[data-navbar]");

navToggleBtn.addEventListener("click", function () {

  elemToggleFunc(navToggleBtn);
  elemToggleFunc(navbar);
  elemToggleFunc(document.body);

});





const navLinks = document.querySelectorAll("[data-navbar] a");

navLinks.forEach(link => {
  link.addEventListener("click", function(e) {
    e.preventDefault();
    
    // Close the navbar
    elemToggleFunc(navToggleBtn);
    elemToggleFunc(navbar);
    elemToggleFunc(document.body);
    
    // Navigate to the link's href
    window.location.href = link.getAttribute('href');
  });
});


/**
 * skills toggle
 */

const toggleBtnBox = document.querySelector("[data-toggle-box]");
const toggleBtns = document.querySelectorAll("[data-toggle-btn]");
const skillsBox = document.querySelector("[data-skills-box]");

for (let i = 0; i < toggleBtns.length; i++) {
  toggleBtns[i].addEventListener("click", function () {

    elemToggleFunc(toggleBtnBox);
    for (let i = 0; i < toggleBtns.length; i++) { elemToggleFunc(toggleBtns[i]); }
    elemToggleFunc(skillsBox);

  });
}



// /**
//  * dark & light theme toggle
//  */

const themeToggleBtn = document.querySelector("[data-theme-btn]");

function setDarkTheme() {
  themeToggleBtn.classList.remove("active");
  document.body.classList.add("dark_theme");
  document.body.classList.remove("light_theme");
  localStorage.setItem("theme", "dark_theme");
}

function setLightTheme() {
  themeToggleBtn.classList.add("active");
  document.body.classList.remove("dark_theme");
  document.body.classList.add("light_theme");
  localStorage.setItem("theme", "light_theme");
}

// Determine initial theme based on OS preference and local hours
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
const prefersLightScheme = window.matchMedia("(prefers-color-scheme: light)").matches;
const currentHour = new Date().getHours();

if (prefersDarkScheme) {
  setDarkTheme();
} else if (prefersLightScheme) {
  setLightTheme();
} else {  // For 'no-preference', 'auto' or in case of any other unexpected scenario
  if (currentHour >= 19 || currentHour < 6) {
    setDarkTheme();
  } else {
    setLightTheme();
  }
}
themeToggleBtn.addEventListener("click", function() {
  if (themeToggleBtn.classList.contains("active")) {
    setDarkTheme();
  } else {
    setLightTheme();
  }
});