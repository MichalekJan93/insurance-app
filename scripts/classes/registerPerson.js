import { PostAjax } from "../ajax/postAjax.js";
import { Message } from "./message.js";
import { InsuredPersonBox } from "./insuredPersonBox.js";

export class RegisterPerson {

    createDialog() {
        let dialog = document.createElement('dialog');
        let dialogUser = document.createElement('div');
        let dialogImg = document.createElement('div');
        let img = document.createElement('img');
        let dialogRegistration = document.createElement('div');
        let h2 = document.createElement('h2');
        let dialogOff = document.createElement('div');
        let errorMessage = document.createElement('p');

        let form = document.createElement('form');
        let formParagraphOne = document.createElement('p');
        let spanPersonalInformation = document.createElement('span');

        let formSpanOneBlockFirst = document.createElement('span');
        let labelFirstName = document.createElement('label');
        let inputFirstName = document.createElement('input');

        let formSpanOneBlockSecond = document.createElement('span');
        let labelLastName = document.createElement('label');
        let inputLastName = document.createElement('input');

        let formSpanOneBlockThird = document.createElement('span');
        let labelBirthdate = document.createElement('label');
        let inputBirthdate = document.createElement('input');

        let formParagraphTwo = document.createElement('p');
        let spanContactInformation = document.createElement('span');

        let formSpanOneBlockFourth = document.createElement('span');
        let labelAddress = document.createElement('label');
        let inputAddress = document.createElement('input');

        let formSpanOneBlockFifth = document.createElement('span');
        let labelCity = document.createElement('label');
        let inputCity = document.createElement('input');

        let formSpanOneBlockSixth = document.createElement('span');
        let labelNIP = document.createElement('label');
        let inputNIP = document.createElement('input');

        let formSpanOneBlockSevnth = document.createElement('span');
        let labelPhone = document.createElement('label');
        let inputPhone = document.createElement('input');

        let formSpanOneBlockEight = document.createElement('span');
        let labelEmail = document.createElement('label');
        let inputEmail = document.createElement('input');

        let spanRegistration = document.createElement('span');
        let registrationParagraph = document.createElement('p');
        let button = document.createElement('input');

        dialog.setAttribute('class', 'dialog-user');
        dialogUser.setAttribute('class', 'dialog-user dialog')
        dialogImg.setAttribute('class', 'dialog-img');
        img.setAttribute('src', './img/user-registration.jpg');
        img.setAttribute('alt', 'User registration, pojisteni app');
        dialogRegistration.setAttribute('class', 'dialog-registration');
        h2.setAttribute('class', 'dialog-title');
        dialogOff.setAttribute('class', 'dialog-off');
        errorMessage.setAttribute('class', 'error-message');
        form.setAttribute('class', 'section-form');
        spanPersonalInformation.setAttribute('class', 'personal-information');
        formSpanOneBlockFirst.setAttribute('class', 'one-block');
        inputFirstName.setAttribute('type', 'text');
        inputFirstName.setAttribute('name', 'firstName');
        inputFirstName.setAttribute('class', 'personFirstName');
        formSpanOneBlockSecond.setAttribute('class', 'one-block');
        inputLastName.setAttribute('type', 'text');
        inputLastName.setAttribute('name', 'lastName');
        inputLastName.setAttribute('class', 'personLastName');
        formSpanOneBlockThird.setAttribute('class', 'one-block');
        inputBirthdate.setAttribute('type', 'date');
        inputBirthdate.setAttribute('name', 'birthdate');
        inputBirthdate.setAttribute('class', 'personBirthdate');
        spanContactInformation.setAttribute('class', 'contact-information');
        formSpanOneBlockFourth.setAttribute('class', 'one-block');
        inputAddress.setAttribute('type', 'text');
        inputAddress.setAttribute('name', 'address');
        inputAddress.setAttribute('class', 'personAddress');
        formSpanOneBlockFifth.setAttribute('class', 'one-block');
        inputCity.setAttribute('type', 'text');
        inputCity.setAttribute('name', 'city');
        inputCity.setAttribute('class', 'personCity');
        formSpanOneBlockSixth.setAttribute('class', 'one-block');
        inputNIP.setAttribute('type', 'text');
        inputNIP.setAttribute('name', 'NIP');
        inputNIP.setAttribute('class', 'personNIP');
        formSpanOneBlockSevnth.setAttribute('class', 'one-block');
        inputPhone.setAttribute('type', 'text');
        inputPhone.setAttribute('name', 'phone');
        inputPhone.setAttribute('class', 'personPhone');
        formSpanOneBlockEight.setAttribute('class', 'one-block');
        inputEmail.setAttribute('type', 'text');
        inputEmail.setAttribute('name', 'email');
        inputEmail.setAttribute('class', 'personEmail');
        spanRegistration.setAttribute('class', 'registration');
        button.setAttribute('class', 'btn-send-data');
        button.setAttribute('type', 'button');
        button.setAttribute('value', 'Registrovat');

        h2.innerHTML = 'Registrace pojistníka';
        formParagraphOne.innerHTML = 'Osobní informace';
        labelFirstName.innerHTML = 'Jméno';
        labelLastName.innerHTML = 'Příjmení';
        labelBirthdate.innerHTML = 'Datum narození';
        formParagraphTwo.innerHTML = 'Kontaktní informace';
        labelAddress.innerHTML = 'Adresa';
        labelCity.innerHTML = 'Město';
        labelNIP.innerHTML = 'PSČ';
        labelPhone.innerHTML = 'Telefon';
        labelEmail.innerHTML = 'Email';
        registrationParagraph.innerHTML = 'Zaregistrovat uživatele'

        document.body.appendChild(dialog);
        dialog.appendChild(dialogUser);
        dialogUser.appendChild(dialogImg);
        dialogImg.appendChild(img);
        dialogUser.appendChild(dialogRegistration);
        dialogRegistration.appendChild(dialogOff);
        dialogRegistration.appendChild(h2);
        dialogRegistration.appendChild(form);
        form.appendChild(formParagraphOne);
        form.appendChild(spanPersonalInformation);
        spanPersonalInformation.appendChild(formSpanOneBlockFirst);
        formSpanOneBlockFirst.appendChild(labelFirstName);
        formSpanOneBlockFirst.appendChild(inputFirstName);
        spanPersonalInformation.appendChild(formSpanOneBlockSecond);
        formSpanOneBlockSecond.appendChild(labelLastName);
        formSpanOneBlockSecond.appendChild(inputLastName);
        spanPersonalInformation.appendChild(formSpanOneBlockThird);
        formSpanOneBlockThird.appendChild(labelBirthdate);
        formSpanOneBlockThird.appendChild(inputBirthdate);
        form.appendChild(formParagraphTwo);
        form.appendChild(spanContactInformation);
        spanContactInformation.appendChild(formSpanOneBlockFourth);
        formSpanOneBlockFourth.appendChild(labelAddress);
        formSpanOneBlockFourth.appendChild(inputAddress);
        spanContactInformation.appendChild(formSpanOneBlockFifth);
        formSpanOneBlockFifth.appendChild(labelCity);
        formSpanOneBlockFifth.appendChild(inputCity);
        spanContactInformation.appendChild(formSpanOneBlockSixth);
        formSpanOneBlockSixth.appendChild(labelNIP);
        formSpanOneBlockSixth.appendChild(inputNIP);
        spanContactInformation.appendChild(formSpanOneBlockSevnth);
        formSpanOneBlockSevnth.appendChild(labelPhone);
        formSpanOneBlockSevnth.appendChild(inputPhone);
        spanContactInformation.appendChild(formSpanOneBlockEight);
        formSpanOneBlockEight.appendChild(labelEmail);
        formSpanOneBlockEight.appendChild(inputEmail);
        form.appendChild(spanRegistration);
        spanRegistration.appendChild(registrationParagraph);
        form.appendChild(errorMessage);
        form.appendChild(button);

        return dialog;
    }

    visibilityPasswords() {
        let registrationBtn = document.querySelector('.registration');
        let form = document.querySelector('.section-form');

        form.removeChild(document.querySelector('.passwordFirst'));
        form.removeChild(document.querySelector('.passwordSecond'));

        registrationBtn.style.display = "block";
    }

    registrationPerson() {
        let errorMessage = document.querySelector('.error-message');
        let registrationBtn = document.querySelector('.registration');
        let passwordInputFirst = document.createElement('input');
        let passwordLabelFirst = document.createElement('label');
        let passwordInputSecond = document.createElement('input');
        let passwordLabelSecond = document.createElement('label');

        passwordInputFirst.setAttribute('class', 'passwordFirst');
        passwordInputSecond.setAttribute('class', 'passwordSecond');
        passwordInputFirst.setAttribute('type', 'password');
        passwordInputSecond.setAttribute('type', 'password');
        passwordInputFirst.setAttribute('name', 'password-first');
        passwordInputSecond.setAttribute('name', 'password-second');

        passwordLabelFirst.innerHTML = 'Heslo';
        passwordLabelSecond.innerHTML = 'Opakujte heslo';

        let form = document.querySelector('.section-form');
        form.insertBefore(passwordLabelFirst, errorMessage);
        form.insertBefore(passwordInputFirst, errorMessage);
        form.insertBefore(passwordLabelSecond, errorMessage);
        form.insertBefore(passwordInputSecond, errorMessage);

        registrationBtn.style.display = "none";
    }

    deleteDialog() {
        document.body.removeChild(document.querySelector('.dialog-user'));
    }

    showDialog() {
        let dialogUser = document.querySelector('.dialog-user');
        dialogUser.showModal();
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
        let value = document.querySelector('.personFirstName').value.trim();
        let correctValue = value.charAt(0).toUpperCase() + value.slice(1);
        if (value.length > 1) {
            this.correctInput('.personFirstName');
            return correctValue;
        }
        else {
            this.controlInput('Neplatné údaje!', '.personFirstName');
            return false;
        }
    }

    inputLastName() {
        let value = document.querySelector('.personLastName').value.trim();
        let correctValue = value.charAt(0).toUpperCase() + value.slice(1);
        if (value.length > 1) {
            this.correctInput('.personLastName');
            return correctValue;
        }
        else {
            this.controlInput('Neplatné údaje!', '.personLastName');
            return false;
        }
    }

    inputBirthdate() {
        let value = document.querySelector('.personBirthdate').value;
        if (value.length > 1) {
            this.correctInput('.personBirthdate');
            return value;
        }
        else {
            this.controlInput('Neplatné údaje!', '.personBirthdate');
            return false;
        }
    }

    inputAddress() {
        let value = document.querySelector('.personAddress').value.trim();
        let correctValue = value.charAt(0).toUpperCase() + value.slice(1);
        if (value.length > 1) {
            this.correctInput('.personAddress');
            return correctValue;
        }
        else {
            this.controlInput('Neplatné údaje!', '.personAddress');
            return false;
        }
    }

    inputCity() {
        let value = document.querySelector('.personCity').value.trim();
        let correctValue = value.charAt(0).toUpperCase() + value.slice(1);
        if (value.length > 1) {
            this.correctInput('.personCity');
            return correctValue;
        }
        else {
            this.controlInput('Neplatné údaje!', '.personCity');
            return false;
        }
    }

    inputNIP() {
        let value = document.querySelector('.personNIP').value.trim();
        let correctValue = parseInt(value);
        if (correctValue.toString().length == 5) {
            this.correctInput('.personNIP');
            return correctValue;
        }
        else {
            this.controlInput('Neplatné údaje!', '.personNIP');
            return false;
        }
    }

    inputPhone() {
        let value = document.querySelector('.personPhone').value.trim();
        let correctValue = parseInt(value);
        if (value[0] == '+') {
            correctValue = parseInt(value.substr(4, value.length));
            if (correctValue.toString().length == 9) {
                this.correctInput('.personPhone');
                return correctValue;
            }
            else {
                this.controlInput('Neplatné údaje!', '.personPhone');
                return false;
            }
        }
        else if (value[0] == '0') {
            correctValue = parseInt(value.substr(2, value.length));
            if (correctValue.toString().length == 9) {
                this.correctInput('.personPhone');
                return correctValue;
            }
            else {
                this.controlInput('Neplatné údaje!', '.personPhone');
                return false;
            }
        }
        else if (correctValue.toString().length == 9) {
            this.correctInput('.personPhone');
            return correctValue;
        }
        else {
            this.controlInput('Neplatné údaje!', '.personPhone');
            return false;
        }
    }

    inputEmail() {
        let RegisterEmail = document.querySelector('.personEmail');
        let p = document.querySelector('.error-message');
        let mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (RegisterEmail.value.match(mailFormat)) {
            this.correctInput('.personEmail');
            return RegisterEmail.value;
        }
        else {
            this.controlInput('Neplatné údaje!', '.personEmail');
            return false;
        }
    }

    inputFirstPassword(variable) {
        if (variable) {
            let correctValue = document.querySelector('.passwordFirst').value.trim();
            if (correctValue.length >= 5) {
                this.correctInput('.passwordFirst');
                return correctValue;
            }
            else {
                this.controlInput('Heslo musí mít minimálně 5 znaků!', '.passwordFirst');
                return false;
            }
        }
        return null
    }

    inputSecondPassword(variable) {
        if (variable) {
            let correctValue = document.querySelector('.passwordSecond').value.trim();
            let firstPassword = this.inputFirstPassword(variable)
            if (firstPassword) {
                if (correctValue === firstPassword) {
                    this.correctInput('.passwordSecond');
                    return correctValue;
                }
                else {
                    this.controlInput('Hesla se neshodují!', '.passwordSecond');
                    return false;
                }
            }
        }
        return null
    }

    registerDataSend(firstName, lastName, birthdate, city, address, NIP, phone, email, insurerID, passwordFirst) {
        let callDtbObject = {
            'firstName' : firstName,
            'lastName' : lastName,
            'birthdate' : birthdate,
            'city' : city,
            'address' : address,
            'NIP' : NIP,
            'phone' : phone,
            'email' : email,
            'insurerID' : insurerID,
            'passwordFirst' : passwordFirst
        }
        let postData = new PostAjax('POST', './php/registerPerson.php');
        let dataDTB = postData.result(callDtbObject);
        return dataDTB;
    }

    sendData(firstName, lastName, birthdate, city, address, NIP, phone, email, insurerID, passwordFirst, passwordSecond) {
        if (firstName && lastName && birthdate && city && address && NIP && phone && email && passwordFirst != false && passwordSecond != false) {
            let dataDTB = this.registerDataSend(firstName, lastName, birthdate, city, address, NIP, phone, email, insurerID, passwordFirst);
            dataDTB.then(function (result) { // Pracujeme s promisou
                let answer = (text) => {  // Funkce pro vepsani zpravy do formulare, napr. pri kontrole, jestli uzivatel s emailovou adresou je jiz zaregistrovan
                    let p = document.querySelector('.error-message');
                    p.innerHTML = text;
                    p.style.visibility = 'visible';
                };

                if (result == 'true') { // Pokud se registrace provede
                    document.body.removeChild(document.querySelector('.dialog-user'));
                    /* Odstranime stare boxy o uzivatelich a nechame vepsat do stranky nove */
                    let infoBoxes = document.querySelectorAll('.information-box');
                    for (let oneBox of infoBoxes) {
                        oneBox.remove();
                    }
                    document.querySelector('.control').remove();
                    let contentBox = new InsuredPersonBox();
                    contentBox.control();
                    let message = new Message('Pojistník byl úspěšně zaregistrován');
                }
                else { // Pokud uzivatel s emailovou adresou je jiz zaregistrovan, tak se vypise chybova zprava do formulare.
                    answer('Uživatel s touto adresou je již registrován!');
                }

            })
        }
    }
}