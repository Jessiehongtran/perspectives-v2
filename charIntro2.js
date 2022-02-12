const character = document.getElementsByClassName('character')[0]
const container = document.getElementsByClassName('container')[0]
const charPos = {
    x: 25,
    y: 75
}

const bgStartPos = {
    x: 90,
    y: 30
}

let textIsBeingShown = false

const scenes = [
    {
        img: "https://res.cloudinary.com/dfulxq7so/image/upload/v1620182890/imageedit_6_9313307156_pfysfl.png",
        w: 50,
        h: 22,
        text: "from China",
        showText: false
    },
    {
        img: "https://res.cloudinary.com/dfulxq7so/image/upload/v1620186269/imageedit_8_2296018956_a5n6ek.png",
        w: 10,
        h: 12,
        text: "work as a developer",
        showText: false
    },
    {
        img: "https://www.pinclipart.com/picdir/big/449-4493955_use-your-7-day-free-trial-to-build.png",
        w: 20,
        h: 22,
        text: "in a tech company",
        showText: false
    },
    {
        img: "https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/76480/doorway-clipart-xl.png",
        w: 20,
        h: 50,
    }
]

let preBG 

for (let i = 0; i < scenes.length; i++){
    let bg = document.createElement('img')
    bg.setAttribute('class', 'bgImage')
    bg.style.position = 'absolute'
    bg.src = scenes[i].img
    if (i > 0){
        scenes[i].x = scenes[i-1].x + scenes[i-1].w + 15
    } else {
        scenes[i].x = bgStartPos.x
    }
    scenes[i].originX = scenes[i].x 
    if (scenes[i].text){
        scenes[i].y = bgStartPos.y
    } else {
        scenes[i].y = bgStartPos.y - 25
    }
    bg.style.left = `${scenes[i].x}%`
    bg.style.bottom = `${scenes[i].y}%`
    bg.style.width = `${scenes[i].w}%`
    bg.style.height = `${scenes[i].h}%`
    container.appendChild(bg)
    preBG = bg
}

character.style.left = `${charPos.x}%`
character.style.top = `${charPos.y}%`

let walkInd = 0
let curTextEl 
let curTextY


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
let accuChangeX = 0


function handleKeyDown(e){
    let bgImages = document.getElementsByClassName('bgImage')
    if (e.key === "d"){
        changeX = -5
        accuChangeX -= 5
        character.style.transform = `rotateY(360deg)`

    } else if (e.key === "a"){
        changeX = +5
        accuChangeX += 5
        character.style.transform = `rotateY(180deg)`
    } 
    for (let i = 0; i< scenes.length; i++){
        scenes[i].x += changeX
        bgImages[i].style.left = `${scenes[i].x}%`
        bgImages[i].style.bottom = `${scenes[i].y}%`
        let flexNum = 50
        if (!textIsBeingShown && !scenes[i].showText && scenes[i].text && scenes[i].x < scenes[i].originX - scenes[i].w - i*flexNum){
            console.log(scenes[i].text)
            curTextEl = document.createElement('div')
            curTextEl.style.padding = '8px 20px'
            curTextEl.style.borderRadius = '8px'
            curTextEl.style.backgroundColor = 'white'
            curTextEl.style.color = 'black'
            curTextEl.style.position = 'absolute'
            curTextEl.style.left = `${ scenes[i].x }%`
            curTextEl.style.top = `${ scenes[i].y }%`
            curTextEl.innerHTML = scenes[i].text
            curTextY = scenes[i].y
            container.appendChild(curTextEl)
            showText()
            scenes[i].showText = true
        } 
    }

    if (accuChangeX < -185){
        window.location.href = './office.html'
    }
    getCharacterWalkStep()
}

function showText(){
    if (curTextY > -10){
        curTextY -= 5
        curTextEl.style.top = `${ curTextY }%`
        textIsBeingShown = true
        setTimeout(showText, 400)
    } else {
        textIsBeingShown = false
    }
    
}

document.addEventListener('keydown', handleKeyDown)