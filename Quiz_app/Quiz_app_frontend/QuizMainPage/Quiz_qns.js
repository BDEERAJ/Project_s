let question=[];
let answer=[];
let attemptedqns=0;
let totpoints=0;
function selans(s){
    document.querySelector(".selansbox").innerHTML=`${s}`;
}
document.querySelectorAll(".ans").forEach(e=>{
    e.addEventListener("click",()=>{
  selans(`${e.textContent}`)
})});
const topic=window.localStorage.getItem('topic');
console.log(topic);
setTimeout(async () => {
    await fetch(`https://quiz-web-ujwh.onrender.com/quiz/${topic}Questions`,
        {method:'GET',
             headers:{
            'content-type':'application/json'
        },
        }).then((e)=>{
        return e.json();
    }).then((e)=>{
        e.forEach((ele)=>{
         question.push(ele.question);
         answer.push(ele.answer)
        })
        updater()
    }).catch((e)=>{
    })
}, 0);
function exiter(a = 0) {
    window.localStorage.setItem('points', totpoints);

    // Parse the stored values and handle NaN properly
    let storedTotalQns = parseInt(window.localStorage.getItem('totalqns'));
    let storedTotalCrt = parseInt(window.localStorage.getItem('totalcrt'));

    if (isNaN(storedTotalQns)) {
        storedTotalQns = 0;
    }
    if (isNaN(storedTotalCrt)) {
        storedTotalCrt = 0;
    }

    let tpt = storedTotalQns + attemptedqns;
    let totcrt = storedTotalCrt + totpoints;

    window.localStorage.setItem('totalqns', tpt);
    window.localStorage.setItem('totalcrt', totcrt);

    console.log(window.localStorage.getItem('totalqns') + " / " + window.localStorage.getItem('totalcrt'));

    if (a == 1) {
        window.location.href = '../TopicSelectionPage/startPage1.html';
    } else {
        window.location.href = '../ResultPage/result.html';
    }

    alert('stop the game');
}

const timer=()=>{
    let s=0
    let m=15;
    let itvl=setInterval(() => {
        if(m==0 && s<=0){
exiter();
      }
        if(s<0){
            m--;
            s=59;
           }
        let sec=s;
        let min=m;
        (s<10)?sec='0'+s:sec=s;
        (m<10)?min='0'+m:min=m;
      document.querySelector(".time").innerHTML=`${min}:${sec}`
        s--;
    }, 1000);
}
timer();

let currentanswer;
let currentquestion;
function submit(){
    let helper=document.querySelector(".selansbox").textContent;;
    if(helper==currentanswer){
     totpoints++;
    }
    updater();
}

function updater(){
    console.log(attemptedqns);
    if(attemptedqns>=10){
exiter();
    }
    let questionNumber=Math.floor((Math.random()*29)+1);
    let answerArray=[];
    currentquestion=question[questionNumber];
    currentanswer=answer[questionNumber];
    answerArray.push(answer[questionNumber]);
    let num=0;
    while(answerArray.length<4){
    let arrayans=Math.floor((Math.random()*25)+1)
     answerArray.push(answer[arrayans])
    }
    document.querySelector('#question').innerHTML=`${currentquestion}`;
    document.querySelectorAll('.ans').forEach((e)=>{        
        e.innerHTML=`${answerArray[num++]}`;
    },num)
    document.querySelector(".selansbox").innerHTML=`Selected Answer`;
    attemptedqns++;
}