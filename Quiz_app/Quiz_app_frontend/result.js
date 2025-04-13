
document.querySelector('.points').innerHTML=`${(window.localStorage.getItem('points')==null)?'0':window.localStorage.getItem('points')}`;
console.log(window.localStorage.getItem('points'));
console.log(window.localStorage.getItem('total'));
