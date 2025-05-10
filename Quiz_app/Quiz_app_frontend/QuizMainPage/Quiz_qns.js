let question = [];
let answer = [];
let attemptedqns = 0;
let totpoints = 0;

function selans(s) {
    document.querySelector(".selansbox").innerHTML = `${s}`;
}

document.querySelectorAll(".ans").forEach(e => {
    e.addEventListener("click", () => {
        selans(e.textContent);
    });
});

const topic = window.localStorage.getItem('topic');

setTimeout(async () => {
    await fetch(`http://localhost:3000/quiz/${topic}Questions`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json'
        },
    }).then((e) => {
        return e.json();
    }).then((e) => {
        e.forEach((ele) => {
            question.push(ele.question);
            answer.push(ele.answer);
        });
        updater();
    }).catch((e) => {
        // Handle any errors here (e.g., logging or user notification)
    });
}, 0);

function exiter(a = 0) {
    window.localStorage.setItem('points', totpoints);
    let tpt = parseInt(window.localStorage.getItem('totalqns')) + attemptedqns;
    let totcrt = parseInt(window.localStorage.getItem('totalcrt')) + totpoints;
    window.localStorage.setItem('totalqns', tpt);
    window.localStorage.setItem('totalcrt', totcrt);
    if (a == 1) {
        window.location.href = '../TopicSelectionPage/startPage1.html';
    } else {
        window.location.href = '../ResultPage/result.html';
    }
    alert('stop the game');
}

const timer = () => {
    let s = 0;
    let m = 15;
    let itvl = setInterval(() => {
        if (m == 0 && s <= 0) {
            exiter();
        }
        if (s < 0) {
            m--;
            s = 59;
        }
        let sec = s;
        let min = m;
        if (s < 10) sec = '0' + s;
        if (m < 10) min = '0' + m;
        document.querySelector(".time").innerHTML = `${min}:${sec}`;
        s--;
    }, 1000);
};

timer();

let currentanswer;
let currentquestion;

function submit() {
    let helper = document.querySelector(".selansbox").textContent;
    if (helper == currentanswer) {
        totpoints++;
    }
    updater();
}

function updater() {
    console.log(attemptedqns);
    if (attemptedqns >= 10) {
        exiter();
    }
    let questionNumber = Math.floor((Math.random() * 30) + 1);
    let answerArray = [];
    currentquestion = question[questionNumber];
    currentanswer = answer[questionNumber];
    answerArray.push(answer[questionNumber]);

    let num = 0;
    while (answerArray.length < 4) {
        let arrayans = Math.floor((Math.random() * 25) + 1);
        answerArray.push(answer[arrayans]);
    }

    document.querySelector('#question').textContent = `${currentquestion}`;
    document.querySelectorAll('.ans').forEach((e, index) => {
        e.innerHTML = `${answerArray[index]}`;
    });

    document.querySelector(".selansbox").textContent = "Choose One";
    attemptedqns++;
}
