function data() {
    const preloader = document.getElementById('preloader');
    const main = document.querySelector('.main');
    const content = document.querySelector('#content');
    
    let topic = window.localStorage.getItem('topic');
    if (!topic) {
        topic = 'technology';
    }
    
    document.querySelector('.header').innerHTML = `Topic: ${topic}`;

    fetch(`https://quiz-web-ujwh.onrender.com/content:${topic}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        if (data.content) {
            content.innerHTML = data.content;
        } else {
            content.innerHTML = "No content found for this topic.";
        }
        preloader.style.display = 'none';
        main.style.display = 'flex';
    })
    .catch(error => {
        content.innerHTML = "Failed to load content. Please check your connection and try again.";
        console.error('Fetch error:', error);
        preloader.style.display = 'none';
        main.style.display = 'flex';
    });
}

document.querySelector('.back').addEventListener('click', () => {
    window.location.href = '../QuizMainPage/Quiz_qns.html';
});

data();