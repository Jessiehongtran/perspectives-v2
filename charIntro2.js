const character = document.getElementsByClassName('character')[0]
const container = document.getElementsByClassName('container')[0]
const charPos = {
    x: 25,
    y: 75
}

const bgPos = {
    x: 90,
    y: 40
}

const bg = document.createElement('img')
bg.src = "https://res.cloudinary.com/dfulxq7so/image/upload/v1620182890/imageedit_6_9313307156_pfysfl.png"
bg.style.position = "absolute"
bg.style.left = `${bgPos.x}%`
bg.style.top = `${bgPos.y}%`
container.appendChild(bg)

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

function handleKeyDown(e){
    if (e.key === "d"){
        bgPos.x -= 5
        character.style.transform = `rotateY(360deg)`
    } else if (e.key === "a"){
        bgPos.x += 5
        character.style.transform = `rotateY(180deg)`
    } 
    getCharacterWalkStep()
    bg.style.left = `${bgPos.x}%`
    bg.style.top = `${bgPos.y}%`
}

document.addEventListener('keydown', handleKeyDown)