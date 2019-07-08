/**
 * @class BasicController
 * @classdesc Basic controller with some common methods.
 *            Use this class to build your controller for express.js
 */
export default class BasicController {
  /**
   * Return error 422 - validation error.
   * This also returns array of validation errors for the JSON response.
   *
   * @param {Object} errors List of errors return from validation.
   * @param {Object} res express.js response
   * @return {*}
   */
  returnInvalidErrors(errors, res) {
    const data = {
      success: false,
      code: 422,
      message: 'There are validation errors found.',
      errors: this.prepareInvalidErrors(errors),
    };
    return res.status(422).json(data);
  }

  /**
   * Return error 404. This will also return object type and error message.
   *
   * @param {Object} res express.js response
   * @param {String} objectType Object type that is missing.
   * @param {String} message Additional message for error.
   * @return {*}
   */
  returnNotFoundError(res, objectType, message) {
    return res.status(404).json({
      success: false,
      code: 404,
      type: 'object',
      objectType,
      message,
    });
  }

  /**
   * Prepare invalid errors.
   * This method will run through errors returned by express-validator and make
   * readable JSON with error.
   *
   * @param {Object} errors List of errors from express-validator
   * @return {Array} prepared JSON array to return in response
   */
  prepareInvalidErrors(errors) {
    const result = [];
    errors.forEach((error) => {
      let msg = error.msg;
      msg = this.fixInvalidErrorMessage(msg);
      const errorData = msg;
      errorData.param = error.param;
      result.push(errorData);
    });
    return result;
  }

  /**
   * Return success result.
   *
   * @param {Object} data JSON data to return in the response.
   * @param {Object} res express.js response.
   * @return {*}
   */
  returnSuccess(data, res) {
    const result = data;
    result.success = true;
    return res.json(result);
  }

  /**
     * Return error result.
     *
     * @param data
     * @param res
     * @param status
     * @return {*}
     */
  returnError(data, res, status = 200) {
    const result = data;
    result.success = false;
    return res.status(status).json(result);
  }

  /**
   * Unfortunately schema validator doesn't return JSON string so I have to parse it.
   * @TODO need to check this one
   *
   * @param {String|Object} msg
   * @return {Object}
   */
  fixInvalidErrorMessage(msg) {
    let result = msg;
    if (typeof result === 'string') {
      try {
        result = JSON.parse(result);
      } catch (e) {
        throw new Error(e.message);
      }
    }
    return result;
  }
}
