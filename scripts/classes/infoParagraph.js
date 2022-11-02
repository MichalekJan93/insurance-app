/**
 * A class that creates an info div on a page
 */
export class InfoParagraph{

    /**
     * @param {string} paragraph Information displayed by users
     * @param {string} location The place in the DOM where we insert the div
     */
    constructor(paragraph, location){
        this.paragraph = paragraph;
        this.location = location;
        this.createParagraph(this.paragraph, this.location);
    }

    /**
     * A method that creates an info div on the page
     */
    createParagraph(){
        let div = document.createElement('div');
        div.setAttribute('class', 'info-box');
        div.innerHTML = `<p>${this.paragraph}</p>`;
        this.location.appendChild(div);
    }
}


