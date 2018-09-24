class GameState{

    constructor(){
    this.levelData = [
        {seed: 17191,  colors:1, dups: 6},
        {seed: 16149, colors:1, dups: 4},
        {seed: 3191, colors:2, dups: 2},
        {seed: 7791, colors:2, dups: 1},

        {seed: 11111,  colors:2, dups: 6},
        {seed: 111511, colors:2, dups: 4},
        {seed: 113111, colors:2, dups: 2},
        {seed: 111121, colors:2, dups: 1},

        {seed: 22422,  colors:3, dups: 6},
        {seed: 23222,  colors:3, dups: 4},
        {seed: 22272,  colors:3, dups: 2},
        {seed: 224272, colors:3, dups: 1},

        {seed: 33343,  colors:4, dups: 6},
        {seed: 33333,  colors:4, dups: 4},
        {seed: 32333,  colors:4, dups: 2},
        {seed: 33383,  colors:4, dups: 1},

        {seed: 4444,   colors:5, dups: 6},
        {seed: 44454,  colors:5, dups: 4},
        {seed: 44344,  colors:5, dups: 2},
        {seed: 42444,  colors:5, dups: 1},

        {seed: 5555,   colors:6, dups: 6},
        {seed: 55355,  colors:6, dups: 4},
        {seed: 55255,  colors:6, dups: 2},
        {seed: 55755,  colors:6, dups: 1},

        {seed: 4444,   colors:7, dups: 6},
        {seed: 44544,  colors:7, dups: 4},
        {seed: 42444,  colors:7, dups: 2},
        {seed: 44484,  colors:7, dups: 1},

        {seed: 5555,   colors:8, dups: 6},
        {seed: 54345,  colors:8, dups: 4},
        {seed: 25633,  colors:8, dups: 2},
        {seed: 9735,   colors:8, dups: 1}

    ];
    this.level = -1;
    this.gameState = "splash";
    this.lastState = "";
    this.mode;
    this.showCenter = true;
    this.gemsSelected = 0;
    this.score = 0;
    this.scores = [];
    this.colorCount = [0,0,0,0,0,0,0,0];
    this.initials;
    this.lastScore = 0;
    
    }

}