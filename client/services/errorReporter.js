let _instance = null;

/**
 * Error reporter
 */
export default class ErrorReporter {
    constructor() {
        this.errorList = [];
    }

    static get instance() {
        if (!_instance) {
            _instance = new ErrorReporter();
        }

        return _instance;
    }

    /**
     * Report error
     * @param {string} message 
     */
    static reportError(message, args) {
        console.error(message, args);
        this.instance.errorList.push(`${message} ${args}`);
    }

    /**
     * Get errors
     */
    static getErrors() {
        return this.instance.errorList;
    }
}


