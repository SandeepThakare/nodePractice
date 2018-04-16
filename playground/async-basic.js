console.log('App Started');

setTimeout(() => {
    console.log('In Timeout');
}, 2000);

setTimeout(() => {
    console.log('In Timeout second');
});

console.log('App finished');