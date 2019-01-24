export abstract class RESTAPI {
  static baseUrl = 'http://192.168.0.12:8080';
  static photoServerUrl = 'http://localhost/WebServer/Documents';

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

  // CHANGE PROFILE SETTINGS
  public static changeSettingsURL() {
    return this.baseUrl + '/user/update';
  }
}
