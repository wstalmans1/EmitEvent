
const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const ActivateWinnerModule = buildModule("ActivateWinnerModule", (m) => {
  const activateWinner = m.contract("ActivateWinner");

  return { activateWinner };
});

module.exports = ActivateWinnerModule;