const mainContainer = document.querySelector("main")
const inputList = [...document.querySelectorAll("input")]
const alertText = document.querySelector(".alert")
const noOfCompletedTask = document.querySelector(".noOfCompletedTask")
const completedTaskBar = document.querySelector(".show-completed")



mainContainer.addEventListener("click",(e)=>{
    if(e.target.classList[0] == "is-completed" && e.target.nextElementSibling.value && checkIsAllInputFilled()){
        // console.dir(e.target.classList);
        e.target.classList.toggle("completed")
        e.target.nextElementSibling.classList.toggle("green-text")
        let lengthOfCompletedTasks = document.querySelectorAll(".completed").length
        completedTaskBar.innerText = `${lengthOfCompletedTasks}/3 Completed!`
        completedTaskBar.style.width = `${100*(lengthOfCompletedTasks*1/3)}%`
        if(parseInt(completedTaskBar.style.width) == 0){
            completedTaskBar.style.paddingLeft = "0rem"
        }else{
            completedTaskBar.style.paddingLeft = "1.5rem"
        }
    }
})

let arr = []

function checkIsAllInputFilled(){
    let isAllInputFilled = inputList.every((input)=>{
        return input.value
    })
    return isAllInputFilled
}

inputList.forEach((input)=>{
    input.addEventListener("input",()=>{
        if(checkIsAllInputFilled()){
            alertText.classList.add("hidden")
        }else{
            alertText.classList.remove("hidden")
        }
    })
})


