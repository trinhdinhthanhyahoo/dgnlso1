// Đơn giản hóa script.js vì không cần xử lý PDF.js nữa
function createAnswerGrid(numberOfQuestions) {
    const answerGrid = document.getElementById('answer-grid');
    for (let i = 1; i <= numberOfQuestions; i++) {
        const answerItem = document.createElement('div');
        answerItem.className = 'answer-item';

        const questionNumber = document.createElement('div');
        questionNumber.textContent = `Câu ${i}`;

        const options = document.createElement('div');
        options.className = 'answer-options';

        ['A', 'B', 'C', 'D'].forEach(option => {
            const button = document.createElement('button');
            button.className = 'option-btn';
            button.textContent = option;
            button.onclick = () => selectAnswer(i, option);
            options.appendChild(button);
        });

        answerItem.appendChild(questionNumber);
        answerItem.appendChild(options);
        answerGrid.appendChild(answerItem);
    }
}

function selectAnswer(questionNumber, option) {
    const questionDiv = document.querySelector(`.answer-item:nth-child(${questionNumber})`);
    const buttons = questionDiv.querySelectorAll('.option-btn');

    buttons.forEach(button => {
        if (button.textContent === option) {
            button.classList.add('selected');
        } else {
            button.classList.remove('selected');
        }
    });
}

let selectedExam = null;

function selectExam(examNumber) {
    selectedExam = examNumber;

    document.querySelectorAll('.exam-button').forEach((button, index) => {
        if (index + 1 === examNumber) {
            button.classList.add('selected');
            button.classList.remove('not-selected');
            // Thêm hiệu ứng rung nhẹ khi chọn
            button.style.animation = 'selectShake 0.5s';
            setTimeout(() => button.style.animation = '', 500);
        } else {
            button.classList.remove('selected');
            button.classList.add('not-selected');
        }
    });

    // Hiển thị nút bắt đầu
    const startButton = document.querySelector('.start-button');
    startButton.style.opacity = '1';
    startButton.style.transform = 'translateY(0)';
    startButton.disabled = false;
}

function startExam() {
    if (!selectedExam) {
        showNotification('Vui lòng chọn một đề thi trước khi bắt đầu!');
        return;
    }

    // Hiển thị thông báo xác nhận
    showConfirmation('Bạn đã sẵn sàng làm bài thi?', () => {
        window.location.href = `deso${selectedExam}.html`;
    });
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

function showConfirmation(message, callback) {
    const modal = document.createElement('div');
    modal.className = 'confirmation-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <p>${message}</p>
            <div class="modal-buttons">
                <button onclick="this.parentElement.parentElement.parentElement.remove()">Hủy</button>
                <button onclick="confirmStart(this)" class="primary">Bắt đầu</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    window.confirmStart = (button) => {
        button.parentElement.parentElement.parentElement.remove();
        callback();
    };
}

// Khởi tạo khi trang load
window.onload = function () {
    document.querySelectorAll('.exam-button').forEach(button => {
        button.classList.remove('selected');
        button.classList.remove('not-selected');
    });

    const startButton = document.querySelector('.start-button');
    startButton.style.opacity = '0.5';
    startButton.style.transform = 'translateY(20px)';
    startButton.disabled = true;
};
