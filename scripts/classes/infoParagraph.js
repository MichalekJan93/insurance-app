/**
 * Třída, která vytvoří informační div na stránce
 */
export class InfoParagraph{

    /**
     * @param {string} paragraph - informace zobrazená uživateli
     * @param {string} location - místo v DOMu, kde vložíme div
     */
    constructor(paragraph, location){
        this.paragraph = paragraph;
        this.location = location;
        this.createParagraph(this.paragraph, this.location);
    }

    /**
     * Metoda, která vytvoří informační div na stránce
     * @param {string} paragraph - informace zobrazená uživateli
     * @param {string} location - místo v DOMu, kde vložíme div
     */
    createParagraph(paragraph, location){
        let div = document.createElement('div');
        div.setAttribute('class', 'info-box');
        div.innerHTML = `<p>${paragraph}</p>`;
        location.appendChild(div);
    }
}


