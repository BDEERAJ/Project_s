function submit() {
    const a = document.querySelector('#rev').value;
    
    if (a !== null && a.trim() !== "") {
      fetch('http://localhost:3000/feedback', {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ rev: a })
      })
      .then(response => response.json())
      .then(data => {
       
      })
      .catch(error => {
        alert("Something went wrong while submitting feedback.");
      });
    } else {
      alert("Please enter some feedback before submitting.");
    }
    alert("Feedback submitted successfully!");
    window.location.reload;
  }
  