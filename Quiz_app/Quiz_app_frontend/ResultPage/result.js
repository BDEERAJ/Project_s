
document.querySelector('.points').innerHTML=`${(window.localStorage.getItem('points')==null)?'0':window.localStorage.getItem('points')}`;
try{
    fetch('https://quiz-web-ujwh.onrender.com/result/points',{
  method:'PUT',
  headers:{
    'content-type':'application/json'
  },
  body:JSON.stringify({
    email:window.localStorage.getItem('email'),
    tot:window.localStorage.getItem('totalqns'),
    crt:window.localStorage.getItem('totalcrt')
  })
    })
}
catch{
  console.log('server error');
}
if(window.localStorage.getItem('darkmode')=='on'){
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
