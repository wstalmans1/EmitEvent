// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.24;

interface IEmitWinner {
    function attempt() external;
}

contract ActivateWinner {
    // Address of the EmitWinner contract
    address public emitWinnerAddress = 0xf0286F55949e21e102331E81b912ADE392eed8Ef;

    // Constructor to set the EmitWinner contract address
    //constructor(address _emitWinnerAddress) {
    //    emitWinnerAddress = _emitWinnerAddress;
    //}

    // Function to call attempt on EmitWinner
    function activateAttempt() public {
        // Create an instance of the IEmitWinner interface
        IEmitWinner(emitWinnerAddress).attempt();
    }
}
