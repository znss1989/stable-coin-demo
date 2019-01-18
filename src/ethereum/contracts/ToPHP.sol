pragma solidity ^0.4.24;

// File: contracts/zeppelin/SafeMath.sol

/**
 * @title SafeMath
 * @dev Math operations with safety checks that throw on error
 */
library SafeMath {
    /**
    * @dev Subtracts two numbers, reverts on overflow (i.e. if subtrahend is greater than minuend).
    */
    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        require(b <= a);
        uint256 c = a - b;

        return c;
    }

    /**
    * @dev Adds two numbers, reverts on overflow.
    */
    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a + b;
        require(c >= a);

        return c;
    }
}

// File: contracts/ToPHP.sol

pragma solidity ^0.4.24;

/**
 * @title ToPHP
 * @dev this contract is a Pausable ERC20 token with issuance and burning 
 * procedures controleld two special wallets.
 */
contract ToPHP {

    /**
     * MATH
     */

    using SafeMath for uint256;

    /**
     * DATA
     */

    // INITIALIZATION DATA
    bool private initialized = false;

    // ERC20 BASIC DATA
    mapping(address => uint256) internal balances;
    uint256 internal totalSupply_;
    string public constant name = "Token of PHP"; // solium-disable-line uppercase
    string public constant symbol = "ToPHP"; // solium-disable-line uppercase
    uint8 public constant decimals = 6; // solium-disable-line uppercase

    // ERC20 DATA
    mapping (address => mapping (address => uint256)) internal allowed;

    // OWNER DATA
    address public owner;
    address public pendingOwner;

    // PAUSABILITY DATA
    bool public paused = false;

    // ISSUANCE & WITHDRAW CONTROL DATA
    address public mintWallet;
    address public recycleWallet;

    // LIST TO RECEIVE FROM ISSUER
    mapping(address => bool) internal issueList;

    /**
     * EVENTS
     */

    // ERC20 BASIC EVENTS
    event Transfer(address indexed from, address indexed to, uint256 value);

    // ERC20 EVENTS
    event Approval(
        address indexed owner,
        address indexed spender,
        uint256 value
    );

    // OWNABLE EVENTS
    event OwnershipTransferred(
        address indexed oldOwner,
        address indexed newOwner
    );

    // PAUSABLE EVENTS
    event Pause();
    event Unpause();

    // SUPPLY CONTROL EVENTS
    event SupplyIncreased(address indexed to, uint256 value);
    event SupplyDecreased(address indexed from, uint256 value);
    event MintWalletSet(
        address indexed oldMintWallet,
        address indexed newMintWallet
    );
    event RecycleWalletSet(
        address indexed oldRecycleWallet,
        address indexed newRecycleWallet
    );

    // ISSUE LIST EVENTS
    event IssuelistAdded(address indexed member);
    event IssuelistRemoved(address indexed member);

    /**
     * FUNCTIONALITY
     */

    // INITIALIZATION FUNCTIONALITY

    /**
     * The standard constructor invokes the initialization
     */
    constructor() public {
        initialize();
        // pause();
    }

    /**
     * @dev sets 0 initials tokens, the owner, and the issuer and withdrawer.
     */
    function initialize() internal {
        require(!initialized, "already initialized");

        owner = msg.sender;
        setMintWallet(msg.sender);
        setRecycleWallet(msg.sender);
        totalSupply_ = 0;
        initialized = true;
    }

    // ERC20 BASIC FUNCTIONALITY

    /**
    * @dev Total number of tokens in existence
    */
    function totalSupply() public view returns (uint256) {
        return totalSupply_;
    }

    /**
    * @dev Standard ERC20 transfer by common users token for a specified address
    * @param _to The address to transfer to.
    * @param _value The amount to be transferred.
    */
    function transfer(address _to, uint256 _value) public whenNotPaused returns (bool) {
        require(msg.sender != mintWallet && msg.sender != recycleWallet, "only non-special account can transfer");
        return _transfer(msg.sender, _to, _value);
    }

    /**
     * @dev The logic implementation of transfer upon which transfer and others call
     * @param _from The address to transfer from.
     * @param _to The address to transfer to.
     * @param _value The amount to be transferred.
     */
    function _transfer(address _from, address _to, uint256 _value) internal whenNotPaused returns (bool) {
        require(_to != address(0), "cannot transfer to address zero");
        require(_value <= balances[_from], "insufficient funds");

        balances[_from] = balances[_from].sub(_value);
        balances[_to] = balances[_to].add(_value);
        emit Transfer(_from, _to, _value);
        return true;
    }

    /**
    * @dev Gets the balance of the specified address.
    * @param _addr The address to query the the balance of.
    * @return An uint256 representing the amount owned by the passed address.
    */
    function balanceOf(address _addr) public view returns (uint256) {
        return balances[_addr];
    }

    // ERC20 FUNCTIONALITY

    /**
     * @dev Transfer tokens from one address to another
     * @param _from address The address which you want to send tokens from
     * @param _to address The address which you want to transfer to
     * @param _value uint256 the amount of tokens to be transferred
     */
    function transferFrom(
        address _from,
        address _to,
        uint256 _value
    )
    public
    whenNotPaused
    returns (bool)
    {
        require(_to != address(0), "cannot transfer to address zero");
        require(_value <= balances[_from], "insufficient funds");
        require(_value <= allowed[_from][msg.sender], "insufficient allowance");

        balances[_from] = balances[_from].sub(_value);
        balances[_to] = balances[_to].add(_value);
        allowed[_from][msg.sender] = allowed[_from][msg.sender].sub(_value);
        emit Transfer(_from, _to, _value);
        return true;
    }

    /**
     * @dev Approve the passed address to spend the specified amount of tokens on behalf of msg.sender.
     * Beware that changing an allowance with this method brings the risk that someone may use both the old
     * and the new allowance by unfortunate transaction ordering. One possible solution to mitigate this
     * race condition is to first reduce the spender's allowance to 0 and set the desired value afterwards:
     * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
     * @param _spender The address which will spend the funds.
     * @param _value The amount of tokens to be spent.
     */
    function approve(address _spender, uint256 _value) public whenNotPaused returns (bool) {
        allowed[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    /**
     * @dev Function to check the amount of tokens that an owner allowed to a spender.
     * @param _owner address The address which owns the funds.
     * @param _spender address The address which will spend the funds.
     * @return A uint256 specifying the amount of tokens still available for the spender.
     */
    function allowance(
        address _owner,
        address _spender
    )
    public
    view
    returns (uint256)
    {
        return allowed[_owner][_spender];
    }

    // OWNER FUNCTIONALITY

    /**
     * @dev Throws if called by any account other than the owner.
     */
    modifier onlyOwner() {
        require(msg.sender == owner, "onlyOwner");
        _;
    }

    /**
     * @dev Modifier throws if called by any account other than the pendingOwner.
     */
    modifier onlyPendingOwner() {
        require(msg.sender == pendingOwner);
        _;
    }

    /**
     * @dev Allows the current owner to set the pendingOwner address.
     * @param newOwner The address to transfer ownership to.
     */
    function transferOwnership(address newOwner) public onlyOwner {
        pendingOwner = newOwner;
    }

    /**
     * @dev Allows the pendingOwner address to finalize the transfer.
     */
    function claimOwnership() public onlyPendingOwner {
        emit OwnershipTransferred(owner, pendingOwner);
        owner = pendingOwner;
        pendingOwner = address(0);
    }

    // PAUSABILITY FUNCTIONALITY

    /**
     * @dev Modifier to make a function callable only when the contract is not paused.
     */
    modifier whenNotPaused() {
        require(!paused, "whenNotPaused");
        _;
    }

    /**
     * @dev called by the owner to pause, triggers stopped state
     */
    function pause() public onlyOwner {
        require(!paused, "already paused");
        paused = true;
        emit Pause();
    }

    /**
     * @dev called by the owner to unpause, returns to normal state
     */
    function unpause() public onlyOwner {
        require(paused, "already unpaused");
        paused = false;
        emit Unpause();
    }

    // ISSUANCE CONTROL FUNCTIONALITY

    /**
     * @dev Sets a new mint wallet address.
     * @param _newMintWallet The address allowed to mint and issue tokens to control supply.
     */
    function setMintWallet(address _newMintWallet) public onlyOwner {
        require(_newMintWallet != address(0), "cannot set mintWallet to address zero");
        require(balanceOf(mintWallet) == 0, "original mint wallet balance must be cleared to zero");

        emit MintWalletSet(mintWallet, _newMintWallet);
        mintWallet = _newMintWallet;
    }

    /**
     * @dev Increases the total supply by minting the specified number of tokens to the mint wallet account.
     * @param _value The number of tokens to add.
     * @return A boolean that indicates if the operation was successful.
     */
    function mint(uint256 _value) public onlyOwner returns (bool success) {
        totalSupply_ = totalSupply_.add(_value);
        balances[mintWallet] = balances[mintWallet].add(_value);
        emit SupplyIncreased(mintWallet, _value);
        emit Transfer(address(0), mintWallet, _value);
        return true;
    }

    /**
     * @dev Issue tokens from mint wallet to designated list
     * @param _to The address mint wallet issues tokens to.
     * @param _value The number of tokens to issue.
     * @return A boolean that indicates if the operation was successful.
     */
    function issue(address _to, uint256 _value) public onlyMintWallet returns (bool success) {
        require(issueList[_to], "destination must be in issuance list");
        return _transfer(mintWallet, _to, _value);
    }

    /**
     * @dev Return the minted tokens to recycle wallet before burn
     * @param _value The number of tokens to return.
     * @return A boolean that indicates if the operation was successful.
     */
    function fundReturn(uint256 _value) public onlyMintWallet returns (bool success) {
        return _transfer(mintWallet, recycleWallet, _value);
    }

    // WITHDRAW/RECYCLE CONTROL FUNCTIONALITY

    /**
     * @dev Sets a new recycle wallet address.
     * @param _newRecycleWallet The address allowed to withdraw/recycle tokens to control supply.
     */
    function setRecycleWallet(address _newRecycleWallet) public onlyOwner {
        require(_newRecycleWallet != address(0), "cannot set withdrawer to address zero");

        emit RecycleWalletSet(recycleWallet, _newRecycleWallet);
        recycleWallet = _newRecycleWallet;
    }

    modifier onlyMintWallet() {
        require(msg.sender == mintWallet, "only mint wallet");
        _;
    }

    modifier onlyRecycleWallet() {
        require(msg.sender == recycleWallet, "only recycle wallet");
        _;
    }

    /**
     * @dev Decreases the total supply by burning the specified number of tokens from the recycle wallet account.
     * @param _value The number of tokens to remove.
     * @return A boolean that indicates if the operation was successful.
     */
    function burn(uint256 _value) public onlyRecycleWallet returns (bool success) {
        require(_value <= balances[recycleWallet], "not enough supply");
        // no need to require value <= totalSupply, since that would imply the
        // sender's balance is greater than the totalSupply, which *should* be an assertion failure

        balances[recycleWallet] = balances[recycleWallet].sub(_value);
        totalSupply_ = totalSupply_.sub(_value);
        emit SupplyDecreased(recycleWallet, _value);
        emit Transfer(recycleWallet, address(0), _value);
        return true;
    }

    /**
     * @dev Recycle the tokens deposited at recycle wallet back to mint wallet.
     * @param _value The number of tokens to recycle.
     * @return A boolean that indicates if the operation was successful.
     */
    function recycle(uint256 _value) public onlyRecycleWallet returns (bool success) {
        return _transfer(recycleWallet, mintWallet, _value);
    }

    // ISSUE LIST SET

    /**
     * @dev Add an address to the issue list to elements of which the issuer to transfer to.
     * @param _member the address to be added to the issue list.
     * @return A boolean that indicates if the operation was successful.
     */
    function addToIssuelist(address _member) public onlyOwner returns (bool success) {
        emit IssuelistAdded(_member);
        issueList[_member] = true;
        return true;
    }

    /**
     * @dev Remove an address from the issue list to elements of which the mint wallet to transfer to.
     * @param _member the address to be added to the issue list.
     * @return A boolean that indicates if the operation was successful.
     */
    function removeFromIssuelist(address _member) public onlyOwner returns (bool success) {
        emit IssuelistRemoved(_member);
        issueList[_member] = false;
        return true;
    }
}