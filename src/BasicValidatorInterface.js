/**
 * @class BasicValidatorInterface
 * @classdesc Interface for validators.
 */
export default class BasicValidatorInterface {
  constructor(models) {
    this.models = models;
  }

  validators() {
    throw new Error('You must override validator method');
  }
}
