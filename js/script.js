//toogle class active untuk hamburger menu
const navbarnav = document.querySelector(".navbar-nav");
//ketika hamburger menu di klik
document.querySelector("#hamburger-menu").onclick = (e) => {
  navbarnav.classList.toggle("active");
  e.preventDefault();
};
// toogle class active untuk search form
const searchform = document.querySelector(".search-form");
const searchbox = document.querySelector("#search-box");
// ketika search di klik
document.querySelector("#search-button").onclick = (e) => {
  searchform.classList.toggle("active");
  searchbox.focus();
  e.preventDefault();
};
// toogle class active untuk package button
const package = document.querySelector(".package");
// ketika package di klik
document.querySelector("#character-package-button").onclick = (e) => {
  package.classList.toggle("active");
  e.preventDefault();
};

//klik diluar side bar untuk menghilangkan navbarnya

const hm = document.querySelector("#hamburger-menu");
const sb = document.querySelector("#search-button");
const pg = document.querySelector("#character-package-button");

document.addEventListener("click", function (e) {
  if (!hm.contains(e.target) && !navbarnav.contains(e.target)) {
    navbarnav.classList.remove("active");
  }
  if (!sb.contains(e.target) && !searchform.contains(e.target)) {
    searchform.classList.remove("active");
  }
  if (!pg.contains(e.target) && !package.contains(e.target)) {
    package.classList.remove("active");
  }
});

// modal box
const itemdetailmodal = document.querySelector("#item-detail-modal");
const itemdetailbuttons = document.querySelectorAll(".item-detail-button");

itemdetailbuttons.forEach((btn) => {
  btn.onclick = (e) => {
    itemdetailmodal.style.display = "flex";
    e.preventDefault();
  };
});

// klik tombol close
document.querySelector(".modal .close-icon").onclick = (e) => {
  itemdetailmodal.style.display = "none";
  e.preventDefault();
};
// ketika di klik di luar modal
window.onclick = (e) => {
  if (e.target === itemdetailmodal) {
    itemdetailmodal.style.display = "none";
  }
};
