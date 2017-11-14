// Variables
var isDark = true;
var isExpanded = false;
var animateRound;
// Flashlight SVG - Forked from Noel Delgado @pixelia_me
var svgElement = document.querySelector("svg");
var maskedElement = document.querySelector("#mask-circle");
var circleBorders = document.querySelectorAll(".circle-shadow");
var svgPoint = svgElement.createSVGPoint(); //create svg point in user coordinate

// Star Animation
var stars = document.querySelectorAll(".stars div"),
  scatterStar = function(element, index, array) {
    var posX = Math.floor((Math.random() * 30) + 5),
        posY = Math.floor((Math.random() * 90) + 5),
        scale = Math.random(),
        animationTime = Math.floor((Math.random() * (5000 - 10000)) + 7500)
    ;
    if (index%2 == 0) {
      element.style.right = posX + "%";
    }
    else {
      element.style.left = posX + "%";
    }
    element.style.top = posY + "%";
    element.style.transform = "scale("+ scale + ")";
    element.style.animationDuration = animationTime + "ms";
  };

[].forEach.call(stars, scatterStar); //change to array as a fallback



// get the svgCoords
function cursorPoint(e, svg) {
    svgPoint.x = e.clientX;
    svgPoint.y = e.clientY;
    return svgPoint.matrixTransform(svg.getScreenCTM().inverse());
}

// update the cx,cy
function update(svgCoords) {
    maskedElement.setAttribute("cx", svgCoords.x);
    maskedElement.setAttribute("cy", svgCoords.y);
    for (var i = 0; i < circleBorders.length; i++) {
      circleBorders[i].setAttribute("cx", svgCoords.x);
      circleBorders[i].setAttribute("cy", svgCoords.y);
    }
}

// when mouse moves 
// 1. call function cursorPoint to get the svgCoords
// 2. call function update to update the cy, cx of masked svg and its border
window.addEventListener("mousemove", function(e) {
  if(isDark){
    update(cursorPoint(e, svgElement));
  }
}, false);

// for mobile
document.addEventListener("touchmove", function(e) {
  if(isDark){  
    // disables all scrolling in iOS 5
    e.preventDefault();
    // if targetTouches array exists -> call function 1&2
    var touch = e.targetTouches[0];
    if (touch) {
        update(cursorPoint(touch, svgElement));
    }
  }
}, false);
// use false to set the handler on the bubbling phase
// https://stackoverflow.com/questions/5657292/why-is-false-used-after-this-simple-addeventlistener-function

function changeTheme() {
  if (isDark) { 
    isDark = false;
    document.body.classList.remove("dark");
  }
  else { 
    isDark = true;
    document.body.classList.add("dark");
  };
}
function loadPage(page) {
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
}

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