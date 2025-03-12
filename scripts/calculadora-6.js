const screen = document.querySelector('.tela span')
const screenOut = document.querySelector('.tela')
let power = false
let sound = true
let powerBtn = document.querySelector('.power')
let soundBtn = document.querySelector('.sound')
powerBtn.addEventListener('click', function() {
    power = !power
    screenOut.classList.toggle('on')
    if (!power) {
        sound = true
        screenOut.classList.remove('sound-off')
        screenOut.classList.add('sound-on')
        screen.textContent = ''
    } else {
        screen.textContent = '0'
    }
})
soundBtn.addEventListener('click', function() {
    if (power) {
        sound = !sound
        screenOut.classList.toggle('sound-off')
        screenOut.classList.toggle('sound-on')
    }
})
function blank() {
    if (power) {
        screen.textContent = '0'
    }
}
function number(num) {
    if (power) {
        if (sound) {
            playBeep()
        }
        if (screen.textContent.length == 1 && screen.textContent[0] == 0) {
            screen.textContent = ''
        }
        updateScreen(num)
    }
    else updateScreen('')
}
function calc(value) {
    if (sound && power) {
        playBeep()
    }
    if (screen.textContent.length > 0) {
        if (!(isNaN(screen.textContent.charAt(screen.textContent.length - 1)))) {
            if (power) updateScreen(value)
            else updateScreen('')
        }
    }
}
function updateScreen(character) {
    if (screen.textContent.length < 11) {
        screen.textContent += character
    }
}
function result() {
    let expressao = screen.textContent
    let numAtual = ''
    let numbers = []
    let operators = []
    for (let i = 0; i < expressao.length; i++) {
        if (!(expressao[i] == '+' || expressao[i] == '-' || expressao[i] == '÷' || expressao[i] == 'x' || expressao[i] == '√')) {
            numAtual += expressao[i]
        } else {
            numbers.push(numAtual)
            operators.push(expressao[i])
            numAtual = ''
        }
    }
    numbers.push(numAtual)    
    let resultado = Number(numbers[0])
    for (let a = 0; a < operators.length; a++) {
        if (operators[a] == '+') {
            resultado += Number(numbers[a + 1])
        } else if (operators[a] == '-') {
            resultado -= Number(numbers[a + 1])
        } else if (operators[a] == '÷') {
            resultado /= Number(numbers[a + 1])
        } else if (operators[a] == 'x') {
            resultado *= Number(numbers[a + 1])
        } else if (operators[a] == '√') {
            resultado = Math.sqrt(Number(numbers[a]))
        }
    }

    if (power) screen.textContent = resultado
    else screen.textContent = ''
}
function playBeep() {
    let audio = new Audio('./sound.wav')
    audio.play().catch(error => console.error('Erro ao reproduzir o som:', error))
}