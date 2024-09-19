const newFunction = () => {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
};

newFunction;

let videoContainer = document.getElementById("video-container");
let playElement = document.getElementById("play");

let videoFunction = () => {
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
};

videoFunction;

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

let cursor = document.querySelector("#cursor");
console.log(cursor);

document.addEventListener("mousemove", (dets) => {
  gsap.to(cursor, {
    top: dets.y,
    left: dets.x,
  });
});

let childArray = Array.from(document.getElementsByClassName("child"));

let displayCursor = () => {
  gsap.to(cursor, {
    transform: "translate(-50%, -50%) scale(1)",
  });
};

let hideCursor = () => {
  gsap.to(cursor, {
    transform: "translate(-50%, -50%) scale(0)",
  });
};

childArray.forEach((elem) => {
  elem.addEventListener("mouseenter", displayCursor);
  elem.addEventListener("mouseleave", hideCursor);
});
