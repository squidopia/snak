// snak.js - SUPER UPGRADED SNAK INTERPRETER
class SnakObject {
    constructor(name) {
        this.name = name;
        this.snakked = false;
        this.snakkable = true;
    }

    snak() {
        if (this.snakkable) {
            if (!this.snakked) {
                this.snakked = true;
                console.log(`${this.name} has been SNAAAKKED 🍬`);
                return true;
            } else {
                console.warn(`${this.name} is already snakked ⚠️`);
                return false;
            }
        } else {
            console.error(`${this.name} is not snakkable ❌`);
            return false;
        }
    }

    unsnak() {
        if (this.snakked) {
            this.snakked = false;
            console.log(`${this.name} has been UNSNAKKED 😌`);
            return true;
        } else {
            console.error(`${this.name} was not snakked ❌`);
            return false;
        }
    }

    toggleSnak() {
        if (this.snakked) return this.unsnak();
        else return this.snak();
    }

    forceSnak() {
        this.snakked = true;
        console.log(`${this.name} has been FORCED SNAAAKKED 💥`);
    }

    forceUnsnak() {
        this.snakked = false;
        console.log(`${this.name} has been FORCED UNSNAKKED 💀`);
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
    const errors = [];
    const warnings = [];
    const actions = [];

    lines.forEach((line, index) => {
        const lineNum = index + 1;
        line = line.trim();

        if (line.length === 0) return; // skip empty lines

        // create object
        const matchCreate = line.match(/^newSnak\("([A-Za-z]\w*)"\)$/);
        if (matchCreate) {
            const name = matchCreate[1];
            if (snakObjects[name]) {
                const msg = `Line ${lineNum}: ${name} already exists, skipping creation ⚠️`;
                console.warn(msg);
                warnings.push(msg);
            } else {
                snakObjects[name] = new SnakObject(name);
                const msg = `Line ${lineNum}: ${name} created as a snackable object 🦌`;
                console.log(msg);
                actions.push(msg);
            }
            return;
        }

        // snak, unsnak, toggleSnak, forceSnak, forceUnsnak
        const matchAction = line.match(/^([A-Za-z]\w*):(snak|unsnak|toggleSnak|forceSnak|forceUnsnak)\(\)$/);
        if (matchAction) {
            const objName = matchAction[1];
            const action = matchAction[2];

            if (!snakObjects[objName]) {
                const msg = `Line ${lineNum}: Object "${objName}" does not exist ❌`;
                console.error(msg);
                errors.push(msg);
            } else {
                const result = snakObjects[objName][action]();
                if (result === true) actions.push(`Line ${lineNum}: ${objName}.${action} executed ✅`);
            }
            return;
        }

        // invalid command
        const msg = `Line ${lineNum}: Invalid command -> "${line}" ❌`;
        console.error(msg);
        errors.push(msg);
    });

    // return summary report
    return { errors, warnings, actions };
}
