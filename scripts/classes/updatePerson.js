import { PostAjax } from "../ajax/postAjax.js";
import { Message } from "./message.js";
import { InsuredPersonBox } from "./insuredPersonBox.js";
import { RegisterPerson } from "./registerPerson.js";

export class UpdatePerson extends RegisterPerson {

    constructor(personID) {
        super();
        this.personID = personID
    }

    changeBtns(){
        /* Odstraneni tlacitko pro zmenu hesla. */
        document.querySelector('.registration').style.display = 'none';
        /* Prejmenujeme odesilaci tlacitko */
        let btnSendData = document.querySelector('.btn-send-data');
        btnSendData.setAttribute('value', 'Uložit');
        btnSendData.classList.add('update-data');
    }

    requestToServer(personID) {
        let callDtbObject = {
            'ID' : personID
        }
        let postData = new PostAjax('POST', './php/updatePerson.php');
        let dataDTB = postData.result(callDtbObject);
        return dataDTB;
    }

    loadData() {
        let dataDTB = this.requestToServer(this.personID);
        dataDTB.then(function (result) {

            /* Naplneni inputu daty */
            document.querySelector('.personFirstName').value = result[0].firstName;
            document.querySelector('.personLastName').value = result[0].lastName;
            document.querySelector('.personBirthdate').value = result[0].birthdate;
            document.querySelector('.personAddress').value = result[0].address;
            document.querySelector('.personCity').value = result[0].city;
            document.querySelector('.personNIP').value = result[0].NIP;
            document.querySelector('.personPhone').value = result[0].phone;
            document.querySelector('.personEmail').value = result[0].email;
        })
    }

    updateDataSend(id, firstName, lastName, birthdate, city, address, NIP, phone, email) {
        let callDtbObject = {
            'id' : id,
            'firstName' : firstName,
            'lastName' : lastName,
            'birthdate' : birthdate,
            'city' : city,
            'address' : address,
            'NIP' : NIP,
            'phone' : phone,
            'email' : email,
        }
        let postData = new PostAjax('POST', './php/updatePerson.php');
        let dataDTB = postData.result(callDtbObject);
        return dataDTB;
    }

    updateData(id, firstName, lastName, birthdate, city, address, NIP, phone, email) {
        if (firstName && lastName && birthdate && city && address && NIP && phone && email) {
            let dataDTB = this.updateDataSend(id, firstName, lastName, birthdate, city, address, NIP, phone, email);
            dataDTB.then(function (result) {
                if (result == true) { // Pokud se registrace provede
                    document.body.removeChild(document.querySelector('.dialog-user'));
                    /* Odstranime stare boxy o uzivatelich a nechame vepsat do stranky nove */
                    let infoBoxes = document.querySelectorAll('.information-box');
                    for (let oneBox of infoBoxes) {
                        oneBox.remove();
                    }
                    document.querySelector('.control').remove();
                    let contentBox = new InsuredPersonBox();
                    contentBox.control();
                    let message = new Message('Nová data byla uložena');
                }
            })
        }
    }
}