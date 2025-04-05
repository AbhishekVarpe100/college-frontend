document.addEventListener('DOMContentLoaded', (event) => {
    const texts = ["law", "management", "engineering", "computer science"];
    let count = 0;
    let index = 0;
  
    function type() {
      let currentText = texts[count];
      let letter = currentText.slice(0, ++index);
  
      document.getElementById("auto-typing").textContent = letter;
      if (letter.length === currentText.length) {
        count++;
        index = 0;
        if (count === texts.length) {
          count = 0; // Reset count to loop through texts array
        }
        setTimeout(type, 2000); // Wait 2 seconds before typing next word
      } else {
        setTimeout(type, 200); // Typing speed
      }
    }
  
    type(); // Start typing effect
  });
  