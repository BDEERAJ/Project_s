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
    }
    document.querySelector(".timerstr1").innerHTML=`${b}`
    }, 700);
    }
    