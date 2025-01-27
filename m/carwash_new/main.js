document.querySelector('.ham-menu').addEventListener('click', function() {
  this.classList.toggle('active');
  document.querySelector('.off-screen-menu').classList.toggle('active');
});

let currentSlide = 0;

function slideReviews(direction) {
    const slider = document.querySelector('.reviews-grid');
    const cards = document.querySelectorAll('.review-card');
    const cardsPerView = 1; // Show only one card at a time
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

// PDF code here G-zus

pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

// Get the elements
const showPdfDetailingElement = document.getElementById('show-pdf-det');
const showPdfCarwashElement = document.getElementById('show-pdf-cw');

// Define the paths (use relative paths from your web server instead of file:/// URLs)
const detailingPdfPath = './assets/detailing_prices.pdf';
const carwashPdfPath = './assets/carwash_prices.pdf';

// Function to show PDF in container
function showPdfInContainer(pdfPath) {
    // Create a container if it doesn't exist
    let pdfContainer = document.getElementById('pdf-container');
    if (!pdfContainer) {
        pdfContainer = document.createElement('div');
        pdfContainer.id = 'pdf-container';
        document.body.appendChild(pdfContainer);
    }

    // Create an embed element for the PDF
    const embed = document.createElement('embed');
    embed.src = pdfPath;
    embed.type = 'application/pdf';
    embed.width = '100%';
    embed.height = '600px';

    // Clear the container and add the embed element
    pdfContainer.innerHTML = '';
    pdfContainer.appendChild(embed);
}

// Add click event listeners if elements exist
if (showPdfDetailingElement) {
    showPdfDetailingElement.addEventListener('click', function() {
        showPdfInContainer(detailingPdfPath);
    });
}

if (showPdfCarwashElement) {
    showPdfCarwashElement.addEventListener('click', function() {
        showPdfInContainer(carwashPdfPath);
    });
}
});