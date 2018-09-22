class GameState{

    constructor(){
    this.levelData = [
        {seed: 17191, colors:1},
        {seed: 11111, colors:2},
        {seed: 2222,  colors:3},
        {seed: 3333,  colors:4},
        {seed: 4444,  colors:5},
        {seed: 5555,  colors:6},
        {seed: 4444,  colors:7},
        {seed: 4444,  colors:8}
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