
function menuHider(){
document.querySelector('.menu_list').classList.toggle('activate');
}
let token=window.localStorage.getItem('token')
if(token){
    try{
        fetch('https://quiz-web-ujwh.onrender.com/api/profile',{
            method:'GET',
            headers:{
            'content-type':'application/json',
             'authorization':token
            }
        }).then(e=>e.json()).then(e=>{  
            document.querySelector('.name').innerHTML=`${e.username}`;
                window.localStorage.setItem('email',e.email);
               if(e.correct!=0){
            window.localStorage.setItem('totalqns',e.total);
           window.localStorage.setItem('totalcrt',e.correct);
           document.querySelector('.totalqns').innerHTML=`${e.total}` ;
          document.querySelector('.totalqnscrt').innerHTML=`${e.correct}`;
          document.querySelector('.totalqnswarg').innerHTML=`${(e.correct==0)?0:Math.floor(((e.correct*100)/e.total))}%`
               }
            }
    )}
    catch{
        alert('server error')
    }
}
function infoFetcher(topic){
        window.localStorage.setItem("topic",topic)
        console.log(window.localStorage.getItem('topic'));
        window.location.href='../QuizBeginPage/Quiz_entry_page.html'
      }   
if(window.localStorage.getItem('totalcrt')==null){
    window.localStorage.setItem('totalqns','0');
    window.localStorage.setItem('totalcrt','0');
}
else{
    let tq=parseInt(window.localStorage.getItem('totalqns'));
    let tc=parseInt(window.localStorage.getItem('totalcrt'));
    document.querySelector('.totalqns').innerHTML=`${tq}` ;
    document.querySelector('.totalqnscrt').innerHTML=`${tc}`;
    document.querySelector('.totalqnswarg').innerHTML=`${(tc==0)?0:Math.floor(((tc*100)/tq))}%`
}
function logout(){
    
    document.querySelector('.totalqns').innerHTML=`0` ;
    document.querySelector('.totalqnscrt').innerHTML=`0`;
    document.querySelector('.totalqnswarg').innerHTML=`0`
    localStorage.clear();
    alert('Logged out successfully')
    window.location.reload();
}
function darkmodeToggle(){
     window.localStorage.setItem('darkmode','on');
const style = document.createElement('style');
style.innerHTML = `
  * {
    background-color: rgb(12, 12, 12) !important;
    color: white !important;
    border-color: orange !important;
    box-shadow: 0px 0px 0px 0px black !important;
  }
`;
document.head.insertAdjacentElement('beforeend', style);
}
if(window.localStorage.getItem('darkmode')=='on'){
      darkmodeToggle();
    }
function darkmode(){
    if(window.localStorage.getItem('darkmode')=='on'){
        window.localStorage.setItem('darkmode','off');
       document.getElementsByTagName('style')[0].remove();
        style.remove();
        return;
    }
    darkmodeToggle();
   
}