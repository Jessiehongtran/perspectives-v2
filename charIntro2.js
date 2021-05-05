const character = document.getElementsByClassName('character')[0]
const container = document.getElementsByClassName('container')[0]
const charPos = {
    x: 25,
    y: 75
}

const bgStartPos = {
    x: 90,
    y: 20
}

const scenes = [
    {
        img: "https://res.cloudinary.com/dfulxq7so/image/upload/v1620182890/imageedit_6_9313307156_pfysfl.png",
    },
    {
        img: "https://res.cloudinary.com/dfulxq7so/image/upload/v1620186269/imageedit_8_2296018956_a5n6ek.png"
    }
]

let preBG 

for (let i = 0; i < scenes.length; i++){
    let bg = document.createElement('img')
    bg.setAttribute('class', 'bgImage')
    bg.style.width = '100%'
    bg.style.maxWidth = '600px'
    bg.style.position = 'absolute'
    bg.src = scenes[i].img
    if (i > 0){
        scenes[i].x = scenes[i-1].x + Math.floor(preBG.clientWidth/window.screen.width*100) + 20
    } else {
        scenes[i].x = bgStartPos.x
    }
    scenes[i].y = bgStartPos.y
    bg.style.left = `${scenes[i].x}%`
    bg.style.top = `${scenes[i].y}%`
    container.appendChild(bg)
    preBG = bg
}

character.style.left = `${charPos.x}%`
character.style.top = `${charPos.y}%`

let walkInd = 0


function getCharacterWalkStep(){
    if (walkInd < 15){
        let processedInd = walkInd
        if (walkInd < 10){
            processedInd = "0" + walkInd.toString()
        } 
        character.src = `./Yang_walk_LR/Yang_Walk_LR_000${processedInd}.png`
        walkInd += 1
        setTimeout(getCharacterWalkStep, 90)
    } else {
        walkInd = 0
    }
}

let changeX

function handleKeyDown(e){
    let bgImages = document.getElementsByClassName('bgImage')
    if (e.key === "d"){
        changeX = -5
        character.style.transform = `rotateY(360deg)`

    } else if (e.key === "a"){
        changeX = +5
        character.style.transform = `rotateY(180deg)`
    } 
    for (let i = 0; i< scenes.length; i++){
        scenes[i].x += changeX
        bgImages[i].style.left = `${scenes[i].x}%`
        bgImages[i].style.top = `${scenes[i].y}%`
    }
    getCharacterWalkStep()
}

document.addEventListener('keydown', handleKeyDown)