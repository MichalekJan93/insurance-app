/**
 * A class for communicating with the database using the POST method
 */
export class PostAjax{
    /**
     * @param {string} method - method of the HTTP protocol
     * @param {string} file - php file to which we send the data
     */
    constructor(method, file){
        this.method = method;
        this.file = file;
    }

    /**
     * An asynchronous method that serves as a return value.
     * @param {string} object The data we want to send using Ajax to the php.
     * @returns Data from the database
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
     * A method that sends data to a php
     * @param {string} object The data we send using Ajax to the php.
     * @returns promise
     */
    async ajax(object){
        return new Promise ((resolve, reject) => {

            let url = (object) => {
                let x = 0;
                let url = '';

                // Cycle to create a url address
                for(let [key, value] of Object.entries(object)){

                    // The condition ensures that the values in the post method sent to the url start without the & character
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

            // Set for fetch
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

            // Loading data from the database using the fetch method
            let response = fetch(this.file, fetchOptions);

            // Response from the server. Either we send the data to a js file, or we write an error to the console.
            response
            .then((response) => response.json()).then((data) => resolve(data))
            .catch((error) => reject('Error: Databaze nenalezena'));
        })
    }

}