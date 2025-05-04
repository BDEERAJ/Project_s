
document.querySelector('.points').innerHTML=`${(window.localStorage.getItem('points')==null)?'0':window.localStorage.getItem('points')}`;
