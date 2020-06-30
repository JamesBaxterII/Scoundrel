export enum Suit {
    Spades, Clubs, Diamonds, Hearts
};


export class Card {
    public readonly rank: number
    public readonly suit: Suit
    public readonly image: string

    public constructor (rank: number, suit: Suit) {
        this.rank = rank
        this.suit = suit  
        this.image = "./images/cards_png/" + this.rankName.substring(0,1) + this.suitName.substring(0,1) + ".png"
    }

    private static rankNames = ['Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King']

    public get rankName(): string
    {
        return Card.rankNames[this.rank-1]
    }

    public get suitName(): string
    {
        return Suit[this.suit]
    }

    public get name (): string 
    {
        return this.rankName + " of " + this.suitName
    }

}
