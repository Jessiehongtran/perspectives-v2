const messageData= {
    part1: {
        messages: [
            {
                name: "JERRY",
                text: "I say we put more resources behind this effort. We have enough to go on.",
                durationToNext: 40
            },
            {
                name: "DEVON",
                text: "Bob, what do you think?",
                durationToNext: 120
            },
            {
                name: "BOB",
                text: "Oh, this is above my pay grade!",
                durationToNext: 60
            },
            {
                name: "YANG",
                text: "...",
                durationToNext: 50
            },
        ],
        buttons: [
            {
                text: "I have something to add...",
                next: "part2"
            }
        ]
    },
    part2: {
        messages: [
            {
                name: "YANG",
                text: "When you look at the numbers, we don't have enough data from our first test to move forward with any certainty.",
                durationToNext: 40
            },
            {
                name: "BOB",
                text: "Well, I wouldn't say the issue is the data..",
                durationToNext: 50
            },
            {
                name: "JERRY",
                text: "You do not understand how these tests go Yang. Sure, it does not look like much, but we got some feedback that some of these folks like the direction we are taking. Sometimes you cannot rely on the data.",
                durationToNext: 50
            },
            {
                name: "YANG",
                text: "...",
                durationToNext: 50
            },
        ],
        buttons: [
            {
                text: "Say nothing",
                next: "part31"
            }, 
            {
                text: "I think we should focus on the data",
                next: "part32"
            }, 
            {
                text: "Excuse me?",
                next: "part33"
            }
        ]
    },
    part31: {
        messages: [
            {
                name: "BOB",
                text: "Sold. Jerry is right. It is full speed ahead!" , 
                durationToNext: 50
            },
            {
                name: "JERRY",
                text: "That is what I am talking about.",
                durationToNext: 50
            },
            {
                name: "DEVON",
                text: "Let see how we can make this work with the timeline.",
                durationToNext: 100
            },
        ],
        buttons: []
    },
    part32: {
        messages: [
            {
                name: "YANG",
                text: "I have seen the data and I can clearly understand the results. We ran that test for a reason. It is a good indicator of what happens if we scale this.." , 
                durationToNext: 40
            },
            {
                name: "JERRY",
                text: "Look, I know this is the way to go I can feel it! I have done this before.",
                durationToNext: 50
            },
            {
                name: "BOB",
                text: "Sold. Jerry is right. It is full speed ahead!",
                durationToNext: 70
            },
            {
                name: "DEVON",
                text: "Yang, why do not you stay after the meeting so we can talk.",
                durationToNext: 100
            }
        ],
        buttons: []
    },
    part33: {
        messages: [
            {
                name: "YANG",
                text: "What am I here for?.." , 
                durationToNext: 60
            },
            {
                name: "JERRY",
                text: "I do not understand why you are being so aggressive to this and do not really appreciate it.",
                durationToNext: 50
            },
            {
                name: "BOB",
                text: "Yeah Yang, Jerry has been doing this for a lot longer than you so you should trust his thoughts.",
                durationToNext: 60
            },
            {
                name: "DEVON",
                text: "Yang, why do not you stay after the meeting so we can talk.",
                durationToNext: 100
            }
        ],
        buttons: []
    }
}

const jerryContainer = document.getElementsByClassName("jerry")[0]
const bobContainer = document.getElementsByClassName("bob")[0]
const devonContainer = document.getElementsByClassName("devon")[0]
const yangContainer = document.getElementsByClassName("yang")[0]
const jerryMessage = document.getElementsByClassName("textMessage jerry")[0]
const bobMessage = document.getElementsByClassName("textMessage bob")[0]
const devonMessage = document.getElementsByClassName("textMessage devon")[0]
const yangMessage = document.getElementsByClassName("textMessage yang")[0]
const userInput = document.getElementsByClassName("user-input")[0]

let next = "part1"
let messages = messageData[next].messages
let buttons = messageData[next].buttons
let messageInd = 0

function showMessages(){
    userInput.style.display = 'none'
    if (messageInd < messages.length){
        if (messages[messageInd].name === "JERRY"){
            jerryContainer.style.display = 'block'
            bobContainer.style.display = devonContainer.style.display = yangContainer.style.display = 'none'
            jerryMessage.innerHTML = messages[messageInd].text
        } else if (messages[messageInd].name === "BOB"){
            bobContainer.style.display = 'block'
            jerryContainer.style.display = devonContainer.style.display = yangContainer.style.display = 'none'
            bobMessage.innerHTML = messages[messageInd].text
        } else if (messages[messageInd].name === "DEVON"){
            devonContainer.style.display = 'block'
            bobContainer.style.display = jerryContainer.style.display = yangContainer.style.display = 'none'
            devonMessage.innerHTML = messages[messageInd].text
        } else if (messages[messageInd].name === "YANG"){
            yangContainer.style.display = 'block'
            bobContainer.style.display = devonContainer.style.display = jerryContainer.style.display = 'none'
            yangMessage.innerHTML = messages[messageInd].text
        }
        setTimeout(showMessages, messages[messageInd].durationToNext*50)
        messageInd += 1
        
    } else {
        showButtons()
    }

}

function showButtons(){
    userInput.style.display = 'flex'
    while(userInput.firstChild){
        userInput.removeChild(userInput.firstChild)
    }
    if (buttons.length > 0){
        for (let i = 0; i < buttons.length; i++){
            let button = document.createElement('button')
            button.style.padding = '8px 30px'
            button.style.backgroundColor = 'white'
            button.style.border = '2px solid black'
            button.style.fontSize = '20px'
            button.style.marginRight = '40px'
            button.style.borderRadius = '20px'
            button.style.cursor = 'pointer'
            button.innerHTML = buttons[i].text
            button.addEventListener('click', () => {
                next = buttons[i].next
                messages = messageData[next].messages
                buttons = messageData[next].buttons
                messageInd = 0
                showMessages()
            })
            userInput.appendChild(button)
        }
    } else {
        userInput.style.display = 'none'
    }

}

showMessages()
