/**
 * The file in which the script of the entire application is controlled except for the header.
 */

import { Cookie } from "./classes/cookie.js";
import { CreateInsurance } from "./classes/createInsurance.js";
import { DeleteInsurance } from "./classes/deleteInsurance.js";
import { DeletePerson } from "./classes/deletePerson.js";
import { Header } from "./classes/header.js";
import { InfoBox } from "./classes/infoBox.js";
import { Information } from "./classes/information.js";
import { InsurancePersonBox } from "./classes/insurancePersonBox.js";
import { InsuredPersonBox } from "./classes/insuredPersonBox.js";
import { Login } from "./classes/login.js";
import { LogOut } from "./classes/logOut.js";
import { Message } from "./classes/message.js";
import { Overview } from "./classes/overview.js";
import { OverviewInsurance } from "./classes/overviewInsurance.js";
import { OverviewPerson } from "./classes/overviewPerson.js";
import { RegisterPerson } from "./classes/registerPerson.js";
import { RegisterUser } from "./classes/registerUser.js";
import { SelectedPersonBox } from "./classes/selectedPersonBox.js";
import { SessionStorage } from "./classes/sessionStorage.js";
import { UpdateInsurance } from "./classes/updateInsurance.js";
import { UpdatePerson } from "./classes/updatePerson.js";


let className, overview, header;
let newBox = new Box();
let logIcon = new LogOut();
let cookie = new Cookie();
let sessionStorage = new SessionStorage();

/**
 * Function for creating a home page.
 */
export function controlLogin(){
    // If we read the data from the cookie that the insurer is logged in, we will create an initial page for the logged-in insurer
    if(cookie.checkCookie('login') && cookie.checkCookie('insurerID')){
        newBox.remove();
        // We store the Header object in the variable header and pass it the parameter 1. 1 means that we want to render the menu in the header for the registered insurer
        className = 'Home';
        header = new Header(1);
        newBox.createBox(className);
        // We will change the login icons to logout icons
        logIcon.setIcon(1);
        logOut();
        // We save the object for the registered insurer in the overview variable
        overview = new OverviewInsurance;
        // A method to create a section and its DOM model
        overview.createDivs();
        // We will fill the section with data from the database
        overview.control(cookie.getCookie('insurerID'))
    }
    // If we read the data from the cookie that the insured is logged in, we will create an initial page for the logged-in insured
    else if(cookie.checkCookie('login') && cookie.checkCookie('personID')){
        newBox.remove();
        className = 'Home';
        // We store the Header object in the header variable and pass it the parameter 0. 0 means that we want to render the menu in the header for a logged-in insured or non-logged-in user.
        header = new Header(0);
        newBox.createBox(className);
        // We will change the login icons to logout icons
        logIcon.setIcon(1);
        logOut();
        className = 'Home';
        // We save the object for the registered insured in the overview variable
        overview = new OverviewPerson;
        // A method to create a section and its DOM model
        overview.createDivs();
        // We will fill the section with data from the database
        overview.control(cookie.getCookie('personID'))
    }
    // If a section already exists and it is not a logged-in user, we delete the internal data from the section. We do this when the user logs out
    else if(document.querySelector('.section')){
        newBox.remove();
        // We store the Header object in the header variable and pass it the parameter 0. 0 means that we want to render the menu in the header for a logged-in insured or non-logged-in user.
        header = new Header(0);
        // We will change the login icons to logout icons
        logIcon.setIcon(0);
        className = 'Home';
        newBox.createBox(className);
        // We save the object for a non-logged in user user in the overview variable
        overview = new Overview;
        overview.createDivs();
    }
    // If the user is not logged in, we will create a section for the unlogged user
    else{
        newBox.remove();
        // We store the Header object in the header variable and pass it the parameter 0. 0 means that we want to render the menu in the header for a logged-in insured or non-logged-in user.
        header = new Header(0);
        className = 'Home';
        newBox.createBox(className);
        // We save the object for a non-logged in user in the overview variable
        overview = new Overview;
        overview = new Overview;
        overview.createDivs();
    }
}

/**
 * Function for deleting cookies
 */
function deleteCookies(){
    // Delete login cookies
    cookie.deleteCookie('login');
    // Delete insurer ID
    cookie.deleteCookie('insurerID');
    // Delete insured ID
    cookie.deleteCookie('personID');
} 

/**
 * Function for logging out the user from the application
 */
function logOut(){
    let logout = document.querySelector('.logout');
    logout.addEventListener('click', function(){
        // Delet cookies
        deleteCookies(); 
        // Create new home page
        controlLogin(); 
        // Display the message to the user.
        let message = new Message('JSTE ÚSPĚŠNĚ ODHLÁŠEN'); 
    })
}

/**
 * Function for delete dialog
 */
function deleteDialog(object, dialog, iconPlacement){
    // If we click the ESC key, we will remove the dialog from the DOM element
    document.body.addEventListener('keydown', function(e){
        if(e.key == "Escape" && document.body.lastChild.className == dialog){
            object.deleteDialog();
        }
    });

    // If we click on the cross icon, we will remove the dialog from the DOM element
    let dialogRegistration = document.querySelector(iconPlacement);
    dialogRegistration.firstChild.addEventListener('click', function(){
        object.deleteDialog();
    });
}

// We call the login check function
controlLogin();

// Capturing login icon clicks
let loginIcons = document.querySelectorAll('.login');

for(let i = 0; i < loginIcons.length; i++){
    loginIcons[i].addEventListener('click',function(event){
        let loginBox = new Login();
        let loginDialog = loginBox.createDialog();
        let btnSendData = document.querySelector('.btn-send-data');
        let email = document.querySelector('.user-email');
        loginDialog.showModal();

        // Call the function to remove the dialog 
        deleteDialog(loginBox, 'dialog-login', '.login-form');

        // Submit the form with enter
        loginDialog.addEventListener('keydown', function(e){
            if(e.key == "Enter"){
                loginBox.inputs(loginBox.inputEmail(), loginBox.inputPassword());
            }
        });

        // Submitting the form after clicking the "přihlásit" button
        btnSendData.addEventListener('click', function(){
            loginBox.inputs(loginBox.inputEmail(), loginBox.inputPassword());
        });

        // Capturing clicks on the registrovat button
        let registerBtn = document.querySelector('.register-admin');
        registerBtn.addEventListener('click', function(){
            // Delete login Dialog
            loginBox.deleteDialog();
            // Creating a RegisterUser object in the registerBox variable and creating a registration dialog
            let registerBox = new RegisterUser;
            let registerDialog = registerBox.createDialog();
            registerDialog.showModal();

            // Call the function to remove the dialog 
            deleteDialog(registerBox, 'register-dialog', '.login-form');

             // Submitting the form after clicking the "registrovat" button
            let btnSendRegisterData = document.querySelector('.btn-send-data');
            btnSendRegisterData.addEventListener('click', function(){
                registerBox.inputs(registerBox.inputEmail(), registerBox.inputPassword(), registerBox.inputRepeatPassword(), registerBox.inputFirstName(), registerBox.inputLastName());
            });
        })
    })
}

/** Capturing a click on an item in the menu in the header  */
let menu = document.querySelectorAll('.menu');
for(let i = 0; i < menu.length; i++){
    menu[i].addEventListener('click', function(event){
        // We will delete the existing content in the section
        newBox.remove();
        // In the className variable, we insert the name of the item from the menu that we clicked on
        className = event.target.innerText;
        // If we click on the item Pojištěnci
        if(className == 'Pojištěnci'){
            // We insert a new class name for section
            newBox.rename(className);
            // We create an InsuredPersonBox object and put it in the centotentBox variable
            let contentBox = new InsuredPersonBox();
            contentBox.insertData('Seznam pojištěnců');
            contentBox.control();

           // Capturing clicks on the add policyholder button
            let createUserBtn = document.querySelector('.addButton');
            createUserBtn.addEventListener('click', function(){
                // We create an RegisterPerson object and put it in the createUser variable
                let createUser = new RegisterPerson();
                let userBox = createUser.createDialog();
                createUser.showDialog();
                // If the inputs for adding a password are displayed during the registration of the insured, we will hide them
                if(!document.querySelector('.registration')){
                    createUser.visibilityPasswords()
                }

                // If we click on "registrovat" we will see inputs for entering the password
                let registrationBtn = document.querySelector('.registration');
                let registerPerson = 0; // With the help of variables we will find out if we want to register users.
                registrationBtn.addEventListener('click', function(){
                    createUser.registrationPerson();
                    registerPerson = 1;
                });

                // Function to remove dialog
                deleteDialog(createUser, 'dialog-user', '.dialog-registration');

                // Submit data from the form after clicking the button registrovat
                let btnSendRegisterData = document.querySelector('.btn-send-data');
                btnSendRegisterData.addEventListener('click', function(){
                    createUser.sendData(createUser.inputFirstName(), createUser.inputLastName(), createUser.inputBirthdate(), createUser.inputCity(), createUser.inputAddress(), createUser.inputNIP(), createUser.inputPhone(), createUser.inputEmail(), cookie.getCookie('insurerID'), createUser.inputFirstPassword(registerPerson), createUser.inputSecondPassword(registerPerson));
                });
            })

            // Creating a cycle and functions for filtering the insured
            let filterInputs = document.querySelectorAll('.filter-input');
            let filterName = document.querySelector('.filterName');
            let filterSurname = document.querySelector('.filterSurname');
            let filterNIP = document.querySelector('.filterNIP');

            let filter = () => {
                let infoBoxes = document.querySelectorAll('.information-box');
                for (let oneBox of infoBoxes) {
                    oneBox.remove();
                }
                contentBox.control(1, filterName.value, filterSurname.value, filterNIP.value);
                document.querySelector('.control').remove();
            }

            for(let i = 0; i < filterInputs.length; i++){
                filterInputs[i].addEventListener('focus', function(){
                    this.addEventListener('keyup', filter);
                })
            }
        }
        // If we click on the item Info
        else if(className == 'Info'){
            // We insert a new class name for section
            newBox.rename(className);
            // We create an InfoBox object and put it in the centotentBox variable
            let contentBox = new InfoBox();
            contentBox.insertData();
        }
        // If we click on the item Pojištěnci
        else if(className == 'Pojištění'){
            // We insert a new class name for section
            newBox.rename(className)
            // We create an InfoBox object and put it in the centotentBox variable
            let contentBox = new InsurancePersonBox();
            contentBox.insertData('Seznam pojištění');
            contentBox.control();
            // Create insurance after clicking the button to add insurance
            let createInsuranceBtn = document.querySelector('.addButton-dialog');
            createInsuranceBtn.addEventListener('click', function(){
                // We create an SelectedPersonBox object and put it in the selectedPersonForInsurance variable
                let selectedPersonForInsurance = new SelectedPersonBox();
                // We will create a dialog for selecting the insured for whom I want to create insurance
                selectedPersonForInsurance.createSelectedBox();
                selectedPersonForInsurance.showDialog();

                // I will select an insured from a selection of insureds
                let selectPerson = document.querySelector('.select-person');
                selectPerson.addEventListener('click', function(){
                    selectedPersonForInsurance.control();
                })
                // Sending the selected peroson to the form for adding insurance
                let selectedButton = document.querySelector('.selected-button')
                selectedButton.addEventListener('click', function(){
                    // We create an CreateInsurance object and put it in the createInsurance variable
                    let createInsurance = new CreateInsurance();
                    createInsurance.control(sessionStorage.getSessionData());

                    // Delete dialog for selcted insured person
                    selectedPersonForInsurance.deleteDialog();

                    // Create dialog for registration new insurance
                    createInsurance.createDialog();
                    createInsurance.showDialog();
                    
                    // Function to remove dialog
                    deleteDialog(createInsurance, 'insured-dialog', '.insured-information');

                    // Submit data from the form after clicking the button uložit
                    let btnSendRegisterData = document.querySelector('.btn-send-data');
                    btnSendRegisterData.addEventListener('click', function(){

                    createInsurance.sendData(createInsurance.inputType(), createInsurance.inputAmount(), createInsurance.inputObject(),createInsurance.inputValidFrom(), createInsurance.inputValidUntil(), sessionStorage.getSessionData('personID'), cookie.getCookie('insurerID'), 1);
                    });

                })
                // Function to remove dialog
                deleteDialog(selectedPersonForInsurance, 'selected-box', '.selected-box');
            })
        }
        // We will find out from the cookie if the insurer, the insured is logged in or if there is a non-logged-in user on the page
        else if(className == 'Home'){
            // We insert a new class name for section
            newBox.rename(className);

            if(cookie.getCookie('insurerID')){
                // If the insurer has logged in, we will create an object that will create the home page for the logged-in insurer
                overview = new OverviewInsurance;
                overview.createDivs();
                overview.control(cookie.getCookie('insurerID'));
            }
            else if(cookie.getCookie('personID')){
                // If the insured person has logged in, we will create an object that will create the home page for the logged-in insured person
                overview = new OverviewPerson;
                overview.createDivs();
                overview.control(cookie.getCookie('personID'));
            }
            else{
                // If there is a non-logged-in user on the page, we create an object that will create a home page for a non-logged-in user
                overview = new Overview;
                overview.createDivs();
            }
        }
        // If there were no data in the className variable, we will print the Home page
        else{
            // We insert a new class name for section
            newBox.rename('Home');

            if(cookie.getCookie('insurerID')){
                // If the insurer has logged in, we will create an object that will create the home page for the logged-in insurer
                overview = new OverviewInsurance;
                overview.createDivs();
                overview.control(cookie.getCookie('insurerID'));
            }
            else if(cookie.getCookie('personID')){
                // If the insured person has logged in, we will create an object that will create the home page for the logged-in insured person
                overview = new OverviewPerson;
                overview.createDivs();
                overview.control(cookie.getCookie('personID'));
            }
            else{
                // If there is a non-logged-in user on the page, we create an object that will create a home page for a non-logged-in user
                overview = new Overview;
                overview.createDivs();
            }
        }
    })
}

/* Creation of a mutation to control elements in the header menu, which we add only after logging in or logging out */
let observerMenuHeader = new MutationObserver(MutationRecord =>{

    /** Capturing a click on an item in the menu in the header  */
    let menu = document.querySelectorAll('.menu');
    for(let i = 0; i < menu.length; i++){
        menu[i].addEventListener('click', function(event){
            console.log(event.target.innerText);
        // We will delete the existing content in the section
        newBox.remove();
        // In the className variable, we insert the name of the item from the menu that we clicked on
        className = event.target.innerText;
        // If we click on the item Pojištěnci
        if(className == 'Pojištěnci'){
            // We insert a new class name for section
            newBox.rename(className);
            // We create an InsuredPersonBox object and put it in the centotentBox variable
            let contentBox = new InsuredPersonBox();
            contentBox.insertData('Seznam pojištěnců');
            contentBox.control();

           // Capturing clicks on the add policyholder button
            let createUserBtn = document.querySelector('.addButton');
            createUserBtn.addEventListener('click', function(){
                // We create an RegisterPerson object and put it in the createUser variable
                let createUser = new RegisterPerson();
                let userBox = createUser.createDialog();
                createUser.showDialog();
                // If the inputs for adding a password are displayed during the registration of the insured, we will hide them
                if(!document.querySelector('.registration')){
                    createUser.visibilityPasswords()
                }

                // If we click on "registrovat" we will see inputs for entering the password
                let registrationBtn = document.querySelector('.registration');
                let registerPerson = 0; // With the help of variables we will find out if we want to register users.
                registrationBtn.addEventListener('click', function(){
                    createUser.registrationPerson();
                    registerPerson = 1;
                });

                // Function to remove dialog
                deleteDialog(createUser, 'dialog-user', '.dialog-registration');

                // Submit data from the form after clicking the button registrovat
                let btnSendRegisterData = document.querySelector('.btn-send-data');
                btnSendRegisterData.addEventListener('click', function(){
                    createUser.sendData(createUser.inputFirstName(), createUser.inputLastName(), createUser.inputBirthdate(), createUser.inputCity(), createUser.inputAddress(), createUser.inputNIP(), createUser.inputPhone(), createUser.inputEmail(), cookie.getCookie('insurerID'), createUser.inputFirstPassword(registerPerson), createUser.inputSecondPassword(registerPerson));
                });
            })

            // Creating a cycle and functions for filtering the insured
            let filterInputs = document.querySelectorAll('.filter-input');
            let filterName = document.querySelector('.filterName');
            let filterSurname = document.querySelector('.filterSurname');
            let filterNIP = document.querySelector('.filterNIP');

            let filter = () => {
                let infoBoxes = document.querySelectorAll('.information-box');
                for (let oneBox of infoBoxes) {
                    oneBox.remove();
                }
                contentBox.control(1, filterName.value, filterSurname.value, filterNIP.value);
                document.querySelector('.control').remove();
            }

            for(let i = 0; i < filterInputs.length; i++){
                filterInputs[i].addEventListener('focus', function(){
                    this.addEventListener('keyup', filter);
                })
            }
        }
        // If we click on the item Info
        else if(className == 'Info'){
            // We insert a new class name for section
            newBox.rename(className);
            // We create an InfoBox object and put it in the centotentBox variable
            let contentBox = new InfoBox();
            contentBox.insertData();
        }
        // If we click on the item Pojištěnci
        else if(className == 'Pojištění'){
            // We insert a new class name for section
            newBox.rename(className)
            // We create an InfoBox object and put it in the centotentBox variable
            let contentBox = new InsurancePersonBox();
            contentBox.insertData('Seznam pojištění');
            contentBox.control();
            // Create insurance after clicking the button to add insurance
            let createInsuranceBtn = document.querySelector('.addButton-dialog');
            createInsuranceBtn.addEventListener('click', function(){
                // We create an SelectedPersonBox object and put it in the selectedPersonForInsurance variable
                let selectedPersonForInsurance = new SelectedPersonBox();
                // We will create a dialog for selecting the insured for whom I want to create insurance
                selectedPersonForInsurance.createSelectedBox();
                selectedPersonForInsurance.showDialog();

                // I will select an insured from a selection of insureds
                let selectPerson = document.querySelector('.select-person');
                selectPerson.addEventListener('click', function(){
                    selectedPersonForInsurance.control();
                })
                // Sending the selected peroson to the form for adding insurance
                let selectedButton = document.querySelector('.selected-button')
                selectedButton.addEventListener('click', function(){
                    // We create an CreateInsurance object and put it in the createInsurance variable
                    let createInsurance = new CreateInsurance();
                    createInsurance.control(sessionStorage.getSessionData());

                    // Delete dialog for selcted insured person
                    selectedPersonForInsurance.deleteDialog();

                    // Create dialog for registration new insurance
                    createInsurance.createDialog();
                    createInsurance.showDialog();
                    
                    // Function to remove dialog
                    deleteDialog(createInsurance, 'insured-dialog', '.insured-information');

                    // Submit data from the form after clicking the button uložit
                    let btnSendRegisterData = document.querySelector('.btn-send-data');
                    btnSendRegisterData.addEventListener('click', function(){

                    createInsurance.sendData(createInsurance.inputType(), createInsurance.inputAmount(), createInsurance.inputObject(),createInsurance.inputValidFrom(), createInsurance.inputValidUntil(), sessionStorage.getSessionData('personID'), cookie.getCookie('insurerID'), 1);
                    });

                })
                // Function to remove dialog
                deleteDialog(selectedPersonForInsurance, 'selected-box', '.selected-box');
            })
        }
        // We will find out from the cookie if the insurer, the insured is logged in or if there is a non-logged-in user on the page
        else if(className == 'Home'){
            // We insert a new class name for section
            newBox.rename(className);

            if(cookie.getCookie('insurerID')){
                // If the insurer has logged in, we will create an object that will create the home page for the logged-in insurer
                overview = new OverviewInsurance;
                overview.createDivs();
                overview.control(cookie.getCookie('insurerID'));
            }
            else if(cookie.getCookie('personID')){
                // If the insured person has logged in, we will create an object that will create the home page for the logged-in insured person
                overview = new OverviewPerson;
                overview.createDivs();
                overview.control(cookie.getCookie('personID'));
            }
            else{
                // If there is a non-logged-in user on the page, we create an object that will create a home page for a non-logged-in user
                overview = new Overview;
                overview.createDivs();
            }
        }
        // If there were no data in the className variable, we will print the Home page
        else{
            // We insert a new class name for section
            newBox.rename('Home');

            if(cookie.getCookie('insurerID')){
                // If the insurer has logged in, we will create an object that will create the home page for the logged-in insurer
                overview = new OverviewInsurance;
                overview.createDivs();
                overview.control(cookie.getCookie('insurerID'));
            }
            else if(cookie.getCookie('personID')){
                // If the insured person has logged in, we will create an object that will create the home page for the logged-in insured person
                overview = new OverviewPerson;
                overview.createDivs();
                overview.control(cookie.getCookie('personID'));
            }
            else{
                // If there is a non-logged-in user on the page, we create an object that will create a home page for a non-logged-in user
                overview = new Overview;
                overview.createDivs();
            }
        }
        })
    }
    /* Ověření, jestli je na stránce tlačítko pro logout. */
    if(document.querySelector('.logout')){
        logOut();
    }
})

// Element on which we call MutationObserver
let menuHeader = document.querySelector('header');

// Setting for object MutationObserver
observerMenuHeader.observe(menuHeader, {
    childList: true,
    subtree: true,
    characterDataOldValue: true
});

// Functions for creating an information dialog about the insured
function informationPersonBox(id){
    // We create an Information object and put it in the informationBox variable
    let informationBox = new Information();
    // We will create a dialogue about information about the insured
    let dialog = informationBox.createDialog();
    // We insert the insured person's id into the session storage
    sessionStorage.setSessionStorage(id);
    // Show dialog
    dialog.showModal();
    // Method inserts data from the database into the dialog
    informationBox.control(id);

    // Function to remove dialog
    deleteDialog(informationBox, 'infromation-person-dialog', '.infromation-person-dialog');

    // We will create a Mutation for controlling the elements in the information person dialog.
    let observer = new MutationObserver(MutationRecord =>{
        // Captured clicks to update insurance
        let updateInsuranceBtns = document.querySelectorAll('.btn-update-dialog');
        for(let i = 0; i < updateInsuranceBtns.length; i++){
            // We capture the click on update insurance that the user clicked
            updateInsuranceBtns[i].addEventListener('click', function(){
                // Insurance ID
                let insuranceID = this.parentElement.parentElement.getAttribute('id');
                insuranceID = insuranceID.substring(9, insuranceID.length);
                // We create an UpdateInsurance object and put it in the updateInsurance variable
                let updateInsurance = new UpdateInsurance(insuranceID, 0);
                // Let's load the data from the database
                updateInsurance.loadData();
                // We will create a dialog for the insurance update
                updateInsurance.createDialog();
                // We will display the insurance update dialog
                updateInsurance.showDialog();

                // Capturing the uložit button click
                let btnSendUpdateData = document.querySelector('.btn-send-data');
                btnSendUpdateData.addEventListener('click', function(){
                    updateInsurance.updateData(insuranceID, updateInsurance.inputType(), updateInsurance.inputAmount(), updateInsurance.inputObject(), updateInsurance.inputValidUntil(), 0);
                })
                // Function to remove dialog
                deleteDialog(updateInsurance, 'insured-dialog', '.insured-information');

            })
        }

        // Captured clicks to delete insurance
        let deleteBtns = document.querySelectorAll('.btn-delete-dialog');
        for(let i = 0; i < deleteBtns.length; i++){
            deleteBtns[i].addEventListener('click', function(){
                let insuranceID = this.parentElement.parentElement.getAttribute('id');
                insuranceID = insuranceID.substring(9, insuranceID.length);
                let deleteInsurance = new DeleteInsurance(insuranceID, 0);
            })
        }
    })

    // Element on which we call MutationObserver
    let elem = document.querySelector('.infromation-person-dialog');

    // Setting for object MutationObserver
    observer.observe(elem, {
        childList: true,
        subtree: true,
        characterDataOldValue: true
    });

    // Capture click on the button to add insurance to the given insured person
    let selectedButton = document.querySelector('.addButton-dialog')
    selectedButton.addEventListener('click', function(){

        // We create an CreateInsurance object and put it in the updateInsurance variable
        let createInsurance = new CreateInsurance();
        // Method forking with data from the database
        createInsurance.control(sessionStorage.getSessionData());
        // Method for create dialog
        createInsurance.createDialog();
        // Method for show dialog
        createInsurance.showDialog();

        // Function to remove dialog
        deleteDialog(createInsurance, 'insured-dialog', '.insured-information');

        // Submit the form after clicking the uložit button
        let btnSendRegisterData = document.querySelector('.btn-send-data');
        btnSendRegisterData.addEventListener('click', function(){
            createInsurance.sendData(createInsurance.inputType(), createInsurance.inputAmount(), createInsurance.inputObject(),createInsurance.inputValidFrom(), createInsurance.inputValidUntil(), sessionStorage.getSessionData('personID'), cookie.getCookie('insurerID'), 0);
        });

        // Captured clicks to remove insurance from the insured person
        let deleteBtns = document.querySelectorAll('.btn-delete-dialog');
        for(let i = 0; i < deleteBtns.length; i++){
            deleteBtns[i].addEventListener('click', function(){
                let insuranceID = this.parentElement.parentElement.getAttribute('id');
                insuranceID = insuranceID.substring(9, insuranceID.length);
                let deleteInsurance = new DeleteInsurance(insuranceID, 0);
            })
        }

    })
}

// We will create a Mutation for controlling the elements in the section.
let observer = new MutationObserver(MutationRecord =>{
    // Captured clicks to update insured person
    let updateBtns = document.querySelectorAll('.btn-update');
    for(let i = 0; i < updateBtns.length; i++){
        updateBtns[i].addEventListener('click', function(){
            let personID = this.parentElement.parentElement.getAttribute('id');
            personID = personID.substring(4, personID.length);
            let updatePerson = new UpdatePerson(personID);
            updatePerson.loadData();
            let updateBox = updatePerson.createDialog();
            updatePerson.changeBtns();
            updateBox.showModal();

            let btnSendUpdateData = document.querySelector('.update-data');
            btnSendUpdateData.addEventListener('click', function(){
                updatePerson.updateData(personID, updatePerson.inputFirstName(), updatePerson.inputLastName(), updatePerson.inputBirthdate(), updatePerson.inputCity(), updatePerson.inputAddress(), updatePerson.inputNIP(), updatePerson.inputPhone(), updatePerson.inputEmail());
            })

            deleteDialog(updatePerson, 'dialog-user', '.dialog-registration');

        })
    }

    // Capture the click to remove the policy holder
    let deleteBtns = document.querySelectorAll('.btn-delete');
    for(let i = 0; i < deleteBtns.length; i++){
        deleteBtns[i].addEventListener('click', function(){
            let personID = this.parentElement.parentElement.getAttribute('id');
            personID = personID.substring(4, personID.length);
            let deletePerson = new DeletePerson(personID);
        })
    }

    // Caught clicking on insured information
    let informationBtns = document.querySelectorAll('.btn-information');
    for(let i = 0; i < informationBtns.length; i++){
        informationBtns[i].addEventListener('click', function(){
            let personID = this.parentElement.parentElement.getAttribute('id');
            personID = personID.substring(4, personID.length);
            informationPersonBox(personID);

            // Capture clicks to update insurance
            let updateInsuranceBtns = document.querySelectorAll('.btn-update-dialog');
        })
    }

    // Captured clicks to update insurance
    let updateInsuranceBtns = document.querySelectorAll('.btn-update-dialog');
    for(let i = 0; i < updateInsuranceBtns.length; i++){
        updateInsuranceBtns[i].addEventListener('click', function(){
            let insuranceID = this.parentElement.parentElement.getAttribute('id');
            insuranceID = insuranceID.substring(9, insuranceID.length);
            let updateInsurance = new UpdateInsurance(insuranceID);
            updateInsurance.loadData();
            updateInsurance.createDialog();
            updateInsurance.showDialog();

            let btnSendUpdateData = document.querySelector('.btn-send-data');
            btnSendUpdateData.addEventListener('click', function(){
                updateInsurance.updateData(insuranceID, updateInsurance.inputType(), updateInsurance.inputAmount(), updateInsurance.inputObject(), updateInsurance.inputValidUntil(), 1);
            })

            deleteDialog(updateInsurance, 'insured-dialog', '.insured-information');

        })
    }

    // Captured clicks to remove insurance from the insured person
    let deleteInsuranceBtns = document.querySelectorAll('.btn-delete-dialog');
    for(let i = 0; i < deleteInsuranceBtns.length; i++){
        deleteInsuranceBtns[i].addEventListener('click', function(){
            let insuranceID = this.parentElement.parentElement.getAttribute('id');
            insuranceID = insuranceID.substring(9, insuranceID.length);
            let deleteInsurance = new DeleteInsurance(insuranceID, 1);
        })
    }

})

// Element on which we call MutationObserver
let elem = document.querySelector('section');

// Setting for object MutationObserver1
observer.observe(elem, {
    childList: true,
    subtree: true,
    characterDataOldValue: true
});

// We call resize when resizing the window and call the function to resize the section box
window.addEventListener('resize',function(){
    newBox.widthForBox();
});