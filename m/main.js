class Gallery {
    constructor() {
        this.galleryContainer = document.querySelector('.gallery-container');
        this.thumbnailsContainer = document.querySelector('.gallery-thumbnails');
        this.progressBar = document.querySelector('.gallery-progress');

        this.images = [
            './assets/images/pits-gallery1.png',
            './assets/images/pits-gallery2.png',
            './assets/images/pits-gallery3.png',
            './assets/images/pits-gallery4.png'
        ];

        this.currentIndex = 0;
        this.interval = 5000; // 5 seconds per image
        this.init();
    }

    init() {
        // Create images and thumbnails
        this.images.forEach((src, index) => {
            // Create main image
            const img = document.createElement('img');
            img.src = src;
            img.className = index === 0 ? 'active' : '';
            img.style.width = '100%'; // Set the width to 100%
            this.galleryContainer.appendChild(img);

            // Create thumbnail
            const thumb = document.createElement('div');
            thumb.className = `thumbnail ${index === 0 ? 'active' : ''}`;
            thumb.innerHTML = `<img src="${src}" alt="Thumbnail ${index + 1}">`;
            thumb.addEventListener('click', () => this.goToImage(index));
            this.thumbnailsContainer.appendChild(thumb);
        });

        // Start automatic slideshow
        this.startSlideshow();

        // Add hover pause/resume
        this.galleryContainer.addEventListener('mouseenter', () => this.pauseSlideshow());
        this.galleryContainer.addEventListener('mouseleave', () => this.startSlideshow());
    }

    goToImage(index) {
        // Update active classes
        const images = this.galleryContainer.querySelectorAll('img');
        const thumbnails = this.thumbnailsContainer.querySelectorAll('.thumbnail');

        images[this.currentIndex].classList.remove('active');
        thumbnails[this.currentIndex].classList.remove('active');

        this.currentIndex = index;

        images[this.currentIndex].classList.add('active');
        thumbnails[this.currentIndex].classList.add('active');

        // Reset progress bar
        this.resetProgress();
    }

    nextImage() {
        const nextIndex = (this.currentIndex + 1) % this.images.length;
        this.goToImage(nextIndex);
    }

    startSlideshow() {
        clearInterval(this.slideshow);
        clearInterval(this.progress);

        this.slideshow = setInterval(() => this.nextImage(), this.interval);
        this.startProgress();
    }

    pauseSlideshow() {
        clearInterval(this.slideshow);
        clearInterval(this.progress);
    }

    startProgress() {
        let width = 0;
        const increment = 100 / (this.interval / 10); // Update every 10ms

        this.progressBar.style.width = '0%';
        this.progress = setInterval(() => {
            width += increment;
            this.progressBar.style.width = `${Math.min(width, 100)}%`;
        }, 10);
    }

    resetProgress() {
        this.progressBar.style.width = '0%';
        this.startSlideshow();
    }
}

// Ensure the DOM is fully loaded before initializing the gallery
document.addEventListener('DOMContentLoaded', () => {
    const gallery = new Gallery();
});