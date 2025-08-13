function submit() {
    const rev = document.querySelector('#rev').value;
    const submitBtn = document.querySelector('.submit-btn');
    
    if (rev && rev.trim() !== "") {
        submitBtn.textContent = 'Submitting...';
        submitBtn.disabled = true;

        fetch('https://quiz-web-ujwh.onrender.com/feedback', {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ rev: rev })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            alert("Feedback submitted successfully!");
            window.location.reload();
        })
        .catch(error => {
            alert("Something went wrong while submitting feedback.");
            console.error("Fetch Error:", error);
            submitBtn.textContent = 'Submit';
            submitBtn.disabled = false;
        });
    } else {
        alert("Please enter some feedback before submitting.");
    }
}

document.querySelector('.submit-btn').addEventListener('click', submit);

document.querySelector('.back-btn').addEventListener('click', () => {
    window.location.href = '../TopicSelectionPage/startPage1.html';
});