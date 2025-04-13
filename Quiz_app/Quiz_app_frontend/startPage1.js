if(window.localStorage.getItem('totalcrt')==0){
    window.localStorage.setItem('totalqns',0);
    window.localStorage.setItem('totalcrt',0);
}
else{
    let tq=parseInt(window.localStorage.getItem('totalqns'));
    let tc=parseInt(window.localStorage.getItem('totalcrt'));
    document.querySelector('.totalqns').innerHTML=`${tq}` ;
    document.querySelector('.totalqnscrt').innerHTML=`${tc}`;
    document.querySelector('.totalqnswarg').innerHTML=`${(tc==0)?0:Math.floor(((tc*100)/tq))}%`
}

function menuHider(){
document.querySelector('.menu_list').classList.toggle('activate');
}
function infoFetcher(topic){
        window.localStorage.setItem("topic",topic)
        console.log(window.localStorage.getItem('topic'));
        window.location.href='Quiz_entry_page.html'
       }


