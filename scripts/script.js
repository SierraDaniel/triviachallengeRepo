const question = document.getElementById("question");
const options = document.getElementsByTagName("button");
let trueBtn = document.getElementById("selectedTrue");
let falseBtn = document.getElementById("selectedFalse");
let arr = Array.from(options);
let cont = 0;
let currentQuestion = cont + 1;
let score = 0;
let wrong = 0;

startGame = () => {
  newQuestion();
}

newQuestion = () => {

  if (cont <= 9) {
    console.log("current question " + (currentQuestion));
    fetch('https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean')
      .then(res => {
        return res.json()
      })
      .then(results => {
        return results.results[cont]
      })
      .then(data => {

        let {
          category,
          question,
          correct_answer
        } = data;
        console.log(category, question, correct_answer);
        console.log(correct_answer);
        return data;
      })
      .then((data) => {
        let correct = data.correct_answer;
        console.log("this is the answer " + correct);
        document.getElementById('category').innerHTML = data.category;
        document.getElementById('question').innerHTML = data.question;

          trueBtn.addEventListener('click', e => {

            console.log("current score ");
            console.log(score);
            selectedChoice = e.target.innerText;
            console.log("you clicked " + selectedChoice); // validate
            console.log("your choice was correct?");
            console.log(selectedChoice == correct);
            console.log("type of " + typeof (selectedChoice));
            if (e.target = trueBtn) {
              console.log(e.target)
            } 
            if (selectedChoice === correct) {
              updateScore();
            }

          })

          falseBtn.addEventListener('click', e => {
            console.log("current wrong ");
            console.log(wrong);
            selectedChoice = e.target.innerText;
            console.log("you clicked " + selectedChoice);
            console.log("your choice was correct?");
            console.log(selectedChoice == correct);
            console.log("type of " + typeof (selectedChoice));
            if (e.target = falseBtn) {
              console.log(e.target)
            } 
            if (selectedChoice === correct) {
              updateWrong();
            }

          })
        

        function updateScore() {
          score++;
          document.getElementById('scoreText').innerText = score;
          document.getElementById('total_score').innerText = score;
          console.log(score);
        }

        function updateWrong() {
          wrong++;
          document.getElementById('wrongText').innerText = score;
          console.log(wrong);
        }

      })
    return cont++;
  } else {
    document.getElementById("main").classList.replace("container", "hidden");
    document.getElementById("finish").classList.replace("hidden", "container");
    document.getElementById("restart").classList.replace("reset_btn", "hidden");
    
    // return window.location.assign("finish.html");
  }

}
startGame();