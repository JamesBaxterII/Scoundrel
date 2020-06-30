"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Deck = void 0;
var Card_1 = require("./Card");
var Deck = /** @class */ (function () {
    function Deck() {
        this.cards = [];
        for (var suit = 0; suit < 4; suit++) {
            for (var rank = 1; rank <= 13; rank++) {
                this.cards.push(new Card_1.Card(rank, suit));
            }
        }
    }
    Deck.prototype.shuffle = function () {
        var rand;
        var temp = null;
        for (var i = 0; i < this.cards.length; i++) {
            rand = Math.floor(Math.random() * this.cards.length);
            temp = this.cards[i];
            this.cards[i] = this.cards[rand];
            this.cards[rand] = temp;
        }
    };
    Deck.prototype.draw = function () {
        return this.cards.shift();
    };
    return Deck;
}());
exports.Deck = Deck;
