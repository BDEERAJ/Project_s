function submit() {
    const a = document.querySelector('#rev').value;
    
    if (a !== null && a.trim() !== "") {
      fetch('https://quiz-web-ujwh.onrender.com/feedback', {
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
  if(window.localStorage.getItem('darkmode')=='on'){
const style = document.createElement('style');
style.innerHTML = `
  * {
    background-color: rgb(12, 12, 12) !important;
    color: white !important;
    border-color: orange !important;
    box-shadow: 0px 0px 0px 0px black !important;
  }
`;
document.head.insertAdjacentElement('beforeend', style);
}