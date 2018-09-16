
// Grab bag randomizer class (seeded)

// A bag that holds one of each integer from 0 to 99 <default>
// Numbers can then be drawn from the bag
// You can control the distribution of the 'random' numbers

// The min and max numbers can be set to change the default
// Multiple sets and ranges of numbers can be added to the bag
// All of a certain number can be removed from the bag
// The bag auto-refills when it empties for low maintenance

class GrabBag {
    constructor(min = 0, max = 99, dups = 1, rand) {
        this.bagList = [];

        // Default values to fill the bag with
        this.defaultMin = min;
        this.defaultMax = max;
        this.defaultDups = dups;
        this.rand = rand;
    }

    ///////////////////////////////
    // Property access methods
    ///////////////////////////////

    getMin() { return this.defaultMin; }
    setMin(x) { this.defaultMin = x; }
    getMax() { return this.defaultMax; }
    setMax(x) { this.defaultMax = x; }
    getDups() { return this.defaultDups; }
    setDups(x) { this.defaultDups = x; }
    getSize() { return this.bagList.length; }
    emptyBag() { this.bagList = []; }
    showBag() { return this.bagList.join() }

    ///////////////////////////////
    // Bag manipulation methods
    ///////////////////////////////

    // Default method to fill an empty bag with 
    // numbers using the defaults
    fillBag() {
        emptyBag();
        addDefaultRange();
    }

    // Routine to shuffle the bag contents
    shakeBag() {
        for (var i = this.bagList.length - 1; i >= 0; i--) {
            var randomIndex = Math.floor(this.rand() * (i + 1));
            var tmp = this.bagList[randomIndex];

            this.bagList[randomIndex] = this.bagList[i];
            this.bagList[i] = tmp;
        }
    }

    // Method to add to the bag the range from 
    // 'min' to 'max' in multiples of 'duplicates'
    // Do nothing if 'min' is greater than 'max'
    addRange(min, max, duplicates) {
        if (min > max) return;

        for (let i = 0; i < duplicates; i++)
            for (let j = min; j <= max; j++) {
                let r = Math.floor(this.rand() * this.bagList.length);
                this.bagList.splice(r, 0, j);
            }
    }

    // Default method to add the default range to the 
    // existing contents of the bag
    addDefaultRange() {
        this.addRange(this.defaultMin, this.defaultMax, this.defaultDups);
    }

    // Method to add the specified number 'n' to the 
    // bag 'count' number of times
    addNumber(n, count) {
        for (let i = 0; i < count; i++) {
            let r = Math.floor(this.rand() * this.bagList.length);
            this.bagList.splice(r, 0, n);
        }
    }

    // Method to remove from the bag all occurances of 
    // the specified number 'n'
    // Returns the count of 'n's removed
    removeAllOfNumber(n) {
        let initialCount = this.bagList.length;
        this.bagList = this.bagList.filter(i => i !== n);
        return initialCount - this.bagList.length;
    }

    // Method to remove a random number from the bag and return it.
    // If the bag is empty, first fill it with numbers using the default values.
    getRndNumber() {
        if (this.bagList.length == 0) this.addDefaultRange();
        return this.bagList.splice(this.rand() * this.bagList.length, 1)[0];
    }
}

///////////////////////////////////////////////////////////////////////

// Seeded random number generator to power Grab Bag
// 1993 Park-Miller LCG
// https://gist.github.com/blixt/f17b47c62508be59987b

function LCG(s) {
    return function () {
        s = Math.imul(16807, s) | 0 % 2147483647;
        return (s & 2147483647) / 2147483648;
    }
}

///////////////////////////////////////////////////////////////////////

// Example Usage

// var rand = LCG(17191);  // set the seed for the 'rand' function

// let bag = new GrabBag(0,3,2); // min, max, duplicates

// console.log('----------------')

// for (let i = 0; i < 16; i++){
//   console.log(bag.getRndNumber())
// }

// console.log('----------------')

// rand = LCG(1281);

// bag.emptyBag();
// bag.setMin(-1);
// bag.setMax(1);
// bag.setDups(2);
// bag.addDefaultRange();
// bag.shakeBag();

// for (let i = 0; i < 16; i++){
//   console.log(bag.getRndNumber())
// }

