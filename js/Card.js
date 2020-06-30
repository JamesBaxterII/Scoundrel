define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Card = exports.Suit = void 0;
    var Suit;
    (function (Suit) {
        Suit[Suit["Spades"] = 0] = "Spades";
        Suit[Suit["Clubs"] = 1] = "Clubs";
        Suit[Suit["Diamonds"] = 2] = "Diamonds";
        Suit[Suit["Hearts"] = 3] = "Hearts";
    })(Suit = exports.Suit || (exports.Suit = {}));
    ;
    var Card = /** @class */ (function () {
        function Card(rank, suit) {
            this._rank = rank;
            this.suit = suit;
            this._image = "./images/cards_png/" + this.rankName.substring(0, 1) + this.suitName.substring(0, 1) + ".png";
            if (this.rankName.substring(0, 1) == "1") {
                this._image = "./images/cards_png/10" + this.suitName.substring(0, 1) + ".png";
            }
        }
        Object.defineProperty(Card.prototype, "rank", {
            get: function () {
                return this._rank;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Card.prototype, "rankName", {
            get: function () {
                return Card.rankNames[this.rank - 2];
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Card.prototype, "suitName", {
            get: function () {
                return Suit[this.suit];
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Card.prototype, "image", {
            get: function () {
                return this._image;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Card.prototype, "name", {
            get: function () {
                return this.rankName + " of " + this.suitName;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Card.prototype, "code", {
            get: function () {
                var code;
                code = this.rankName.charAt(0) + this.suitName.charAt(0);
                if (code.charAt(0) === "1") {
                    return code.slice(0, 1) + "0" + code.slice(1, 2);
                }
                return code;
            },
            enumerable: false,
            configurable: true
        });
        // private static rankNames: Array<string> = ['Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King']
        Card.rankNames = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];
        return Card;
    }());
    exports.Card = Card;
});
