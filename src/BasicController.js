/**
 * Basic controller with some common methods
 */
export default class BasicController {
  /**
   * Return error 422 - validation error.
   * This also return array of validation errors.
   *
   * @param errors
   * @param res
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
   * Return error 404. This will also return object type and error message
   *
   * @param {Object} res
   * @param {String} objectType
   * @param {String} message
   * @return {*}
   */
  static returnNotFoundError(res, objectType, message) {
    return res.status(404).json({
      success: false,
      code: 404,
      type: 'object',
      objectType,
      message,
    });
  }

  /**
   * Prepare invalid errors
   *
   * @param errors
   * @return {Array}
   */
  prepareInvalidErrors(errors) {
    const result = [];
    errors.forEach((error) => {
      let { msg } = error;
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
   * @param data
   * @param res
   * @return {*}
   */
  static returnSuccess(data, res) {
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
  static returnError(data, res, status = 200) {
    const result = {};
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
  static fixInvalidErrorMessage(msg) {
    let result;
    if (typeof msg === 'string') {
      try {
        result = JSON.parse(msg);
      } catch (e) {
        result = e.message;
      }
    }
    return result;
  }
}
