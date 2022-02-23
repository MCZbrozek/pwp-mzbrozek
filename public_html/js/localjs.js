console.log('Is this thing on??')


//added secret code to page, go ahead, try it! //
const keysPressed = []
const secretCode = 'mz'

 window.addEventListener("keyup", (e) => {
    console.log(e.key)
    keysPressed.push(e.key)
    keysPressed.splice(-secretCode.length - 1, keysPressed.length - secretCode.length) //truncate our array to match the length of secret code.
    if(keysPressed.join('').includes(secretCode)) {
        console.log('Magic')
        cornify_add()
    }
    console.log(keysPressed)
})






