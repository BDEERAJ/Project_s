let question = [];
let answer = [];
let attemptedqns = 0;
let totpoints = 0;
let currentanswer;
let timerInterval;

function selans(selectedText, selectedElement) {
    document.querySelector(".selansbox").innerHTML = selectedText;
    document.querySelectorAll(".ans").forEach(el => el.classList.remove('selected'));
    selectedElement.classList.add('selected');
}

function fetchQuestions() {
    const topic = window.localStorage.getItem('topic');
    const loader = document.getElementById('loader');
    
    if (!topic) {
        document.getElementById('question').textContent = "No topic found. Please go back.";
        loader.style.display = "none";
        return;
    }

    fetch(`https://quiz-web-ujwh.onrender.com/quiz/${topic}Questions`)
        .then(response => {
            if (!response.ok) throw new Error('Network error');
            return response.json();
        })
        .then(data => {
            if (data.length === 0) throw new Error('No questions found for this topic.');
            data.forEach(item => {
                question.push(item.question);
                answer.push(item.answer);
            });
            updater();
            loader.style.display = 'none';
        })
        .catch(error => {
            console.error(error);
            document.getElementById('question').textContent = "Failed to load questions. Please try again.";
            loader.innerHTML = "<h2>Error</h2>";
        });
}

function exiter(manual = 0) {
    clearInterval(timerInterval);
    window.localStorage.setItem('points', totpoints);

    let storedTotalQns = parseInt(window.localStorage.getItem('totalqns')) || 0;
    let storedTotalCrt = parseInt(window.localStorage.getItem('totalcrt')) || 0;

    window.localStorage.setItem('totalqns', storedTotalQns + attemptedqns);
    window.localStorage.setItem('totalcrt', storedTotalCrt + totpoints);

    if (manual === 1) {
        window.location.href = '../TopicSelectionPage/startPage1.html';
    } else {
        window.location.href = '../ResultPage/result.html';
    }
}

function timer() {
    let duration = 15 * 60; // 15 minutes in seconds
    const timerDisplay = document.querySelector(".time");

    timerInterval = setInterval(() => {
        if (duration <= 0) {
            clearInterval(timerInterval);
            exiter();
        }

        let minutes = Math.floor(duration / 60);
        let seconds = duration % 60;

        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;

        timerDisplay.innerHTML = `${minutes}:${seconds}`;
        duration--;
    }, 1000);
}

function submit() {
    const selected = document.querySelector(".selansbox").textContent;
    if (selected === currentanswer) {
        totpoints++;
    }
    updater();
}

function updater() {
    if (attemptedqns >= 10 || question.length === 0) {
        exiter();
        return;
    }

    attemptedqns++;
    
    // Create a set of unique random indices for incorrect answers
    const incorrectIndices = new Set();
    while (incorrectIndices.size < 3) {
        const randomIndex = Math.floor(Math.random() * answer.length);
        if (answer[randomIndex] !== answer[question.length - 1]) { // Ensure not the correct answer
            incorrectIndices.add(randomIndex);
        }
    }

    const options = [answer[question.length - 1], ...Array.from(incorrectIndices).map(i => answer[i])];
    
    // Shuffle the options array
    for (let i = options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [options[i], options[j]] = [options[j], options[i]];
    }

    currentquestion = question.pop();
    currentanswer = answer.pop();

    document.querySelector('#question').innerHTML = currentquestion;
    const ansElements = document.querySelectorAll('.ans');
    ansElements.forEach((el, index) => {
        el.innerHTML = options[index];
        el.classList.remove('selected');
    });

    document.querySelector(".selansbox").innerHTML = "None";
}

// --- Initialize Page ---
fetchQuestions();
timer();

// --- Event Listeners ---
document.querySelectorAll(".ans").forEach(e => {
    e.addEventListener("click", () => {
        selans(e.textContent, e);
    });
});

document.getElementById("submit").addEventListener('click', submit);
document.getElementById("skip").addEventListener('click', updater);
document.getElementById("exit").addEventListener('click', () => exiter(1));
document.querySelector(".more_info").addEventListener('click', () => {
    window.location.href = '../MoreInfoPage/moreinfo.html';
});