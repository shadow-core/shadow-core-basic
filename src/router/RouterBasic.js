/**
 * @class RouterBasic
 * @classdesc RouterBasic class for all routers.
 */
export default class RouterBasic {
  /**
   * Constructor
   *
   * @param {Object} app The main application with models, config, etc
   */
  constructor(app) {
    this.app = app;
    this.prepare();
  }

  /**
   * Prepare router
   */
  prepare() {
    throw new Error('prepare() method must be present in class');
  }

  /**
   * Compile all routes in one.
   */
  compile() {
    throw new Error('compile() method must be present in class');
  }
}
