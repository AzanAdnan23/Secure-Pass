# Secure Pass

## Description:
SecurePass is an innovative prototype for a blockchain RFID-based ticketing system, designed to address key challenges in traditional event management. Leveraging cutting-edge technologies, this project introduces a seamless and secure process for event organizers and attendees alike.

## Problem:
Traditional event ticketing systems face challenges related to security, transparency, and user convenience. Counterfeit tickets, manual verification processes, and lack of a unified system can lead to inefficiencies and fraud. SecurePass addresses these issues by introducing a blockchain RFID-based ticketing system.

## Key Features:

1. **Event Management Dashboard:**
   - Event organizers can register their events on the website.
   - Input event details such as ticket price, ticket count, event date, and time.
   - Edit or remove events through an intuitive dashboard.

2. **RFID Card Integration:**
   - Users can buy tickets on the website.
   - Existing users with a previously purchased RFID card enjoy reduced ticket prices.
   - New users without an RFID card pay a nominal extra fee.

3. **User Dashboard:**
   - Users have access to a personalized dashboard.
   - View user details, user IDs, and ticket details.
   - Track purchased tickets, expired tickets, and other relevant information.

4. **RFID Card Delivery:**
   - Upon ticket purchase, users receive an RFID card.
   - The RFID card is a one-time purchase and serves as a universal access pass for all events on the website.

5. **Card Scanner at Venue:**
   - Event venues are equipped with RFID card scanners.
   - Attendees can scan their RFID cards for entry.
   - The card scanner sends a validation request to the server.

6. **Blockchain Validation:**
   - The server validates the card's user ID stored on the RFID card.
   - The server sends a query to the blockchain to verify the card's authenticity.

### Prototype Focus:
   - The current implementation serves as a prototype, emphasizing the core functionalities of event registration, ticket purchase, RFID card issuance, and validation.
   - The prototype aims to showcase the potential of a blockchain RFID-based ticketing system and lay the foundation for future enhancements.

By combining blockchain and RFID technology, SecurePass aims to provide a secure, efficient, and user-friendly ticketing solution for events, setting the stage for a more advanced and comprehensive system in the future.

## Hardware Used
1. ESP8266 WiFi
2. RC522 RFID Scanner
3. MiFare RFID Cards (1K)
4. I2C LCD Module
5. Wires
6. Breadboard

### Demo Link
[https://drive.google.com/drive/folders/1f6d_AVI6rTvhzqOaxe-YszYfiw7rWIv9]