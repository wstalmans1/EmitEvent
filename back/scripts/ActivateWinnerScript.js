// Import ethers from Hardhat package
const { ethers } = require("hardhat");

async function main() {
    // The address of the deployed EmitWinner contract
    const deployedAddress = "0x08758D7d3EE04286525C8809cb469438d33634F8"; // Replace with your actual contract address

    // Getting a signer from the list of accounts
    const [signer] = await ethers.getSigners();
    console.log("Using account:", signer.address);

    // Attach the existing contract with a specific signer
    const ActivateWinner = await ethers.getContractFactory("ActivateWinner", signer);
    const activateWinner = ActivateWinner.attach(deployedAddress);

    // Call the attempt function using the signer
    try {
        const transactionResponse = await activateWinner.activateAttempt();
        const receipt = await transactionResponse.wait();
        console.log("activateAttempt() was called successfully. Transaction hash:", transactionResponse.hash);
    } catch (error) {
        console.error("Error calling activateAttempt():", error);
    }
}

// Run the script using Hardhat's runtime environment
main().catch(error => {
    console.error("Script failed:", error);
    process.exit(1);
});
