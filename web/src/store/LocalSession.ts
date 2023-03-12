import {Chat} from "./Chat";
import {serializable} from "proxily";
import {chatServerRequest} from "./classify";
import {Thread, ThreadType} from "./Thread";
import {Person} from "./Person";

export class LocalSession {

    name = "";                          // Name of this user
    chats : Array<Chat> = [];           // Chats this user is engaged in
    currentName = "";                   // Target person's name
    sleeping = false;

    // Set the current target person
    setCurrentPerson(person : Person) {
        this.currentName = person.name;
    }

    // Return the chat for the current target person
    get chat () {
        return this.chats.find(chat => chat.name === this.currentName);
    }

    // Add a new thread to the chat for a given person
    addThread(fromName : string, chatName : string, message : string) {
        const chat = this.chats.find(chat => chat.name === chatName);
        chat?.threads.push(new Thread(fromName, message, ThreadType.Received))
    }

    // Setup cloud session with our identity which is name
    async register (name : string) {
        await chatServerRequest.register(name); // Throws error if name in use
        this.name = name;
    }

    // Called when app starts to either connect or wait for register screen to call register
    async init () {
        if (this.name)
            try {
                 await chatServerRequest.connect(this.name);
                 this.setSessions(await chatServerRequest.getSessions());
            } catch (e) { // Possible another user grabbed this name
                console.log(e);
                this.name = ""; // Will trigger register screen
            }
        this.sleeping = false;
    }

    // Send message to the current target person.  It may reach them or be deferred
    async sendMessage(message : string) {
        await chatServerRequest.sendMessage(this.currentName, message);
        this.addThread(this.name, this.currentName, message);
    }

    // Update the chats  based on the sessions (chats for expired sessions effectively removed)
    setSessions (sessions : Array<string>) {
        // Assume previous chats have no session
        this.chats = this.chats.map(chat => {
           chat.hasSession = false;
           return chat;
        });
        let selectedNameFound = false;
        // For each session either set hasSession true or add new Chat
        sessions.forEach(session => {
            if (session !== this.name) {
                const chat = this.chats.find(chat => chat.name === session);
                if (chat)
                    chat.hasSession = true;
                else
                    this.chats.push(new Chat(session, true));
                if (session === this.currentName)
                    selectedNameFound = true;
            }
        });
        if (!selectedNameFound)
            this.currentName = "";

    }

    // Return list of target people based on chats
    get people () {
        return this.chats.map(chat => new Person(chat.name, chat.hasSession));
    }

}

serializable({LocalSession}) // Required in order to serialize this in localstorage
