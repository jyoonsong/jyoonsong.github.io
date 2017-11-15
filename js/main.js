// Variables
var isExpanded = false;
var isDark;
var animateRound;

// Functions
function loadPage(page) {
  console.log("loaded" + page);
  window.location.href = page;
}
function toggleNav(n) {
  let navbar = document.querySelector(".nav");
  if (!isExpanded) {
    navbar.classList.add("expanded");
    isExpanded = true;
    if (n === 1) {
      changeTheme();
      animateRound = true;
    }
  }
  else {
    navbar.classList.remove("expanded");
    isExpanded = false;
    if (n === 1) {
      changeTheme();
      animateRound = false;
    }
  }
  if (n === 3) {
    console.log("toggleNav completed");
  }
}
function fadePage( cb ) {
  document.body.classList.add("loading");
  cb();
}

// Page Loading Transition
window.onload = function () {
  setTimeout(function () {
    document.body.classList.remove("loading");
  }, 500);
};

/* when clicked */
//document.querySelector(".svg-link").onclick = function(e) {
//  var b = this.href;
//  e.preventDefault();
//  TweenLite.to(maskedElement, 0.5, {attr:{r:"150%"}, ease:Linear.easeInOut, onComplete: loadPage(b)});
//}
document.querySelector(".nav-brand").onclick = function(e) {
  e.preventDefault();
  let radius = "10%"
  if (isDark) {
    radius = "150%"
  }
  TweenLite.to(maskedElement, 0.3, {attr:{r:radius}, ease:Linear.easeInOut, onComplete: changeTheme()});
}

document.querySelector(".nav-toggle").onclick = function(e) {
  e.preventDefault();
  if (isDark) {
    TweenLite.to(maskedElement, 0.4, {attr:{r:"150%"}, ease:Linear.easeOut, onComplete: toggleNav(1)});
  }
  else if (animateRound == true) {
    TweenLite.to(maskedElement, 0.4, {attr:{r:"10%"}, ease:Linear.easeOut, onComplete: toggleNav(1)});
  }
  else {
    toggleNav(2);
  }
}





var navLink = document.querySelectorAll(".nav-list a");
for (var i = 0; i < navLink.length; i++) {
  navLink[i].onclick = function(e) {
    e.preventDefault();
    var b = this.href;
    fadePage( function() {
      setTimeout(function () {
        loadPage(b);
      }, 1000);
    });
//    toggleNav(3);
//    setTimeout(function() {
//      loadPage(b);
//    }, 600)
  };
}
