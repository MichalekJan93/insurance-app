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
        let res = await this.ajax(object).then(function(a){
            result = a;
        });
        return result;
    }

    /**
     * Metoda, která odešle data do souboru php
     * @param {string} object - data, která odešleme pomocí Ajaxu do souboru php.
     * @returns url - funkce url, vrátí kompletní url adresu, která se odešle přes Ajax do souboru php.
     */
    ajax(object){
        return new Promise ((resolve, reject) => {
            let xhr = new XMLHttpRequest;
            xhr.open(this.method, this.file);
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

            // Funkce pro vytvoření url adresy z objektu object, která se metodou post, odešle do php souboru
            let url = function(object){
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

            xhr.send(url(object));

            xhr.onload = function(){
                resolve(this.responseText);
            }
        })
    }

}