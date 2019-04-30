/**
 * Basic controller with some common method
 */
export default class BasicController {
    /**
     * Constructor
     */
    constructor() {
        this.json_answers = {}; //Responses in JSON format
        this.helpers = {}; //Controller action helpers

        this.trim_exceptions = ['password', 'password_check'];
    }

    /**
     * Get JSON answer for controller action
     *
     * @param action
     * @return {*}
     */
    getJsonAnswer(action) {
        return this.json_answers[action];
    }

    /**
     * Get helper for the controller action
     *
     * @param action
     * @return {*}
     */
    getHelper(action) {
        return this.helpers[action];
    }

    /**
     * Get action params.
     *
     * @param params_list
     * @param req
     * @return {Array}
     */
    getActionParams(params_list, req) {
        let result = [];
        params_list.forEach((param_name) => {
            if (param_name in req.body) {
                result[param_name] = this.getActionParam(param_name, req);
            } else {
                result[param_name] = null;
            }
        });
        return result;
    }

    /**
     * Get single action param.
     *
     * @param param_name
     * @param req
     * @return {*}
     */
    getActionParam(param_name, req) {
        let result = null;
        if (this.trim_exceptions.indexOf(param_name) > -1) {
            result = req.body[param_name];
        } else {
            if (req.body[param_name]) {
                let _v = req.body[param_name].toString();
                result = _v.trim();
            } else {
                result  = null;
            }
        }
        return result;
    }

    /**
     * Return error 422 - validation error.
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
     * Return error 404
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