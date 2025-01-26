// Khởi tạo bộ đếm thời gian
let timeLeft = 150 * 60; // 150 phút * 60 giây

// Tạo object chứa đáp án cho các đề thi
const ANSWER_KEYS = {
    de1: {
        // Cột 1
        1: 'B', 2: 'C', 3: 'D', 4: 'C', 5: 'C',
        6: 'B', 7: 'A', 8: 'A', 9: 'B', 10: 'A',
        11: 'B', 12: 'B', 13: 'C', 14: 'D', 15: 'B',
        16: 'A', 17: 'D', 18: 'C', 19: 'B', 20: 'D',

        // Cột 2
        21: 'C', 22: 'B', 23: 'B', 24: 'A', 25: 'A',
        26: 'C', 27: 'C', 28: 'B', 29: 'A', 30: 'B',
        31: 'A', 32: 'A', 33: 'A', 34: 'B', 35: 'A',
        36: 'C', 37: 'D', 38: 'B', 39: 'C', 40: 'D',

        // Cột 3
        41: 'A', 42: 'B', 43: 'C', 44: 'A', 45: 'D',
        46: 'B', 47: 'B', 48: 'B', 49: 'B', 50: 'B',
        51: 'B', 52: 'C', 53: 'C', 54: 'C', 55: 'B',
        56: 'C', 57: 'C', 58: 'B', 59: 'A', 60: 'C',

        // Cột 4
        61: 'B', 62: 'D', 63: 'D', 64: 'C', 65: 'D',
        66: 'D', 67: 'B', 68: 'A', 69: 'A', 70: 'D',
        71: 'B', 72: 'C', 73: 'B', 74: 'C', 75: 'C',
        76: 'A', 77: 'A', 78: 'B', 79: 'C', 80: 'A',

        // Cột 5
        81: 'B', 82: 'B', 83: 'B', 84: 'A', 85: 'C',
        86: 'D', 87: 'B', 88: 'D', 89: 'A', 90: 'C',
        91: 'C', 92: 'B', 93: 'A', 94: 'C', 95: 'C',
        96: 'D', 97: 'C', 98: 'C', 99: 'C', 100: 'A',

        // Cột 6
        101: 'D', 102: 'B', 103: 'B', 104: 'C', 105: 'C',
        106: 'A', 107: 'D', 108: 'C', 109: 'C', 110: 'D',
        111: 'B', 112: 'A', 113: 'A', 114: 'B', 115: 'B',
        116: 'C', 117: 'B', 118: 'B', 119: 'A', 120: 'B'
    },
    de2: {
        // Cột 1
        1: 'B', 2: 'B', 3: 'C', 4: 'C', 5: 'B',
        6: 'A', 7: 'A', 8: 'A', 9: 'A', 10: 'B',
        11: 'D', 12: 'B', 13: 'D', 14: 'A', 15: 'D',
        16: 'D', 17: 'D', 18: 'A', 19: 'D', 20: 'C',

        // Cột 2
        21: 'B', 22: 'B', 23: 'C', 24: 'D', 25: 'A',
        26: 'C', 27: 'B', 28: 'D', 29: 'B', 30: 'A',
        31: 'A', 32: 'D', 33: 'C', 34: 'C', 35: 'C',
        36: 'A', 37: 'A', 38: 'C', 39: 'D', 40: 'D',

        // Cột 3
        41: 'C', 42: 'A', 43: 'D', 44: 'B', 45: 'D',
        46: 'D', 47: 'D', 48: 'A', 49: 'B', 50: 'C',
        51: 'B', 52: 'B', 53: 'C', 54: 'B', 55: 'A',
        56: 'B', 57: 'D', 58: 'A', 59: 'B', 60: 'B',

        // Cột 4
        61: 'C', 62: 'D', 63: 'B', 64: 'D', 65: 'A',
        66: 'A', 67: 'D', 68: 'A', 69: 'A', 70: 'A',
        71: 'D', 72: 'B', 73: 'D', 74: 'B', 75: 'A',
        76: 'C', 77: 'D', 78: 'D', 79: 'C', 80: 'D',

        // Cột 5
        81: 'A', 82: 'C', 83: 'D', 84: 'D', 85: 'B',
        86: 'B', 87: 'C', 88: 'C', 89: 'A', 90: 'B',
        91: 'D', 92: 'B', 93: 'C', 94: 'D', 95: 'B',
        96: 'C', 97: 'D', 98: 'B', 99: 'A', 100: 'D',

        // Cột 6
        101: 'B', 102: 'A', 103: 'C', 104: 'A', 105: 'A',
        106: 'C', 107: 'A', 108: 'A', 109: 'A', 110: 'C',
        111: 'D', 112: 'B', 113: 'D', 114: 'C', 115: 'C',
        116: 'B', 117: 'D', 118: 'B', 119: 'A', 120: 'A'
    },
    de3: {
        // Cột 1
        1: 'C', 2: 'A', 3: 'B', 4: 'B', 5: 'C',
        6: 'B', 7: 'C', 8: 'C', 9: 'B', 10: 'B',
        11: 'A', 12: 'A', 13: 'D', 14: 'D', 15: 'D',
        16: 'A', 17: 'B', 18: 'D', 19: 'A', 20: 'C',

        // Cột 2
        21: 'B', 22: 'A', 23: 'A', 24: 'B', 25: 'A',
        26: 'B', 27: 'A', 28: 'C', 29: 'A', 30: 'A',
        31: 'B', 32: 'C', 33: 'A', 34: 'D', 35: 'B',
        36: 'D', 37: 'D', 38: 'B', 39: 'D', 40: 'C',

        // Cột 3
        41: 'A', 42: 'C', 43: 'B', 44: 'D', 45: 'C',
        46: 'A', 47: 'B', 48: 'D', 49: 'B', 50: 'D',
        51: 'B', 52: 'B', 53: 'B', 54: 'A', 55: 'B',
        56: 'B', 57: 'A', 58: 'B', 59: 'A', 60: 'B',

        // Cột 4
        61: 'C', 62: 'A', 63: 'A', 64: 'C', 65: 'C',
        66: 'A', 67: 'A', 68: 'D', 69: 'A', 70: 'C',
        71: 'A', 72: 'B', 73: 'C', 74: 'A', 75: 'D',
        76: 'A', 77: 'C', 78: 'C', 79: 'A', 80: 'A',

        // Cột 5
        81: 'A', 82: 'D', 83: 'A', 84: 'A', 85: 'B',
        86: 'A', 87: 'B', 88: 'B', 89: 'A', 90: 'B',
        91: 'B', 92: 'D', 93: 'B', 94: 'B', 95: 'A',
        96: 'B', 97: 'C', 98: 'C', 99: 'C', 100: 'B',

        // Cột 6
        101: 'A', 102: 'B', 103: 'A', 104: 'A', 105: 'A',
        106: 'D', 107: 'D', 108: 'A', 109: 'A', 110: 'B',
        111: 'D', 112: 'A', 113: 'B', 114: 'A', 115: 'B',
        116: 'D', 117: 'C', 118: 'A', 119: 'A', 120: 'A'
    },
    de4: {
        // Cột 1
        1: 'C', 2: 'A', 3: 'B', 4: 'C', 5: 'D',
        6: 'B', 7: 'A', 8: 'A', 9: 'D', 10: 'A',
        11: 'B', 12: 'A', 13: 'A', 14: 'D', 15: 'C',
        16: 'C', 17: 'A', 18: 'B', 19: 'D', 20: 'A',

        // Cột 2
        21: 'C', 22: 'C', 23: 'A', 24: 'A', 25: 'D',
        26: 'C', 27: 'B', 28: 'B', 29: 'B', 30: 'C',
        31: 'C', 32: 'B', 33: 'A', 34: 'A', 35: 'A',
        36: 'C', 37: 'D', 38: 'C', 39: 'B', 40: 'D',

        // Cột 3
        41: 'C', 42: 'B', 43: 'A', 44: 'A', 45: 'B',
        46: 'B', 47: 'A', 48: 'D', 49: 'A', 50: 'C',
        51: 'B', 52: 'B', 53: 'A', 54: 'C', 55: 'D',
        56: 'B', 57: 'B', 58: 'A', 59: 'B', 60: 'B',

        // Cột 4
        61: 'B', 62: 'B', 63: 'C', 64: 'B', 65: 'D',
        66: 'A', 67: 'A', 68: 'A', 69: 'B', 70: 'B',
        71: 'C', 72: 'A', 73: 'B', 74: 'C', 75: 'B',
        76: 'B', 77: 'C', 78: 'A', 79: 'C', 80: 'A',

        // Cột 5
        81: 'C', 82: 'D', 83: 'B', 84: 'A', 85: 'B',
        86: 'A', 87: 'A', 88: 'D', 89: 'B', 90: 'A',
        91: 'B', 92: 'D', 93: 'B', 94: 'C', 95: 'D',
        96: 'C', 97: 'D', 98: 'D', 99: 'A', 100: 'B',

        // Cột 6
        101: 'B', 102: 'A', 103: 'B', 104: 'C', 105: 'C',
        106: 'C', 107: 'A', 108: 'C', 109: 'A', 110: 'C',
        111: 'C', 112: 'A', 113: 'A', 114: 'D', 115: 'B',
        116: 'C', 117: 'A', 118: 'A', 119: 'B', 120: 'A'
    },
    de5: {
        // Cột 1
        1: 'B', 2: 'A', 3: 'A', 4: 'C', 5: 'C',
        6: 'A', 7: 'A', 8: 'B', 9: 'B', 10: 'D',
        11: 'B', 12: 'A', 13: 'A', 14: 'D', 15: 'D',
        16: 'C', 17: 'C', 18: 'B', 19: 'C', 20: 'C',

        // Cột 2
        21: 'B', 22: 'C', 23: 'B', 24: 'B', 25: 'C',
        26: 'D', 27: 'B', 28: 'B', 29: 'D', 30: 'A',
        31: 'B', 32: 'D', 33: 'A', 34: 'C', 35: 'A',
        36: 'C', 37: 'B', 38: 'A', 39: 'C', 40: 'B',

        // Cột 3
        41: 'D', 42: 'B', 43: 'A', 44: 'D', 45: 'C',
        46: 'C', 47: 'C', 48: 'D', 49: 'B', 50: 'C',
        51: 'B', 52: 'A', 53: 'B', 54: 'D', 55: 'B',
        56: 'C', 57: 'D', 58: 'A', 59: 'A', 60: 'C',

        // Cột 4
        61: 'B', 62: 'A', 63: 'A', 64: 'A', 65: 'D',
        66: 'B', 67: 'C', 68: 'C', 69: 'D', 70: 'B',
        71: 'A', 72: 'A', 73: 'B', 74: 'B', 75: 'D',
        76: 'D', 77: 'A', 78: 'A', 79: 'D', 80: 'B',

        // Cột 5
        81: 'A', 82: 'B', 83: 'C', 84: 'C', 85: 'B',
        86: 'A', 87: 'C', 88: 'A', 89: 'B', 90: 'D',
        91: 'C', 92: 'D', 93: 'D', 94: 'D', 95: 'C',
        96: 'B', 97: 'C', 98: 'D', 99: 'A', 100: 'D',

        // Cột 6
        101: 'C', 102: 'A', 103: 'D', 104: 'C', 105: 'D',
        106: 'D', 107: 'C', 108: 'D', 109: 'C', 110: 'A',
        111: 'A', 112: 'C', 113: 'C', 114: 'B', 115: 'C',
        116: 'C', 117: 'B', 118: 'A', 119: 'A', 120: 'A'
    }
};

// Thêm hàm để lấy đáp án theo đề thi
function getAnswerKey(examId = 'de1') {
    return ANSWER_KEYS[examId] || ANSWER_KEYS.de1; // Mặc định trả về đề 1 nếu không tìm thấy
}

function updateTimer() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const timerElement = document.getElementById('timer');

    // Format thời gian
    const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    timerElement.textContent = timeString;

    // Thêm cảnh báo màu sắc
    if (timeLeft <= 300) { // 5 phút cuối
        timerElement.classList.add('danger');
    } else if (timeLeft <= 600) { // 10 phút cuối
        timerElement.classList.add('warning');
    }

    if (timeLeft <= 0) {
        clearInterval(timerInterval);
        alert('Hết thời gian làm bài!');
        document.getElementById('submit').click();
    } else {
        timeLeft--;
    }
}

// Cập nhật timer mỗi giây
const timerInterval = setInterval(updateTimer, 1000);

function createAnswerGrid(numberOfQuestions) {
    const answerGrid = document.getElementById('answer-grid');
    for (let i = 1; i <= numberOfQuestions; i++) {
        const answerItem = document.createElement('div');
        answerItem.className = 'answer-item';

        const questionNumber = document.createElement('div');
        questionNumber.className = 'question-number';
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

function calculateScore() {
    const examId = new URLSearchParams(window.location.search).get('de') || 'de1';
    const correctAnswers = getAnswerKey(examId);
    let correctCount = 0;
    const answers = {};
    const wrongAnswers = [];

    document.querySelectorAll('.answer-item').forEach((item, index) => {
        const questionNum = index + 1;
        const selectedButton = item.querySelector('.option-btn.selected');
        if (selectedButton) {
            answers[questionNum] = selectedButton.textContent;
            if (answers[questionNum] === correctAnswers[questionNum]) {
                correctCount++;
            } else {
                wrongAnswers.push({
                    question: questionNum,
                    selected: answers[questionNum],
                    correct: correctAnswers[questionNum]
                });
            }
        }
    });

    // Tính điểm (mỗi câu 10 điểm)
    const score = correctCount * 10;

    return {
        correctCount: correctCount,
        total: 120,
        score: score,
        maxScore: 1200,
        percentage: ((score / 1200) * 100).toFixed(2),
        wrongAnswers: wrongAnswers
    };
}

// Thêm HTML cho modal kết quả
document.body.insertAdjacentHTML('beforeend', `
    <div id="confirmModal" class="modal" style="display: none;">
        <div class="modal-content">
            <h2>Xác nhận nộp bài</h2>
            <p>Bạn có chắc chắn muốn nộp bài?</p>
            <div class="modal-buttons">
                <button id="confirmSubmit">Nộp bài</button>
                <button id="cancelSubmit">Làm tiếp</button>
            </div>
        </div>
    </div>

    <div id="resultModal" class="modal" style="display: none;">
        <div class="modal-content">
            <h2>Kết quả bài làm</h2>
            <div id="resultContent"></div>
            <div class="modal-buttons">
                <button id="reviewBtn">Xem lại bài làm</button>
                <button id="retryBtn">Làm lại</button>
                <button id="solutionBtn">Lời giải chi tiết</button>
            </div>
        </div>
    </div>
`);

// Thêm CSS cho modal
const style = document.createElement('style');
style.textContent = `
    .modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    }

    .modal-content {
        background-color: white;
        padding: 20px;
        border-radius: 8px;
        max-width: 500px;
        width: 90%;
        text-align: center;
    }

    .modal-buttons {
        display: flex;
        justify-content: center;
        gap: 10px;
        margin-top: 20px;
    }

    .modal-buttons button {
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        background-color: #4CAF50;
        color: white;
    }

    .modal-buttons button:hover {
        background-color: #45a049;
    }
`;
document.head.appendChild(style);

// Cập nhật xử lý nút nộp bài
document.getElementById('submit').addEventListener('click', () => {
    document.getElementById('confirmModal').style.display = 'flex';
});

// Xử lý xác nhận nộp bài
document.getElementById('confirmSubmit').addEventListener('click', () => {
    const result = calculateScore();
    document.getElementById('confirmModal').style.display = 'none';
    clearInterval(timerInterval);

    // Hiển thị kết quả
    const resultContent = document.getElementById('resultContent');
    resultContent.innerHTML = `
        <p>Số câu đúng: ${result.correctCount}/${result.total}</p>
        <p>Điểm: ${result.score}/1200 (${result.percentage}%)</p>
    `;
    document.getElementById('resultModal').style.display = 'flex';
});

// Xử lý hủy nộp bài
document.getElementById('cancelSubmit').addEventListener('click', () => {
    document.getElementById('confirmModal').style.display = 'none';
});

// Xử lý nút xem lại bài làm
document.getElementById('reviewBtn').addEventListener('click', () => {
    document.getElementById('resultModal').style.display = 'none';
    // Hiển thị bài làm với đáp án đúng/sai được đánh dấu
    reviewAnswers();
});

// Xử lý nút làm lại
document.getElementById('retryBtn').addEventListener('click', () => {
    if (confirm('Bạn có chắc chắn muốn làm lại? Mọi câu trả lời sẽ bị xóa.')) {
        location.reload();
    }
});

// Xử lý nút xem lời giải
document.getElementById('solutionBtn').addEventListener('click', () => {
    // Mở trang lời giải chi tiết trong tab mới
    window.open('solutions.html', '_blank');
});

function reviewAnswers() {
    const examId = new URLSearchParams(window.location.search).get('de') || 'de1';
    const correctAnswers = getAnswerKey(examId);

    document.querySelectorAll('.answer-item').forEach((item, index) => {
        const questionNum = index + 1;
        const selectedButton = item.querySelector('.option-btn.selected');

        // Xử lý các nút đáp án
        item.querySelectorAll('.option-btn').forEach(btn => {
            if (selectedButton) {
                // Trường hợp đã chọn đáp án
                const userAnswer = selectedButton.textContent;
                if (btn === selectedButton) {
                    // Đánh dấu đáp án đã chọn
                    btn.style.backgroundColor = userAnswer === correctAnswers[questionNum] ? '#4CAF50' : '#f44336';
                    btn.style.color = 'white';
                } else if (btn.textContent === correctAnswers[questionNum] && userAnswer !== correctAnswers[questionNum]) {
                    // Đánh dấu đáp án đúng nếu chọn sai
                    btn.style.backgroundColor = '#4CAF50';
                    btn.style.color = 'white';
                    btn.style.opacity = '0.5';
                }
            } else {
                // Trường hợp chưa chọn đáp án
                if (btn.textContent === correctAnswers[questionNum]) {
                    // Đánh dấu đáp án đúng bằng màu vàng
                    btn.style.backgroundColor = '#FFC107'; // Màu vàng
                    btn.style.color = 'black';
                    btn.style.fontWeight = 'bold';
                }
            }
        });
    });

    // Thêm nút xem lời giải ở cuối
    const solutionContainer = document.createElement('div');
    solutionContainer.className = 'solution-container';
    solutionContainer.innerHTML = `
        <button id="viewSolution" class="solution-btn">Xem lời giải chi tiết</button>
    `;
    document.getElementById('answer-grid').after(solutionContainer);

    // Thêm CSS cho nút xem lời giải
    const style = document.createElement('style');
    style.textContent = `
        .solution-container {
            text-align: center;
            margin-top: 20px;
            padding: 10px;
        }
        
        .solution-btn {
            padding: 10px 20px;
            font-size: 14px;
            background-color: #2196F3;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s;
        }
        
        .solution-btn:hover {
            background-color: #1976D2;
        }
        
        .option-btn.selected {
            font-weight: bold;
        }
    `;
    document.head.appendChild(style);

    document.getElementById('viewSolution').addEventListener('click', () => {
        window.open('solutions.html', '_blank');
    });

    document.getElementById('submit').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
    createAnswerGrid(120);
    updateTimer();
});
function showModal(message, confirmCallback) {
    document.getElementById('modal-message').textContent = message;
    document.getElementById('notification-modal').style.display = 'flex';
    window.currentConfirmCallback = confirmCallback;
}

function closeModal() {
    document.getElementById('notification-modal').style.display = 'none';
}

function confirmAction() {
    if (window.currentConfirmCallback) {
        window.currentConfirmCallback();
    }
    closeModal();
}
