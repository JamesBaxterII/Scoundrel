export enum Suit {
    Spades, Clubs, Diamonds, Hearts
};


export class Card {
    private _rank: number    
    public readonly suit: Suit
    private _image: string
    

    public constructor (rank: number, suit: Suit) {
        this._rank = rank
        this.suit = suit  
        this._image = "./images/cards_png/" + this.rankName.substring(0,1) + this.suitName.substring(0,1) + ".png"
        if(this.rankName.substring(0,1) == "1")
        {
            this._image = "./images/cards_png/10" + this.suitName.substring(0,1) + ".png"
        }
    }

    // private static rankNames: Array<string> = ['Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King']

    private static rankNames: Array<string> = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace']

    public get rank(): number {
        return this._rank
    }

    public get rankName(): string
    {
        return Card.rankNames[this.rank-2]
    }

    public get suitName(): string
    {
        return Suit[this.suit]
    }

    public get image(): string {
        return this._image
    }

    public get name(): string 
    {
        return this.rankName + " of " + this.suitName
    }

    public get code(): string{
        
        let code: string
        code = this.rankName.charAt(0) + this.suitName.charAt(0)
        if(code.charAt(0) === "1"){
            return code.slice(0,1) + "0" + code.slice(1,2)
        }
        return code
    }
}
