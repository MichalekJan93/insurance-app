import { PostAjax} from "../ajax/postAjax.js";
import { controlLogin } from "../control.js";
import { Cookie } from "./cookie.js";
import { Header } from "./header.js";
import { LogOut } from "./logOut.js";
import { Message } from "./message.js";


/**
 * Třída pro přihlášení uživatele
 */
export class Login{

    /**
     * Metoda vytvoří dialog pro přihlášení
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
     * Metoda pro stylování elementu při špatně zadaném vstupu do formuláře.
     * @param {string} text text chybové hlášky, zobrazené uživateli
     */
    controlInput(text){
        let p = document.querySelector('.error-message');
        p.innerHTML = text;
        p.style.visibility = 'visible';
    }

    /**
     * Metoda ověří správnost vepsaného emailu
     * @returns při správném vyplnění vstupu se vrátí hodnota vstupu. Při nesprávném vstupu se zavolá metoda controlInput() a vrátí se false.
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
     * Metoda vložení hesla
     * @returns Heslo
     */
    inputPassword(){
        let loginPassword = document.querySelector('.user-password').value;
        return loginPassword;
    }

    /**
     * Metoda pro odeslání dat z formuláře do databáze
     * @param {string} userEmail - email
     * @param {string} userPassword - heslo
     * @returns data z php souboru
     */
    loginDataSend(userEmail, userPassword){
        let callDtbObject = {
            'user-email' : userEmail,
            'user-password' : userPassword
        }
        // Vytvoříme objekt PostAjax s metodou POST a trasou k souboru php
        let postData = new PostAjax('POST', './php/login.php');
        // Zavoláme metodu AJAX pro odeslání dat do souboru PHP
        let dataDTB = postData.result(callDtbObject);
        return dataDTB;
    }

    /**
     * Metoda odstraní dialog pro přihlášení
     */
    deleteDialog(){
        document.body.removeChild(document.querySelector('.dialog-login'));
    }

    /**
     * Metoda pro práci z daty z formuláře
     * @param {string} userEmail - email
     * @param {email} userPassword - heslo
     */
    inputs(userEmail, userPassword){
        //Ověření, že uživatel vyplnil všechny vstupy formuláře
        if(userEmail && userPassword){
            //Zavoláme metodu loginDataSend s parametry z dat z formuláře
            let dataDTB = this.loginDataSend(userEmail, userPassword);
            dataDTB.then(function(result){

                /**
                 * Funkce pro vypsání zprávy při špatném vyplnění formuláře
                 * @param {string} text - chybový zpráva zobrazená uživateli
                 */
                let answer = (text) => {
                    let p = document.querySelector('.error-message');
                    p.innerHTML = text;
                    p.style.visibility = 'visible';
                };

                try{
                    /* Pokud nepříjde odověď ze serveru, tak vypíšeme chybovou zrávu */
                    if(!result){
                        throw Error ('Neplatné přihlašovací údaje!');
                    }
                    //Převedeme odpověď ze serveru do JSON
                    let user = result;

                    //Pokud se přihlásí pojistitel
                    if(user.login == true && user.role == 1){
                        //Vytvoříme Cookie, které uchovává informaci o tom, že je užvatel přihlášen
                        let loginCookie = new Cookie('login', true);
                        loginCookie.setCookie();
                        // Uložíme do Cookie id pojistitele
                        let insurerCookie = new Cookie('insurerID', user.insurer);
                        insurerCookie.setCookie();
                        // Vyměníme ikonu pro přihlášení za ikonu pro odhlášení
                        let logIcon = new LogOut();
                        logIcon.setIcon(1);
                        //Odstraníme dialog pro přihlášení
                        document.body.removeChild(document.body.lastChild);
                        //Vytvoříme nové menu
                        let header = new Header(1);
                        controlLogin();
                    }
                    //Pokud se přihlásí pojištěnec
                    else if(user.login == true && user.role == 2){
                        //Vytvoříme Cookie, které uchovává informaci o tom, že je užvatel přihlášen
                        let loginCookie = new Cookie('login', true);
                        loginCookie.setCookie();
                        // Uložíme do Cookie id pojistitele
                        let insurerCookie = new Cookie('personID', user.person);
                        insurerCookie.setCookie();
                        // Vyměníme ikonu pro přihlášení za ikonu pro odhlášení
                        let logIcon = new LogOut();
                        logIcon.setIcon(2);
                        //Odstraníme dialog pro přihlášení
                        document.body.removeChild(document.body.lastChild);
                        //Vytvoříme nové menu
                        let header = new Header(2);
                        controlLogin();
                    }
                    // Vypíše potvrzovací zprávu uživateli
                    let message = new Message('JSTE ÚSPĚŠNĚ PŘIHLÁŠEN');

                } catch(err){ // Při špatném vyplnění údajů ve formuláři vypíšeme chybovou zprávu uživateli.
                    console.log(err);
                    answer('Neplatné přihlašovací údaje!');
                }
            })
        }
    }
}