# Intro
This project deploys two smart contracts of which one -activateWinner2.sol- calls the other -emitWinner2.sol- 's function to emit a "winner" event. The smart contracts are deployed through the ignition modules "EmitWinner2.js" and "ActivateWinner2.js" '*'. We access the functionality of the smart contracts through a script: "activateWinner2.js". 

( '*' Hardhat had a hard time verifying activateWinner2.sol, so we verified that contract by using Remix.org.)

In the project's local setup, we use:
* a clean folder structure with one folder for the frontend and one for the backend
* Hardhat for compilation, deployment, testing, verification, ...
* git to sync the project to github.com

# Detailed steps
1. Setup your environment:
    * `mkdir nameoftheproject` (wherever you want to save the project)
    * `cd nameoftheproject` (positioning in the rootfolder)
    * `mkdir frontend backend` (creating subfolders for front- and backend)
    * in each subfolder:
        * `npm init -y`
        * `npm install dotenv` & `touch .env`
        * in the backend .env, insert your environment variables:
            <details>

                RPC_URL=insertblockchainnodeurl  
                PRIVATE_KEY=insertprivatekey 
                ETHSCAN_API=insertapikey
            </details>
    * in backend folder: (see also https://hardhat.org/tutorial)
        * `npm install --save-dev hardhat` & `npx hardhat init` (select `create an empty hardhat.config.js`)
        * `npm install --save-dev @nomicfoundation/hardhat-toolbox`
        * configure hardhat.config.js
            <details>

                require("@nomicfoundation/hardhat-toolbox");
                require("dotenv").config();

                /** @type import('hardhat/config').HardhatUserConfig */
                module.exports = {
                    solidity: "0.8.24",
                    networks: {
                        sepolia: {
                            url: process.env.RPC_URL,
                            accounts: [process.env.PRIVATE_KEY]
                        }
                    },
                    etherscan: {
                        apiKey: process.env.ETHSCAN_API,
                    },
                };
            </details>
2. Write, compile & deploy your smart contracts:        
    * `mkdir contracts` + `touch EmitWinner.sol` + `touch ActivateWinner.sol` + write the smart contracts (cfr files themselves for the solidity code)
        * `npx hardhat compile`
    * `mkdir ignition/modules` + `touch EmitWinnerDeploy.js` + `touch ActivateWinnerDeploy.js` + insert deployment scripts (cfr files themselves for the code)
        * `npx hardhat ignition deploy ./ignition/modules/EmitWinnerDeploy.js --network sepolia --verify`
        * `npx hardhat ignition deploy ./ignition/modules/ActivateWinnerDeploy.js --network sepolia --verify`
            * `npx hardhat ignition verify chain-11155111` (if you have an existing deployment)
            * see https://hardhat.org/ignition/docs/guides/verify for mor on verifying contracts
3. Write & run your scripts:        
    * `mkdir scripts`+ `touch ActivateWinnerScript.js` + insert script (cfr file itself to see the code)
        * in case you would like to interact directly with the emitWinner smart contract: `touch EmitWinnerScript.js`and insert the script (cfr file itself for the code)
    * `npx hardhat run ./scripts/ActivateWinnerScript.js --network sepolia`
4. setup Github (optional):
    * `touch README.md` (in the rootfolder)
    * `git init` (in the rootfolder)
    * `touch .gitignore` + `echo "node_modules/" > .gitignore` + `echo ".env" >> .gitignore`
    * Create a GitHub repository -without README file, .gitignore and licence!- and get the https link (https://github.com/yourusername/myProject.git)
    * `git add .`
    * `git commit -m "initial commit"` (in rootfolder, committing changes)
    * `git branch -M main`
    * `git remote add origin https://github.com/yourusername/myProject.git` (in the rootfolder, connecting your local repository to the GitHub repository)
    * `git push -u origin main`
        <details>
            push to github. This command pushes your main branch to your remote repository (alias origin), and the -u flag sets the upstream for your branch, which means in the future, you can simply use git push without specifying the branch.
        </details>
 
references: https://hardhat.org/hardhat-runner/docs/getting-started


===========================================================

ps: the original assignment comes from Alchemy University, Smart Contract Basics, Week 4 Assignment, "Smart Contract Winner" (https://university.alchemy.com/course/ethereum/md/639a4cc4033c9b0004051a69):

"
Ready to be a winner?
You'll need to prove your smart contract skills to us. Don't worry, you totally got this! 💪

🏁 Your Goal: Emit the Winner event
Your goal is simple! Emit the winner event on this smart contract on the Goerli testnet: https://goerli.etherscan.io/address/0xcF469d3BEB3Fc24cEe979eFf83BE33ed50988502#code

If you take a look at the Code tab in Etherscan, you'll see that the source code for this contract looks like this:

// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract Contract {
    event Winner(address);

    function attempt() external {
        require(msg.sender != tx.origin, "msg.sender is equal to tx.origin");
        emit Winner(msg.sender);
    }
}
How do we possibly make it so the tx.origin (the EOA who originated the transaction) is not equal to the msg.sender? 🤔

We'll leave that challenge up to you!

Getting Setup
Need help getting setup with your Hardhat project? Here's a refresher from Dan on how to start a new hardhat project, deploy a contract and interact with it:


Helpful links:

Hardhat Overview - https://hardhat.org/hardhat-runner/docs/getting-started#overview
NPM - https://www.npmjs.com/
Alchemy - https://www.alchemy.com/
Goerli Faucet - https://goerlifaucet.com/
The Leaderboard
Once you've completed the challenge you should find your address amongst the list of winners on the events tab. Check out how many other people have completed this challenge!

"