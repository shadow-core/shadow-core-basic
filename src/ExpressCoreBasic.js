const { validationResult } = require('express-validator/check');
const { matchedData } = require('express-validator/filter');

/**
 * Basic class for all core classes with common methods.
 */
export default class ExpressCoreBasic {
    constructor() {
       this.json_answers = {};
    }

    /**
     * Add json answers
     *
     * @param type
     * @param data
     */
    addJsonAnswers(type, data) {
        this.json_answers[type] = data;
    }

    /**
     * Return json message for action type.
     *
     * @param action_type
     * @param message_type
     * @return {*}
     */
    getJsonAnswer(action_type, message_type) {
        return this.json_answers[action_type][message_type];
    }

    /**
     * Get express request and return errors
     *
     * @param req
     * @return {Result<any>}
     */
    getValidationResult(req) {
        return validationResult(req);
    }

    /**
     * Return data from request
     *
     * @param req
     * @return {Record<string, any>}
     */
    getMatchedData(req) {
        return matchedData(req);
    }
}