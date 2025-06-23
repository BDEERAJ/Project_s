function loader() {
  const top = window.localStorage.getItem('topic');
  console.log(top);

  fetch(`https://quiz-web-ujwh.onrender.com/${top}`, {
    method: "GET",
    headers: {
      'content-type': "application/json"
    }
  }).then((e) => {
    return e.json();
  }).then((e) => {
    const context = e.content;
    const link = e.url;
    document.querySelector('.info').innerHTML = `${context}`;
    document.querySelector('.Quiz_begin_main_img').style.backgroundImage = `url('${link}')`;

    document.getElementById("loader").style.display = "none";
    document.querySelector(".Quiz_begin_page").style.display = "block";
  }).catch((e) => {
    document.querySelector('.info').innerHTML = `Error`;
    document.getElementById("loader").innerText = "Failed to load.";
  });
}

 loader();
function timerStr(){
    document.querySelector(".timerstr").classList.remove("Quiz_begin_page_hidder");
    let ab=setInterval(() => {
    let a=document.querySelector(".timerstr1").textContent;
    let b=parseInt(a);
    b++;
    if(b==4){
        clearInterval(ab);
        b=0;
       document.querySelector(".timerstr").classList.add("Quiz_begin_page_hidder");
        window.location.href='../QuizMainPage/Quiz_qns.html';
    }
    document.querySelector(".timerstr1").innerHTML=`${b}`
    }, 700);
    }

    if(window.localStorage.getItem('darkmode')=='on'){
const style = document.createElement('style');
style.innerHTML = `
  * {
    background-color: rgb(12, 12, 12) !important;
    color: white !important;
    border-color:#362e30 !important;
    box-shadow: 0px 0px 0px 0px black !important;
  }
`;
document.head.insertAdjacentElement('beforeend', style);
}