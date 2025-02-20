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
        this.interval = 5000;
    }

    async init() {
        // Create image loading promises
        const loadPromises = this.images.map(src => {
            return new Promise((resolve) => {
                const img = new Image();
                img.onload = resolve;
                img.onerror = resolve; // Handle errors too
                img.src = src;
            });
        });

        // Wait for all images to load
        await Promise.all(loadPromises);
        
        // Now create DOM elements
        this.images.forEach((src, index) => {
            const img = document.createElement('img');
            img.src = src;
            img.className = index === 0 ? 'active' : '';
            this.galleryContainer.appendChild(img);

            const thumb = document.createElement('div');
            thumb.className = `thumbnail ${index === 0 ? 'active' : ''}`;
            thumb.innerHTML = `<img src="${src}" alt="Thumbnail ${index + 1}">`;
            thumb.addEventListener('click', () => this.goToImage(index));
            this.thumbnailsContainer.appendChild(thumb);
        });

        this.startSlideshow();
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
        if (this.interval) {
            clearInterval(this.slideshow);
            clearInterval(this.progress);
        }
        
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


document.addEventListener('DOMContentLoaded', async () => {
    const loaderContainer = document.querySelector('.loader-container');
    const mainContainer = document.querySelector('.main-container');

    try {
        const gallery = new Gallery();
        
        // Wait for both window load and gallery initialization
        await Promise.all([
            new Promise(resolve => window.addEventListener('load', resolve)),
            gallery.init()
        ]);
    } catch (error) {
        console.error('Error loading resources:', error);
    } finally {
        // Always hide loader when done
        loaderContainer.style.display = 'none';
        mainContainer.style.opacity = 1;
    }

    window.addEventListener('load', function() {
        document.querySelector('.loader-container').style.display = 'none';
        document.querySelector('.main-container').style.display = 'block';
    });
});

// Use intersection observer for lazy loading
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.src = entry.target.dataset.src;
      observer.unobserve(entry.target);
    }
  });
});

document.querySelectorAll('img[data-src]').forEach(img => observer.observe(img));

    