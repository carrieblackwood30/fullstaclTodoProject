const inputTodo = document.querySelector(".input")
const createTodoBtn = document.querySelector('.createBtn')

const activeRadio = document.querySelector('.activeRadio')
const finishedRadio = document.querySelector(".finishedRadio")
const onHoldRadio = document.querySelector(".onHoldRadio")
const canceledRadio = document.querySelector(".canceledRadio")

let todoArray = []

const URL = "http://localhost:3000/todos"

async function getTodos(){
    try{
        const response = await fetch(URL)
        const data = response.json()
        return data
    }catch(e){
        return e
    }
}

async function postTodos(){
    try{
        let options ={
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: inputTodo.value,
                completed: false
            })
        }
        const response = await fetch(URL, options)
        const data = await response.json()
        return data
    }catch(e){
        return e
    }
}

function displayTodos(todoArr   ){

    todoArr.forEach((todoElem) => {
        console.log(todoElem)})
    

    const activeDiv = document.querySelector('.active')
    const finishedDiv = document.querySelector('.finished')
    const onHoldDiv = document.querySelector('.onHold')
    const canceledDiv = document.querySelector('.canceled')

    let createCloseTodoBtn = document.createElement("button")
    createCloseTodoBtn.classList.add("closeTodoBtn")
    createCloseTodoBtn.textContent = 'X'

    let createTodo = document.createElement('div')
    createTodo.classList.add('todo')
    createTodo.textContent = inputTodo.value

    if (activeRadio.checked && inputTodo.value != '') {
        createTodo.append(createCloseTodoBtn)
        activeDiv.append(createTodo)
    }else if(finishedRadio.checked && inputTodo.value != ''){
        createTodo.append(createCloseTodoBtn)
        finishedDiv.append(createTodo)
    }else if(onHoldRadio.checked && inputTodo.value != ''){
        createTodo.append(createCloseTodoBtn)
        onHoldDiv.append(createTodo)
    }else if(canceledRadio.checked && inputTodo.value != ''){
        createTodo.append(createCloseTodoBtn)
        canceledDiv.append(createTodo)
    }

    createCloseTodoBtn.addEventListener('click', function(event){
        event.stopPropagation()
        createTodo.remove()
    })

}

getTodos()
    .then(todoArr =>{
        todoArray = todoArr
        console.log(todoArray)
        displayTodos(todoArray)
    })
    .catch(e => console.log(e))

createTodoBtn.addEventListener("click", () =>{

    if(inputTodo.value != ''){
        postTodos()
        displayTodos()
    }
})


