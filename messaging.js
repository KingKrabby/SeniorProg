// Represents a user in the messaging system
class User {
    constructor(name) {
        this.name = name;
        this.messagesReceived = [];
    }

    receiveMessage(message) {
        this.messagesReceived.push(message);
    }

    getMessagesReceived() {
        return this.messagesReceived;
    }
}

// Represents a message
class Message {
    constructor(sender, content) {
        this.sender = sender;
        this.content = content;
    }

    getSender() {
        return this.sender;
    }

    getContent() {
        return this.content;
    }
}

// Represents the messaging system
class MessagingSystem {
    constructor() {
        this.users = {};
    }

    addUser(user) {
        this.users[user.name] = user;
    }

    sendMessage(senderName, receiverName, content) {
        const sender = this.users[senderName];
        const receiver = this.users[receiverName];
        if (sender && receiver) {
            const message = new Message(sender, content);
            receiver.receiveMessage(message);
            console.log(`Message sent from ${senderName} to ${receiverName}: ${content}`);
        } else {
            console.log("User not found.");
        }
    }

    getMessages(userName) {
        const user = this.users[userName];
        if (user) {
            return user.getMessagesReceived();
        } else {
            console.log("User not found.");
            return null;
        }
    }
}

// Create users
const alice = new User("Alice");
const bob = new User("Bob");

// Create messaging system
const messagingSystem = new MessagingSystem();
messagingSystem.addUser(alice);
messagingSystem.addUser(bob);

// Send messages
messagingSystem.sendMessage("Alice", "Bob", "Hello Bob!");
messagingSystem.sendMessage("Bob", "Alice", "Hi Alice!");

// Check received messages
let aliceMessages = messagingSystem.getMessages("Alice");
if (aliceMessages) {
    console.log("Messages received by Alice:");
    for (let message of aliceMessages) {
        console.log(`From: ${message.getSender().name} - ${message.getContent()}`);
    }
}

let bobMessages = messagingSystem.getMessages("Bob");
if (bobMessages) {
    console.log("Messages received by Bob:");
    for (let message of bobMessages) {
        console.log(`From: ${message.getSender().name} - ${message.getContent()}`);
    }
}
