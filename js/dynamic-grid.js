// dynamic-grid.js

const imageGrid = document.querySelector(".img-grid");

// Define the number of images
const n = 180; // Adjust this to the total number of images you have

// Dynamically generate the array of image filenames
const images = Array.from({ length: n }, (_, i) => `${i + 1}.jpg`);

// Fisher-Yates Shuffle to randomize the array
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // Pick a random index
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
}

// Shuffle the images
const randomizedImages = shuffle(images);

// Generate the image grid
randomizedImages.forEach((fileName, index) => {
  const anchor = document.createElement("a");
  anchor.href = `images/${fileName}`;
  anchor.className = "item lightbox";
  anchor.dataset.caption = `Nature #${index + 1}`;

  // Prevent drag event on the anchor
  anchor.addEventListener("dragstart", (event) => event.preventDefault());

  const img = document.createElement("img");
  img.src = `images/${fileName}`;
  img.draggable = false; // Disable image dragging

  anchor.appendChild(img);
  imageGrid.appendChild(anchor);
});

// // Add event listener to the "Show new photos" button
// const randomizeButton = document.querySelector("#randomize-btn");
// randomizeButton.addEventListener("click", () => {
//   location.reload(); // Reload the page
// });

// // Add event listener to the "Show new photos" button 2
// const randomizeButton2 = document.querySelector("#randomize-btn2");
// randomizeButton2.addEventListener("click", () => {
//   window.scrollTo({
//     top: 0,
//     behavior: "smooth",
//   }); // Scroll to the top of the page
//   // Delay the reload slightly to allow the smooth scroll to complete
//   setTimeout(() => {
//     location.reload(); // Reload the page
//   }, 500);
// });
