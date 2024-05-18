// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
import "lib/openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";
import "src/Ihackathon.sol";

contract HackathonProject is Ihackathon{
    string[] public team;
    string[] public tracks;
    // string[] public winner;
    address[] public adminList;
    mapping (string =>string) public winner;
    mapping (string =>mapping(string=> uint256)) votes;
    mapping (address =>mapping(string=> mapping(string=> uint256))) public stakeNum;
    mapping (string =>uint256) trackAmount;
    mapping (address =>mapping(string=> uint256)) votedTrack;
    mapping (address => mapping(string=>string[])) votedTeam;
    uint public ENDTIME;
    uint public STOPTIME;
    address private factory;
    address private owner;
    address public usdt;

    constructor(){
        owner = msg.sender;
    }

    modifier onlyFactory() {
        if (factory == address(0)) {
            revert ();
        }
        if (msg.sender != factory) {
            revert ();
        }
        _;
    }

    function setFactory(address _factory) external {
        require(msg.sender == owner);
        factory = _factory;
    }

    function init(string[] memory _tracks,string[] memory _team,uint _ENDTIME,uint _STOPTIME,address _usdt,address[] memory _adminList)external onlyFactory{
        require(_ENDTIME>_STOPTIME);
        require(tracks.length>0);
        require(_team.length>0);
        require(_usdt!=address(0));

        adminList = _adminList;
        tracks = _tracks;
        team = _team;
        ENDTIME = _ENDTIME;
        STOPTIME = _STOPTIME;
        usdt = _usdt;
    }

    function stake(string memory track,string memory _team, uint256 amount) external returns(bool){
        require(ENDTIME-block.timestamp>STOPTIME);
        require(IERC20(usdt).allowance(msg.sender,address(this))>0);
        require(IERC20(usdt).balanceOf(msg.sender)>0);
        IERC20(usdt).transferFrom(msg.sender,address(this),amount);
        stakeNum[msg.sender][track][_team] +=amount;
        trackAmount[track] +=amount;
        // Check if the voteData is not already in the array
        bool alreadyVoted = false;
        for (uint256 i = 0; i < votedTeam[msg.sender][track].length; i++) {
            if (keccak256(bytes(votedTeam[msg.sender][track][i])) == keccak256(bytes(_team))) {
                alreadyVoted = true;
                break;
            }
        }

        // If not already voted, add the voteData
        votedTeam[msg.sender][track].push(_team);
        votes[track][_team] += amount;

        emit Stake(msg.sender,amount);
        emit Vote(_team,track,msg.sender);
        return true;
    }

    function setHackathonResult(string memory track,string memory _winner) external returns(bool){
        require(isAdmin(msg.sender));
        require(block.timestamp>ENDTIME);
        winner[track] = _winner;
        return true;
    }

    function claim (string memory track) external{
        require(block.timestamp>ENDTIME);
        require(votedTeam[msg.sender][track].length > 0, "you have not voted");

        uint256 amount = settleWinnerPrice(track, msg.sender);
        address payable _address = payable(msg.sender);
        stakeNum[msg.sender][track][winner[track]] = 0;
        IERC20(usdt).transfer(_address, amount);       
        
    }

    function settleWinnerPrice(string memory track, address user) public view returns (uint256) {
        require(block.timestamp > ENDTIME, "Voting period has not ended");
        require(isStaked(track, msg.sender, winner[track]), "Please stake first");

        bool isWinner = false;
        for (uint256 i = 0; i < votedTeam[msg.sender][track].length; i++) {
            if (keccak256(bytes(votedTeam[msg.sender][track][i])) == keccak256(bytes(winner[track]))) {
                isWinner = true;
                break;
            }
        }
        require(isWinner, "you are not the winner");

        uint256 _trackAmount = getTrackAmount(track);
        uint256 _stakeAmount = stakeNum[user][track][winner[track]];

        uint256 _voteAmount = votes[track][winner[track]]; 

        // Calculate the winning amount
        uint256 winningAmount = (_stakeAmount * _trackAmount) / _voteAmount;

        return winningAmount;
    }

    function isStaked(string memory track,address user,string memory _team) internal view returns(bool) {
        return stakeNum[user][track][_team] > 0;
    }

    function isAdmin(address user)internal view returns(bool) {
        bool admin = false;
        for (uint256 i = 0; i < adminList.length; i++) {
            if (adminList[i] == user) {
                admin = true;
                break;
            }
        }
        return admin;
    }

    function getWinner(string memory track) external view returns(string memory){
        return winner[track];
    }

    function getVotedTeam(string memory track,address user) external view returns(string[] memory){
        return votedTeam[user][track];
    }

    function getTracks() external view returns(string[] memory){
        return tracks;
    }

    function getTrackAmount(string memory track) public view returns(uint256){
        return trackAmount[track];
    }

    function getAdminList() external view returns(address[] memory){
        return adminList;
    }

    function getVoteNum(string memory track, string memory _team) external view returns(uint256){
        return votes[track][_team];
    }

    function getStakeNum(string memory track, address user, string memory _team) external view returns(uint256){
        return stakeNum[user][track][_team];
    }
}
