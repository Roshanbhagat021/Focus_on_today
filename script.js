const mainContainer = document.querySelector("main")
const inputList = document.querySelectorAll("input")
const completedTaskList = document.querySelectorAll(".is-completed")
const alertText = document.querySelector(".alert")
const noOfCompletedTask = document.querySelector(".noOfCompletedTask")
const completedTaskBar = document.querySelector(".show-completed")

let goals = JSON.parse(localStorage.getItem("goals"))  || {}
console.log('goals: ', goals);

function setGoalText (){
    inputList.forEach((input,index)=>{
        input.value =  goals[`input${index+1}`] && goals[`input${index+1}`][0] ? goals[`input${index+1}`][0] : ""
    })
    completedTaskList.forEach((el,index)=>{
        let is_completed = goals[`input${index+1}`] && goals[`input${index+1}`][1] ? goals[`input${index+1}`][1] :false
        is_completed ? el.classList.add("completed") : ""   
    })
   updateProgressBar()
}

setGoalText()

function updateProgressBar (){
    let lengthOfCompletedTasks = document.querySelectorAll(".completed").length
    completedTaskBar.innerText = `${lengthOfCompletedTasks}/3 Completed!`
    completedTaskBar.style.width = `${100*(lengthOfCompletedTasks*1/3)}%`
    if(parseInt(completedTaskBar.style.width) == 0){
        completedTaskBar.style.paddingLeft = "0rem"
    }else{
        completedTaskBar.style.paddingLeft = "1.5rem"
    }
}

mainContainer.addEventListener("click",(e)=>{
    if(e.target.classList[0] == "is-completed" &&  checkIsAllInputFilled()){
        // console.dir(e.target.classList);
         goals[e.target.nextElementSibling.classList[0]][1] = !goals[e.target.nextElementSibling.classList[0]][1]
         localStorage.setItem("goals",JSON.stringify(goals))
        console.log(goals);
        e.target.classList.toggle("completed")
        updateProgressBar()
       
    }else if(e.target.classList[0] == "is-completed" &&  !checkIsAllInputFilled()){
        alertText.classList.remove("hidden")
    }
})

let arr = []

function checkIsAllInputFilled(){
    let isAllInputFilled = [...inputList].every((input)=>{
        return input.value
    })
    return isAllInputFilled
}


inputList.forEach((input)=>{
    input.addEventListener("input",()=>{
        goals[input.classList.value] = [input.value,false]
        localStorage.setItem("goals",JSON.stringify(goals))
        alertText.classList.add("hidden")
    })
})


