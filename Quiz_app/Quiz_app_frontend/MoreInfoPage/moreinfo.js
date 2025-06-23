  let topic = window.localStorage.getItem('topic');
  if (!topic) {
    topic='technology'
  }
   
   document.querySelector('.header').innerHTML=`Topic :${topic}`;
  function data() {
    fetch(`https://quiz-web-ujwh.onrender.com/content:${topic}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    })
    .then((e) => e.json())
    .then((e) => {
      if (e.content) {
        document.querySelector('#content').innerHTML = e.content;
      } else {
        document.querySelector('#content').innerHTML = "No content found.";
      }
    })
    .catch(err => {
      document.querySelector('#content').innerHTML = "Failed to load content.";
      console.error(err);
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    data();
  });
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