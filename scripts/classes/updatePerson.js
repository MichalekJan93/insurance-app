import { PostAjax } from "../ajax/postAjax.js";
import { Message } from "./message.js";
import { InsuredPersonBox } from "./insuredPersonBox.js";
import { RegisterPerson } from "./registerPerson.js";
/**
 * Class for editing the registered insured
 * The class inherits from the RegisterPerson class
 */
export class UpdatePerson extends RegisterPerson {
    /**
     * @param {number} personID The ID of the insured we want to modify
     */
    constructor(personID) {
        super();
        this.personID = personID
    }

    /**
     * Method to remove password creation button and rename "Odeslat" button to "Uložit" button
     */
    changeBtns(){
        document.querySelector('.registration').style.display = 'none';
        let btnSendData = document.querySelector('.btn-send-data');
        btnSendData.setAttribute('value', 'Uložit');
        btnSendData.classList.add('update-data');
    }

    /**
     * A method for retrieving insured data from a database
     * @param {number} personID The ID of the insured we want to modify
     * @returns Data from database
     */
    requestToServer(personID) {
        let callDtbObject = {
            'ID' : personID
        }
        // We will create a PostAjax object with the POST method and the path to the php file
        let postData = new PostAjax('POST', './php/updatePerson.php');
        // We call the result method to send the data to the PHP file
        let dataDTB = postData.result(callDtbObject);
        return dataDTB;
    }

    /**
     * A method to load data from the database back into the form
     */
    loadData() {
        let dataDTB = this.requestToServer(this.personID);
        dataDTB
            .then(function (result) {
                // We will fill the inputs with data    
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

    /**
     * A method to send new data to the database
     * @param {number} id           The ID of the insured person we are editing
     * @param {string} firstName    Name of the insured
     * @param {string} lastName     Lastname of the insured
     * @param {string} birthdate    Date of birth of the insured
     * @param {string} city         Residence of the insured
     * @param {string} address      Adress of the insured
     * @param {number} NIP          NIP of the insured
     * @param {string} phone        Phone number of the insured
     * @param {string} email        Email of the insured
     * @returns Data from database
     */
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
        // We will create a PostAjax object with the POST method and the path to the php file
        let postData = new PostAjax('POST', './php/updatePerson.php');
        // We call the result method to send the data to the PHP file
        let dataDTB = postData.result(callDtbObject);
        return dataDTB;
    }

    /**
     * A method for working with data from a database
     * @param {number} id           The ID of the insured person we are editing
     * @param {string} firstName    Name of the insured
     * @param {string} lastName     Lastname of the insured
     * @param {string} birthdate    Date of birth of the insured
     * @param {string} city         Residence of the insured
     * @param {string} address      Adress of the insured
     * @param {number} NIP          NIP of the insured
     * @param {string} phone        Phone number of the insured
     * @param {string} email        Email of the insured 
     */
    updateData(id, firstName, lastName, birthdate, city, address, NIP, phone, email) {
        // We will check if the data in the form is all entered and meets the conditions.
        if (firstName && lastName && birthdate && city && address && NIP && phone && email) {
            // We send the insurer id to the updateDataSend method
            let dataDTB = this.updateDataSend(id, firstName, lastName, birthdate, city, address, NIP, phone, email);
            dataDTB
                .then(function (result) {
                    // If the registration is done
                    if (result == true) {
                        document.body.removeChild(document.querySelector('.dialog-user'));
                        // We will delete the old user boxes and let the new ones be entered into the page
                        let infoBoxes = document.querySelectorAll('.information-box');
                        for (let oneBox of infoBoxes) {
                            oneBox.remove();
                        }
                        document.querySelector('.control').remove();
                        let contentBox = new InsuredPersonBox();
                        contentBox.control();
                        // The object prints a confirmation message to the user
                        let message = new Message('Nová data byla uložena');
                    }
            })
        }
    }
}