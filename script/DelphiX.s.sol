// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";
import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/DelphiX.sol"; // Adjust the path to match your project structure

contract TestDelphiX {
    DelphiX delphiX;
    ERC20 usdtToken;

    constructor() {
        // Deploy DelphiX contract
        usdtToken = new ERC20("USDT", "Tether");
        delphiX = new DelphiX(address(usdtToken));
    }

    function testCreateQuestion() public {
        // Test createQuestion function
        string memory question = "Is this a test question?";
        string memory creatorImageHash = "QmHash123";
        string memory description = "Test description";
        string memory resolverUrl = "https://example.com";
        uint256 endTimestamp = block.timestamp + 1 days;

        delphiX.createQuestion(question, creatorImageHash, description, resolverUrl, endTimestamp);

        uint256 totalQuestions = delphiX.totalQuestions();
        Assert.equal(totalQuestions, 1, "Question should be created");
    }

    function testAddYesBet() public {
        // Test addYesBet function
        uint256 questionId = 0;
        uint256 value = 100;

        delphiX.addYesBet(questionId, value);

        (AmountAdded[] memory yesCount, ) = delphiX.getGraphData(questionId);
        Assert.equal(yesCount.length, 1, "Yes bet should be added");
    }

}
