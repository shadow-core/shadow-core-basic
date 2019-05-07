/**
 * Basic controller with some common methods
 */
export default class BasicController {
    /**
     * Constructor
     */
    constructor() {
    }

    /**
     * Return error 422 - validation error.
     * This also return array of validation errors.
     *
     * @param errors
     * @param res
     * @return {*}
     */
    returnInvalidErrors(errors, res) {
        let data = {
            'success': false,
            'code': 422,
            'message': 'There are validation errors found.',
            'errors': this.prepareInvalidErrors(errors)
        };
        return res.status(422).json(data);
    }

    /**
     * Return error 404. This will also return object type and error message
     *
     * @param res
     * @param object_type
     * @param message
     * @return {*}
     */
    returnNotFoundError(res, object_type, message) {
        return res.status(404).json({
            'success': false,
            'code': 404,
            'type': 'object',
            'object_type': object_type,
            'message': message,
        });
    }

    /**
     * Prepare invalid errors
     *
     * @param errors
     * @return {Array}
     */
    prepareInvalidErrors(errors) {
        let result = [];
        errors.forEach((error) => {
            let msg = error.msg;
            msg = this.__fixInvalidErrorMessage(msg);
            let error_data = msg;
            error_data.param = error.param;
            result.push(error_data);
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
    returnSuccess(data, res) {
        data['success'] = true;
        return res.json(data);
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
        data['success'] = false;
        return res.status(status).json(data);
    }

    /**
     * Unfortunately schema validator doesn't return JSON string so I have to parse it.
     * @TODO need to check this one
     *
     * @param msg
     * @return {*}
     * @private
     */
    __fixInvalidErrorMessage(msg) {
        if (typeof msg === 'string') {
            try {
                msg = JSON.parse(msg);
            } catch (e) {
                msg = e.message;
            }
        }
        return msg;
    }
}