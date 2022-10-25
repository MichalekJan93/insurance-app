export class SessionStorage{

    setSessionStorage(personID){
        sessionStorage.setItem('personID', personID);
    }

    getSessionData(){
        return sessionStorage.getItem('personID');
    }

}