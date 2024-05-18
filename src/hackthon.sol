// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
import "lib/openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";
import "src/Ihackthon.sol";
contract hackthonProject is Ihackthon{
    string[] public team;
    string[] public tracks;
    // string[] public winner;
    address[] public adminList;
    mapping (string =>string) public winner;
    mapping (string =>mapping(string=> uint256)) votes;
    mapping (address =>mapping(string=> uint256)) stakeNum;
    mapping (string =>uint256) trackAmount;
    mapping (address =>mapping(string=> uint256)) votedTrack;
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

    function stake(string memory track,uint256 amount) external returns(bool){
        require(ENDTIME-block.timestamp>STOPTIME);
        require(IERC20(usdt).allowance(msg.sender,address(this))>0);
        require(IERC20(usdt).balanceOf(msg.sender)>0);
        IERC20(usdt).transferFrom(msg.sender,address(this),amount);
        stakeNum[msg.sender][track] +=amount;
        trackAmount[track] +=amount;
        emit Stake(msg.sender,amount);
        return true;
    }

    function vote(string memory _track,string memory _team) external returns(bool){
        require(ENDTIME-block.timestamp>STOPTIME,"vote time is over");
        require(stakeNum[msg.sender][_track] >0,"please stake first");
        require(bytes(votedTeam[msg.sender][_track]).length == 0, "you have already voted");
        // require(_isTeam(_team),"team is not exist");
        votedTeam[msg.sender][_track] = _team;
        votes[_track][_team]++;
        emit Vote(_team,_track,msg.sender);
        return true;
    }

    function setHackthonResult(string memory track,string memory _winner) external returns(bool){
        require(block.timestamp>ENDTIME);
        winner[track] = _winner;
        return true;
    }

    function claim (string memory track) external returns(bool){
        require(block.timestamp>ENDTIME);
        require(isStaked(track,msg.sender),"please stake first");
        require(bytes(votedTeam[msg.sender][track]).length > 0, "you have not voted");
        require(keccak256(bytes(votedTeam[msg.sender][track])) == keccak256(bytes(winner[track])), "you are not the winner");
        uint256 amount = stakeNum[msg.sender][track];
        stakeNum[msg.sender][track] = 0;


        
    }

    function settleWinnerPrice(string memory track) external view returns(bool){
        require(block.timestamp>ENDTIME);
        require(isStaked(track,msg.sender),"please stake first");
        require(getWinner(track) == getVotedTeam(track, msg.sender)) 
        
        
    }

    function isStaked(string memory track,address user) internal view returns(bool) {
        return stakeNum[user][track] > 0;
    }

    function getWinner(string memory track) external view returns(string memory){
        return winner[track];
    }

    function getVotedTeam(string memory track,address user) external view returns(string memory){
        return votedTeam[user][track];
    }

    function getTracks() external view returns(string[] memory){
        return tracks;
    }

    function getTrackAmount(string memory track) external view returns(uint256){
        return trackAmount[track];
    }

    function getAdminList() external view returns(address[] memory){
        return adminList;
    }




    
    

    







}