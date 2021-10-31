/*
console.log('1');
setTimeout(function() {console.log('2')}, 500);     // async task is queued after 500ms.
console.log('3');
console.log('4');
*/

/* Callback functions --> NO LONGER USED. Now we use promises.
function test(callback) {
    console.log(1);
    callback();
}

test(() => {console.log(2)});
*/


const p = new Promise((resolve, reject) => {
    let success = true;

    if (success)
        return resolve("This was good.");
    else
        return reject("This was bad.");
});

/*
p.then((result) => {
    console.log(result);
}).catch((err) => {
    console.error(err);
});
*/

p.then((result) => {
    console.log(1);
    return result;
}).then((resp) => {
    console.log(2);
    return ('The result is: ' + resp);
}).then((resp1) => {
    console.log('3: ' + resp1);
}).catch((err) => {
    console.error(err);
});

async function test() {
    console.log(1);
    const resp = await test2();
    console.log(2);
    console.log('The result was: ' + resp);
    const resp2 = await test(2);
    console.log(3);
    console.log('The result was: ' + resp2);
}

function test2(){
    return new Promise((resolve, reject) => {
        let i = 0;
        while (i < 100) {
            i++;
        }

        let success = true;

        if (success)
            return resolve("This was good.");
        else
            return reject("This was bad.");
    });
}

test();