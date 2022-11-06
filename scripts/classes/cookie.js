
/**
 * The Cookie class creates, reads, and deletes cookies on the page
 */
export class Cookie{
    /**
     * @param {string} name     Cookie name
     * @param {string} value    Cookie value
     */
    constructor(name, value){
        this.name = name;
        this.value = value;
    }

    /**
     * A method to create a cookie
     */
    setCookie(){
        document.cookie = this.name + "=" + this.value + "; max-age=31536000; path=/; Secure"
    }

    /**
     * Method to find the cookie value
     * @param {string} cname The name of the cookie from which we are looking for a value
     * @returns Returns the cookie value when a cookie is found. Returns an empty string if not found
     */
    getCookie(cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for(let i = 0; i <ca.length; i++) {
          let c = ca[i];
          while (c.charAt(0) == ' ') {
            c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
          }
        }
        return "";
    }

    /**
     * A method for verifying the existence of a cookie
     * @param {string} name The name of the cookie we are looking for
     * @returns If the cookie is found, returns true, otherwise false
     */
    checkCookie(name){
        if (document.cookie.split(';').some((item) => item.trim().startsWith(name))) {
            return true;
        }
        else{
            return false;
        }
    }

    /**
     * Method for deleting cookies
     * @param {string} name The name of the cookie we want to delete
     */
    deleteCookie(name){
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }
}