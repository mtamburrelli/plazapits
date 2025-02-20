const pdfUrl1 = "https://drive.google.com/file/d/15qHlPE8TS9e4FYv0AG6dg5AaGZrgwo8x/preview";
const pdfUrl2 = "https://drive.google.com/file/d/1kCE1neSig6LEIAnhNJ1-faUZn8DieRS4/preview";

function showPDF(pdfUrl) {
    const pdfViewer1 = document.getElementById('pdfViewer1');
    const pdfViewer2 = document.getElementById('pdfViewer2');
    const container = document.getElementById('pdfViewerContainer');
    const closeButton = document.getElementById('closeButton');

    // Determine which viewer to show
    if (pdfUrl === pdfUrl1) {
        pdfViewer1.src = pdfUrl;
        pdfViewer1.style.display = 'flex';
        pdfViewer2.style.display = 'none';
    } else {
        pdfViewer2.src = pdfUrl;
        pdfViewer2.style.display = 'flex';
        pdfViewer1.style.display = 'none';
    }
    container.style.display = 'flex';
    closeButton.style.display = 'block'; // Show the close button
}

document.querySelectorAll('[id^="show-pdf"]').forEach(element => {
    element.addEventListener('click', function() {
        showPDF(this.dataset.pdf); // Use data attribute
    });
});

function closePDF() {
    document.getElementById('pdfViewerContainer').style.display = 'none';
    document.getElementById('closeButton').style.display = 'none'; // Hide the close button
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closePDF();
});