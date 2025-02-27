const mainContainer = document.querySelector("main");
const inputList = document.querySelectorAll("input");
const completedTaskList = document.querySelectorAll(".is-completed");
const alertText = document.querySelector(".alert");
const noOfCompletedTask = document.querySelector(".noOfCompletedTask");
const completedTaskBar = document.querySelector(".show-completed ");
const completedTaskBarText = document.querySelector(".status");
const raiseTheBarText = document.querySelector(".quotes");
const resetAllBtn = document.querySelector(".resetAll")

let goals = JSON.parse(localStorage.getItem("goals")) || {};
const quotes = [
  "Raise the bar by completing your goals!",
  "Well begun is half done!",
  "Just one more to complete!",
  "Whoa! You just completed all goals, It's time for chill! 🥳",
];

resetAllBtn.addEventListener("click",()=>{
    localStorage.clear()
    goals = {}
    setDataToUI()
    updateProgressBar()
})

function updateProgressBar() {
  let lengthOfCompletedTasks = document.querySelectorAll(".completed").length;
  raiseTheBarText.innerText = quotes[lengthOfCompletedTasks];
  completedTaskBarText.innerText = `${lengthOfCompletedTasks}/3 Completed!`;
  completedTaskBar.style.width = `${100 * ((lengthOfCompletedTasks * 1) / 3)}%`;
}

mainContainer.addEventListener("click", (e) => {
  if (e.target.classList[0] == "is-completed" && checkIsAllInputFilled()) {
    goals[e.target.nextElementSibling.classList[0]][1] =
      !goals[e.target.nextElementSibling.classList[0]][1];
    localStorage.setItem("goals", JSON.stringify(goals));
    console.log(goals);
    e.target.classList.toggle("completed");
    updateProgressBar();
  } else if (
    e.target.classList[0] == "is-completed" &&
    !checkIsAllInputFilled()
  ) {
    alertText.classList.remove("hidden");
  }
});

function checkIsAllInputFilled() {
  let isAllInputFilled = [...inputList].every((input) => {
    return input.value;
  });
  return isAllInputFilled;
}


function setDataToUI(){

    inputList.forEach((input) => {
        input.value = goals[input.className] ? goals[input.className][0] : "";
      
        if (goals[input.className] && goals[input.className][1]) {
          input.previousElementSibling.classList.add("completed");
        }else{
            input.previousElementSibling.classList.remove("completed");
        }
        updateProgressBar();
      
        input.addEventListener("input", () => {
          if (goals[input.className] && goals[input.className][1]) {
            input.value = goals[input.className][0];
            return;
          }
          goals[input.classList.value] = [input.value, false];
          localStorage.setItem("goals", JSON.stringify(goals));
          alertText.classList.add("hidden");
        });
      });
      
}

setDataToUI()

