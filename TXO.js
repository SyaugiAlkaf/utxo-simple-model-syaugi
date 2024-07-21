class TXO {
    constructor(owner, amount) {
        this.owner = owner;
        this.amount = amount;
        this.spent = false; // default to false
    }

    spend() {
        this.spent = true;
    }
}

module.exports = TXO;
