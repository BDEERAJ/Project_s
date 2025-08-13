document.querySelector('.points').innerHTML = window.localStorage.getItem('points') || '0';

const payload = {
    email: window.localStorage.getItem('email'),
    tot: window.localStorage.getItem('totalqns'),
    crt: window.localStorage.getItem('totalcrt')
};

fetch('https://quiz-web-ujwh.onrender.com/result/points', {
    method: 'PUT',
    headers: {
        'content-type': 'application/json'
    },
    body: JSON.stringify(payload)
})
.then(response => {
    if (!response.ok) {
        console.error('Failed to update score on the server.');
    }
})
.catch(error => {
    console.error('Server error:', error);
});

document.querySelector('button').addEventListener('click', () => {
    window.location.href = '../TopicSelectionPage/startPage1.html';
});