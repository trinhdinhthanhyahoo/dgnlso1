

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
