// snak.js - UPGRADED SNAK INTERPRETER
class SnakObject {
    constructor(name) {
        this.name = name;
        this.snakked = false;
        this.snakkable = true;
    }

    snak() {
        if (this.snakkable) {
            this.snakked = true;
            console.log(`${this.name} has been SNAAAKKED 🍬`);
        } else {
            console.error(`${this.name} is not snakkable ❌`);
        }
    }

    unsnak() {
        if (this.snakked) {
            this.snakked = false;
            console.log(`${this.name} has been UNSNAKKED 😌`);
        } else {
            console.error(`${this.name} was not snakked ❌`);
        }
    }

    IsSnakked() {
        return this.snakked;
    }
}

// global object storage
const snakObjects = {};

// main SNAK runner
function runSnak(code) {
    const lines = code.split('\n');

    lines.forEach((line, index) => {
        const lineNum = index + 1;
        line = line.trim();

        if (line.length === 0) return; // skip empty lines

        // create object
        const matchCreate = line.match(/^newSnak\("([A-Za-z]\w*)"\)$/);
        if (matchCreate) {
            const name = matchCreate[1];
            if (snakObjects[name]) {
                console.warn(`Line ${lineNum}: ${name} already exists, skipping creation ⚠️`);
            } else {
                snakObjects[name] = new SnakObject(name);
                console.log(`Line ${lineNum}: ${name} created as a snackable object 🦌`);
            }
            return;
        }

        // snak or unsnak
        const matchAction = line.match(/^([A-Za-z]\w*):(snak|unsnak)\(\)$/);
        if (matchAction) {
            const objName = matchAction[1];
            const action = matchAction[2];

            if (!snakObjects[objName]) {
                console.error(`Line ${lineNum}: Object "${objName}" does not exist ❌`);
            } else {
                snakObjects[objName][action]();
            }
            return;
        }

        // if we reach here, the command is invalid
        console.error(`Line ${lineNum}: Invalid command -> "${line}" ❌`);
    });
}
