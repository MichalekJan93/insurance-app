export class GetAjax{

    /**
     * @param {*} method 
     * @param {*} url 
     * @param {*} asynchronous 
     */
    constructor(method, url, asynchronous = false){
        this.method = method;
        this.url = url;
        this.asynchronous = asynchronous;
    }

    /**
     * Asynchornní metoda, která slouží jako navratová hodnota.
     * @returns result
     */
    async result(){
        let result;
        let vysledek = await this.ajax().then(function(a){
            result = a;
        });
        return result;
    }

    /**
     * Metoda, která příjme data z databaze
     */
    ajax(){
        return new Promise ((resolve, reject) => {
            let xhr = new XMLHttpRequest;
            if(this.asynchronous){
                xhr.open(this.method, this.url, this.asynchronous);
            }
            else{
                xhr.open(this.method, this.url);
            }

            xhr.send();

                xhr.onload = function(){
                if(this.readyState == 4 && this.status == 200){
                    let data = JSON.parse(this.responseText);
                    resolve(data);
                    }
                }
        });
    }
}