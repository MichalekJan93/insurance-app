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


let className;
let newBox = new Box();
let header;
let logIcon = new LogOut();
let cookie = new Cookie();
let sessionStorage = new SessionStorage();
let overview;

/**
 * Funkce pro vytvoreni uvodni stranky
 * Pokud je uzivatel prihlaes (data jsou v cookies), tak vytvorime rovnou stranku pro prihlaseneho uzivatele.
 * Pokud existuje jiz section s classou section, tak jen provedeme odstraneni vnitrnich dat z section. Toto provadime pri odhlaseni uzivatele.
 * Pokud uzivatel neni prihlaseni, tak stranku vytvorime pro neprihlaseneho uzivatele.
 */

    export function controlLogin(){
        if(cookie.checkCookie('login') && cookie.checkCookie('insurerID')){
            newBox.remove();
            className = 'Home';
            header = new Header(1);
            newBox.createBox(className);
            logIcon.setIcon(1);
            logOut();
            /* Vytvoreni dat v sekci Home. Data pro prihlaseneho pojistitele. */
            overview = new OverviewInsurance;
            overview.createDivs();
            overview.control(cookie.getCookie('insurerID'))
        }
        else if(cookie.checkCookie('login') && cookie.checkCookie('personID')){
            newBox.remove();
            className = 'Home';
            header = new Header(0);
            newBox.createBox(className);
            logIcon.setIcon(1);
            logOut();
            className = 'Home';
            /* Vytvoreni dat v sekci Home. Data pro prihlaseneho pojistnika. */
            overview = new OverviewPerson;
            overview.createDivs();
            overview.control(cookie.getCookie('personID'))
        }
        else if(document.querySelector('.section')){
            newBox.remove();
            header = new Header(0);
            logIcon.setIcon(0);
            className = 'Home';
            newBox.createBox(className);
            /* Vytvoreni dat v sekci Home. Data pro neprihlaseneho pojistnika. */
            overview = new Overview;
            overview.createDivs();
        }
        else{
            newBox.remove();
            header = new Header(0);
            className = 'Home';
            newBox.createBox(className);
            /* Vytvoreni dat v sekci Home. Data pro neprihlaseneho pojistnika. */
            overview = new Overview;
            overview = new Overview;
            overview.createDivs();
        }
    }

/**
 * Funkce pro vymazani Cookies
 * login - cookies pro prihlaseni.
 * insurerID - ID pojistovatele.
 * personID - ID pojistnika.
 */
function deleteCookies(){
    cookie.deleteCookie('login');
    cookie.deleteCookie('insurerID');
    cookie.deleteCookie('personID');
} 

/**
 * Funkce pro odhlaseni uzivatele z aplikace
 */
function logOut(){
    let logout = document.querySelector('.logout');
    logout.addEventListener('click', function(){
        deleteCookies(); // Odstranime cookies
        controlLogin(); // Vytvorime novou uvodni stranku
        let message = new Message('JSTE ÚSPĚŠNĚ ODHLÁŠEN'); // Zobrazi zpravu uzivateli.
    })
}

/**
 * Funkce pro odstraneni dialogu
 */
function deleteDialog(object, dialog, iconPlacement){
    /* Pokud klikneme na klavesu Esc, tak odstranime dialog */
    document.body.addEventListener('keydown', function(e){
        if(e.key == "Escape" && document.body.lastChild.className == dialog){
            object.deleteDialog();
        }
    });

    /* Pokud klikneme na ikonu krizku, tak odstranime dialog */
    let dialogRegistration = document.querySelector(iconPlacement);
    dialogRegistration.firstChild.addEventListener('click', function(){
        object.deleteDialog();
    });
}

controlLogin();

/**
 * Zachyceni kliknuti na ikonu pro prihlaseni.
 * @param{loginIcons} NodeList - zachytava dve ikony pro prohlaseni. Jedna ikona pro desktop verzi a druha pro mobilni verzi.
 * @param{className} string  - nazev tridy pro <section>, ktery vytvorime pomoci objektu Login a metody createBox
*/
let loginIcons = document.querySelectorAll('.login');

for(let i = 0; i < loginIcons.length; i++){
    loginIcons[i].addEventListener('click',function(event){
        let loginBox = new Login();
        let loginDialog = loginBox.createDialog();
        let btnSendData = document.querySelector('.btn-send-data');
        let email = document.querySelector('.user-email');
        loginDialog.showModal();

        deleteDialog(loginBox, 'dialog-login', '.login-form');

        /* Odeslani formulare pomoci Enteru */
        loginDialog.addEventListener('keydown', function(e){
            if(e.key == "Enter"){
                loginBox.inputs(loginBox.inputEmail(), loginBox.inputPassword());
            }
        });

        /* Odeslani formulare po kliknuti na tlacitko prihlasit */
        btnSendData.addEventListener('click', function(){
            loginBox.inputs(loginBox.inputEmail(), loginBox.inputPassword());
        });

        /*  */
        let registerBtn = document.querySelector('.register-admin');
        registerBtn.addEventListener('click', function(){
            loginBox.deleteDialog();
            let registerBox = new RegisterUser;
            let registerDialog = registerBox.createDialog();
            registerDialog.showModal();

            deleteDialog(registerBox, 'register-dialog', '.login-form');

            /* Odeslani formulare po kliknuti na tlacitko registrovat */
            let btnSendRegisterData = document.querySelector('.btn-send-data');
            btnSendRegisterData.addEventListener('click', function(){
                registerBox.inputs(registerBox.inputEmail(), registerBox.inputPassword(), registerBox.inputRepeatPassword(), registerBox.inputFirstName(), registerBox.inputLastName());
            });
        })
    })
}

/** Zachytime kliknuti na polozku v headeru.
 *  @param{contentBox} object - objekt pro vytvoreni obsahu v <section>
*/
let menu = document.querySelectorAll('.menu');
for(let i = 0; i < menu.length; i++){
    menu[i].addEventListener('click', function(event){
        /* Pokud se klikne na prihlasit na mob. zarizeni, tak se nebude vytvaret obsah v section, ale zobrazi se jen dialog pro login.*/
        if(event.target.innerText != 'Přihlásit'){
            /* Vymazeme stavajici obsah v <section> */
            newBox.remove();
            className = event.target.innerText;
            if(className == 'Pojištěnci'){
                /* Vlozime novy nazev tridy pro <section> */
                newBox.rename(className);
                /* Vlozime divy do boxu section */
                let contentBox = new InsuredPersonBox();
                contentBox.insertData('Seznam pojištěnců');
                contentBox.control();

                /** Zachyceni kliknuti na tlacitko pro pridani uzivatele do databaze
                 *  @param{createUser} DOM element
                 *  @param{createUser} object - objekt pro vytvoreni <dialogu>, pro registraci noveho pojistence
                */
                let createUserBtn = document.querySelector('.addButton');
                createUserBtn.addEventListener('click', function(){
                    let createUser = new RegisterPerson();
                    let userBox = createUser.createDialog();
                    createUser.showDialog();
                    /* Pokud jsou zobrazene inputy pro pridani hesla, tak zavolame metodu pro jejich skryti. */
                    if(!document.querySelector('.registration')){
                        createUser.visibilityPasswords()
                    }

                    /* Po kliknuti na tlacitko zaregistrovat uzivatele, se nam zobrazi inputy pro vlozeni hesla. */
                    let registerPerson = 0; // pomoci promenne zjistime jestli budeme chtit registrovat uzivatele.
                    let registrationBtn = document.querySelector('.registration');
                    registrationBtn.addEventListener('click', function(){
                        createUser.registrationPerson();
                        registerPerson = 1;
                    });

                    deleteDialog(createUser, 'dialog-user', '.dialog-registration');

                    /* Odeslani formulare po kliknuti na tlacitko registrovat */
                    let btnSendRegisterData = document.querySelector('.btn-send-data');
                    btnSendRegisterData.addEventListener('click', function(){
                    createUser.sendData(createUser.inputFirstName(), createUser.inputLastName(), createUser.inputBirthdate(), createUser.inputCity(), createUser.inputAddress(), createUser.inputNIP(), createUser.inputPhone(), createUser.inputEmail(), cookie.getCookie('insurerID'), createUser.inputFirstPassword(registerPerson), createUser.inputSecondPassword(registerPerson));
                    });
                })

                let filterInputs = document.querySelectorAll('.filter-input');
                let filterName = document.querySelector('.filterName');
                let filterSurname = document.querySelector('.filterSurname');
                let filterNIP = document.querySelector('.filterNIP');

                let test = function(event){
                    let infoBoxes = document.querySelectorAll('.information-box');
                    for (let oneBox of infoBoxes) {
                        oneBox.remove();
                    }
                    contentBox.control(1, filterName.value, filterSurname.value, filterNIP.value);
                    document.querySelector('.control').remove();
                }

                for(let i = 0; i < filterInputs.length; i++){
                    filterInputs[i].addEventListener('focus', function(){
                        this.addEventListener('keyup', test);
                    })
                }
            }
            else if(className == 'Info'){
                newBox.rename(className);
                let contentBox = new InfoBox();
                contentBox.insertData();
            }
            else if(className == 'Pojištění'){
                /* Vlozime novy nazev tridy pro <section> */
                newBox.rename(className);
                /* Vlozime divy do boxu section */
                let contentBox = new InsurancePersonBox();
                contentBox.insertData('Seznam pojištění');
                contentBox.control();
                /* Vytvoreni pojisteni po kliknuti na  tlacitko addBtn-dialog*/
                let createInsuranceBtn = document.querySelector('.addButton-dialog');
                createInsuranceBtn.addEventListener('click', function(){

                    let selectedPersonForInsurance = new SelectedPersonBox();
                    selectedPersonForInsurance.createSelectedBox();
                    selectedPersonForInsurance.showDialog();

                    /* Vybrani pojistence z roletky pro vyber */
                    let selectPerson = document.querySelector('.select-person');
                    selectPerson.addEventListener('click', function(){
                        selectedPersonForInsurance.control();
                    })
                    /* Odeslani vybraneho pojistence do formulare pro pridani pojisteni */
                    let selectedButton = document.querySelector('.selected-button')
                    selectedButton.addEventListener('click', function(){
                        let createInsurance = new CreateInsurance();
                        createInsurance.control(sessionStorage.getSessionData());

                        selectedPersonForInsurance.deleteDialog();

                        createInsurance.createDialog();
                        createInsurance.showDialog();

                        deleteDialog(createInsurance, 'insured-dialog', '.insured-information');

                        /* Odeslani formulare po kliknuti na tlacitko ulozit */
                        let btnSendRegisterData = document.querySelector('.btn-send-data');
                        btnSendRegisterData.addEventListener('click', function(){

                        createInsurance.sendData(createInsurance.inputType(), createInsurance.inputAmount(), createInsurance.inputObject(),createInsurance.inputValidFrom(), createInsurance.inputValidUntil(), sessionStorage.getSessionData('personID'), cookie.getCookie('insurerID'), 1);
                        });

                    })

                    deleteDialog(selectedPersonForInsurance, 'selected-box', '.selected-box');
                })
            }
            else if(className == 'Home'){
                newBox.rename(className);

                if(cookie.getCookie('insurerID')){
                    overview = new OverviewInsurance;
                    overview.createDivs();
                    overview.control(cookie.getCookie('insurerID'));
                }
                else if(cookie.getCookie('personID')){
                    overview = new OverviewPerson;
                    overview.createDivs();
                    overview.control(cookie.getCookie('personID'));
                }
                else{
                    overview = new Overview;
                    overview.createDivs();
                }
            }
            else{
                newBox.rename('Home');
            }
        }
    })
}

let observerMenuHeader = new MutationObserver(MutationRecord =>{

    /** Zachytime kliknuti na polozku v headeru.
     *  @param{contentBox} object - objekt pro vytvoreni obsahu v <section>
    */
    let menu = document.querySelectorAll('.menu');
    for(let i = 0; i < menu.length; i++){
        menu[i].addEventListener('click', function(event){
            /* Pokud se klikne na prihlasit na mob. zarizeni, tak se nebude vytvaret obsah v section, ale zobrazi se jen dialog pro login.*/
            if(event.target.innerText != 'Přihlásit'){
                /* Vymazeme stavajici obsah v <section> */
                newBox.remove();
                className = event.target.innerText;
                if(className == 'Pojištěnci'){
                    /* Vlozime novy nazev tridy pro <section> */
                    newBox.rename(className);
                    /* Vlozime divy do boxu section */
                    let contentBox = new InsuredPersonBox();
                    contentBox.insertData('Seznam pojištěnců');
                    contentBox.control();
    
                    /** Zachyceni kliknuti na tlacitko pro pridani uzivatele do databaze
                     *  @param{createUser} DOM element
                     *  @param{createUser} object - objekt pro vytvoreni <dialogu>, pro registraci noveho pojistence
                    */
                    let createUserBtn = document.querySelector('.addButton');
                    createUserBtn.addEventListener('click', function(){
                        let createUser = new RegisterPerson();
                        let userBox = createUser.createDialog();
                        createUser.showDialog();
                        /* Pokud jsou zobrazene inputy pro pridani hesla, tak zavolame metodu pro jejich skryti. */
                        if(!document.querySelector('.registration')){
                            createUser.visibilityPasswords()
                        }
    
                        /* Po kliknuti na tlacitko zaregistrovat uzivatele, se nam zobrazi inputy pro vlozeni hesla. */
                        let registerPerson = 0; // pomoci promenne zjistime jestli budeme chtit registrovat uzivatele.
                        let registrationBtn = document.querySelector('.registration');
                        registrationBtn.addEventListener('click', function(){
                            createUser.registrationPerson();
                            registerPerson = 1;
                        });
    
                        deleteDialog(createUser, 'dialog-user', '.dialog-registration');
    
                        /* Odeslani formulare po kliknuti na tlacitko registrovat */
                        let btnSendRegisterData = document.querySelector('.btn-send-data');
                        btnSendRegisterData.addEventListener('click', function(){
                        createUser.sendData(createUser.inputFirstName(), createUser.inputLastName(), createUser.inputBirthdate(), createUser.inputCity(), createUser.inputAddress(), createUser.inputNIP(), createUser.inputPhone(), createUser.inputEmail(), cookie.getCookie('insurerID'), createUser.inputFirstPassword(registerPerson), createUser.inputSecondPassword(registerPerson));
                        });
                    })
    
                    let filterInputs = document.querySelectorAll('.filter-input');
                    let filterName = document.querySelector('.filterName');
                    let filterSurname = document.querySelector('.filterSurname');
                    let filterNIP = document.querySelector('.filterNIP');
    
                    let test = function(event){
                        let infoBoxes = document.querySelectorAll('.information-box');
                        for (let oneBox of infoBoxes) {
                            oneBox.remove();
                        }
                        contentBox.control(1, filterName.value, filterSurname.value, filterNIP.value);
                        document.querySelector('.control').remove();
                    }
    
                    for(let i = 0; i < filterInputs.length; i++){
                        filterInputs[i].addEventListener('focus', function(){
                            this.addEventListener('keyup', test);
                        })
                    }
                }
                else if(className == 'Info'){
                    newBox.rename(className);
                    let contentBox = new InfoBox();
                    contentBox.insertData();
                }
                else if(className == 'Pojištění'){
                    /* Vlozime novy nazev tridy pro <section> */
                    newBox.rename(className);
                    /* Vlozime divy do boxu section */
                    let contentBox = new InsurancePersonBox();
                    contentBox.insertData('Seznam pojištění');
                    contentBox.control();
                    /* Vytvoreni pojisteni po kliknuti na  tlacitko addBtn-dialog*/
                    let createInsuranceBtn = document.querySelector('.addButton-dialog');
                    createInsuranceBtn.addEventListener('click', function(){
    
                        let selectedPersonForInsurance = new SelectedPersonBox();
                        selectedPersonForInsurance.createSelectedBox();
                        selectedPersonForInsurance.showDialog();
    
                        /* Vybrani pojistence z roletky pro vyber */
                        let selectPerson = document.querySelector('.select-person');
                        selectPerson.addEventListener('click', function(){
                            selectedPersonForInsurance.control();
                        })
                        /* Odeslani vybraneho pojistence do formulare pro pridani pojisteni */
                        let selectedButton = document.querySelector('.selected-button')
                        selectedButton.addEventListener('click', function(){
                            let createInsurance = new CreateInsurance();
                            createInsurance.control(sessionStorage.getSessionData());
    
                            selectedPersonForInsurance.deleteDialog();
    
                            createInsurance.createDialog();
                            createInsurance.showDialog();
    
                            deleteDialog(createInsurance, 'insured-dialog', '.insured-information');
    
                            /* Odeslani formulare po kliknuti na tlacitko ulozit */
                            let btnSendRegisterData = document.querySelector('.btn-send-data');
                            btnSendRegisterData.addEventListener('click', function(){
    
                            createInsurance.sendData(createInsurance.inputType(), createInsurance.inputAmount(), createInsurance.inputObject(),createInsurance.inputValidFrom(), createInsurance.inputValidUntil(), sessionStorage.getSessionData('personID'), cookie.getCookie('insurerID'), 1);
                            });
    
                        })
    
                        deleteDialog(selectedPersonForInsurance, 'selected-box', '.selected-box');
                    })
                }
                else if(className == 'Home'){
                    newBox.rename(className);
    
                    if(cookie.getCookie('insurerID')){
                        overview = new OverviewInsurance;
                        overview.createDivs();
                        overview.control(cookie.getCookie('insurerID'));
                    }
                    else if(cookie.getCookie('personID')){
                        overview = new OverviewPerson;
                        overview.createDivs();
                        overview.control(cookie.getCookie('personID'));
                    }
                    else{
                        overview = new Overview;
                        overview.createDivs();
                    }
                }
                else{
                    newBox.rename('Home');
                }
            }
        })
    }
    /* Ověření, jestli je na stránce tlačítko pro logout. */
    if(document.querySelector('.logout')){
        logOut();
    }
})

let menuHeader = document.querySelector('header');

/* Observer s nastavenim MutationObserver */
observerMenuHeader.observe(menuHeader, {
    childList: true,
    subtree: true,
    characterDataOldValue: true
});

/* Funkce pro vytvoreni informace o pojistnikovi */
function informationPersonBox(id, mutation = 0){
    let informationBox = new Information();
    let dialog = informationBox.createDialog();
    sessionStorage.setSessionStorage(id);
    dialog.showModal();
    informationBox.control(id);

    deleteDialog(informationBox, 'infromation-person-dialog', '.infromation-person-dialog');

    if(mutation){
        let observer = new MutationObserver(MutationRecord =>{
            /* Zachyceni klikuntí pro update pojisteni */
            let updateInsuranceBtns = document.querySelectorAll('.btn-update-dialog');
            for(let i = 0; i < updateInsuranceBtns.length; i++){
                updateInsuranceBtns[i].addEventListener('click', function(){
                    let insuranceID = this.parentElement.parentElement.getAttribute('id');
                    insuranceID = insuranceID.substring(9, insuranceID.length);
                    let updateInsurance = new UpdateInsurance(insuranceID, 0);
                    updateInsurance.loadData();
                    updateInsurance.createDialog();
                    updateInsurance.showDialog();

                    let btnSendUpdateData = document.querySelector('.btn-send-data');
                    btnSendUpdateData.addEventListener('click', function(){
                        updateInsurance.updateData(insuranceID, updateInsurance.inputType(), updateInsurance.inputAmount(), updateInsurance.inputObject(), updateInsurance.inputValidUntil(), 0);
                    })

                    deleteDialog(updateInsurance, 'insured-dialog', '.insured-information');

                })
            }

            /* Zachyceni klikuntí pro odstranění pojisteni u pojistníka */
            let deleteBtns = document.querySelectorAll('.btn-delete-dialog');
            for(let i = 0; i < deleteBtns.length; i++){
                deleteBtns[i].addEventListener('click', function(){
                    let insuranceID = this.parentElement.parentElement.getAttribute('id');
                    insuranceID = insuranceID.substring(9, insuranceID.length);
                    let deleteInsurance = new DeleteInsurance(insuranceID, 0);
                })
            }
        })

        /**
         * @param{element} elem - element na kterem volame MutationObserver
        */
        let elem = document.querySelector('.infromation-person-dialog');

        /* Observer s nastavenim MutationObserver */
        observer.observe(elem, {
            childList: true,
            subtree: true,
            characterDataOldValue: true
        });
    }

    /* Zachyceni kliknuti na tlacitko, pro pridani pojisteni k danemu pojistenci */
    let selectedButton = document.querySelector('.addButton-dialog')
    selectedButton.addEventListener('click', function(){

        /* informationBox.deleteDialog(); */

        let createInsurance = new CreateInsurance();
        createInsurance.control(sessionStorage.getSessionData());

        createInsurance.createDialog();
        createInsurance.showDialog();

        deleteDialog(createInsurance, 'insured-dialog', '.insured-information');

        /* Odeslani formulare po kliknuti na tlacitko ulozit */
        let btnSendRegisterData = document.querySelector('.btn-send-data');
        btnSendRegisterData.addEventListener('click', function(){

        createInsurance.sendData(createInsurance.inputType(), createInsurance.inputAmount(), createInsurance.inputObject(),createInsurance.inputValidFrom(), createInsurance.inputValidUntil(), sessionStorage.getSessionData('personID'), cookie.getCookie('insurerID'), 0);
        });

        /* Zachyceni klikuntí pro odstranění pojisteni u pojistníka */
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

/**
 * Vytvorime objekt MutationObserver pro volani metod na prvcich, ktere jsou vytvoreny asynchronne. MutationObserver zachytavame na elementu <section>.
*/
let observer = new MutationObserver(MutationRecord =>{
    /* Zachyceni klikuntí pro update pojistnika */
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

    /* Zachyceni klikuntí pro odstranění pojistníka */
    let deleteBtns = document.querySelectorAll('.btn-delete');
    for(let i = 0; i < deleteBtns.length; i++){
        deleteBtns[i].addEventListener('click', function(){
            let personID = this.parentElement.parentElement.getAttribute('id');
            personID = personID.substring(4, personID.length);
            let deletePerson = new DeletePerson(personID);
        })
    }

    /* Zachyceni kliknuti na informaci o pojistnikovi */
    let informationBtns = document.querySelectorAll('.btn-information');
    for(let i = 0; i < informationBtns.length; i++){
        informationBtns[i].addEventListener('click', function(){
            let personID = this.parentElement.parentElement.getAttribute('id');
            personID = personID.substring(4, personID.length);
            informationPersonBox(personID, 1);

            /* Zachyceni klikuntí pro update pojisteni */
            let updateInsuranceBtns = document.querySelectorAll('.btn-update-dialog');
        })
    }

    /* Zachyceni klikuntí pro update pojisteni */
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

    /* Zachyceni klikuntí pro odstranění pojisteni*/
    let deleteInsuranceBtns = document.querySelectorAll('.btn-delete-dialog');
    for(let i = 0; i < deleteInsuranceBtns.length; i++){
        deleteInsuranceBtns[i].addEventListener('click', function(){
            let insuranceID = this.parentElement.parentElement.getAttribute('id');
            insuranceID = insuranceID.substring(9, insuranceID.length);
            let deleteInsurance = new DeleteInsurance(insuranceID, 1);
        })
    }

})

/**
 * @param{element} elem - element na kterem volame MutationObserver
*/
let elem = document.querySelector('section');

/* Observer s nastavenim MutationObserver */
observer.observe(elem, {
    childList: true,
    subtree: true,
    characterDataOldValue: true
});

/* Volame resize pri zmene velikosti window a zavolame funkci pro zmenu velikosti boxu section*/
window.addEventListener('resize',function(){
    newBox.widthForBox();
});