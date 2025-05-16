  let topic = window.localStorage.getItem('topic');
  if (!topic) {
    topic='technology'
  }
   
   document.querySelector('.header').innerHTML=`${topic}:`;
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
