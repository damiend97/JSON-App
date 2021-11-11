// dataFunctions.js

export const getTodos = async () => {
    try {
        let data = await fetch('https://api.npoint.io/3ae3c2ea5fdf9cbe4fd1');

        if(!data.ok) {
            throw new Error("eek");
        }

        return data.json();
    } catch (err) {
        return err;
    }
}

export const deleteTodo = async () => {
    await getTodos()
    .then((todos) => {
        return new Promise((resolve, reject) => {
            try {
                let newTodos = [];
    
                for (let i = 0; i < todos.todos.length; i++) {
                    if (i !== 0) {
                        newTodos.push(todos.todos[i]);
                    }
                }

                resolve(newTodos)
            } catch (err) {
                reject("Error creating new todos...")
            }
            
        })
        
    })
    .then((newTodos) => {
        return postTodos(newTodos);
    })
    .catch(err => console.log(err));
}

const postTodos = async (newTodos) => {
    try {
        await fetch('https://api.npoint.io/3ae3c2ea5fdf9cbe4fd1', {
            method: 'POST',
            body: JSON.stringify({
            todos: newTodos
        }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
    } catch (e) {
        console.log("POST ERROR: ", e);
    }
}