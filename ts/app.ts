import { Card } from "./Card";
import {Suit} from "./Card";
import { Deck } from "./Deck";

const avoidBtn = document.getElementById("avoid-button") as HTMLButtonElement
avoidBtn!.addEventListener('click', _listener_avoid)
//test comment
function _listener_avoid() {
    removeListenersFromRoomDivs()
    if(deckObj.cards.length === 0)
    {
        let img = document.createElement("img")
        img.src = "./images/cards_png/purple_back.png"
        deckDiv.appendChild(img) 
    }
    roomObj.forEach(card => {
        removeCardImage(card!)
        deckObj.cards.push(card!)        
        delete roomObj[roomObj.indexOf(card)]
    })
    addListenerToDeck()
    avoidBtnClicked = true
    avoidBtn.disabled = true
}

let avoidBtnClicked: Boolean = false
let healthDisplay = document.getElementById("health-display")
const weaponDiv = document.getElementById("weapon") as HTMLDivElement
const discardPileDiv = document.getElementById("discard-pile") as HTMLDivElement
const deckDiv = document.getElementById("deck") as HTMLDivElement
let deckObj: Deck = createDeck(); addListenerToDeck()

function createDeck () {
    const toRemove: Array<string> = ["Jack of Hearts", "Jack of Diamonds", 
                                    "Queen of Hearts", "Queen of Diamonds", 
                                    "King of Hearts", "King of Diamonds", 
                                    "Ace of Hearts", "Ace of Diamonds"]
    let deck = new Deck()
    deck.cards = deck.cards.filter(card => !toRemove.includes(card.name))
    deck.shuffle()
    deck.shuffle()
    deck.shuffle()
    return deck
}

let roomObj: Array<Card | undefined> = new Array(4)
let discardPile: Array<Card> = new Array()
let health: number = 20
let potionUsed: boolean = false
let weapon: Card | null
let monster: Card | null
let monsters: Array<Card> = []
let selectedCard: Card

function populateRoom () {
    deckDiv.classList.remove("choice")
    potionUsed = false

    //add listener to card left from previous turn
    addListenersToRoomCards()
    
    if (avoidBtnClicked == false) avoidBtn.disabled = false
    
    roomObj.forEach(slot => {
        if (slot == undefined && deckObj.cards.length > 0)
        {
            const card: Card = deckObj.draw()
            roomObj.splice
        }
        
    });

    for (let i=0; i < roomObj.length; i++)
    {
        if (roomObj[i] == undefined && deckObj.cards.length > 0)
        {
    
                let card: Card = deckObj.draw()

                // put card in room array
                roomObj.splice(i, 1, card)
                appendCardImg(card, "room" + i)
                getDivElementOf(card).addEventListener('click', _listener_dimmer)
        }
    }

    if(deckObj.cards.length === 0 && deckDiv.firstChild)
    { deckDiv.removeChild(deckDiv.firstChild) }
}

function _listener_dimmer() {
    
    let card = getCardObjFrom(event!) 
    let cardImgElement = getImgElementOf(card)
   
    cardImgElement.classList.add("dim")
    selectedCard = card
    avoidBtn.disabled = true
    removeListenersFromRoomDivs()
    
    let selectedCardDiv = getDivElementOf(selectedCard)
    selectedCardDiv.addEventListener('click', _listener_unclick, {once: true})

    if(selectedCard.suit == Suit.Hearts)
    {
        discardPileDiv?.classList.add("choice")
        discardPileDiv?.addEventListener('click', _listener_resolveSelectedCard, {once: true})
    }
    else if(selectedCard.suit == Suit.Diamonds)
    {
        weaponDiv?.classList.add("choice")
        weaponDiv?.addEventListener('click', _listener_resolveSelectedCard, {once: true})
    }
    else if (selectedCard.suit == Suit.Clubs || selectedCard.suit == Suit.Spades)
    {
        discardPileDiv?.classList.add("choice")
        discardPileDiv?.addEventListener('click', _listener_resolveSelectedCard, {once: true})

        if(weapon && monsters.length == 0 )
        {
             weaponDiv?.classList.add("choice")
             weaponDiv?.addEventListener('click', _listener_resolveSelectedCard, {once: true})
        }
        else if (weapon && selectedCard!.rank < monsters[monsters.length-1].rank)
        {
            let lastMonster = monsters[monsters.length-1]
            let lastMonsterDiv = getDivElementOf(lastMonster)
            lastMonsterDiv.classList.add("choice")
            lastMonsterDiv.addEventListener('click', _listener_resolveSelectedCard, {once: true})
        } 
    }
}

function _listener_unclick(){
    event!.stopImmediatePropagation();
      
    if(!avoidBtnClicked && !roomObj.includes(undefined)) {avoidBtn.disabled = false}
    
    getImgElementOf(selectedCard).classList.remove("dim")

    let card = selectedCard

    if(card.suit == Suit.Hearts)
    {
        discardPileDiv?.classList.remove("choice")
        discardPileDiv?.removeEventListener('click', _listener_resolveSelectedCard)
    }
    else if(card.suit == Suit.Diamonds)
    {
        weaponDiv?.classList.remove("choice")
        weaponDiv?.removeEventListener('click', _listener_resolveSelectedCard)
    }
    else if (card.suit == Suit.Clubs || card.suit == Suit.Spades)
    {
        discardPileDiv?.classList.remove("choice")
        discardPileDiv?.removeEventListener('click', _listener_resolveSelectedCard)

        if(weapon && (monsters.length == 0) )
        {
             weaponDiv?.classList.remove("choice")
             weaponDiv?.removeEventListener('click', _listener_resolveSelectedCard)
        }
        else if (weapon && selectedCard!.rank < monsters[monsters.length-1].rank)
        {
            let lastMonster = monsters[monsters.length-1]
            let lastMonsterDiv = getDivElementOf(lastMonster)
            lastMonsterDiv.classList.remove("choice")
            lastMonsterDiv.removeEventListener('click', _listener_resolveSelectedCard)
        }  
    }

    addListenersToRoomCards()
    if(avoidBtnClicked === false && !roomObj.includes(undefined)) { avoidBtn.disabled = false}
}

function _listener_resolveSelectedCard() {
    
    let div = event?.currentTarget as HTMLDivElement
    let selectedCardDiv = getDivElementOf(selectedCard)
    selectedCardDiv.removeEventListener('click', _listener_unclick)
    
    if (selectedCard.suit == Suit.Hearts)
    {
        // let potion = selectedCard
        takePotion(selectedCard)
    } 
    else if (selectedCard.suit == Suit.Diamonds)
    {
        equipWeapon(selectedCard)
    }
    else
    {
        // monster = selectedCard
        fightMonster(selectedCard, event!)
    }
    
    if(health < 1)
    {
        removeListenersFromRoomDivs()
        deckDiv.removeEventListener('click', populateRoom)
        document.getElementById("title")!.innerHTML = "You lost... Your score is " + getScore() + " pts"
        return
    }
    addListenersToRoomCards()
    isTurnFinished()
    if(deckObj.cards.length<1 && roomObj.every( (slot) => slot === undefined))
    {
        document.getElementById("title")!.innerHTML = "You Won! Your score is amazballs " + getScore() + " pts"
    }
    if(!avoidBtn.disabled) { avoidBtn.disabled = true}
}

function isTurnFinished() {
  
    if(roomObj.filter(element => element !== undefined).length == 1)
    {
        if(deckObj.cards.length < 1)
        {
            return
        }
        addListenerToDeck()
        removeListenersFromRoomDivs()
        avoidBtnClicked = false
    }
}

function takePotion(potion: Card) {
    let potionDiv = getDivElementOf(potion)

    discardPileDiv.classList.remove("choice")

    if(discardPile.length === 0)
    { 
        appendCardBackImg() 
    } 
    discardPile.unshift(potion)
    
    removeCardObjFrom(potionDiv.id)
    removeCardImage(potion)
    
    if(potionUsed == false)
    {
        health += potion.rank
        if(health > 20) {health = 20}
        healthDisplay!.childNodes[0].textContent = String(health)
    }

    potionUsed = true
}

function equipWeapon(newWeapon: Card) {
    if(weapon){
        if(discardPile.length === 0){ appendCardBackImg() }
        discardPile.unshift(weapon)
        removeCardImageFrom("weapon") 
        weaponDiv.classList.remove("choice")
        monsters.forEach(card => {
            discardPile.unshift(card) 
            removeCardImage(card)
        });
        monsters = []    
        for(let i=0; i<10; i++)
        {
            let div =  document.getElementById("monster" + i)
            div!.style.zIndex = "0"
        }
    }

    weaponDiv.classList.remove("choice")
    weaponDiv.classList.remove("empty")
    removeCardObjFrom(getDivElementOf(newWeapon).id)
    removeCardImage(newWeapon)
    
    appendCardImg(newWeapon, "weapon") 
    
    weapon = newWeapon
}

function fightMonster (monster: Card, event: Event) :void {
    let div = event.currentTarget as HTMLDivElement
    
    removeCardObjFrom(getDivElementOf(monster).id)
    removeCardImageFrom(getDivElementOf(monster).id)

    if(div.id === "discard-pile")
    {
        discardPileDiv.classList.remove("choice")
        weaponDiv.classList.remove("choice")
        if(monsters.length > 0)
        {
            let lastMonster = monsters[monsters.length - 1];
            let lastMonsterDiv = getDivElementOf(lastMonster);
            lastMonsterDiv.classList.remove("choice");
            lastMonsterDiv.removeEventListener('click', _listener_resolveSelectedCard)
        }
        
        if(discardPile.length === 0){ appendCardBackImg() }
        discardPile.unshift(monster)
        
        health -= monster.rank
        updateHealthDisplay()
    }
    else if(div.id === "weapon")
    { 
        weaponDiv.classList.remove("choice")
        discardPileDiv.classList.remove("choice")
        monsters.push(monster)
        renderMonsters()
        let damage = Math.max(0, monster!.rank - weapon!.rank)
        health = health - damage
        updateHealthDisplay()
    }
    else if(div.id.slice(0,-1) === "monster")
    {
        discardPileDiv.classList.remove("choice")
        div.classList.remove("choice")
        monsters.push(monster)
        renderMonsters()
        let damage = Math.max(0, monster!.rank - weapon!.rank)
        health = health - damage
        updateHealthDisplay()
    }
}

function addListenerToDeck() {
    deckDiv.classList.add("choice")
    deckDiv.addEventListener('click', () => { populateRoom() }, {once: true})
}

function addListenersToRoomCards(){
    roomObj.forEach(card => {
        if(card !== undefined)
        {
            getDivElementOf(card).addEventListener('click', _listener_dimmer)
        }
    })
}

function removeListenersFromRoomDivs(){
    roomObj.forEach(element => {
        if(element !== undefined)
        {
            getDivElementOf(element!).removeEventListener('click', _listener_dimmer)
        }
    });
}

function removeListenerFrom(location: HTMLElement){
    if(location === deckDiv)
    {
        deckDiv.classList.remove("choice")
        deckDiv.removeEventListener('click', () => { populateRoom() })
    }
}

function appendCardBackImg() {
    let img = document.createElement("img")
    img.src = "./images/cards_png/purple_back.png"
    discardPileDiv.appendChild(img)
    discardPileDiv.classList.remove("empty")  
}

function updateHealthDisplay(){
    healthDisplay!.childNodes[0].textContent = String(health)
}

function renderMonsters(){ 
    for(let i = 0; i < monsters.length; i++)
    {
        let divElement = document.getElementById("monster" + i)
        
        if(divElement?.firstChild)
        {
            divElement.removeChild(divElement.firstChild)
        }
        appendCardImg(monsters[i] as Card, "monster" + i)

        divElement!.style.zIndex = String(1 + i)
    }    
}

function getScore() :number {
    let score: number = health
    if(health < 1)
    {
        let monsters: Array<Card> = deckObj.cards.filter((card) => {
            if(card.suit === Suit.Spades || card.suit === Suit.Clubs)
            { return true }
        })
        score -= monsters.reduce((sum, monster) => { return sum + monster.rank}, 0)
    }
    else if (deckObj.cards.length === 0)
    {
        score = health
        if(score === 20 && discardPile[0].suit === Suit.Hearts)
        {
            score += discardPile[0].rank
        }
    }
    return score
}

function getDivElementOf(card: Card) :HTMLElement {
    return document.getElementById(card.code)?.parentElement as HTMLElement
}

function getImgElementOf(card: Card) :HTMLImageElement {
    return document.getElementById(card.code) as HTMLImageElement
}

function getCardObjFrom(event: Event): Card {
    let img: HTMLImageElement = event.srcElement as HTMLImageElement

    let card = roomObj.find(c => 
        { 
            if(c !== undefined)
            {
                return c.code === img.id 
            }
        }) as Card
    
    return card
}

function removeCardObjFrom(divId: string) {

    if(divId.slice(0,-1) === 'room')
    {
        delete roomObj[Number(divId.charAt(divId.length-1))]
    }
    else if(divId === 'weapon')
    {
        weapon = null
    }
}

function removeCardImageFrom(divId: string) :void {
    let cardDivElement = document.getElementById(divId)
    cardDivElement?.removeChild(cardDivElement!.firstChild!)
}

function removeCardImage(card: Card) {

    let imgElement = document.getElementById(card.code)
    if(imgElement?.parentNode)
    {
        imgElement.parentNode.removeChild(imgElement)
    }
}

function appendCardImg (card: Card, divId: string) :void {
    
    let img = document.createElement("img") 
    img.src = card.image
    img.setAttribute("id", card.code)

    let div = document.getElementById(divId)
    if(div?.firstChild)
    {
        let prevImg = div!.querySelector("img")
        div?.removeChild(prevImg!) 
    }
    div?.appendChild(img)
}

function printRoomCards () {
    for(let i=0; i<roomObj.length; i++)
    {
        if(roomObj[i] === undefined)
        {
            console.log("undefined")
        }
        else
        {
        console.log(roomObj[i]!.name + " " + roomObj[i]!.code)
        }
    }
}

function removeElementFromArr (arrayAndIndex: string){
    //evaluates array access
    let f = new Function("delete " + arrayAndIndex)
    f()
}

function getCardImgElementFrom(e: Event) :HTMLImageElement{
   
    let imgElement = e.target as HTMLImageElement
    
    return imgElement
}
