const { validationResult } = require('express-validator/check');
const { matchedData } = require('express-validator/filter');

/**
 * @class ExpressCoreBasic
 * @classdesc Basic class for all core classes with common methods.
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
  getJsonAnswer(actionType, messageType) {
    return this.json_answers[actionType][messageType];
  }

  /**
   * Get express request and return errors
   *
   * @param {Object} req
   * @return {Result<any>}
   */
  static getValidationResult(req) {
    return validationResult(req);
  }

  /**
   * Return data from request
   *
   * @param {Object} req
   * @return {Record<string, any>}
   */
  static getMatchedData(req) {
    return matchedData(req);
  }
}
