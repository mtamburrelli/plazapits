class PDFViewer {
    constructor(containerSelector = '#viewer') {
        this.container = document.querySelector(containerSelector);
        if (!this.container) {
            throw new Error('PDF viewer container not found');
        }

        this.currentPage = 1;
        this.pdfDoc = null;

        // Clear any existing content
        this.container.innerHTML = '';

        // Setup container styles
        this.container.style.cssText = `
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100vh;
            background: rgba(0, 0, 0, 0.8);
            z-index: 9999;
        `;

        // Create wrapper as a div element
        this.wrapper = document.createElement('div');
        this.wrapper.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            padding: 20px;
            border-radius: 5px;
            width: 100%;
            max-width: 600px;
            height: auto;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            overflow: auto;
        `;

        // Create controls container
        this.controls = document.createElement('div');
        this.controls.style.cssText = `
            display: flex;
            justify-content: center;
            gap: 10px;
            margin: 10px 0;
        `;

        // Create navigation buttons
        this.prevBtn = document.createElement('button');
        this.prevBtn.textContent = 'Previous';
        this.prevBtn.style.cssText = `
            padding: 5px 10px;
            background: #620a1c;
            color: white;
            border: none;
            border-radius: 3px;
            cursor: pointer;
        `;
        this.prevBtn.onclick = async () => await this.prevPage();

        this.nextBtn = document.createElement('button');
        this.nextBtn.textContent = 'Next';
        this.nextBtn.style.cssText = `
            padding: 5px 10px;
            background: #620a1c;
            color: white;
            border: none;
            
            border-radius: 3px;
            cursor: pointer;
        `;
        this.nextBtn.onclick = async () => await this.nextPage();

        // Create page info display
        this.pageInfo = document.createElement('div');
        this.pageInfo.style.cssText = `
            margin: 0 10px;
            line-height: 30px;
        `;

        // Create close button
        this.closeBtn = document.createElement('button');
        this.closeBtn.innerHTML = '×';
        this.closeBtn.style.cssText = `
            position: fixed;
            left: 5px;
            top: 10px;
            border-radius: 20%;
            color: #ffffff;
            background-color: #620a1c;
            font-size: 30px;
            font-weight: bold;
            cursor: pointer;
            padding: 5px 10px;
            opacity: 0.7;
        `;
        this.closeBtn.onclick = () => this.hide();

        // Create canvas
        this.canvas = document.createElement('canvas');

        // Assemble the DOM structure carefully
        this.controls.appendChild(this.prevBtn);
        this.controls.appendChild(this.pageInfo);
        this.controls.appendChild(this.nextBtn);

        this.wrapper.appendChild(this.controls);
        this.wrapper.appendChild(this.canvas);

        // Append to container
        this.container.appendChild(this.wrapper);
        this.container.appendChild(this.closeBtn);

        this.ctx = this.canvas.getContext('2d');
        this.bindKeyEvents();
    }

    // ... rest of your methods remain the same


    show() {
        this.container.style.display = 'block';
    }

    hide() {
        this.container.style.display = 'none';
    }

    bindKeyEvents() {
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                this.hide();
            }
        });
    }

    async loadPDF(url) {
        try {
            const loadingTask = pdfjsLib.getDocument(url);
            this.pdfDoc = await loadingTask.promise;
            console.log('PDF loaded successfully');
            this.currentPage = 1;  // Reset to first page
            await this.renderPage(this.currentPage);
            this.updatePageInfo();  // Update page info immediately
            this.show();
        } catch (error) {
            console.error('Error loading PDF:', error);
        }
    }
    
    async renderPage(num) {
        try {
            if (!this.pdfDoc) return;
            
            const page = await this.pdfDoc.getPage(num);
            const viewport = page.getViewport({ scale: 0.75 });
    
            this.canvas.height = viewport.height;
            this.canvas.width = viewport.width;
    
            await page.render({
                canvasContext: this.ctx,
                viewport: viewport
            }).promise;
    
            this.currentPage = num;
            this.updatePageInfo();
        } catch (error) {
            console.error('Error rendering page:', error);
        }
    }
    
    updatePageInfo() {
        if (this.pdfDoc) {
            this.pageInfo.textContent = `Page ${this.currentPage} of ${this.pdfDoc.numPages}`;
            this.prevBtn.disabled = this.currentPage <= 1;
            this.nextBtn.disabled = this.currentPage >= this.pdfDoc.numPages;
            console.log("Current page:", currentPage)
        }
    }
    
    async prevPage() {
        if (this.currentPage <= 1) return;
        await this.renderPage(this.currentPage - 1);
    }
    
    async nextPage() {
        if (!this.pdfDoc || this.currentPage >= this.pdfDoc.numPages) return;
        await this.renderPage(this.currentPage + 1);
    }
}

// Handler class for PDF logo clicks
class PDFLogoHandler {
    constructor() {
        this.pdfViewer = new PDFViewer('#viewer');
        this.logos = document.querySelectorAll('.pdf-selector');
        this.init();
    }

    init() {
        this.logos.forEach(logo => {
            logo.addEventListener('click', async (event) => {
                const element = event.target.closest('[data-document-id]');
                if (!element) return;

                const documentId = element.getAttribute('data-document-id');
                if (!documentId) return;

                let pdfUrl;
                if (documentId === 'detailing') {
                    pdfUrl = './assets/det_pits.pdf';
                } else if (documentId === 'carwash') {
                    pdfUrl = './assets/carwash_prices.pdf';
                }

                if (pdfUrl) {
                    try {
                        const checkFile = await fetch(pdfUrl);
                        if (!checkFile.ok) {
                            throw new Error(`PDF file not found: ${pdfUrl}`);
                        }
                        console.log('Loading PDF:', pdfUrl);
                        await this.pdfViewer.loadPDF(pdfUrl);
                    } catch (error) {
                        console.error('Error:', error);
                        document.querySelector('#viewer').innerHTML = 
                            `<div class="error-message">Could not load PDF. Please check if the file exists.</div>`;
                    }
                }
            });
        });
    }
}

// Initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    if (typeof pdfjsLib === 'undefined') {
        console.error('PDF.js library not loaded');
        return;
    }

    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

    try {
        new PDFLogoHandler();
        console.log('PDF handler initialized successfully');
    } catch (error) {
        console.error('Error initializing PDF handler:', error);
    }
});