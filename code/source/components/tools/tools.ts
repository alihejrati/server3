class Tools {
    constructor() {
        
    }

    /**
     * cast output to objectid
     */
    public static isObjectid(input) {
        return typeof input == 'string' && npm.objectid.isValid(input) ? ObjectId(input) : null;
    }

    /**
     * cast output to PhoneNumber
     */
    public static isPhoneNumber(input) {
        const _phone = (new npm.awesomePhonenumber(Tools.isString(input), 'IR'));
        return _phone.isValid() && _phone.isMobile() ? _phone.getNumber() : '';
    }
    
    /**
     * cast output to mongoose skip 
     */
    public static isSkip(input) {
        return Tools.isNumber(input);
    }
    
    /**
     * cast output to mongoose limit 
     */
    public static isLimit(input) {
        input = Number.parseInt(input);
        input = isNaN(input) ? undefined : input;
        input = Tools.isNumber(input === undefined ? 50 : input);
        input = input > 100 ? 100 : input;
        input = input == 0 ? 1 : input;
        return input;
    }

    /**
     * cast output to mongoose sort 
     */
    public static cast2Number(input) {
        return isNaN(Number(input)) ? 0 : Number(input);
    }

    /**
     * cast output to mongoose sort 
     */
    public static cast2mongooseSort(input) {
        return input ? /^\-/g.test(input) ? {[`${input.substr(1)}`] : -1} : {[`${input}`] : 1} : undefined;
    }

    /**
    * casting output to Timestamp
    */
    public static isTimestamp(input): Date {
        return npm.isTimestamp(input) ? input : null;
    }
    
    /**
    * casting output to boolean
    */
    public static isBoolean(input): boolean {
        return typeof input == 'boolean' ? input : false;
    }

    /**
    * casting output to json
    */
    public static isJson(input) {
        return npm.isPlainObject(input) ? input : {};
    }

    /**
     * casting output to string
     */
    public static isString(input): string {
        return typeof input == 'string' ? input : '';
    }

    /**
     * casting output to string
     */
    public static isEmail(input): string {
        return typeof input == 'string' && npm.emailValidator(input) ? input : '';
    }

    /**
     * casting output to number
     */
    public static isNumber(input): number {
        return typeof input == 'number' ? input : 0;
    }
    
    /**
     * casting output to pos number
     */
    public static abs(input): number {
        return Math.abs(Tools.isNumber(input));
    }

    /**
    * casting output to array 
    */
    public static isArray(input) {
        return Array.isArray(input) ? input : [];
    }

    /**
    * Creates a regex for taking a query on tags
    */
    public static vector2regex(vector: string[]): string {
        return vector.reduce((filtered: string[], element) => { typeof element == 'string' && element ? filtered.push(`\.*${element}\.*`) : null; return filtered; }, []).join('|') || '^$';
    }
}

export default Tools;