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

    mapping(address => uint256[]) public organizerEvents;

    // create event
    function createEvent(
        string memory _eventName,
        uint _eventDate, // return event id and display it on the frontend               // merge date and time into one variable
        uint _ticketPrice, // add event location
        // optional: you have to send some money for event registration to prevent scams
        uint _ticketCount
    ) external {
        require(
            _eventDate > block.timestamp,
            "Event date must be in the future"
        );
        require(_ticketCount > 0, "Ticket count must be greater than 0");
        require(_ticketPrice > 0, "Ticket price must be greater than 0");

        // fix this-----------------------------requiresssss

        eventCounter++;
        events[eventCounter] = Event(
            eventCounter,
            _eventName,
            _eventDate,
            _ticketPrice,
            _ticketCount,
            0,
            msg.sender,
            true
        );

        organizerEvents[msg.sender].push(eventCounter);
    }

    // remove event
    function removeEvent(
        uint256 _eventId
    ) external onlyEventOrganizer(_eventId) {
        // Get the list of event IDs of the organizer
        uint256[] storage eventIds = organizerEvents[msg.sender];

        // Find the index of the event ID to be removed
        for (uint i = 0; i < eventIds.length; i++) {
            if (eventIds[i] == _eventId) {
                // Remove the event ID from the organizerEvents mapping
                eventIds[i] = eventIds[eventIds.length - 1];
                eventIds.pop();
                break;
            }
        }
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
        uint256[] ticketsArray;
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
        require(msg.value >= ticketPrice, "Incorrect amount sent");

        // Deduct ticket count and update user details
        ticketCounter++;
        events[_eventId].ticketCount--;

        users[msg.sender].ticketsArray.push(ticketCounter);
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
                hasRFIDCard: true,
                ticketsArray: new uint256[](0)
            });
            users[msg.sender].ticketsArray.push(ticketCounter);
        }

        events[_eventId].ticketSold++;
    }

    // get user details
    function getUserDetails(
        address _userAddress
    ) external view returns (User memory) {
        require(
            users[_userAddress].userAddress == _userAddress,
            "User does not exist"
        );
        return users[_userAddress];
    }

    function getEventIdsOfAUser(
        address organizer
    ) public view returns (uint256[] memory) {
        return organizerEvents[organizer];
    }

    // get event details
    function getEventDetails(
        uint256 _eventId
    ) external view returns (Event memory) {
        require(events[_eventId].eventId == _eventId, "Event does not exist");
        return events[_eventId];
    }

    // get ticket details
    function getTicketDetails(
        uint256 _ticketId
    ) external view returns (Ticket memory) {
        require(
            tickets[_ticketId].ticketId == _ticketId,
            "Ticket does not exist"
        );
        return tickets[_ticketId];
    }

    // get all events
    function getAllEvents() external view returns (Event[] memory) {
        Event[] memory _events = new Event[](eventCounter);
        for (uint256 i = 0; i < eventCounter; i++) {
            _events[i] = events[i + 1];
        }
        return _events;
    }

    // get all tickets of a user
    function getAllTicketsOfUser(
        address _userAddress
    ) external view returns (Ticket[] memory) {
        uint256[] memory _tickets = users[_userAddress].ticketsArray;
        Ticket[] memory ticketsOfUser = new Ticket[](_tickets.length);
        for (uint256 i = 0; i < _tickets.length; i++) {
            ticketsOfUser[i] = tickets[_tickets[i]];
        }
        return ticketsOfUser;
    }
    function isNewuser(address user) external view returns (bool) {
        return !users[user].hasRFIDCard;
    }

    //is ticket valid from user
    function isTicketValid(
        uint256 _eventId,
        uint256 _userID
    ) external view returns (bool) {
        for (uint256 i = 0; i < users[msg.sender].ticketsArray.length; i++) {
            if (
                users[msg.sender].ticketsArray[i] == _userID &&
                tickets[_userID].eventId == _eventId
            ) {
                return true;
            }
        }

        return false;
    }
}
