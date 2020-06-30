define(["require", "exports", "./Card", "./Deck"], function (require, exports, Card_1, Deck_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var avoidBtn = document.getElementById("avoid-button");
    avoidBtn.addEventListener('click', _listener_avoid);
    //test comment
    function _listener_avoid() {
        removeListenersFromRoomDivs();
        if (deckObj.cards.length === 0) {
            var img = document.createElement("img");
            img.src = "./images/cards_png/purple_back.png";
            deckDiv.appendChild(img);
        }
        roomObj.forEach(function (card) {
            removeCardImage(card);
            deckObj.cards.push(card);
            delete roomObj[roomObj.indexOf(card)];
        });
        addListenerToDeck();
        avoidBtnClicked = true;
        avoidBtn.disabled = true;
    }
    var avoidBtnClicked = false;
    var healthDisplay = document.getElementById("health-display");
    var weaponDiv = document.getElementById("weapon");
    var discardPileDiv = document.getElementById("discard-pile");
    var deckDiv = document.getElementById("deck");
    var deckObj = createDeck();
    addListenerToDeck();
    function createDeck() {
        var toRemove = ["Jack of Hearts", "Jack of Diamonds",
            "Queen of Hearts", "Queen of Diamonds",
            "King of Hearts", "King of Diamonds",
            "Ace of Hearts", "Ace of Diamonds"];
        var deck = new Deck_1.Deck();
        deck.cards = deck.cards.filter(function (card) { return !toRemove.includes(card.name); });
        deck.shuffle();
        deck.shuffle();
        deck.shuffle();
        return deck;
    }
    var roomObj = new Array(4);
    var discardPile = new Array();
    var health = 20;
    var potionUsed = false;
    var weapon;
    var monster;
    var monsters = [];
    var selectedCard;
    function populateRoom() {
        deckDiv.classList.remove("choice");
        potionUsed = false;
        //add listener to card left from previous turn
        addListenersToRoomCards();
        if (avoidBtnClicked == false)
            avoidBtn.disabled = false;
        roomObj.forEach(function (slot) {
            if (slot == undefined && deckObj.cards.length > 0) {
                var card = deckObj.draw();
                roomObj.splice;
            }
        });
        for (var i = 0; i < roomObj.length; i++) {
            if (roomObj[i] == undefined && deckObj.cards.length > 0) {
                var card = deckObj.draw();
                // put card in room array
                roomObj.splice(i, 1, card);
                appendCardImg(card, "room" + i);
                getDivElementOf(card).addEventListener('click', _listener_dimmer);
            }
        }
        if (deckObj.cards.length === 0 && deckDiv.firstChild) {
            deckDiv.removeChild(deckDiv.firstChild);
        }
    }
    function _listener_dimmer() {
        var card = getCardObjFrom(event);
        var cardImgElement = getImgElementOf(card);
        cardImgElement.classList.add("dim");
        selectedCard = card;
        avoidBtn.disabled = true;
        removeListenersFromRoomDivs();
        var selectedCardDiv = getDivElementOf(selectedCard);
        selectedCardDiv.addEventListener('click', _listener_unclick, { once: true });
        if (selectedCard.suit == Card_1.Suit.Hearts) {
            discardPileDiv === null || discardPileDiv === void 0 ? void 0 : discardPileDiv.classList.add("choice");
            discardPileDiv === null || discardPileDiv === void 0 ? void 0 : discardPileDiv.addEventListener('click', _listener_resolveSelectedCard, { once: true });
        }
        else if (selectedCard.suit == Card_1.Suit.Diamonds) {
            weaponDiv === null || weaponDiv === void 0 ? void 0 : weaponDiv.classList.add("choice");
            weaponDiv === null || weaponDiv === void 0 ? void 0 : weaponDiv.addEventListener('click', _listener_resolveSelectedCard, { once: true });
        }
        else if (selectedCard.suit == Card_1.Suit.Clubs || selectedCard.suit == Card_1.Suit.Spades) {
            discardPileDiv === null || discardPileDiv === void 0 ? void 0 : discardPileDiv.classList.add("choice");
            discardPileDiv === null || discardPileDiv === void 0 ? void 0 : discardPileDiv.addEventListener('click', _listener_resolveSelectedCard, { once: true });
            if (weapon && monsters.length == 0) {
                weaponDiv === null || weaponDiv === void 0 ? void 0 : weaponDiv.classList.add("choice");
                weaponDiv === null || weaponDiv === void 0 ? void 0 : weaponDiv.addEventListener('click', _listener_resolveSelectedCard, { once: true });
            }
            else if (weapon && selectedCard.rank < monsters[monsters.length - 1].rank) {
                var lastMonster = monsters[monsters.length - 1];
                var lastMonsterDiv = getDivElementOf(lastMonster);
                lastMonsterDiv.classList.add("choice");
                lastMonsterDiv.addEventListener('click', _listener_resolveSelectedCard, { once: true });
            }
        }
    }
    function _listener_unclick() {
        event.stopImmediatePropagation();
        if (!avoidBtnClicked && !roomObj.includes(undefined)) {
            avoidBtn.disabled = false;
        }
        getImgElementOf(selectedCard).classList.remove("dim");
        var card = selectedCard;
        if (card.suit == Card_1.Suit.Hearts) {
            discardPileDiv === null || discardPileDiv === void 0 ? void 0 : discardPileDiv.classList.remove("choice");
            discardPileDiv === null || discardPileDiv === void 0 ? void 0 : discardPileDiv.removeEventListener('click', _listener_resolveSelectedCard);
        }
        else if (card.suit == Card_1.Suit.Diamonds) {
            weaponDiv === null || weaponDiv === void 0 ? void 0 : weaponDiv.classList.remove("choice");
            weaponDiv === null || weaponDiv === void 0 ? void 0 : weaponDiv.removeEventListener('click', _listener_resolveSelectedCard);
        }
        else if (card.suit == Card_1.Suit.Clubs || card.suit == Card_1.Suit.Spades) {
            discardPileDiv === null || discardPileDiv === void 0 ? void 0 : discardPileDiv.classList.remove("choice");
            discardPileDiv === null || discardPileDiv === void 0 ? void 0 : discardPileDiv.removeEventListener('click', _listener_resolveSelectedCard);
            if (weapon && (monsters.length == 0)) {
                weaponDiv === null || weaponDiv === void 0 ? void 0 : weaponDiv.classList.remove("choice");
                weaponDiv === null || weaponDiv === void 0 ? void 0 : weaponDiv.removeEventListener('click', _listener_resolveSelectedCard);
            }
            else if (weapon && selectedCard.rank < monsters[monsters.length - 1].rank) {
                var lastMonster = monsters[monsters.length - 1];
                var lastMonsterDiv = getDivElementOf(lastMonster);
                lastMonsterDiv.classList.remove("choice");
                lastMonsterDiv.removeEventListener('click', _listener_resolveSelectedCard);
            }
        }
        addListenersToRoomCards();
        if (avoidBtnClicked === false && !roomObj.includes(undefined)) {
            avoidBtn.disabled = false;
        }
    }
    function _listener_resolveSelectedCard() {
        var div = event === null || event === void 0 ? void 0 : event.currentTarget;
        var selectedCardDiv = getDivElementOf(selectedCard);
        selectedCardDiv.removeEventListener('click', _listener_unclick);
        if (selectedCard.suit == Card_1.Suit.Hearts) {
            // let potion = selectedCard
            takePotion(selectedCard);
        }
        else if (selectedCard.suit == Card_1.Suit.Diamonds) {
            equipWeapon(selectedCard);
        }
        else {
            // monster = selectedCard
            fightMonster(selectedCard, event);
        }
        if (health < 1) {
            removeListenersFromRoomDivs();
            deckDiv.removeEventListener('click', populateRoom);
            document.getElementById("title").innerHTML = "You lost... Your score is " + getScore() + " pts";
            return;
        }
        addListenersToRoomCards();
        isTurnFinished();
        if (deckObj.cards.length < 1 && roomObj.every(function (slot) { return slot === undefined; })) {
            document.getElementById("title").innerHTML = "You Won! Your score is amazballs " + getScore() + " pts";
        }
        if (!avoidBtn.disabled) {
            avoidBtn.disabled = true;
        }
    }
    function isTurnFinished() {
        if (roomObj.filter(function (element) { return element !== undefined; }).length == 1) {
            if (deckObj.cards.length < 1) {
                return;
            }
            addListenerToDeck();
            removeListenersFromRoomDivs();
            avoidBtnClicked = false;
        }
    }
    function takePotion(potion) {
        var potionDiv = getDivElementOf(potion);
        discardPileDiv.classList.remove("choice");
        if (discardPile.length === 0) {
            appendCardBackImg();
        }
        discardPile.unshift(potion);
        removeCardObjFrom(potionDiv.id);
        removeCardImage(potion);
        if (potionUsed == false) {
            health += potion.rank;
            if (health > 20) {
                health = 20;
            }
            healthDisplay.childNodes[0].textContent = String(health);
        }
        potionUsed = true;
    }
    function equipWeapon(newWeapon) {
        if (weapon) {
            if (discardPile.length === 0) {
                appendCardBackImg();
            }
            discardPile.unshift(weapon);
            removeCardImageFrom("weapon");
            weaponDiv.classList.remove("choice");
            monsters.forEach(function (card) {
                discardPile.unshift(card);
                removeCardImage(card);
            });
            monsters = [];
            for (var i = 0; i < 10; i++) {
                var div = document.getElementById("monster" + i);
                div.style.zIndex = "0";
            }
        }
        weaponDiv.classList.remove("choice");
        weaponDiv.classList.remove("empty");
        removeCardObjFrom(getDivElementOf(newWeapon).id);
        removeCardImage(newWeapon);
        appendCardImg(newWeapon, "weapon");
        weapon = newWeapon;
    }
    function fightMonster(monster, event) {
        var div = event.currentTarget;
        removeCardObjFrom(getDivElementOf(monster).id);
        removeCardImageFrom(getDivElementOf(monster).id);
        if (div.id === "discard-pile") {
            discardPileDiv.classList.remove("choice");
            weaponDiv.classList.remove("choice");
            if (monsters.length > 0) {
                var lastMonster = monsters[monsters.length - 1];
                var lastMonsterDiv = getDivElementOf(lastMonster);
                lastMonsterDiv.classList.remove("choice");
                lastMonsterDiv.removeEventListener('click', _listener_resolveSelectedCard);
            }
            if (discardPile.length === 0) {
                appendCardBackImg();
            }
            discardPile.unshift(monster);
            health -= monster.rank;
            updateHealthDisplay();
        }
        else if (div.id === "weapon") {
            weaponDiv.classList.remove("choice");
            discardPileDiv.classList.remove("choice");
            monsters.push(monster);
            renderMonsters();
            var damage = Math.max(0, monster.rank - weapon.rank);
            health = health - damage;
            updateHealthDisplay();
        }
        else if (div.id.slice(0, -1) === "monster") {
            discardPileDiv.classList.remove("choice");
            div.classList.remove("choice");
            monsters.push(monster);
            renderMonsters();
            var damage = Math.max(0, monster.rank - weapon.rank);
            health = health - damage;
            updateHealthDisplay();
        }
    }
    function addListenerToDeck() {
        deckDiv.classList.add("choice");
        deckDiv.addEventListener('click', function () { populateRoom(); }, { once: true });
    }
    function addListenersToRoomCards() {
        roomObj.forEach(function (card) {
            if (card !== undefined) {
                getDivElementOf(card).addEventListener('click', _listener_dimmer);
            }
        });
    }
    function removeListenersFromRoomDivs() {
        roomObj.forEach(function (element) {
            if (element !== undefined) {
                getDivElementOf(element).removeEventListener('click', _listener_dimmer);
            }
        });
    }
    function removeListenerFrom(location) {
        if (location === deckDiv) {
            deckDiv.classList.remove("choice");
            deckDiv.removeEventListener('click', function () { populateRoom(); });
        }
    }
    function appendCardBackImg() {
        var img = document.createElement("img");
        img.src = "./images/cards_png/purple_back.png";
        discardPileDiv.appendChild(img);
        discardPileDiv.classList.remove("empty");
    }
    function updateHealthDisplay() {
        healthDisplay.childNodes[0].textContent = String(health);
    }
    function renderMonsters() {
        for (var i = 0; i < monsters.length; i++) {
            var divElement = document.getElementById("monster" + i);
            if (divElement === null || divElement === void 0 ? void 0 : divElement.firstChild) {
                divElement.removeChild(divElement.firstChild);
            }
            appendCardImg(monsters[i], "monster" + i);
            divElement.style.zIndex = String(1 + i);
        }
    }
    function getScore() {
        var score = health;
        if (health < 1) {
            var monsters_1 = deckObj.cards.filter(function (card) {
                if (card.suit === Card_1.Suit.Spades || card.suit === Card_1.Suit.Clubs) {
                    return true;
                }
            });
            score -= monsters_1.reduce(function (sum, monster) { return sum + monster.rank; }, 0);
        }
        else if (deckObj.cards.length === 0) {
            score = health;
            if (score === 20 && discardPile[0].suit === Card_1.Suit.Hearts) {
                score += discardPile[0].rank;
            }
        }
        return score;
    }
    function getDivElementOf(card) {
        var _a;
        return (_a = document.getElementById(card.code)) === null || _a === void 0 ? void 0 : _a.parentElement;
    }
    function getImgElementOf(card) {
        return document.getElementById(card.code);
    }
    function getCardObjFrom(event) {
        var img = event.srcElement;
        var card = roomObj.find(function (c) {
            if (c !== undefined) {
                return c.code === img.id;
            }
        });
        return card;
    }
    function removeCardObjFrom(divId) {
        if (divId.slice(0, -1) === 'room') {
            delete roomObj[Number(divId.charAt(divId.length - 1))];
        }
        else if (divId === 'weapon') {
            weapon = null;
        }
    }
    function removeCardImageFrom(divId) {
        var cardDivElement = document.getElementById(divId);
        cardDivElement === null || cardDivElement === void 0 ? void 0 : cardDivElement.removeChild(cardDivElement.firstChild);
    }
    function removeCardImage(card) {
        var imgElement = document.getElementById(card.code);
        if (imgElement === null || imgElement === void 0 ? void 0 : imgElement.parentNode) {
            imgElement.parentNode.removeChild(imgElement);
        }
    }
    function appendCardImg(card, divId) {
        var img = document.createElement("img");
        img.src = card.image;
        img.setAttribute("id", card.code);
        var div = document.getElementById(divId);
        if (div === null || div === void 0 ? void 0 : div.firstChild) {
            var prevImg = div.querySelector("img");
            div === null || div === void 0 ? void 0 : div.removeChild(prevImg);
        }
        div === null || div === void 0 ? void 0 : div.appendChild(img);
    }
    function printRoomCards() {
        for (var i = 0; i < roomObj.length; i++) {
            if (roomObj[i] === undefined) {
                console.log("undefined");
            }
            else {
                console.log(roomObj[i].name + " " + roomObj[i].code);
            }
        }
    }
    function removeElementFromArr(arrayAndIndex) {
        //evaluates array access
        var f = new Function("delete " + arrayAndIndex);
        f();
    }
    function getCardImgElementFrom(e) {
        var imgElement = e.target;
        return imgElement;
    }
});
