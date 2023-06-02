// IMAGES ARRAY
// 'source' should be the path to the image, either internal or external
// 'alt' should be a short description of the image or empty
// 'description' is inserted below the image
const images = [
  {
    source: 'http://www.sany.dk/images/big/LE_MO4.jpg',
    alt: 'Less IS more',
    description: '2. Drawing by ...',
  },
];

// RANDOM IMAGE FUNCITON
// Function to randomly select an image and insert it into the DOM
function randomImage() {
  const randomIndex = Math.floor(Math.random() * images.length);
  const selectedImage = images[randomIndex];

  const imageElement = document.getElementById('image');
  imageElement.src = selectedImage.source;
  imageElement.alt = selectedImage.alt;

  const descriptionElement = document.getElementById('image-description');
  descriptionElement.textContent = selectedImage.description;
}

// DRAW FUNCTION
function drawOnCanvas() {
  // Get the canvas element from the DOM
  const canvas = document.getElementById('canvas');
  const context = canvas.getContext('2d');

  // set drawing state to false intially
  let isDrawing = false;

  // Draw a circle at the current mouse position.
  function drawCircle(x, y) {
    context.beginPath();
    context.arc(x, y, 10, 0, 2 * Math.PI);
    context.fill();
  }

  // Get mouse position relative to the canvas element.
  function getMousePos(event) {
    const rect = canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  }

  // Get touch position relative to the canvas element.
  function getTouchPos(event) {
    const rect = canvas.getBoundingClientRect();
    return {
      x: event.touches[0].clientX - rect.left,
      y: event.touches[0].clientY - rect.top,
    };
  }

  function startDrawing(pos) {
    isDrawing = true;
    drawCircle(pos.x, pos.y);
  }

  function stopDrawing() {
    isDrawing = false;
  }

  function moveDrawing(pos) {
    if (isDrawing) {
      drawCircle(pos.x, pos.y);
    }
  }

  function resizeCanvas() {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const devicePixelRatio = window.devicePixelRatio || 1;

    canvas.width = width * devicePixelRatio;
    canvas.height = height * devicePixelRatio;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    context.scale(devicePixelRatio, devicePixelRatio);
  }

  canvas.addEventListener('mousedown', (event) => {
    const pos = getMousePos(event);
    startDrawing(pos);
  });

  canvas.addEventListener('mouseup', stopDrawing);

  canvas.addEventListener('mousemove', (event) => {
    const pos = getMousePos(event);
    moveDrawing(pos);
  });

  canvas.addEventListener('touchstart', (event) => {
    event.preventDefault();
    const pos = getTouchPos(event);
    startDrawing(pos);
  });

  canvas.addEventListener('touchend', stopDrawing);

  canvas.addEventListener('touchmove', (event) => {
    event.preventDefault();
    const pos = getTouchPos(event);
    moveDrawing(pos);
  });

  // resize canvas when window is resized
  // window.addEventListener('resize', resizeCanvas);

  // Initial canvas resize
  resizeCanvas();
}

// TOGGLE MENU FUNCTION
function toggleMenu() {
  const menuButton = document.getElementById('menu-button');
  const menu = document.getElementById('menu');

  menuButton.addEventListener('click', () => {
    const isOpen = menu.classList.contains('open');
    if (isOpen) {
      menuButton.classList.remove('open');
      menuButton.ariaLabel = 'Close menu';
      menu.classList.remove('open');
    } else {
      menuButton.classList.add('open');
      menuButton.ariaLabel = 'Open menu';
      menu.classList.add('open');
    }
  });
}

function toggleCanvas() {
  const canvas = document.getElementById('canvas-container');
  const canvasButton = document.getElementById('canvas-button');
  canvasButton;

  canvasButton.addEventListener('click', () => {
    const isOpen = canvas.classList.contains('open');
    if (isOpen) {
      console.log('close');
      canvas.classList.remove('open');
      canvasButton.ariaLabel = 'Open canvas';
      canvasButton.innerText = 'Open canvas';

      canvas.classList.remove('open');
    } else {
      console.log('open');
      canvas.classList.add('open');
      canvasButton.ariaLabel = 'Close canvas';
      canvasButton.innerText = 'Close canvas';
    }
  });
}

// INITIAL FUNCTION CALLS
// Run function when the page loads
window.addEventListener('DOMContentLoaded', (event) => {
  randomImage();
  drawOnCanvas();
  toggleMenu();
  toggleCanvas();
});
