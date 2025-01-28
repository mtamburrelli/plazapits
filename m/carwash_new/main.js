document.querySelector('.ham-menu').addEventListener('click', function() {
  this.classList.toggle('active');
  document.querySelector('.off-screen-menu').classList.toggle('active');
});

let currentSlide = 0;

function slideReviews(direction) {
    const slider = document.querySelector('.reviews-grid');
    const cards = document.querySelectorAll('.review-card');
    const cardsPerView = window.innerWidth <= 768 ? 1 : 2;
    const totalSlides = Math.ceil(cards.length / cardsPerView);
    
    if (direction === 'next') {
        currentSlide = (currentSlide + 1) % totalSlides;
    } else {
        currentSlide = currentSlide === 0 ? totalSlides - 1 : currentSlide - 1;
    }
    
    const slideWidth = 100 / cardsPerView;
    slider.style.transform = `translateX(-${currentSlide * slideWidth}%)`;
}

document.querySelector('.prev').addEventListener('click', () => slideReviews('prev'));
document.querySelector('.next').addEventListener('click', () => slideReviews('next'));

// Reset position on window resize
window.addEventListener('resize', () => {
    currentSlide = 0;
    document.querySelector('.reviews-grid').style.transform = 'translateX(0)';
});

document.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.getElementById('toggleButton');
    const imageContainer = document.querySelector('.image-container');
    
    // Store the initial images HTML
    const carWashImages = imageContainer.innerHTML;
    
    const detailingImages = `
    <img src="/assets/images/pizzarella-logo.jpeg" class="responsive-image">
    <img src="/assets/images/carro-carwash.png" class="responsive-image">
    <img src="/hola.jpg" class="responsive-image">
    <img src="/assets/images/6027.jpg" class="responsive-image">
`;

toggleButton.addEventListener('click', function() {
    // Toggle button appearance
    this.classList.toggle('option2');
    
    // Add fade effect
    imageContainer.style.opacity = '0';
    
    // Wait for fade out, then change images
    setTimeout(() => {
        if (this.classList.contains('option2')) {
            imageContainer.innerHTML = detailingImages;
        } else {
            imageContainer.innerHTML = carWashImages;
        }
        // Fade in new images
        imageContainer.style.opacity = '1';
    }, 300); // Match this with your CSS transition time
});
});

// Function to open the PDF viewer
function openPdfViewer(pdfUrl) {
    const container = document.getElementById('pdf-viewer-container');
  
    // Show the container
    container.style.display = 'block';
  
    // Clear any previous content
    container.innerHTML = '<button id="close-pdf-button">X</button>';
  
    // Initialize PDF.js and render the PDF
    pdfjsLib.getDocument(pdfUrl).promise.then(pdf => {
      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        pdf.getPage(pageNum).then(page => {
          const scale = 1.5;
          const viewport = page.getViewport({ scale });
  
          // Create a canvas element for the page
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          canvas.height = viewport.height;
          canvas.width = viewport.width;
  
          // Render the page into the canvas
          const renderContext = {
            canvasContext: context,
            viewport: viewport,
          };
          page.render(renderContext).promise.then(() => {
            container.appendChild(canvas);
          });
        });
      }
    });
  
    // Add event listener for the close button
    document.getElementById('close-pdf-button').addEventListener('click', function () {
      container.style.display = 'none';
    });
  
    // Add event listener for the Esc key
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        container.style.display = 'none';
      }
    });
  }
  
  // Add event listeners for both buttons
  document.getElementById('show-pdf-cw').addEventListener('click', function () {
    const pdfUrl = this.getAttribute('data-pdf-url'); // Get PDF URL from data attribute
    openPdfViewer(pdfUrl);
  });
  
  document.getElementById('show-pdf-det').addEventListener('click', function () {
    const pdfUrl = this.getAttribute('data-pdf-url'); // Get PDF URL from data attribute
    openPdfViewer(pdfUrl);
  });