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

// Xử lý hiển thị ảnh trong iframe
function loadExamImages() {
    const examFrame = document.getElementById('exam-frame');
    const frameDoc = examFrame.contentDocument || examFrame.contentWindow.document;
    const urlParams = new URLSearchParams(window.location.search);
    const examNumber = urlParams.get('de') || '1';

    // Tạo HTML cho ảnh
    let imagesHTML = '';
    for (let i = 1; i <= 27; i++) {
        imagesHTML += `
            <img src="deso${examNumber}/${i}.jpg" 
                 alt="Trang ${i}" 
                 loading="lazy"
                 class="exam-image">`;
    }

    const imageContainer = frameDoc.getElementById('image-container');
    if (imageContainer) {
        imageContainer.innerHTML = imagesHTML;

        // Thêm styles vào iframe
        const style = frameDoc.createElement('style');
        style.textContent = `
            body {
                margin: 0;
                padding: 0;
                background: var(--background-color, #ffffff);
            }
            
            .image-container {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 10px;
                padding: 20px;
            }

            .exam-image {
                max-width: 100%;
                height: auto;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                border-radius: 8px;
            }

            @media (max-width: 768px) {
                .image-container {
                    padding: 10px;
                    gap: 5px;
                }
            }
        `;
        frameDoc.head.appendChild(style);
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Xử lý theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    const themeToggle = document.querySelector('.theme-toggle i');
    themeToggle.className = savedTheme === 'light' ? 'fas fa-sun' : 'fas fa-moon';

    // Load ảnh khi iframe đã sẵn sàng
    const examFrame = document.getElementById('exam-frame');
    examFrame.onload = loadExamImages;
});

window.addEventListener('message', (event) => {
    if (event.data.theme) {
        document.documentElement.setAttribute('data-theme', event.data.theme);
        const themeToggle = document.querySelector('.theme-toggle i');
        themeToggle.className = event.data.theme === 'light' ? 'fas fa-sun' : 'fas fa-moon';
    }
});

function handlePDFDisplay() {
    const isMobile = window.innerWidth <= 932;
    const pdfContainer = document.querySelector('.pdf-container');
    const pdfPath = pdfContainer.getAttribute('data-pdf');

    if (isMobile) {
        // Hiển thị dạng hình ảnh cho mobile
        pdfContainer.innerHTML = `
            <div class="pdf-images">
                <div class="zoom-controls">
                    <button onclick="zoomIn()"><i class="fas fa-search-plus"></i></button>
                    <button onclick="zoomOut()"><i class="fas fa-search-minus"></i></button>
                    <button onclick="resetZoom()"><i class="fas fa-undo"></i></button>
                </div>
                <div class="image-container">
                    <img src="${pdfPath.replace('.pdf', '-1.jpg')}" alt="Trang 1" loading="lazy">
                    <img src="${pdfPath.replace('.pdf', '-2.jpg')}" alt="Trang 2" loading="lazy">
                    <img src="${pdfPath.replace('.pdf', '-3.jpg')}" alt="Trang 3" loading="lazy">
                    <img src="${pdfPath.replace('.pdf', '-4.jpg')}" alt="Trang 4" loading="lazy">
                </div>
            </div>
        `;
    } else {
        // Desktop: giữ nguyên PDF
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

// Thêm các hàm điều khiển
let currentZoom = 1;
const ZOOM_STEP = 0.1;
const MAX_ZOOM = 3;
const MIN_ZOOM = 0.5;

function zoomIn() {
    if (currentZoom < MAX_ZOOM) {
        currentZoom += ZOOM_STEP;
        updateZoom();
    }
}

function zoomOut() {
    if (currentZoom > MIN_ZOOM) {
        currentZoom -= ZOOM_STEP;
        updateZoom();
    }
}

function resetZoom() {
    currentZoom = 1;
    updateZoom();
}

function updateZoom() {
    const images = document.querySelectorAll('.exam-image');
    images.forEach(img => {
        img.style.transform = `scale(${currentZoom})`;
    });
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Thêm styles
const style = document.createElement('style');
style.textContent = `
    .image-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        padding: 20px;
        background: var(--background-color, #ffffff);
    }

    .exam-image {
        max-width: 100%;
        height: auto;
        transition: transform 0.3s ease;
        transform-origin: top center;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        border-radius: 8px;
    }

    .image-controls {
        position: fixed;
        bottom: 20px;
        right: 20px;
        display: flex;
        gap: 10px;
        z-index: 1000;
    }

    .zoom-controls {
        display: flex;
        gap: 10px;
        background: rgba(255, 255, 255, 0.9);
        padding: 10px;
        border-radius: 20px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }

    .zoom-controls button,
    .scroll-top {
        width: 40px;
        height: 40px;
        border: none;
        border-radius: 50%;
        background: #2563eb;
        color: white;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        transition: background 0.3s ease;
    }

    .zoom-controls button:hover,
    .scroll-top:hover {
        background: #1d4ed8;
    }

    .scroll-top {
        position: fixed;
        bottom: 20px;
        left: 20px;
    }

    @media (max-width: 768px) {
        .image-container {
            padding: 10px;
            gap: 5px;
        }

        .zoom-controls button,
        .scroll-top {
            width: 35px;
            height: 35px;
            font-size: 14px;
        }
    }
`;
document.head.appendChild(style);
