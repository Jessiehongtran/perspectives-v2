const chars = [
    {
        id: 1,
        name: "Jevon",
        environment: [

        ],
        avatar: "https://res.cloudinary.com/dfulxq7so/image/upload/v1613262123/Jevon_zb3caa.svg",
    },
    {
        id: 2,
        name: "Yang",
        environment: [
            "https://www.pinclipart.com/picdir/big/449-4493955_use-your-7-day-free-trial-to-build.png",
            "https://lh3.googleusercontent.com/proxy/6QfZd2YYdSE5K5KBMsL0CtmBbezHN0F7_2_JgEmy9Ij646UHBFdpNKz02Bc-cerjsLzyJbmmYolIOiI2KsrcuRcz"
        ],
        avatar: "https://res.cloudinary.com/dfulxq7so/image/upload/v1613262323/yang_oyy0oi.svg",
    },
    {
        id: 3,
        name: "Elijah",
        environment: [

        ],
        avatar: "https://res.cloudinary.com/dfulxq7so/image/upload/v1613262303/elijah_xmsqid.svg",
    }
]

let charPos = {
    x: 10,
    y: -10
}

let startEnvImgPos = {
    x: 110,
    y: 27
}

let envImgSize = {
    w: 28
}

let env 

const container = document.getElementsByClassName('container')[0]
const char = document.getElementsByClassName('character')[0]
char.style.position = 'absolute'

const selectedCharInd = sessionStorage.getItem('selectedCharInd')
if (selectedCharInd){
    char.src = `${chars.filter(char => char.id === parseInt(selectedCharInd))[0].avatar}`
    //add coordinates for images
    for (let i = 0; i < chars.length; i++){
        if (chars[i].environment.length > 0){
            for (let j = 0; j < chars[i].environment.length; j++){
                const img = document.createElement('img')
                img.src  = chars[i].environment[j]
                img.style.width = `${envImgSize}%`
                img.style.position = 'absolute'
                chars[i].environment[j] = {
                    image: img,
                    x: startEnvImgPos.x + j*envImgSize.w*2,
                    y: startEnvImgPos.y
                } 
            }
        }
    }
    
    //update environment
    for (let j = 0; j < chars.length; j++){
        if (chars[j].id === parseInt(selectedCharInd)){
            env = chars[j].environment
            for (let k = 0; k < env.length; k++){
                container.appendChild(env[k].image)
            }
        }
    }
   
}

let landed = false

function landingEffect(){
    if (charPos.y > 50 && !landed){
        charPos.y -= 2
        setTimeout(landingEffect, 20)
    } else {
        if (charPos.y > 40 && charPos.y < 50 && !landed){
            charPos.y += 2
            setTimeout(landingEffect, 20)
        } else {
            landed = true
        }
    } 
    char.style.left = `${charPos.x}%`
    char.style.top = `${charPos.y}%` 

}

let slideInd = 0


function slide(){

    if (slideInd < 100){
        for (let i = 0; i < env.length; i++){
            if (env[i].image){
                env[i].x -= slideInd
                env[i].image.style.left = `${env[i].x}%`
                env[i].image.style.top = `${env[i].y}%`

            }
        }
        slideInd += 1
        setTimeout(slide, 300)
    }

}

function showChar(){
    if (charPos.y < 60){
        charPos.y += 5
        char.style.left = `${charPos.x}%`
        char.style.top = `${charPos.y}%`  
        setTimeout(showChar, 40)
    } else {
        // landingEffect()
    }

}

showChar()

slide()