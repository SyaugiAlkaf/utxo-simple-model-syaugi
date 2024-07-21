class Transaction {
    constructor(inputUTXOs, outputUTXOs) {
        this.inputUTXOs = inputUTXOs;
        this.outputUTXOs = outputUTXOs;
        this.fee = 0; // Initialize the fee property
    }

    execute() {
        // Check for double spending
        for (let utxo of this.inputUTXOs) {
            if (utxo.spent) {
                throw new Error("Cannot execute transaction: Input TXO already spent!");
            }
        }

        // Calculate the total input and output values
        const totalInputValue = this.inputUTXOs.reduce((sum, utxo) => sum + utxo.amount, 0);
        const totalOutputValue = this.outputUTXOs.reduce((sum, utxo) => sum + utxo.amount, 0);

        // Check if the total input value is less than the total output value
        if (totalInputValue < totalOutputValue) {
            throw new Error("Cannot execute transaction: Insufficient input value!");
        }

        // Calculate the transaction fee
        this.fee = totalInputValue - totalOutputValue;

        // If all checks pass, mark the input TXOs as spent
        for (let utxo of this.inputUTXOs) {
            utxo.spend();
        }

        // Additional logic for transaction execution will go here in later stages.
    }
}
module.exports = Transaction;
