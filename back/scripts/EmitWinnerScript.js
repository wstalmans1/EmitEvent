// Import ethers from Hardhat package
const { ethers } = require("hardhat");

async function main() {
    // The address of the deployed EmitWinner contract
    const deployedAddress = "0xf0286F55949e21e102331E81b912ADE392eed8Ef"; // Replace with your actual contract address
    
    // Getting a signer from the list of accounts
    const [signer] = await ethers.getSigners();
    console.log("Using account:", signer.address);

    // Attach the existing contract with a specific signer
    const EmitWinner = await ethers.getContractFactory("EmitWinner", signer);
    const emitWinner = EmitWinner.attach(deployedAddress);

    // Call the attempt function using the signer
    try {
        const transactionResponse = await emitWinner.attempt();
        const receipt = await transactionResponse.wait();
        console.log("attempt() was called successfully. Transaction hash:", transactionResponse.hash);
    } catch (error) {
        console.error("Error calling attempt():", error);
    }
}

// Run the script using Hardhat's runtime environment
main().catch(error => {
    console.error("Script failed:", error);
    process.exit(1);
});
