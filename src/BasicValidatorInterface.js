/**
 * @class BasicValidatorInterface
 * @classdesc Interface for validators.
 */
export default class BasicValidatorInterface {
  constructor(app) {
    this.app = app;
  }

  validators() {
    throw new Error('You must override validator method');
  }
}
