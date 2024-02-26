const inputTodo = document.querySelector(".input")
const createTodoBtn = document.querySelector('.createBtn')

const activeRadio = document.querySelector('.activeRadio')
const finishedRadio = document.querySelector(".finishedRadio")
const onHoldRadio = document.querySelector(".onHoldRadio")
const canceledRadio = document.querySelector(".canceledRadio")

const activeDiv = document.querySelector('.active')
const finishedDiv = document.querySelector('.finished')
const onHoldDiv = document.querySelector('.onHold')
const canceledDiv = document.querySelector('.canceled')

let todoArray = []


const URL = "http://localhost:3000/todos"

async function get_Todos() {
    try {
        const resp = await fetch(URL)
        const data = await resp.json()
        return data
    } catch (err) {
        return err;
    }
}

let selectedRadio = () => {
    let selected = document.querySelector("input[name = 'status']:checked").value

    return selected
}

function display_Todos(todoArr) {

    console.log(todoArr)

    // let createCloseTodoBtn = document.createElement("button")
    // createCloseTodoBtn.classList.add("closeTodoBtn")
    // createCloseTodoBtn.textContent = 'X'



    for (let i = 0; i < todoArr.length; i++) {

        let createTodo = document.createElement('div')
        createTodo.classList.add('todo')
        createTodo.innerText += todoArr[i].name


        if (todoArr[todoArr.length - 1].status == 'finished') {
            finishedDiv.append(createTodo)
        }
    }



}

async function post_todos() {
    try {
        let options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: inputTodo.value,
                status: selectedRadio()
            }),
        }
        const resp = await fetch(URL, options)
        const data = await resp.json()
        return data
    } catch (err) {
        return err;
    }
}

get_Todos()
    .then((todoArr) => {
        todoArray = todoArr
        console.log(todoArr)
        display_Todos(todoArr)
    })
    .catch((err) => console.log(err))

createTodoBtn.addEventListener("click", () => {

    if (inputTodo.value != '') {
        post_todos()
    }

})