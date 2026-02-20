// snak.js
class SnakObject {
    constructor(name) {
        this.name = name;
        this.snakked = false;
        this.snakkable = true;
    }
    snak() {
        if(this.snakkable){
            this.snakked = true;
            console.log(`${this.name} has been SNAAAKKED 🍬`);
        } else {
            console.log(`${this.name} is not snakkable ❌`);
        }
    }
    unsnak() {
        if(this.snakked){
            this.snakked = false;
            console.log(`${this.name} has been UNSNAKKED 😌`);
        } else {
            console.log(`${this.name} was not snakked`);
        }
    }
    IsSnakked(){
        return this.snakked;
    }
}

// global object storage
const snakObjects = {};

// main SNAK runner
function runSnak(code) {
    const lines = code.split('\n');

    lines.forEach(line => {
        line = line.trim();
        if(line.length === 0) return;

        // create object
        const matchCreate = line.match(/^newSnak\("(\w+)"\)/);
        if(matchCreate){
            const name = matchCreate[1];
            snakObjects[name] = new SnakObject(name);
            console.log(`${name} created as a snackable object 🦌`);
            return;
        }

        // snak or unsnak
        const matchAction = line.match(/^(\w+):(snak|unsnak)\(\)/);
        if(matchAction){
            const objName = matchAction[1];
            const action = matchAction[2];
            if(snakObjects[objName]){
                snakObjects[objName][action]();
            } else {
                console.log(`${objName} does not exist ❌`);
            }
            return;
        }
    });
}
