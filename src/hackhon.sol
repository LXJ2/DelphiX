// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
import "lib/openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";
import "src/Ihackthon.sol";
contract hackthonProject is Ihackthon{
    string[] public team;
    string[] public tracks;
    string[] public winner;
    address[] public adminList;

    mapping (string =>mapping(string=> uint256)) votes;
    mapping (address =>mapping(string=> uint256)) stakeNum;
    mapping (address => mapping(string=>string)) votedTeam;
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

    function init(string[] memory _tracks,string[] memory _team,uint _ENDTIME,uint _STOPTIME,address _usdt,address[] _adminList)external onlyFactory{
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

    function stake(uint256 amount) external returns(bool){
        require(ENDTIME-block.timestamp>STOPTIME);
        require(IERC20(usdt).allowance(msg.sender,address(this))>0);
        require(IERC20(usdt).balanceOf(msg.sender)>0);
        IERC20(usdt).transferFrom(msg.sender,address(this),amount);
        stakeNum[msg.sender] +=amount;
        emit Stake(msg.sender,amount);
        return true;
    }

    function vote(string memory _track,string memory _team) external returns(bool){
        require(ENDTIME-block.timestamp>STOPTIME,"vote time is over");
        require(stakeNum[msg.sender] >0,"please stake first");
        require(votedTeam[msg.sender] == "", "you have already voted");
        require(_isTeam(_team),"team is not exist");
        votedTeam[msg.sender] = _team;
        votes[team]++;
        emit Vote(msg.sender,team);
        return true;
    }
    function _isTeam(string memory _team) internal view returns(bool){
        for(uint i=0;i<team.length;i++){
            if(team[i]==_team){
                return false;
            }
        }
        return true;
    }
    
    function isTrack(string memory _track) external view returns(bool){
        for(uint i=0;i<tracks.length;i++){
            if(tracks[i]==_track){
                return false;
            }
        }
        return true;
    }

    function setHackthonResult(string[] memory _winner) external returns(bool){
        require(block.timestamp>ENDTIME);
        winner = _winner;
        return true;
    }

    function claim () external returns(bool){
        require(block.timestamp>ENDTIME);
        
    }


    function settleWinnerPrice(string memory track) external view returns(bool){
        require(block.timestamp>ENDTIME);
        require(isStaked(msg.sender),"please stake first");


        
    }

    function isStaked() external view returns(bool) {
        return stakeNum[msg.sender] > 0;
    }


    function getVotes(string memory team) external view returns(uint256){
        return votes[team];
    }

    function getStakeNum(address user) external view returns(uint256){
        return stakeNum[user];
    }

    function getTeam() external view returns(string[] memory){
        return team;
    }


    function getWinner() external view returns(string[] memory){
        return winner;
    }

    function getVotedTeam(address user) external view returns(string memory){
        return votedTeam[user];
    }

    function getTracks() external view returns(string[] memory){
        return tracks;
    }

    function getAdminList() external view returns(address[] memory){
        return adminList;
    }




    
    

    







}