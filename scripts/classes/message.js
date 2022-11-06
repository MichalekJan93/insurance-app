/**
 * A class that creates a confirmation message
 */
export class Message{

    /**
     * A constructor that receives a message and runs the displayedMessageBox method
     * @param {string} message a confirmation message that is displayed to the user, e.g. after logging in
     */
    constructor(message){
        this.message = message;
        this.displayedMessageBox();
    }

    /**
     * The method creates a div to display the confirmation message
     * @returns Method return the message-box div
     */
    createMessageBox(){
        let messageDiv = document.createElement('div');
        let messageFirst = document.createElement('div');
        let paragraph = document.createElement('p');

        messageDiv.setAttribute('class', 'message-box');
        messageFirst.setAttribute('class', 'message-first');

        document.body.appendChild(messageDiv);
        messageDiv.appendChild(messageFirst);
        messageFirst.appendChild(paragraph);

        paragraph.innerHTML = this.message;

        return messageDiv;
    }

    /**
     * A method that calls the createMessageBox method to create the div and deletes the div after 1500ms
     */
    displayedMessageBox(){
        this.createMessageBox();
        setTimeout(() => document.body.removeChild(document.querySelector('.message-box')), 2000);
    }

}