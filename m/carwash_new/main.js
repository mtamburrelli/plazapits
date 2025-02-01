document.querySelector('.ham-menu').addEventListener('click', function() {
  this.classList.toggle('active');
  document.querySelector('.off-screen-menu').classList.toggle('active');
});


let currentSlide = 0;

function slideReviews(direction) {
    const slider = document.querySelector('.reviews-grid');
    const cards = document.querySelectorAll('.review-card');
    const totalSlides = cards.length;
    
    // Update current slide
    if (direction === 'next') {
        currentSlide = (currentSlide + 1) % totalSlides;
    } else if (direction === 'prev') {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    }
    
    // Apply transform
    const translation = -currentSlide * 100;
    slider.style.transform = `translateX(${translation}%)`;
}

// Wait for DOM to be fully loaded before adding event listeners
document.addEventListener('DOMContentLoaded', () => {
    const prevButton = document.querySelector('.arrow.prev');
    const nextButton = document.querySelector('.arrow.next');
    
    if (prevButton) {
        prevButton.addEventListener('click', () => slideReviews('prev'));
    }
    
    if (nextButton) {
        nextButton.addEventListener('click', () => slideReviews('next'));
    }

    // Reset position on window resize
    window.addEventListener('resize', () => {
        currentSlide = 0;
        document.querySelector('.reviews-grid').style.transform = 'translateX(0)';
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const toggleButton = document.getElementById('toggleButton');
    const imageContainer = document.querySelector('.image-container');

    // Store the initial images HTML
    const carWashImages = imageContainer.innerHTML;

    // PDF URL for detailing
    const detailingPdfUrl = "https://drive.google.com/file/d/15qHlPE8TS9e4FYv0AG6dg5AaGZrgwo8x/preview";

    toggleButton.addEventListener('click', function () {
        // Toggle button appearance
        this.classList.toggle('option2');

        // Add fade effect
        imageContainer.style.opacity = '0';

        // Wait for fade out, then change content
        setTimeout(() => {
            if (this.classList.contains('option2')) {
                // Show PDF for detailing
                imageContainer.innerHTML = ''; // Clear the container
                createIframeWithContent(detailingPdfUrl, '640', '480', imageContainer);
            } else {
                // Show car wash images
                imageContainer.innerHTML = carWashImages;
            }
            // Fade in new content
            imageContainer.style.opacity = '1';
        }, 300); // Match this with your CSS transition time
    });
});

// Function to create an iframe with specific content
function createIframeWithContent(contentUrl, width, height, container) {
    const iframe = document.createElement('iframe');
    iframe.src = contentUrl;
    iframe.width = width || '100%'; // Default width if not provided
    iframe.height = height || '100%'; // Default height if not provided
    iframe.allow = 'autoplay'; // Allow autoplay if needed
    iframe.style.border = 'none';


    // Append the iframe to the specified container
    container.appendChild(iframe);

    return iframe; // Return the iframe element in case you need to manipulate it further
}
