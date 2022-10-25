
/**
 * Třídá Cookie vytváří, čte a odstraňuje cookie na stránce
 */
export class Cookie{
    /**
     * @param {string} name - název cookie
     * @param {*} value - hodnota cookie
     */
    constructor(name, value){
        this.name = name;
        this.value = value;
    }

    /* Metoda pro vytvoření cookie */
    setCookie(){
        document.cookie = this.name + "=" + this.value + "; max-age=31536000; path=/; Secure"
    }

    /**
     * Metoda pro zjištění hodnoty cookie
     * @param {string} cname - název cookie od kterého hledáme hodnotu.
     * @returns - při nalezení cookie vrátí hodnotu cookie. Při nenalezení vrátí prázdý string
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
     * Metoda pro ověření existence cookie
     * @param {string} name - název cookie, které hledáme
     * @returns - při nalazení cookie, vrátí true, jinak false
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
     * Metoda pro vymazání cookie
     * @param {string} name - název cookie, které chceme vymazat
     */
    deleteCookie(name){
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }
}