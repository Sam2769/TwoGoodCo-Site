const scroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
});

let videoContainer = document.getElementById("video-container");
let playElement = document.getElementById("play");
console.dir(playElement);

videoContainer.addEventListener("mouseenter", () => {
  gsap.to(playElement, {
    scale: 1,
    opacity: 1,
  });
});

videoContainer.addEventListener("mouseleave", () => {
  gsap.to(playElement, {
    scale: 0,
    opacity: 0,
  });
});

videoContainer.addEventListener("mousemove", (details) => {
  gsap.to(playElement, {
    left: details.x,
    top: details.y - 70,
  });
});

gsap.from("#page1 h1", {
  y: 100,
  opacity: 0,
  delay: 0.3,
  stagger: 0.3,
  duration: 0.9,
});

gsap.from("#video-container", {
  opacity: 0,
  delay: 1.3,
  duration: 1.5,
  y: 100,
});
