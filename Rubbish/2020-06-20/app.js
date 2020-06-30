define(["require", "exports", "./Card", "./Deck"], function (require, exports, Card_1, Deck_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var avoidBtn = document.getElementById("avoid-button");
    var healthDisplay = document.getElementById("health-display");
    var deckImg = document.getElementById("deck");
    var deckObj = createDeck();
    var roomObj = new Array(4);
    var discardPile = new Array();
    var health = 20;
    var weapon;
    var monsters;
    function getCardObjFrom(event) {
        var e = event;
        var img = getCardcardContainer(event);
        var card;
        var cardCode = img.src.substring(img.src.length - 6, img.src.length - 4);
        if (cardCode.charAt(0) === "0") {
            cardCode = "1" + cardCode;
        }
        card = roomObj.find(function (c) { return c.code === cardCode; });
        return card;
    }
    function getEventLocation(event) {
        var img = event.target;
        return img;
    }
    function _listener_resolveCard() {
        var card = getCardObjFrom(event);
        var location = getEventLocation(event);
        // console.log("Card in _listener_resolveCard() is: " + card?.name)
        location === null || location === void 0 ? void 0 : location.removeEventListener('click', _listener_resolveCard);
        resolveCard(card);
        //remove EventListener
    }
    avoidBtn.addEventListener('click', _listener_resolveCard);
    // avoidBtn!.addEventListener('click', () =>
    // {
    //     console.log("avoid btn clicked")
    // })
    deckImg.addEventListener('click', function () {
        populateRoom();
    });
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
    function populateRoom() {
        // if(!isRoomEmpty()){
        //     emptyRoom()
        // }
        var _a;
        for (var i = 0; i < roomObj.length; i++) {
            // if (roomObj[i] == undefined)
            // {
            var card = deckObj.draw();
            // put card in room#
            roomObj.splice(i, 1, card);
            renderCardImg(card.image, "room" + i);
            // add eventListener to the card
            var cardLocation = (_a = document.getElementById("room" + i)) === null || _a === void 0 ? void 0 : _a.firstChild;
            // cardLocation!.addEventListener('click', () => resolveCard(card), {once: true})
            cardLocation.addEventListener('click', _listener_resolveCard);
            // }
        }
    }
    function resolveCard(card) {
        var _a;
        console.log("Card is: " + (card === null || card === void 0 ? void 0 : card.name));
        var cardContainer = getEventLocation(event); //get clicked img element
        if (card.suit == Card_1.Suit.Hearts) {
            removeCardObjFrom(cardContainer.parentElement.id);
            discardPile.unshift(card);
            removeCardImgFrom(cardContainer.parentElement.id);
            health += card.rank;
            // if(health > 20) {health = 20}
            healthDisplay.childNodes[0].textContent = String(health);
        }
        else if (card.suit == Card_1.Suit.Diamonds) {
            if (weapon) {
                discardPile.unshift(weapon);
                removeCardImgFrom("weapon");
            }
            removeCardImgFrom(cardContainer.parentElement.id);
            renderCardImg(card.image, "weapon");
            weapon = card;
        }
        else if (card.suit == Card_1.Suit.Clubs || card.suit == Card_1.Suit.Spades) {
            var weaponCardContainer_1 = document.getElementById("weapon");
            cardContainer.classList.add("dim");
            cardContainer.removeEventListener('click', function () { return resolveCard(card); });
            var _loop_1 = function (i) {
                if (cardContainer.parentElement.id !== "room" + i) {
                    (_a = document.getElementById("room" + i)) === null || _a === void 0 ? void 0 : _a.firstChild.removeEventListener('click', function () { return resolveCard(roomObj[i]); });
                    console.log("listener removed from room " + i);
                }
            };
            //remove other listeners
            for (var i = 0; i < roomObj.length; i++) {
                _loop_1(i);
            }
            if (weapon) {
                weaponCardContainer_1 === null || weaponCardContainer_1 === void 0 ? void 0 : weaponCardContainer_1.classList.add("choice");
                weaponCardContainer_1 === null || weaponCardContainer_1 === void 0 ? void 0 : weaponCardContainer_1.addEventListener('click', function () { return fightMonster(card); }, { once: true });
            }
            var discardPilecardContainer_1 = document.getElementById("discard-pile");
            discardPilecardContainer_1 === null || discardPilecardContainer_1 === void 0 ? void 0 : discardPilecardContainer_1.classList.add("choice");
            discardPilecardContainer_1 === null || discardPilecardContainer_1 === void 0 ? void 0 : discardPilecardContainer_1.addEventListener('click', function () { return fightMonster(card); }, { once: true });
            //add listener in case of unclick
            cardContainer.addEventListener('click', function () {
                var _a;
                cardContainer.classList.remove("dim");
                discardPilecardContainer_1 === null || discardPilecardContainer_1 === void 0 ? void 0 : discardPilecardContainer_1.classList.remove("choice");
                var _loop_2 = function (i) {
                    (_a = document.getElementById("room" + i)) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () { return resolveCard(roomObj[i]); });
                };
                //add listeners to cards in room
                for (var i = 0; i < roomObj.length; i++) {
                    _loop_2(i);
                }
                // cardContainer.addEventListener('click', () => resolveCard(card), {once: true}) // original listener
                //remove listeners which offered choice
                discardPilecardContainer_1 === null || discardPilecardContainer_1 === void 0 ? void 0 : discardPilecardContainer_1.removeEventListener('click', function () { return fightMonster(card); });
                if (weapon) {
                    weaponCardContainer_1 === null || weaponCardContainer_1 === void 0 ? void 0 : weaponCardContainer_1.classList.remove("choice");
                    weaponCardContainer_1.removeEventListener('click', function () { return fightMonster(card); });
                }
            }, { once: true });
        }
    }
    function getCardcardContainer(e) {
        var img = e.target;
        return img;
    }
    function removeCardAt(arrayIndex) {
        //evaluates array access
        var f = new Function("delete " + arrayIndex);
        f();
    }
    function removeCardObjFrom(cardContainerId) {
        var cardcardContainerId = cardContainerId;
        //remove card object
        if (cardcardContainerId.slice(0, -1) === 'room') {
            //room[#] as string
            var roomIndexAccess = cardcardContainerId.slice(0, -1) + "[" + cardcardContainerId.slice(-1) + "]";
            removeCardAt(roomIndexAccess);
        }
        else if (cardcardContainerId === 'weapon') {
            weapon = null;
        }
        else if (cardcardContainerId.slice(0, -1) === "monsters") {
            var monstersIndex = cardcardContainerId.slice(0, -1) + "[" + cardcardContainerId.slice(-1) + "]";
            removeCardAt(monstersIndex);
        }
    }
    function fightMonster(card) {
        var strength = card.rank;
    }
    function renderCardImg(cardImg, cardContainerID) {
        var img = document.createElement("img");
        img.src = cardImg;
        var div = document.getElementById(cardContainerID);
        if (div.firstChild) {
            var prevImg = div.querySelector("img");
            div.removeChild(prevImg);
        }
        div.appendChild(img);
    }
    function removeCardImgFrom(cardContainerID) {
        var cardcardContainer = document.getElementById(cardContainerID);
        cardcardContainer === null || cardcardContainer === void 0 ? void 0 : cardcardContainer.removeChild(cardcardContainer.firstChild);
    }
    function discard(card) {
        // place card on discard pile
        discardPile.unshift(card);
    }
    function printRoomCards() {
        roomObj.forEach(function (card) {
            console.log(card.name);
        });
    }
    function printDeck() {
        deckObj.cards.forEach(function (card) {
            console.log(card.name);
            console.log(card.rank);
        });
    }
    function isRoomEmpty() {
        return roomObj.every(function (card) {
            roomObj[roomObj.indexOf(card)] == undefined;
        });
    }
    function emptyRoom() {
        for (var i = 0; i < roomObj.length; i++) {
            delete roomObj[i];
            var div = document.getElementById("room" + i);
            var img = div.querySelector("img");
            div.removeChild(img);
        }
    }
    function cardsInRoom() {
        var cardsInRoom = new Array();
        roomObj.forEach(function (card) {
            cardsInRoom.push(card.name);
        });
        return cardsInRoom;
    }
    function placeCardObj(card, location) {
        if (location === "weapon") {
            weapon = card;
        }
        else if (location.slice(0, -1) === "monsters") {
            monsters.push(card);
        }
    }
});
