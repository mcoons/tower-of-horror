class GameState{

    constructor(){
    this.levelData = [
        {seed: 17191, colors:1, dups: 6},
        {seed: 11111, colors:2, dups: 2},
        {seed: 2222,  colors:3, dups: 2},
        {seed: 3333,  colors:4, dups: 2},
        {seed: 4444,  colors:5, dups: 2},
        {seed: 5555,  colors:6, dups: 2},
        {seed: 4444,  colors:7, dups: 2},
        {seed: 4444,  colors:8, dups: 2}
    ];
    this.level = -1;
    this.gameState = "splash";
    this.mode;
    this.showCenter = true;
    this.gemsSelected = 0;
    this.score = 0;
    this.scores = [];
    }

}