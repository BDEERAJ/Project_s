const a = document.querySelector(".menu");
const panel = document.querySelector(".info");
const main = document.querySelector(".main");

const infoback = document.querySelector(".info button");
const links = document.querySelectorAll(".info .ol li");
const play = links[0];
const info = links[1];

const aboutpage = document.querySelector(".information.about");
const rulespage = document.querySelector(".information.rules");

const aboutback = aboutpage.querySelector("button");
const rulesback = rulespage.querySelector("button");


a.addEventListener('click', (e) => {
    e.stopPropagation();
    panel.classList.add("info_class");
});

function hide_menu() {
    panel.classList.remove("info_class");
}

function menuhides() {
    main.addEventListener('click', () => {
        let open = panel.classList.contains("info_class");
        if (open) {
            hide_menu();
        }
    });
}

function pageChanger(from, to) {
    const fromEl = document.querySelector(`.${from}`);
    const toEl = document.querySelector(`.${to}`);

    if (fromEl && toEl) {
        fromEl.classList.remove("active");
        fromEl.classList.add("inactive");
        toEl.classList.remove("inactive");
        toEl.classList.add("active");
    }
}

infoback.addEventListener('click', hide_menu);

play.addEventListener('click', () => {
    pageChanger('main', 'rules');
    hide_menu();
});

info.addEventListener('click', () => {
    pageChanger('main', 'about');
    hide_menu();
});

aboutback.addEventListener('click', () => {
    pageChanger('about', 'main');
});

rulesback.addEventListener('click', () => {
    pageChanger('rules', 'main');
});

menuhides();