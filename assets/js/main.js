var header = document.querySelector(".site-header");
window.onscroll = function() {
  if( document.body.scrollTop+document.documentElement.scrollTop > 0)
      header.classList.add("sticky");
  else header.classList.remove("sticky");
};
var mobileNav = document.querySelector("#nav-trigger");
mobileNav.addEventListener("click",function() {
  if (mobileNav.checked) {
    document.body.style.overflow = "hidden";
  }
  else {
    document.body.style.overflow = "";
  }
});
if ( document.querySelector('.grid') ) {
  var grid = document.querySelector('.grid');
  var msnry = new Masonry( grid, {
    itemSelector: '.grid-item', // select none at first
    columnWidth: '.grid-sizer',
    gutter: '.grid-gutter-sizer',
    percentPosition: true,
    stagger: 30,
    visibleStyle: { transform: 'translateY(0)', opacity: 1 },
    hiddenStyle: { transform: 'translateY(100px)', opacity: 0 },
  }); 
}
if ( document.querySelector('.pager') ) {
  var infScroll = new InfiniteScroll( grid, {
    path: '.next',
    append: '.grid-item',
    outlayer: msnry,
    status: '.page-load-status',
    hideNav: '.pager',
    scrollThreshold: 200,
    history: false
    // button: '.view-more-button',
  });
}
