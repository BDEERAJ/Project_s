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
    
    // 1. Force strict integer math (Base 10) on the frontend
    let storedTotalQns = parseInt(window.localStorage.getItem('totalqns'), 10) || 0;
    let storedTotalCrt = parseInt(window.localStorage.getItem('totalcrt'), 10) || 0;

    const newTotalQns = storedTotalQns + attemptedqns;
    const newTotalCrt = storedTotalCrt + totpoints;

    // Save points for the Result page to display
    window.localStorage.setItem('points', totpoints);
    window.localStorage.setItem('totalqns', newTotalQns);
    window.localStorage.setItem('totalcrt', newTotalCrt);
    
    const token = window.localStorage.getItem('token');
    const email = window.localStorage.getItem('email');

    const redirectUser = () => {
        if (manual === 1) {
            window.location.href = '../TopicSelectionPage/startPage1.html';
        } else {
            window.location.href = '../ResultPage/result.html';
        }
    };

    if (token && email && manual === 1) {
        fetch('https://quiz-web-ujwh.onrender.com/result/points', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'authorization': token
            },
            body: JSON.stringify({
                email: email,
                tot: Number(newTotalQns),   
                crt: Number(newTotalCrt)
            })
        }).then(() => {
            redirectUser();
        }).catch(() => {
            redirectUser();
        });
    } else {
        redirectUser();
    }
}
function timer() {
    let duration = 15 * 60;
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
    attemptedqns++;
    
    // 1. Grab the exact text the user selected
    const selected = document.querySelector(".selansbox").textContent.trim();
    
    // 2. Create a temporary invisible element to decode the actual answer
    const decoder = document.createElement('div');
    decoder.innerHTML = currentanswer; 
    const formattedAnswer = decoder.textContent.trim();

    // 3. Compare them! Now they are both perfectly formatted strings.
    if (selected === formattedAnswer) {
        totpoints++;
    }
    
    updater();
}
function updater() {
    if (attemptedqns >= 10 || attemptedqns >= question.length) {
        exiter();
        return;
    }
    
    const incorrectIndices = new Set();
    while (incorrectIndices.size < 3) {
        const randomIndex = Math.floor(Math.random() * answer.length);
        if (answer[randomIndex] !== answer[attemptedqns]) { 
            incorrectIndices.add(randomIndex);
        }
    }

    const options = [answer[attemptedqns], ...Array.from(incorrectIndices).map(i => answer[i])];
    
    for (let i = options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [options[i], options[j]] = [options[j], options[i]];
    }

    currentquestion = question[attemptedqns];
    currentanswer = answer[attemptedqns];

    document.querySelector('#question').innerHTML = currentquestion;
    const ansElements = document.querySelectorAll('.ans');
    ansElements.forEach((el, index) => {
        el.innerHTML = options[index];
        el.classList.remove('selected');
    });

    document.querySelector(".selansbox").innerHTML = "None";
}
fetchQuestions();
timer();

document.querySelectorAll(".ans").forEach(e => {
    e.addEventListener("click", () => {
        selans(e.textContent, e);
    });
});

document.getElementById("submit").addEventListener('click', submit);

document.getElementById("skip").addEventListener('click', () => {
    attemptedqns++;
    updater();
});

document.getElementById("exit").addEventListener('click', () => exiter(1));
document.querySelector(".more_info").addEventListener('click', () => {
    window.location.href = '../MoreInfoPage/moreinfo.html';
});