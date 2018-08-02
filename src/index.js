function* recaman () {
    const taken = []
    let increment = 0
    let current = 0
    
    while (true) {
        const diff = current - increment
        if (diff > 0 && !taken.find(int => int === (current - increment))) {
            current = current - increment
        } else {
            current = current + increment
        }
    
        taken.push(current)
        increment++

        yield current
    }
}

const generator = recaman()

const WIDTH = 1024
const HEIGHT = 768
const canvas = document.createElement('canvas')
const context = canvas.getContext('2d')

canvas.width = WIDTH
canvas.height = HEIGHT

context.fillStyle = '#333';
context.fillRect(0, 0, WIDTH, HEIGHT);

const guessDirection = (previous, current) =>
    (!previous || previous < current)

let increment = 0
let previous
const MULTIPLIER = 20

while (increment < 100) {
    const current = generator.next().value
    const x = (current + previous) / 2 * MULTIPLIER                 
    const y = HEIGHT / 2
    const r = Math.abs(current - previous) / 2 * MULTIPLIER

    context.beginPath()
    context.arc(x, y, r, Math.PI, 0, !guessDirection(previous, current))
    // context.strokeStyle = '#'+(Math.random()*0xFFFFFF<<0).toString(16)
    context.stroke()

    increment++
    previous = current
}

document.querySelector('#root')
    .appendChild(canvas)