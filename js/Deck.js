define(["require", "exports", "./Card"], function (require, exports, Card_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Deck = void 0;
    var Deck = /** @class */ (function () {
        function Deck() {
            this._cards = [];
            for (var suit = 0; suit < 4; suit++) {
                for (var rank = 2; rank <= 14; rank++) {
                    this._cards.push(new Card_1.Card(rank, suit));
                }
            }
        }
        Deck.prototype.shuffle = function () {
            var rand;
            var temp = null;
            for (var i = 0; i < this._cards.length; i++) {
                rand = Math.floor(Math.random() * this._cards.length);
                temp = this._cards[i];
                this._cards[i] = this._cards[rand];
                this._cards[rand] = temp;
            }
        };
        Deck.prototype.draw = function () {
            return this._cards.shift();
        };
        Deck.prototype._cardsLeft = function () {
            return this._cards.length;
        };
        Object.defineProperty(Deck.prototype, "cards", {
            get: function () {
                return this._cards;
            },
            set: function (value) {
                this._cards = value;
            },
            enumerable: false,
            configurable: true
        });
        return Deck;
    }());
    exports.Deck = Deck;
});
