/**
 * A class for communicating with the database using the GET method
 */
export class GetAjax{

    /**
     * @param {string} method - method of the HTTP protocol
     * @param {string} file - php file to which we send the data
     * @param {boolean} asynchronous 
     */
    constructor(method, url, asynchronous = false){
        this.method = method;
        this.url = url;
        this.asynchronous = asynchronous;
    }

    /**
     * An asynchronous method that serves as a return value.
     * @returns Data from the database
     */
    async result(){
        let result;
        let vysledek = await this.ajax().then(function(a){
            result = a;
        });
        return result;
    }

    /**
     * A method that receives data from the database
     * @returns Data from the database
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