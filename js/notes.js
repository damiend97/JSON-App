// notes.js

/*
Async functions always return a promise. If the return value of an async function is not explicitly a promise, it will be implicitly wrapped in a promise.
Note: Even though the return value of an async function behaves as if it's wrapped in a Promise.resolve , they are not equivalent.
*/

// getJsonPromise is a non-async function that returns a Promise in the most literal sense
getJsonPromise = () => {
    return new Promise(async (resolve, reject) => {
        try {
            // let data = await fetch('https://api.npoint.io/3ae3c2ea5fdf9cbe4fd1')
            // .then((res) => {
            //     return res.json();
            // })
            // resolve(data);

            // or...

            // let data = await fetch('https://api.npoint.io/3ae3c2ea5fdf9cbe4fd1')
            // data = await data.json();
            // data = data.todos;
            // resolve(data);

            // or...

            // let data = (await (await fetch('https://api.npoint.io/3ae3c2ea5fdf9cbe4fd1')).json());
            // resolve(data)

            let data = await fetch('https://api.npoint.io/3ae3c2ea5fdf9cbe4fd1');
            
            // we need this because even if we get a status 500 response, it will not throw an error, it will still return the response
            if(data.ok === false) {
                throw new Error("eek");
            }

            // moved the .json() down to here so we can check data.ok
            // if we json() data before our if check we will be checking our json not our response
            resolve(data.json());
            
        } catch (err) {
            reject("Catch error", err.message);
        }
    })

}

// getJson is an async function and therefore will implicity return a Promise even though that was not explicity declared
getJson = async () => {
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

// Once again... we can either return a defined promise
sendDataPromise = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await setTimeout(() => {
                console.log("Sending data...");
            }, 3000);

            resolve("Data sent!")
        } catch (e) {
            reject("Error sending data!")
        }
    })
}

// Or we can make our function async and it will automatically return our content within a promise
sendData = async () => {
    try {
        await setTimeout(() => {
            console.log("Sending data...");
        }, 3000);

        return("Data sent!")
    } catch (e) {
        return("Error sending data!")
    }
}

// Promise Chaining... Hooray!!
getJsonPromise()
.then(data => {
    console.log(data);
    return getJson();
})
.then(data => {
    console.log(data);
    return sendDataPromise(data);
})
.then(sendDataPromiseResponse => {
    console.log(sendDataPromiseResponse);
    return sendData("Some data");
})
.then(sendDataResponse => {
    console.log(sendDataResponse);
})
.catch(err => console.log(err));