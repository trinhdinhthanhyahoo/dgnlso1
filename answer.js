// Khởi tạo bộ đếm thời gian
let timeLeft = 150 * 60; // 150 phút * 60 giây

// Kiểm tra lại đáp án đúng
const correctAnswers = {
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
};

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
    // Tạo 4 cột cho grid
    answerGrid.style.gridTemplateColumns = 'repeat(4, 1fr)';

    for (let i = 1; i <= numberOfQuestions; i++) {
        const answerItem = document.createElement('div');
        answerItem.className = 'answer-item';

        const questionNumber = document.createElement('div');
        questionNumber.textContent = `Câu ${i}`;
        questionNumber.style.fontSize = '12px';
        questionNumber.style.color = '#666666'; // Màu chữ nhạt hơn
        questionNumber.style.fontWeight = '400'; // Font mỏng hơn

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
    let correctCount = 0;
    const answers = {};
    const wrongAnswers = [];

    // Thu thập các câu trả lời và kiểm tra
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
    document.querySelectorAll('.answer-item').forEach((item, index) => {
        const questionNum = index + 1;
        const selectedButton = item.querySelector('.option-btn.selected');
        const correctAnswer = correctAnswers[questionNum];

        // Xử lý các nút đáp án
        item.querySelectorAll('.option-btn').forEach(btn => {
            if (selectedButton) {
                // Trường hợp đã chọn đáp án
                const userAnswer = selectedButton.textContent;
                if (btn === selectedButton) {
                    // Đánh dấu đáp án đã chọn
                    btn.style.backgroundColor = userAnswer === correctAnswer ? '#4CAF50' : '#f44336';
                    btn.style.color = 'white';
                } else if (btn.textContent === correctAnswer && userAnswer !== correctAnswer) {
                    // Đánh dấu đáp án đúng nếu chọn sai
                    btn.style.backgroundColor = '#4CAF50';
                    btn.style.color = 'white';
                    btn.style.opacity = '0.5';
                }
            } else {
                // Trường hợp chưa chọn đáp án
                if (btn.textContent === correctAnswer) {
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

    // Thêm sự kiện click cho nút xem lời giải
    document.getElementById('viewSolution').addEventListener('click', () => {
        window.open('solutions.html', '_blank');
    });

    // Ẩn nút nộp bài
    document.getElementById('submit').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
    createAnswerGrid(120);
    updateTimer();
}); 