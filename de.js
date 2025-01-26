// Thêm biến để theo dõi tổng số trang
let pdfDoc = null;
let pageNum = 1;
let pageRendering = false;
let pageNumPending = null;
let totalPages = 0;
const scale = 1.5;
let currentTranslateY = 0;

function renderPage(num) {
    pageRendering = true;
    const canvas = document.getElementById('pdf-viewer');
    const ctx = canvas.getContext('2d');

    pdfDoc.getPage(num).then(function (page) {
        const viewport = page.getViewport({ scale: scale });
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
            canvasContext: ctx,
            viewport: viewport
        };

        const renderTask = page.render(renderContext);

        renderTask.promise.then(function () {
            pageRendering = false;
            if (pageNumPending !== null) {
                renderPage(pageNumPending);
                pageNumPending = null;
            }
        });
    });
}

function queueRenderPage(num) {
    if (pageRendering) {
        pageNumPending = num;
    } else {
        renderPage(num);
    }
}

// Thêm hàm chuyển trang
function onPrevPage() {
    if (pageNum <= 1) {
        return;
    }
    pageNum--;
    queueRenderPage(pageNum);
}

function onNextPage() {
    if (pageNum >= totalPages) {
        return;
    }
    pageNum++;
    queueRenderPage(pageNum);
}

function renderAllPages() {
    const pdfContainer = document.querySelector('.pdf-container');
    pdfContainer.innerHTML = ''; // Xóa nội dung cũ

    // Tạo container cho tất cả các trang
    const pagesContainer = document.createElement('div');
    pagesContainer.id = 'pages-container';
    pdfContainer.appendChild(pagesContainer);

    // Render từng trang
    for (let pageNum = 1; pageNum <= pdfDoc.numPages; pageNum++) {
        const canvas = document.createElement('canvas');
        canvas.id = `page-${pageNum}`;
        canvas.className = 'pdf-page';
        pagesContainer.appendChild(canvas);

        // Render trang
        pdfDoc.getPage(pageNum).then(function (page) {
            const viewport = page.getViewport({ scale: scale });
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            const renderContext = {
                canvasContext: canvas.getContext('2d'),
                viewport: viewport
            };

            page.render(renderContext);
        });
    }
}

// Tải và hiển thị PDF
document.addEventListener('DOMContentLoaded', function () {
    pdfjsLib.getDocument('deso1.pdf').promise.then(function (pdfDoc_) {
        pdfDoc = pdfDoc_;
        totalPages = pdfDoc.numPages;
        renderAllPages();

        // Thêm nút điều hướng sau khi load PDF
        const pdfContainer = document.querySelector('.pdf-container');
        const navigationButtons = document.createElement('div');
        navigationButtons.className = 'pdf-navigation';
        navigationButtons.innerHTML = `
            <button onclick="onPrevPage()">‹</button>
            <span id="page-num">${pageNum}</span> / <span id="page-count">${totalPages}</span>
            <button onclick="onNextPage()">›</button>
        `;
        pdfContainer.appendChild(navigationButtons);
    });

    // Xử lý scroll mượt trên mobile
    const pdfContainer = document.querySelector('.pdf-container');
    let touchStartY = 0;
    let lastY = 0;
    let isScrolling = false;

    pdfContainer.addEventListener('touchstart', function (e) {
        touchStartY = e.touches[0].clientY;
        lastY = currentTranslateY;
        isScrolling = true;
    });

    pdfContainer.addEventListener('touchmove', function (e) {
        if (!isScrolling) return;

        const currentY = e.touches[0].clientY;
        const diffY = currentY - touchStartY;
        currentTranslateY = lastY + diffY;

        const pagesContainer = document.getElementById('pages-container');
        pagesContainer.style.transform = `translateY(${currentTranslateY}px)`;

        e.preventDefault();
    });

    pdfContainer.addEventListener('touchend', function () {
        isScrolling = false;
    });
});

function toggleTheme() {
    const html = document.documentElement;
    const themeToggle = document.querySelector('.theme-toggle i');
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    html.setAttribute('data-theme', newTheme);
    themeToggle.className = newTheme === 'light' ? 'fas fa-sun' : 'fas fa-moon';

    // Lưu trạng thái theme vào localStorage
    localStorage.setItem('theme', newTheme);

    // Đồng bộ theme với iframe answer.html
    const answerFrame = document.getElementById('answer-viewer');
    answerFrame.contentWindow.postMessage({ theme: newTheme }, '*');
}

// Khôi phục theme từ localStorage khi tải trang
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    const themeToggle = document.querySelector('.theme-toggle i');
    themeToggle.className = savedTheme === 'light' ? 'fas fa-sun' : 'fas fa-moon';
});

// Lắng nghe sự kiện thay đổi theme từ các iframe
window.addEventListener('message', (event) => {
    if (event.data.theme) {
        document.documentElement.setAttribute('data-theme', event.data.theme);
        const themeToggle = document.querySelector('.theme-toggle i');
        themeToggle.className = event.data.theme === 'light' ? 'fas fa-sun' : 'fas fa-moon';
    }
});
