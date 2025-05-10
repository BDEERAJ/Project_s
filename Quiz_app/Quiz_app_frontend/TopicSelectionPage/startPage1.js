if (window.localStorage.getItem('totalcrt') == 0) {
    window.localStorage.setItem('totalqns', 0);
    window.localStorage.setItem('totalcrt', 0);
} else {
    let tq = parseInt(window.localStorage.getItem('totalqns'));
    let tc = parseInt(window.localStorage.getItem('totalcrt'));

    let percentage = (tq == 0) ? 0 : Math.floor((tc * 100) / tq);

    document.querySelector('.totalqns').innerHTML =(tq!=NaN)?`${tq}`:'0';
    document.querySelector('.totalqnscrt').innerHTML = (tc!==NaN)?`${tc}`:'0';
    document.querySelector('.totalqnswarg').innerHTML = (percentage!=NaN)?`${percentage}%`:'0';
}

function menuHider() {
    document.querySelector('.menu_list').classList.toggle('activate');
}

function infoFetcher(topic) {
    window.localStorage.setItem("topic", topic);
    window.location.href = '../QuizBeginPage/Quiz_entry_page.html';
}
