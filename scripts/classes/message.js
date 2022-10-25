export class Message{

    /**
     * Konstruktor, ktery prijme zpravu a spusti metodu displayedMessageBox.
     * @param {string} message potvrzovaci zprava, ktera se zobrazi uzivateli napr. po prihlaseni.
     */
    constructor(message){
        this.message = message;
        this.displayedMessageBox();
    }

    /**
     * Metoda vytvori div pro zobrazeni potvrzovaci zpravy
     * @returns {DOM} metoda vrati div message-box
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
     * Metoda, ktera necha zavolat metodu createMessageBox pro vytvoreni divu a po uplynuti 1500ms div odstrani.
     */
    displayedMessageBox(){
        this.createMessageBox();
        setTimeout(() => document.body.removeChild(document.querySelector('.message-box')), 2000);
    }

}