define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var avoidBtn = document.querySelector("#avoid-button");
    avoidBtn === null || avoidBtn === void 0 ? void 0 : avoidBtn.addEventListener('click', function () {
        console.log("avoid btn clicked");
    });
});
// let d = new Deck()
// d.shuffle()
// let card = d.draw()
// console.log(card.name)
// console.log(card.image)
