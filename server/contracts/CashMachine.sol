// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.0;

contract CashMachine {
    mapping(address => uint) private balances;

    function getBalance(address user) public view returns (uint) {
        return balances[user];
    }

    function deposit(uint amount) public payable {
        require(msg.value == amount, "You must send the exact amount to deposit.");
        balances[msg.sender] += amount;
    }

    function withdraw(uint amount) public {
        require(balances[msg.sender] >= amount, "Insufficient balance.");
        balances[msg.sender] -= amount;
        payable(msg.sender).transfer(amount);
    }
}
