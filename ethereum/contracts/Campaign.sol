// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract CampaignFactory {
    address[] public deployedCampaigns;

    function createCampaign(uint minimumContributionProvided) public {
        address newCampaignAddress = address(new Campaign(minimumContributionProvided, msg.sender));
        deployedCampaigns.push(newCampaignAddress);
    }

    function getCampaigns() public view returns (address[] memory) {
        return deployedCampaigns;
    }
}


contract Campaign {
    struct Request {
        uint value;
        bool isComplete;
        address recipient;
        string description;
        uint approvalCount;
        mapping(address => bool) approvals;
    }

    uint requestCount;
    address public manager;
    uint public contributorsCount;
    uint public minimumContribution;
    mapping(uint => Request) public requests;
    mapping(address => bool) public contributors;

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    constructor(uint minimumContributionProvided, address creator) {
        manager = creator;
        minimumContribution = minimumContributionProvided;
    }

    function contribute() public payable {
        require(msg.value > minimumContribution);

        contributors[msg.sender] = true;
        contributorsCount++;
    }

    function createRequest(string memory description, uint value, address recipient) public restricted {
        Request storage newRequest = requests[requestCount++];
        newRequest.value = value;
        newRequest.approvalCount = 0;
        newRequest.isComplete = false;
        newRequest.recipient = recipient;
        newRequest.description = description;
    }

    function approveRequest(uint index) public {
        Request storage request = requests[index];

        require(contributors[msg.sender]);
        require(!request.approvals[msg.sender]);

        request.approvalCount++;
        request.approvals[msg.sender] = true;
    }

    function finalizeRequest(uint index) public restricted {
        Request storage request = requests[index];

        require(!request.isComplete);
        require(request.approvalCount > (contributorsCount / 2));

        request.isComplete = true;
        payable(request.recipient).transfer(request.value);
    }
}