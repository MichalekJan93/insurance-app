import { PostAjax} from "../ajax/postAjax.js";
import { controlLogin } from "../control.js";
import { Cookie } from "./cookie.js";
import { Header } from "./header.js";
import { LogOut } from "./logOut.js";
import { Message } from "./message.js";


/**
 * Class for user login
 */
export class Login{

    /**
     * The method creates a login dialog
     * @returns dialog
     */
    createDialog(){
        let dialog = document.createElement('dialog');
        let loginDiv = document.createElement('div');
        let loginImgDiv = document.createElement('div');
        let loginFormDiv = document.createElement('div');
        let offButton = document.createElement('div');
        let errorMessage = document.createElement('p');
        let loginFormTitle= document.createElement('h2');
        let Form = document.createElement('form');
        let inputText = document.createElement('input');
        let inputPassword = document.createElement('input');
        let registerParagraph = document.createElement('a');
        let inputButton = document.createElement('input');

        dialog.setAttribute('class', 'dialog-login');
        loginDiv.setAttribute('class','login');
        loginImgDiv.setAttribute('class','login-img');
        loginFormDiv.setAttribute('class','login-form');
        offButton.setAttribute('class', 'dialog-off');
        errorMessage.setAttribute('class', 'error-message');
        inputText.setAttribute('class', 'user-email');
        inputPassword.setAttribute('class', 'user-password');
        registerParagraph.setAttribute('class', 'register-admin');
        inputButton.setAttribute('class', 'btn-send-data');

        inputText.setAttribute('type', 'text');
        inputText.setAttribute('placeholder', 'Váš email');
        inputText.setAttribute('name', 'email');
        inputPassword.setAttribute('type', 'password');
        inputPassword.setAttribute('placeholder', 'Vaše heslo');
        inputPassword.setAttribute('name', 'password');
        inputButton.setAttribute('type', 'button');
        inputButton.setAttribute('value', 'Přihlásit');

        loginFormTitle.innerHTML = 'Vítejte!';
        registerParagraph.innerHTML = 'Registrace';

        document.body.appendChild(dialog);
        dialog.appendChild(loginDiv);
        loginDiv.appendChild(loginImgDiv);
        loginDiv.appendChild(loginFormDiv);
        loginFormDiv.appendChild(offButton);
        loginFormDiv.appendChild(loginFormTitle);
        loginFormDiv.appendChild(errorMessage);
        loginFormDiv.appendChild(Form);
        Form.appendChild(inputText);
        Form.appendChild(inputPassword);
        Form.appendChild(registerParagraph);
        Form.appendChild(inputButton);

        return dialog;
    }

    /**
     * A method for styling an element when a form input is incorrectly entered
     * @param {string} text the text of the error message displayed by the user
     */
    controlInput(text){
        let p = document.querySelector('.error-message');
        p.innerHTML = text;
        p.style.visibility = 'visible';
    }

    /**
     * The method verifies the correctness of the entered email
     * @returns if the input is filled correctly, the value of the input is returned. If the input is incorrect, the controlInput() method is called and false is returned
     */
    inputEmail(){
        let loginEmail = document.querySelector('.user-email');
        let p = document.querySelector('.error-message');
            let mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if(loginEmail.value.match(mailFormat)){
                return loginEmail.value;
            }
            else{
                this.controlInput('Neplatná emailová adresa!');
                return false;
            }
    }

    /**
     * Password input method
     * @returns Password
     */
    inputPassword(){
        let loginPassword = document.querySelector('.user-password').value;
        return loginPassword;
    }

    /**
     * A method that receives data about insured persons from the database
     * @param {string} userEmail The user's email entered in the form
     * @param {string} userPassword The user's password entered in the form
     * @returns Data from the database
     */
    loginDataSend(userEmail, userPassword){
        let callDtbObject = {
            'user-email' : userEmail,
            'user-password' : userPassword
        }
        // We will create a PostAjax object with the POST method and the path to the php file
        let postData = new PostAjax('POST', './php/login.php');
        // We call the result method to send the data to the PHP file
        let dataDTB = postData.result(callDtbObject);
        return dataDTB;
    }

    /**
     * The method removes the login dialog
     */
    deleteDialog(){
        document.body.removeChild(document.querySelector('.dialog-login'));
    }

    /**
     * A method for working with data from a form
     * @param {string} userEmail The user's email entered in the form
     * @param {string} userPassword The user's password entered in the form
     */
    inputs(userEmail, userPassword){
        // Verifying that the user has completed all form inputs
        if(userEmail && userPassword){
            // We call the loginDataSend method with parameters from data from the form
            let dataDTB = this.loginDataSend(userEmail, userPassword);
            dataDTB.then(function(result){

                /**
                 * Function to print a message when the form is filled out incorrectly
                 * @param {string} text Error message displayed to the user
                 */
                let answer = (text) => {
                    let p = document.querySelector('.error-message');
                    p.innerHTML = text;
                    p.style.visibility = 'visible';
                };

                try{
                    // If there is no response from the server, we will print an error message
                    if(!result){
                        throw Error ('Neplatné přihlašovací údaje!');
                    }
                    // We will convert the response from the server to JSON
                    let user = result;

                    // If an insurer logs into the application
                    if(user.login == true && user.role == 1){
                        // We will create a cookie that stores information about the fact that the user is logged in
                        let loginCookie = new Cookie('login', true);
                        loginCookie.setCookie();
                        // We save the insurer's ID in the Cookie
                        let insurerCookie = new Cookie('insurerID', user.insurer);
                        insurerCookie.setCookie();
                        // We will replace the login icon with a logout icon
                        let logIcon = new LogOut();
                        logIcon.setIcon(1);
                        // We will remove the login dialog
                        document.body.removeChild(document.body.lastChild);
                        // We will create a new menu
                        let header = new Header(1);
                        controlLogin();
                    }
                    // If the insured applies
                    else if(user.login == true && user.role == 2){
                        // We will create a cookie that stores information about the fact that the user is logged in
                        let loginCookie = new Cookie('login', true);
                        loginCookie.setCookie();
                        // We save the insurer's ID in the Cookie
                        let insurerCookie = new Cookie('personID', user.person);
                        insurerCookie.setCookie();
                        // We will replace the login icon with a logout icon
                        let logIcon = new LogOut();
                        logIcon.setIcon(2);
                        // We will remove the login dialog
                        document.body.removeChild(document.body.lastChild);
                        // We will create a new menu
                        let header = new Header(2);
                        controlLogin();
                    }
                    // Prints a confirmation message to the user
                    let message = new Message('JSTE ÚSPĚŠNĚ PŘIHLÁŠEN');

                } catch(err){ // If the data in the form is filled in incorrectly, we will display an error message to the user.
                    console.log(err);
                    answer('Neplatné přihlašovací údaje!');
                }
            })
        }
    }
}