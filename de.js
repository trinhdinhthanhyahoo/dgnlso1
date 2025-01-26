// Xử lý theme
function toggleTheme() {
    const html = document.documentElement;
    const themeToggle = document.querySelector('.theme-toggle i');
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    html.setAttribute('data-theme', newTheme);
    themeToggle.className = newTheme === 'light' ? 'fas fa-sun' : 'fas fa-moon';

    localStorage.setItem('theme', newTheme);

    const answerFrame = document.getElementById('answer-viewer');
    answerFrame.contentWindow.postMessage({ theme: newTheme }, '*');
}

// Kiểm tra thiết bị và chuyển đổi hiển thị PDF
function handlePDFDisplay() {
    const isMobile = window.innerWidth <= 932;
    const pdfContainer = document.querySelector('.pdf-container');
    const pdfPath = pdfContainer.getAttribute('data-pdf');
    const fullURL = window.location.origin + '/' + pdfPath;

    if (isMobile) {
        // Trên mobile: sử dụng PDF.js viewer
        pdfContainer.innerHTML = `
            <iframe id="pdf-viewer" 
                src="https://mozilla.github.io/pdf.js/web/viewer.html?file=${encodeURIComponent(fullURL)}"
                frameborder="0"
                scrolling="auto"
                height="100%"
                width="100%"
                allow="fullscreen"
                style="border: none;"></iframe>
        `;
    } else {
        // Trên desktop: giữ nguyên iframe với PDF trực tiếp
        pdfContainer.innerHTML = `
            <iframe id="pdf-viewer" 
                src="${pdfPath}"
                type="application/pdf"
                frameborder="0"
                scrolling="auto"
                height="100%"
                width="100%"
                allow="fullscreen"></iframe>
        `;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Xử lý theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    const themeToggle = document.querySelector('.theme-toggle i');
    themeToggle.className = savedTheme === 'light' ? 'fas fa-sun' : 'fas fa-moon';

    // Xử lý hiển thị PDF
    handlePDFDisplay();
});

// Xử lý khi thay đổi kích thước màn hình
window.addEventListener('resize', handlePDFDisplay);

window.addEventListener('message', (event) => {
    if (event.data.theme) {
        document.documentElement.setAttribute('data-theme', event.data.theme);
        const themeToggle = document.querySelector('.theme-toggle i');
        themeToggle.className = event.data.theme === 'light' ? 'fas fa-sun' : 'fas fa-moon';
    }
});
