const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const EmitWinnerModule = buildModule("EmitWinnerModule", (m) => {
  const emitWinner = m.contract("EmitWinner");

  return { emitWinner };
});

module.exports = EmitWinnerModule;