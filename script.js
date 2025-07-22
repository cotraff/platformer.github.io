const container = document.querySelector('.container')
const player = document.querySelector('#player')
const enemy = document.querySelector('#enemy')
const lever = document.querySelector('.lever')
const stone = document.querySelector('.stone')

//длительность прыжка и падения
const jumpDuration = 500
const fallDuration = 300

//параметр, определяющий можно ли пройтти через врага
enemy.dataset.isEnemy = true

//положение игра и его угол наклона по умолчанию
let x = 20
let y = 400
let a = 0

//обробатываем нажатие на клавиатуру
document.addEventListener('keydown', (event) => {
  console.log(event.key);
  
  const step = 5
  switch (event.key) {
    case 'a':
      x = Math.max(0, x - step)
      a-=12
      player.style.transform = `rotate(${a}deg)`
      choiceFall()
      break;
    case 'd':
      x = Math.min(750, x + step)
      a+=12
      player.style.transform = `rotate(${a}deg)`
      choiceFall()
      break;
    case ' ':
      choiceJump()
      break;
    case 'Shift':
      leverMove()
      break;
          
    default:
      break;
  }
  document.documentElement.style.setProperty('--left', `${x}px`)
  death()
  win()
  console.log(x)
})

//создаём функции
function jump() {
  player.classList.add('jump')
  setTimeout(() => {
    player.classList.remove('jump')
  }, jumpDuration);
}

function death() {
  if (x >= 605 && y >= 400 && enemy.dataset.isEnemy == 'true') {
    document.documentElement.style.setProperty('--left', '0px')
    x = 0
  }
}

function jumpOnPlat() {
  player.classList.add('jumpPlat')
  
  setTimeout(() => {
    y -= 90
    player.classList.remove('jumpPlat')
    document.documentElement.style.setProperty('--player-top', `${y}px`)
  }, jumpDuration);
}

function choiceJump() {
  if (x >= 150 && x <= 400 && y === 400) {
    jumpOnPlat()
  } else if (x >= 300 && x <= 400 && y === 310) {
    jumpOnPlat()
  } else if (x >= 420 && x <= 500 && y === 220) {
    jumpOnPlat()
  } else if (x >= 550 && x <= 570 && y === 130) {
    jumpOnPlat()
  } else {
    jump()
  }
}

function fallFromPlat() {
  player.classList.add('fall')
  setTimeout(() => {
    y += 90
    document.documentElement.style.setProperty('--player-top', `${y}px`)
    player.classList.remove('fall')
  }, fallDuration);
}

function fallFromPlats() {
  player.classList.add('falls')
  setTimeout(() => {
    y = 400
    document.documentElement.style.setProperty('--player-top', `${y}px`)
    player.classList.remove('falls')
  }, fallDuration + 200);
}

function choiceFall() {
  if (x == 550 && y === 40) {fallFromPlat()}
  if (x == 420 && y === 130) {fallFromPlat()}
  if (x == 300 && y === 220) {fallFromPlat()}
  if (x == 150 && y === 310) {fallFromPlat()}

  if (x == 570 && y === 130) {fallFromPlats()}
  if (x == 500 && y === 220) {fallFromPlats()}
  if (x == 400 && y === 310) {fallFromPlats()}
}

function leverMove() {
  if (x >= 630 && x <= 730 && y === 40) {
    lever.classList.add('moved')
    setTimeout(() => {
      stone.classList.add('falling')
      setTimeout(() => {
        stone.classList.add('tudi')
        enemy.classList.add('sudi')
        enemy.dataset.isEnemy = false
      }, 1000);
    }, 1500);
  }
}

function win() {
  if (x === 750 && y === 400) {
    container.classList.add('blur')
  }
}