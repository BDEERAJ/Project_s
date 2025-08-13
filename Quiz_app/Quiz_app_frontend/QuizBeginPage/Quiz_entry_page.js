function loader() {
    const topic = window.localStorage.getItem('topic');
    const infoElement = document.querySelector('.info');
    const loaderElement = document.getElementById("loader");

    if (!topic) {
        infoElement.innerHTML = 'No topic selected. Please go back and choose a topic.';
        loaderElement.innerHTML = 'Error';
        return;
    }

    fetch(`https://quiz-web-ujwh.onrender.com/${topic}`, {
        method: "GET",
        headers: {
            'content-type': "application/json"
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        infoElement.innerHTML = data.content;
        document.querySelector('.Quiz_begin_main_img').style.backgroundImage = `url('${data.url}')`;

        loaderElement.style.display = "none";
        document.querySelector(".Quiz_begin_page").style.display = "flex";
    })
    .catch(error => {
        console.error('Fetch error:', error);
        infoElement.innerHTML = `Error loading quiz content. Please try again.`;
        loaderElement.innerText = "Failed to load.";
    });
}

function timerStr() {
    const timerOverlay = document.querySelector(".timerstr");
    const timerText = document.querySelector(".timerstr1");
    timerOverlay.classList.remove("Quiz_begin_page_hidder");

    let count = 3;
    timerText.textContent = count;

    const countdown = setInterval(() => {
        count--;
        if (count > 0) {
            timerText.textContent = count;
        } else {
            timerText.textContent = "GO!";
            clearInterval(countdown);
            setTimeout(() => {
                window.location.href = '../QuizMainPage/Quiz_qns.html';
            }, 500);
        }
    }, 1000);
}

// Initial call to load data
loader();

// Event Listeners
document.querySelector(".Quiz_begin_start").addEventListener('click', timerStr);

document.querySelector(".Quiz_begin_back").addEventListener('click', () => {
    window.location.href = '../TopicSelectionPage/startPage1.html';
});