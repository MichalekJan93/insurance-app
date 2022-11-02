/**
 * The class creates the DOM on the info page
 */
export class InfoBox{

    /**
     * A method for creating the DOM
     */
    insertData(){
        let section = document.querySelector('.section');
        let paragraph = document.createElement('p');
        let img = document.createElement('img');


        paragraph.setAttribute('class', 'info-paragraph');
        paragraph.innerHTML = 'Tado webová aplikace <b>Pojištění App</b> byla vytvořena, jako projekt pro závěrečnou zkoušku k rekvalifikačnímu kurzu <b>programátor www aplikací</b>.';
        img.setAttribute('src', './img/itnetwork-logo.png');
        img.setAttribute('alt', 'itnetwork.cz');

        section.appendChild(paragraph);
        section.appendChild(img);
        }
}