import { PostAjax} from "../ajax/postAjax.js";
import { Message } from "./message.js";

export class RegisterUser{

    /**
     * Metoda pro vytvoreni DOM elementu <dialog>, ktery slouzi pro registraci uzivatele
     * @returns {DOM element} - metoda vrati cely element dialog  
     */

    createDialog(){
        let dialog = document.createElement('dialog');
        let registerDiv = document.createElement('div');
        let registerImgDiv = document.createElement('div');
        let registerFormDiv = document.createElement('div');
        let offButton = document.createElement('div');
        let errorMessage = document.createElement('p');
        let registerFormTitle= document.createElement('h2');
        let Form = document.createElement('form');
        let nameDiv = document.createElement('div');
        let inputFirstName = document.createElement('input');
        let inputLastName = document.createElement('input');
        let inputText = document.createElement('input');
        let inputPassword = document.createElement('input');
        let inputRepeatPassword = document.createElement('input');
        let inputParagraph = document.createElement('p');
        let inputButton = document.createElement('input');

        dialog.setAttribute('class', 'register-dialog')
        registerDiv.setAttribute('class','login');
        registerImgDiv.setAttribute('class','register-img');
        registerFormDiv.setAttribute('class','login-form');
        offButton.setAttribute('class', 'dialog-off');
        errorMessage.setAttribute('class', 'error-message');
        inputFirstName.setAttribute('class', 'user-firstName');
        inputLastName.setAttribute('class', 'user-lastName');
        inputText.setAttribute('class', 'user-email');
        inputPassword.setAttribute('class', 'user-password');
        inputRepeatPassword.setAttribute('class', 'user-repeat-password');
        inputParagraph.setAttribute('class', 'register-password-info')
        inputButton.setAttribute('class', 'btn-send-data');

        inputFirstName.setAttribute('type', 'text');
        inputFirstName.setAttribute('placeholder', 'Vaše jméno');
        inputLastName.setAttribute('type', 'text');
        inputLastName.setAttribute('placeholder', 'Vaše příjmení');
        inputText.setAttribute('type', 'text');
        inputText.setAttribute('placeholder', 'Váš email');
        inputText.setAttribute('name', 'email');
        inputPassword.setAttribute('type', 'password');
        inputPassword.setAttribute('placeholder', 'Vaše heslo');
        inputPassword.setAttribute('name', 'password');
        inputRepeatPassword.setAttribute('type', 'password');
        inputRepeatPassword.setAttribute('placeholder', 'Opakujte heslo');
        inputRepeatPassword.setAttribute('name', 'passwordRepeat');
        inputButton.setAttribute('type', 'button');
        inputButton.setAttribute('value', 'Registrovat');

        registerFormTitle.innerHTML = 'Vytvořte si Váš app účet';
        inputParagraph.innerHTML = 'Délka hesla musí mít minimálně 5 znaků.'

        document.body.appendChild(dialog);
        dialog.appendChild(registerDiv);
        registerDiv.appendChild(registerImgDiv);
        registerDiv.appendChild(registerFormDiv);
        registerFormDiv.appendChild(offButton);
        registerFormDiv.appendChild(registerFormTitle);
        registerFormDiv.appendChild(errorMessage);
        registerFormDiv.appendChild(Form);
        Form.appendChild(inputFirstName);
        Form.appendChild(inputLastName);
        Form.appendChild(inputText);
        Form.appendChild(inputPassword);
        Form.appendChild(inputRepeatPassword);
        Form.appendChild(inputParagraph);
        Form.appendChild(inputButton);

        return dialog;
    }

    /**
     * Metoda pro vepsani zpravy do formulare, napr. pri spatne zadane emailove adrese.
     * @param {string} text
     */
     controlInput(text, model) {
        let p = document.querySelector('.error-message');
        p.innerHTML = text;
        p.style.visibility = 'visible';
        document.querySelector(model).style.borderColor = '#FF5436';
    }

    correctInput(model) {
        document.querySelector(model).style.borderColor = '#e2e2ff';
    }

    inputFirstName() {
        let value = document.querySelector('.user-firstName').value.trim();
        let correctValue = value.charAt(0).toUpperCase() + value.slice(1);
        if (value.length > 1) {
            this.correctInput('.user-firstName');
            return correctValue;
        }
        else {
            this.controlInput('Neplatné údaje!', '.user-firstName');
            return false;
        }
    }

    inputLastName() {
        let value = document.querySelector('.user-lastName').value.trim();
        let correctValue = value.charAt(0).toUpperCase() + value.slice(1);
        if (value.length > 1) {
            this.correctInput('.user-lastName');
            return correctValue;
        }
        else {
            this.controlInput('Neplatné údaje!', '.user-lastName');
            return false;
        }
    }

   /**
    * Metoda pro kontrolu spravne zadaneho emailu.
    * @returns {string} Pokud spravne je zadana emailova adresa, tak metoda vrati uzivatelem zadanou emailovou adresu.
    * @returns {boolean} Pokud emailova adresa nesplni podminku, tak metoda vrati false.
    */
    inputEmail() {
        let RegisterEmail = document.querySelector('.user-email');
        let p = document.querySelector('.error-message');
        let mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (RegisterEmail.value.match(mailFormat)) {
            this.correctInput('.user-email');
            return RegisterEmail.value;
        }
        else {
            this.controlInput('Neplatné údaje!', '.user-email');
            return false;
        }
    }

   /**
    * Metoda pro kontrolu delky zadaneho hesla
    * @returns {string} pri splneni podminky, vrati metoda zadane heslo.
    * @returns {boolean} pri nesplneni podminky vrati false a vypise chybovou zpravu uzivateli do formulare.
    */
    inputPassword(){
        let correctValue = document.querySelector('.user-password').value.trim();
        if (correctValue.length >= 5) {
            this.correctInput('.user-password');
            return correctValue;
        }
        else {
            this.controlInput('Heslo musí mít minimálně 5 znaků!', '.user-password');
            return false;
        }
    }

   /**
    * Metoda overi jestli se zadane heslo shoduje se zadanym opetovnym heslem.
    * @returns {string} Metoda pri splneni podminky vrati heslo.
    * @returns {boolean} Metoda pri nespleni podminky vrati false a vypise chybovou zpravu uzivateli do formulare.
    */
    inputRepeatPassword(){
        let correctValue = document.querySelector('.user-repeat-password').value.trim();
        let firstPassword = this.inputPassword()
        if (firstPassword) {
            if (correctValue === firstPassword) {
                this.correctInput('.user-repeat-password');
                return correctValue;
            }
            else {
                this.controlInput('Hesla se neshodují!', '.user-repeat-password');
                return false;
            }
        }
    }

    /**
     * Metoda pro odeslani dat pomoci AJAXU na server.
     * @param {string} userEmail email zadany uzivatelem do formulare.
     * @param {string} userPassword heslo zadane uzivatelem do formulare.
     * @returns {promise} Metoda vrati promisu.
     */
    registerDataSend(userEmail, userPassword, firstName, lastName){
        let callDtbObject = {
            'firstName' : firstName,
            'lastName' : lastName,
            'email' : userEmail,
            'password' : userPassword
        }
        let postData = new PostAjax('POST', './php/registerUser.php');
        let dataDTB = postData.result(callDtbObject);
        return dataDTB;
    }

    /**
     * Metoda vymaze okno dialogu.
     */
    deleteDialog(){
        document.body.removeChild(document.querySelector('.register-dialog'));
    }


    /* 
    NAPSAT PODMINKU PRO VYPLNENI VSECH POLI
    
    */
   /**
    * 
    * @param {string} userEmail email zadany uzivatelem do formulare.
    * @param {string} userPassword heslo zadane uzivatelem do formulare.
    * @param {string} userRepeatPassword heslo zadane uzivatelem do formulare.
    */
    inputs(userEmail, userPassword, userRepeatPassword, firstName, lastName){
        if(userEmail && userPassword && userRepeatPassword && firstName && lastName){
            let dataDTB = this.registerDataSend(userEmail, userPassword, firstName, lastName);
            dataDTB.then(function(result){ // Pracujeme s promisou
                let answer = (text) => {  // Funkce pro vepsani zpravy do formulare, napr. pri kontrole, jestli uzivatel s emailovou adresou je jiz zaregistrovan
                    let p = document.querySelector('.error-message');
                    p.innerHTML = text;
                    p.style.visibility = 'visible';
                };

                if(result){ // Pokud se registrace provede
                    document.body.removeChild(document.querySelector('.register-dialog'));
                    let message = new Message('Uživatel byl úspěšně zaregistrován');
                }
                else{ // Pokud uzivatel s emailovou adresou je jiz zaregistrovan, tak se vypise chybova zprava do formulare.
                    answer('Uživatel s touto adresou je již registrován!');
                }
            })
        }
    }

}