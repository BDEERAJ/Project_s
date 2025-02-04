const a = document.querySelector(".menu");
a.addEventListener('click', (e) => {
    e.stopPropagation();
    document.querySelector(".info").classList.add("info_class");
})
function hide_menu() {
    document.querySelector(".info").classList.remove("info_class");
}
function menuhides() {
    document.querySelector(".main").addEventListener('click', () => {
        let a = document.querySelector(".info").classList.contains("info_class");
        if (a) {
            document.querySelector(".info").classList.remove("info_class");
        }
    })

}
function pageChanger(attribute_from,attribute_to){
    document.querySelector(`.${attribute_from}`).classList.remove("active");
    document.querySelector(`.${attribute_from}`).classList.add("inactive");
    document.querySelector(`.${attribute_to}`).classList.remove("inactive");
    document.querySelector(`.${attribute_to}`).classList.add("active");
}
