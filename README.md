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
    * `mkdir contracts` + `touch emitWinner2.sol` + `touch activateWinner2.sol` + write the smart contracts (cfr files themselves for the solidity code)
        * `npx hardhat compile`
    * `mkdir ignition/modules` + `touch emitWinner2.js` + `touch activateWinner2.js` + insert deployment scripts (cfr files themselves for the code)
        * `npx hardhat ignition deploy ./ignition/modules/emitWinner2.js --network sepolia --verify`
        * `npx hardhat ignition deploy ./ignition/modules/activateWinner2.js --network sepolia --verify`
            * `npx hardhat ignition verify chain-11155111` (if you have an existing deployment)
            * see https://hardhat.org/ignition/docs/guides/verify for mor on verifying contracts
3. Write & run your scripts:        
    * `mkdir scripts`+ `touch activateWinner2.js` + insert script (cfr file itself to see the code)
        * in case you would like to interact directly with the emitWinner smart contract: `touch emitWinner2.js`and insert the script (cfr file itself for the code)
    * `npx hardhat run ./scripts/activateWinner2.js --network sepolia`
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