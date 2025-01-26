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

document.addEventListener('DOMContentLoaded', () => {
    createAnswerGrid(40); // Điều chỉnh số câu hỏi tại đây
}); 