function menuHider() {
    document.querySelector('.menu_list').classList.toggle('activate');
}

function infoFetcher(topic) {
    window.localStorage.setItem("topic", topic);
    window.location.href = '../QuizBeginPage/Quiz_entry_page.html';
}

function logout() {
    localStorage.clear();
    alert('Logged out successfully');
    window.location.reload();
}

// --- Main script execution starts here ---

const token = window.localStorage.getItem('token');

if (token) {
    try {
        fetch('https://quiz-web-ujwh.onrender.com/api/profile', {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'authorization': token
            }
        }).then(res => res.json()).then(data => {
            if (data.username) {
                console.log('User data retrieved:', data);
                document.querySelector('.name').innerHTML = data.username;
                window.localStorage.setItem('email', data.email);
                window.localStorage.setItem('totalqns', data.total);
                window.localStorage.setItem('totalcrt', data.correct);
                
                document.querySelector('.totalqns').innerHTML = data.total;
                document.querySelector('.totalqnscrt').innerHTML = data.correct;
                const percentage = (data.total === 0) ? 0 : Math.floor((data.correct * 100) / data.total);
                document.querySelector('.totalqnswarg').innerHTML = `${percentage}%`;
            }
        });
    } catch (error) {

        console.error('Server error:', error);
    }
} else {
    const totalqns = window.localStorage.getItem('totalqns') || '0';
    const totalcrt = window.localStorage.getItem('totalcrt') || '0';
    const tq = parseInt(totalqns);
    const tc = parseInt(totalcrt);

    document.querySelector('.totalqns').innerHTML = tq;
    document.querySelector('.totalqnscrt').innerHTML = tc;
    const percentage = (tq === 0) ? 0 : Math.floor((tc * 100) / tq);
    document.querySelector('.totalqnswarg').innerHTML = `${percentage}%`;
}


// --- Event Listeners for Page Interactivity ---

// Preloader Logic
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    const mainContent = document.getElementById('main');
    preloader.style.display = 'none';
    mainContent.style.visibility = 'visible';
});

// Menu Toggle Listeners
document.querySelector('.menu').addEventListener('click', menuHider);
document.querySelector('.menu_closer').addEventListener('click', menuHider);

// Menu Navigation Listeners
const menuLinks = document.querySelector('.menu_list ul');
menuLinks.addEventListener('click', (event) => {
    const targetText = event.target.innerText;
    if (targetText === 'Home') window.location.href = '../index.html';
    if (targetText === 'Topics') {
        document.getElementById('topicspage').scrollIntoView({ behavior: 'smooth' });
        menuHider();
    }
    if (targetText === 'Login') window.location.href = '../authentication/login.html';
    if (targetText === 'Sign In') window.location.href = '../authentication/sign-in.html';
    if (targetText === 'Feedback') window.location.href = '../FeedbackPage/feedback.html';
    if (targetText === 'Logout') logout();
});

// Topic Card Listeners
const allTopics = document.querySelectorAll('.topics');
allTopics.forEach(topicCard => {
    topicCard.addEventListener('click', () => {
        const topicName = topicCard.dataset.topic;
        infoFetcher(topicName);
    });
});