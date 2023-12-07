const d = document;
const w = window;
function scrollTopButton(btn) {
  console.log({btn});
  const $scroll = d.querySelector(btn);
  w.addEventListener("scroll", (e) => {
    let scrollTop = d.documentElement.scrollTop;
    if (scrollTop > 600) {
      $scroll.classList.remove("hidden");
    } else {
      $scroll.classList.add("hidden");
    }
  });
  d.addEventListener("click", (e) => {
    if (e.target.matches(btn)) {
      w.scrollTo({
        behavior: "smooth",
        top: 0,
      });
    }
  });
}

window.addEventListener('load', function(){
  scrollTopButton(".scroll-top-btn");  
})
