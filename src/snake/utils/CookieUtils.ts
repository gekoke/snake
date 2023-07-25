export class CookieUtils {

    private readonly dummyData: number;

    constructor() {
       this.dummyData = 3;  // Trying to coerce the MIME type.
    }

    /*
     * General utils for managing cookies in Typescript.
     */
    static setCookie(name: string, val: string) : void {
        const amountOfDaysUntilExpire = 365;
        const date = new Date();
        const value = val;

        // Set it expire in 7 days
        date.setTime(date.getTime() + (amountOfDaysUntilExpire * 24 * 60 * 60 * 1000));

        // Set it
        document.cookie = name+"="+value+"; expires="+date.toUTCString()+"; path=/";
    }

    static getCookie(name: string) : string | void {
        const value = "; " + document.cookie;
        const parts = value.split("; " + name + "=");

        if (parts.length == 2) {
            return parts.pop()?.split(";").shift();
        }
    }
}
