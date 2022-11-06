import { PostAjax} from "../ajax/postAjax.js";
import { Message } from "./message.js";
/**
 * A class for creating a sectio home for a registered insurare
 */

export class RegisterUser{

    /**
     * The method creates a dialog for registering the insured
     * @returns dialog
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
     * A method for styling an element when a form input is incorrectly entered
     * @param {string} text The text of the error message displayed by the user
     * @param {DOM element} model Element for styling
     */
     controlInput(text, model) {
        let p = document.querySelector('.error-message');
        p.innerHTML = text;
        p.style.visibility = 'visible';
        document.querySelector(model).style.borderColor = '#FF5436';
    }

    /**
     * A method to style an element on correct input in a form.
     * @param {DOM element} model Element for styling
     */
    correctInput(model) {
        document.querySelector(model).style.borderColor = '#e2e2ff';
    }

    /**
     * A method for verifying the correctness of filling in the input named jméno
     * @returns If the input is filled correctly, the value of the input is returned. If the input is incorrect, the controlInput() method is called and false is returned.
     */
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

    /**
     * A method for verifying the correctness of filling in the input named příjmení
     * @returns If the input is filled correctly, the value of the input is returned. If the input is incorrect, the controlInput() method is called and false is returned.
     */
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
     * A method for verifying the correctness of filling in the input named email
     * @returns If the input is filled correctly, the value of the input is returned. If the input is incorrect, the controlInput() method is called and false is returned.
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
     * Method for verifying the correctness of the entered password
     * @returns If the password is written correctly, we return the password, if not we return false. If no password is entered at all, we return null.
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
     * A method for checking passwords. We check if the passwords match.
     * @returns If the password is written correctly, we return the password, if not we return false. If no password is entered at all, we return null.
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
     * A method for working with data from a form
     * @param {string} userEmail email entered by the user in the form
     * @param {string} userPassword password entered by the user in the form
     * @param {string} userRepeatPassword repeat password entered by the user in the form
     * @param {string} firstName first name entered by the user in the form
     * @param {string} lastName last naem entered by the user in the form
     * @returns Data from database
     */
    registerDataSend(userEmail, userPassword, firstName, lastName){
        let callDtbObject = {
            'firstName' : firstName,
            'lastName' : lastName,
            'email' : userEmail,
            'password' : userPassword
        }
        // We will create a PostAjax object with the POST method and the path to the php file
        let postData = new PostAjax('POST', './php/registerUser.php');
        // We call the result method to send the data to the PHP file
        let dataDTB = postData.result(callDtbObject);
        return dataDTB;
    }

    /**
     * The method removes the dialog from the page
     */
    deleteDialog(){
        document.body.removeChild(document.querySelector('.register-dialog'));
    }

   /**
    * A method for working with data from a form
    * @param {string} userEmail email entered by the user in the form
    * @param {string} userPassword password entered by the user in the form
    * @param {string} userRepeatPassword repeat password entered by the user in the form
    * @param {string} firstName first name entered by the user in the form
    * @param {string} lastName last naem entered by the user in the form
    */
    inputs(userEmail, userPassword, userRepeatPassword, firstName, lastName){
        // We will check if the data in the form is all entered and meets the conditions.
        if(userEmail && userPassword && userRepeatPassword && firstName && lastName){
            // We send the insurer id to the registerDataSend method
            let dataDTB = this.registerDataSend(userEmail, userPassword, firstName, lastName);
            dataDTB
                .then(function(result){
                    let answer = (text) => { // Function for entering a message into the form, e.g. when checking whether a user with an email address is already registered
                        let p = document.querySelector('.error-message');
                        p.innerHTML = text;
                        p.style.visibility = 'visible';
                    };
                    // If the registration is done
                    if(result){
                        document.body.removeChild(document.querySelector('.register-dialog'));
                        let message = new Message('Uživatel byl úspěšně zaregistrován');
                    }
                    // If the user is registered with an email address, we will write a message in the form
                    else{
                        answer('Uživatel s touto adresou je již registrován!');
                    }
            })
        }
    }

}