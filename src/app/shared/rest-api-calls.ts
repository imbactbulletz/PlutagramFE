export abstract class RESTAPI {
  static baseUrl = 'http://192.168.0.14:8080';

  // SIGN UP
  public static getSignUpURL() {
    return this.baseUrl + '/auth/register';
  }

  // SIGN IN
  public static getSignInURL() {
    return this.baseUrl + '/auth/login';
  }

  // ACTIVATE
  public static getActivateAccountURL() {
    return this.baseUrl + '/auth/activateAccount';
  }
}
