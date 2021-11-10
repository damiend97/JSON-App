// app.js

/*
https://www.npoint.io/docs/3ae3c2ea5fdf9cbe4fd1

{
    "todos": [
        {"id":1,"title":"t1","completed":true},
        {"id":2,"title":"t2","completed":false},
        {"id":3,"title":"t3","completed":true},
        {"id":4,"title":"t4","completed":true},
        {"id":5,"title":"t5","completed":false}
    ]
}
*/

const renderData = async () => {
    let data = await getTodos();

    let id = "";
    let title = "";
    let completed = "";
    let injectable = "";

    data.todos.forEach(todo => {
        id = todo.id;
        title = todo.title;
        completed = todo.completed;

        injectable += "ID: " + id;
        injectable += "<br>"
        injectable += "Title: " + title;
        injectable += "<br>"
        injectable += "Completed: " + completed;
        injectable += "<br>"
        injectable += "<br><hr><br>";

        dataContainer.innerHTML = injectable;
    });
}

renderData();

clearButton.addEventListener('click', () => {
    dataContainer.innerHTML = "";

    deleteTodo()
    .then(() => {
        renderData();
    })
    
})