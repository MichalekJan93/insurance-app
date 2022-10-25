import { CreateInsurance } from "./createInsurance.js";
import { PostAjax } from "../ajax/postAjax.js";
import { Message } from "./message.js";
import { InsurancePersonBox } from "./insurancePersonBox.js";
import { Information } from "./information.js";
import { SessionStorage } from "./sessionStorage.js";


export class UpdateInsurance extends CreateInsurance{

    constructor(insuranceID, inputFrom){
        super(inputFrom);
        this.insuranceID = insuranceID;
        this.insurances = ['Pojištění vozidla', 'Pojištění nemovitosti', 'Životní pojištění'];
    }

    requestToServer(insuranceID) {
        let callDtbObject = {
            'ID' : insuranceID
        }
        let postData = new PostAjax('POST', './php/updateInsurance.php');
        let dataDTB = postData.result(callDtbObject);
        return dataDTB;
    }

    loadData() {
        let dataDTB = this.requestToServer(this.insuranceID);
        dataDTB.then(function (result) {
            result = JSON.parse(result);
            /* Naplneni inputu daty */
            document.querySelector('.personFirstName').value = result[0].personName[0].firstName;
            document.querySelector('.personLastName').value = result[0].personName[0].lastName;
            document.querySelector('.selected-insurance').innerHTML = result[0].type;
            document.querySelector('.insuranceObject').value = result[0].subject;
            document.querySelector('.insuranceAmount').value = result[0].amount;
            document.querySelector('.insuranceValidFrom').value = result[0].validFrom;
            document.querySelector('.insuranceValidUntil').value = result[0].validUntil;
        })
    }

    updateDataSend(id, type, amount, subject, validUntil) {
        let callDtbObject = {
            'id' : id,
            'type' : type,
            'amount' : amount,
            'subject' : subject,
            'validUntil' : validUntil
        }
        let postData = new PostAjax('POST', './php/updateInsurance.php');
        let dataDTB = postData.result(callDtbObject);
        return dataDTB;
    }

    updateData(id, type, amount, subject, validUntil, page) {
        if (type && amount && subject && validUntil) {
            let dataDTB = this.updateDataSend(id, type, amount, subject, validUntil);
            dataDTB.then(function (result) {
                if (result == 'true') { // Pokud se registrace provede
                    document.body.removeChild(document.querySelector('.insured-dialog'));

                    /* Pokud se budeme nachazet na strance pojisteni, tak odstranime stare boxy o pojisteni a nechame vepsat do stranky nove. */
                    if(page){
                        let infoBoxes = document.querySelectorAll('.information-box');
                        for (let oneBox of infoBoxes) {
                            oneBox.remove();
                        }
                        document.querySelector('.control').remove();
                        let contentBox = new InsurancePersonBox();
                        contentBox.control()
                    }
                    /* Pokud se budeme nachazet v informaci o uzivateli, tak odstranime stare boxy o pojisteni a nechame vepsat do stranky nove. */
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
                    
                    let message = new Message('Nová data byla uložena');
                }
            })
        }
    }
}