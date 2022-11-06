import { CreateInsurance } from "./createInsurance.js";
import { PostAjax } from "../ajax/postAjax.js";
import { Message } from "./message.js";
import { InsurancePersonBox } from "./insurancePersonBox.js";
import { Information } from "./information.js";
import { SessionStorage } from "./sessionStorage.js";

/**
 * Class for editing the created insurance
 */
export class UpdateInsurance extends CreateInsurance{

    /**
     * @param {number} insuranceID Insurance ID
     * @param {string} inputFrom The page from which we will edit the data.
     */
    constructor(insuranceID, inputFrom){
        super(inputFrom);
        this.insuranceID = insuranceID;
        this.insurances = ['Pojištění vozidla', 'Pojištění nemovitosti', 'Životní pojištění'];
    }
    
    /**
     * A method for retrieving insurance data from a database
     * @param {number} insuranceID Insurace ID
     * @returns Data from database
     */
    requestToServer(insuranceID) {
        let callDtbObject = {
            'ID' : insuranceID
        }
        // We will create a PostAjax object with the POST method and the path to the php file
        let postData = new PostAjax('POST', './php/updateInsurance.php');
        // We call the result method to send the data to the PHP file
        let dataDTB = postData.result(callDtbObject);
        return dataDTB;
    }

    /**
     * A method to load data from the database back into the form
     */
    loadData() {
        let dataDTB = this.requestToServer(this.insuranceID);
        dataDTB
            .then(function (result) {
                // We will fill the inputs with data
                document.querySelector('.personFirstName').value = result[0].personName[0].firstName;
                document.querySelector('.personLastName').value = result[0].personName[0].lastName;
                document.querySelector('.selected-insurance').innerHTML = result[0].type;
                document.querySelector('.insuranceObject').value = result[0].subject;
                document.querySelector('.insuranceAmount').value = result[0].amount;
                document.querySelector('.insuranceValidFrom').value = result[0].validFrom;
                document.querySelector('.insuranceValidUntil').value = result[0].validUntil;
            })
    }

    /**
     * A method to send new data to the database
     * @param {number} id Insurance ID
     * @param {string} type Type insurance
     * @param {string} amount Ammount
     * @param {string} subject Insurance object 
     * @param {string} validUntil Insurance valid until
     * @returns Data from database
     */
    updateDataSend(id, type, amount, subject, validUntil) {
        let callDtbObject = {
            'id' : id,
            'type' : type,
            'amount' : amount,
            'subject' : subject,
            'validUntil' : validUntil
        }
        // We will create a PostAjax object with the POST method and the path to the php file
        let postData = new PostAjax('POST', './php/updateInsurance.php');
        // We call the result method to send the data to the PHP file
        let dataDTB = postData.result(callDtbObject);
        return dataDTB;
    }

    /**
     * A method for working with data from a database
     * @param {number} id Insurance ID
     * @param {string} type Type insurance
     * @param {string} amount Ammount
     * @param {string} subject Insurance object 
     * @param {string} validUntil Insurance valid until 
     * @param {number} page The page from which we will edit the data.
     */
    updateData(id, type, amount, subject, validUntil, page) {
        // We will check if the data in the form is all entered and meets the conditions.
        if (type && amount && subject && validUntil) {
            // We send the insurer id to the updateDataSend method
            let dataDTB = this.updateDataSend(id, type, amount, subject, validUntil);
            dataDTB
                .then(function (result) {
                    // If the registration is done
                    if (result == true) {
                        document.body.removeChild(document.querySelector('.insured-dialog'));
                        // If we are on the insurance page, remove the old insurance boxes and let us enter the new ones on the page
                        if(page){
                            let infoBoxes = document.querySelectorAll('.information-box');
                            for (let oneBox of infoBoxes) {
                                oneBox.remove();
                            }
                            document.querySelector('.control').remove();
                            let contentBox = new InsurancePersonBox();
                            contentBox.control()
                        }
                        // If we are in the information about the user, then remove the old insurance boxes and let the new ones be entered on the page
                        else{
                            let infoBoxes = document.querySelectorAll('.information-box-dialog');
                            for (let oneBox of infoBoxes) {
                                oneBox.remove();
                            }
                            document.querySelector('.control-dialog').remove();
                            let sessionStorage = new SessionStorage();

                            let contentBox = new Information();
                            contentBox.control(sessionStorage.getSessionData())
                        }
                        // The object prints a confirmation message to the user
                        let message = new Message('Nová data byla uložena');
                    }
            })
        }
    }
}