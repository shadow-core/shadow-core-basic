/**
 * @class ExpressCoreBasic
 * @classdesc Basic class for all core classes with common methods.
 */
export default class ExpressCoreBasic {
  constructor(app) {
    /**
     * Object with JSON responses.
     *
     * @member ExpressCoreBasic#json_responses
     * @type {Object}
     */
    this.jsonResponses = {};

    this.app = app;
  }

  /**
   * Add possible JSON responses for controller action.
   *
   * @param {String} actionType Action type.
   * @param {Object} data Object with possible JSON responses.
   */
  addJsonResponses(actionType, data) {
    this.jsonResponses[actionType] = data;
  }

  /**
   * Return json message for action type.
   *
   * @param {String} actionType Action type.
   * @param {String} messageType Message type.
   * @return {Object} Object with specified JSON response.
   */
  getJsonResponse(actionType, messageType) {
    return this.jsonResponses[actionType][messageType];
  }
}
