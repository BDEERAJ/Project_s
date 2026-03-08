document.querySelector('.points').innerHTML = window.localStorage.getItem('points') || '0';

const payload = {
    email: window.localStorage.getItem('email'),
    tot: window.localStorage.getItem('totalqns'),
    crt: window.localStorage.getItem('totalcrt')
};

// 1. Grab the button and disable it immediately so the user can't leave yet
const backButton = document.querySelector('button');
backButton.disabled = true;
backButton.innerHTML = "Saving Score..."; // Optional: Give the user visual feedback

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
    // 2. The server finished! Re-enable the button and fix the text.
    backButton.disabled = false;
    backButton.innerHTML = "Back to Start"; 
})
.catch(error => {
    console.error('Server error:', error);
    // Re-enable the button even if there's an error so the user isn't trapped
    backButton.disabled = false; 
    backButton.innerHTML = "Back to Start";
});

// 3. Keep your event listener the same
backButton.addEventListener('click', () => {
    window.location.href = '../TopicSelectionPage/startPage1.html';
});