const text = "Hello world! I'm Jacob Levine.";
const speed = 100;
const flickerTimes = 2;
let index = 0;
let flickerCount = 0;
let cursorVisible = true;
const h1 = document.getElementById("welcome-text");
const h1Text2 = document.getElementById("welcome-text2");

function flickerCursor(initial = false, infinite = false) {
  if (initial && flickerCount < flickerTimes * 2) {
    h1.innerHTML = cursorVisible ? "&nbsp;" : " ";
    cursorVisible = !cursorVisible;
    flickerCount++;
    setTimeout(() => flickerCursor(true), 600);
  } else if (initial) {
    typeText();
  }
}

function typeText() {
  if (index < text.length) {
    h1.innerHTML = text.slice(0, index + 1) + "&nbsp;";
    index++;
    setTimeout(typeText, speed);
  } else {
    switchText();
  }
}

function switchText() {
  let isH1Visible = true;
  setInterval(() => {
    if (isH1Visible) {
      h1.style.display = "none"; 
      h1Text2.style.display = "block"; 
    } else {
      h1Text2.style.display = "none"; 
      h1.style.display = "block"; 
    }

    isH1Visible = !isH1Visible; 
  }, 600); // cursor blink time
}
flickerCursor(true);

document.addEventListener("DOMContentLoaded", function() {
  const projects = document.querySelectorAll('.project');
  
  projects.forEach(project => {
    const images = project.querySelectorAll('.project-image');
    let currentIndex = 0;
    let slideshowInterval;

    // Starts slideshow on mouse hover
    project.addEventListener('mouseenter', () => {
      slideshowInterval = setInterval(() => {
        images[currentIndex].style.opacity = 0; // hides current image
        currentIndex = (currentIndex + 1) % images.length; // loops through images
        images[currentIndex].style.opacity = 1; // shows next image
      }, 2500); // changes every 2.5 s
    });

    // Stops the slideshow and reset to the first image when mouse leaves
    project.addEventListener('mouseleave', () => {
      clearInterval(slideshowInterval);
      images.forEach(image => image.style.opacity = 0); // hides all images
      images[0].style.opacity = 1; // shows the first image
    });

    // Ensures first image is visible on load
    images.forEach((image, index) => {
      image.style.opacity = (index === 0) ? 1 : 0; // show the first image initially
    });
  });
});
