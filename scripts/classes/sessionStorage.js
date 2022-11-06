/**
 * Classes for working with session storage
 */
export class SessionStorage{

    /**
     * The method creates session storage with the name personID
     * @param {number} personID person ID
     */
    setSessionStorage(personID){
        sessionStorage.setItem('personID', personID);
    }

    /**
     * Get value from session storage from personID
     * @returns person ID
     */
    getSessionData(){
        return sessionStorage.getItem('personID');
    }

}