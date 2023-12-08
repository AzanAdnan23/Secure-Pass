// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract SecurePass {
    address public owner;
    mapping(address => bool) public eventOrganizers;

    uint256 public eventCounter;
    uint256 public ticketCounter;
    uint256 public userCounter;
     uint256 public constant RFID_CARD_COST = 10;

    modifier onlyEventOrganizer(uint _eventId) {
        require(
            events[_eventId].eventOrganizers == msg.sender,
            "You are not the event organizer"
        );
        _;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "You are not the owner");
        _;
    }

    // these are the unique ids for each event, ticket, and user
    constructor() {
        owner = msg.sender;
        eventCounter = 1000;
        ticketCounter = 1000;
        userCounter = 1000;
    }

    struct Event {
        uint256 eventId;
        string eventName;
        uint eventDate;
        uint eventTime;
        uint ticketPrice;
        uint ticketCount;
        uint256 ticketSold;
        address eventOrganizers;
        bool isValid;
        // Add other event details as needed
    }
    mapping(uint256 => Event) public events;
    mapping(uint256 => Ticket) public tickets;
    mapping(address => User) public users;

    // create event
    function createEvent(
        string memory _eventName,
        uint _eventDate,
        uint _eventTime,
        uint _ticketPrice,
        uint _ticketCount
    ) external {
        eventCounter++;
        events[eventCounter] = Event(
            eventCounter,
            _eventName,
            _eventDate,
            _eventTime,
            _ticketPrice,
            _ticketCount,
            0,
            msg.sender,
            true
        );
    }

    // remove event
    function removeEvent(
        uint256 _eventId
    ) external onlyEventOrganizer(_eventId) {
        delete events[_eventId];
    }

    // update event (optional)
    function updateEventName(
        uint256 _eventId,
        string memory _eventName
    ) external onlyEventOrganizer(_eventId) {
        events[_eventId].eventName = _eventName;
    }

    function updateEventDate(
        uint256 _eventId,
        uint _eventDate
    ) external onlyEventOrganizer(_eventId) {
        require(
            _eventDate > block.timestamp,
            "Event date must be in the future"
        );
        events[_eventId].eventDate = _eventDate;
    }

    function updateEventTime(
        uint256 _eventId,
        uint _eventTime
    ) external onlyEventOrganizer(_eventId) {
        events[_eventId].eventTime = _eventTime;
    }

    function updateTicketPrice(
        uint256 _eventId,
        uint _ticketPrice
    ) external onlyEventOrganizer(_eventId) {
        require(
            events[_eventId].ticketSold == 0,
            "Tickets have already been sold"
        );
        events[_eventId].ticketPrice = _ticketPrice;
    }

    function updateTicketCount(
        uint256 _eventId,
        uint _ticketCount
    ) external onlyEventOrganizer(_eventId) {
        require(
            events[_eventId].ticketSold <= _ticketCount,
            "New ticket count must be greater than or equal to the number of tickets already sold"
        );
        events[_eventId].ticketCount = _ticketCount;
    }

    // withdraw payment of event ( After event is done)
    function withdrawPayment(
        uint256 _eventId
    ) external onlyEventOrganizer(_eventId) {
        require(
            events[_eventId].eventDate < block.timestamp,
            "Event is not over yet"
        );
        require(events[_eventId].ticketSold > 0, "No tickets sold");
        require(events[_eventId].isValid, "Event is not valid");

        uint256 totalAmount = events[_eventId].ticketPrice *
            events[_eventId].ticketSold;
        uint256 ownerShare = (totalAmount * 5) / 100; // calculate 5% fee
        uint256 organizerShare = totalAmount - ownerShare; // remaining amount for the organizer

        payable(owner).transfer(ownerShare); // transfer fee to owner
        payable(msg.sender).transfer(organizerShare); // transfer remaining amount to organizer
        events[_eventId].isValid = false;
    }

    struct User {
        uint256 userId;
        address userAddress;
        bool hasRFIDCard;
    }

    struct Ticket {
        uint256 ticketId;
        uint256 eventId;
        address buyer;
        bool isValid;
    }

    // buy ticket
    function buyTicket(uint256 _eventId) external payable {
        require(events[_eventId].eventId == _eventId, "Event does not exist");
        require(events[_eventId].ticketCount > 0, "No more tickets available");
        require(events[_eventId].isValid, "Event is not valid");

        uint256 ticketPrice = events[_eventId].ticketPrice;

        if (!users[msg.sender].hasRFIDCard) {
            // Charge additional fee for users without RFID cards
            ticketPrice += RFID_CARD_COST;
        }

        // Ensure sent ether matches the total ticket price
        require(msg.value == ticketPrice, "Incorrect amount sent");

        // Deduct ticket count and update user details
        ticketCounter++;
        events[_eventId].ticketCount--;

        tickets[ticketCounter] = Ticket({
            ticketId: ticketCounter,
            eventId: _eventId,
            buyer: msg.sender,
            isValid: true
        });

        // Update user details
        if (!users[msg.sender].hasRFIDCard) {
            userCounter++;
            users[msg.sender] = User({
                userId: userCounter,
                userAddress: msg.sender,
                hasRFIDCard: true
            });
        }

        events[_eventId].ticketSold++;
    }

 
    // get user details
    // get event details
    // get ticket details

    // get all events
    // get all tickets
}
