export class PostAjax{

    /**
     * @param {string} method - metoda HTTP protokolu
     * @param {string} file - soubor php, do kterého odesíláme data
     */
    constructor(method, file){
        this.method = method;
        this.file = file;
    }

    /**
     * Asynchornní metoda, která slouží jako navratová hodnota.
     * @param {string} object - data, která chceme odeslat pomocí Ajaxu do souboru php.
     * @returns result
     */
    async result(object){
        let result;
        let res = await this.ajax(object)
        .then(function(a){
            result = a;
        });

        return result;
    }

    /**
     * Metoda, která odešle data do souboru php
     * @param {string} object - data, která odešleme pomocí Ajaxu do souboru php.
     * @returns url - funkce url, vrátí kompletní url adresu, která se odešle přes Ajax do souboru php.
     */
    async ajax(object){
        return new Promise ((resolve, reject) => {

            let url = (object) => {
                let x = 0;
                let url = '';

                for(let [key, value] of Object.entries(object)){

                    // Podmínka zajistí, že url bude začínat bez znaku &
                    if(x == 0){
                        url = url + `${key}=${value}`; 
                        x = 1;
                    }
                    else{
                        url = url + `&${key}=${value}`;
                    }

                }
                return url;
            }

            /* Nastaveni pro fetch */
            let fetchOptions = {
                method: this.method,
                body : url(object),
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            };

            /* Nacteni dat z databaze pomoci metody fetch */
            let response = fetch(this.file, fetchOptions);

            response
            .then((response) => response.json()).then((data) => resolve(data))
            .catch((error) => reject('Error: Databaze nenalezena'));
        })
    }

}