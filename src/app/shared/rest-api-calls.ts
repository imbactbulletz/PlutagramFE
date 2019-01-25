export abstract class RESTAPI {
  static baseUrl = 'http://192.168.25.178:8080';
  static photoServerUrl = 'http://localhost:1234/WebServer/Documents';

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

  // CREATE A POST
  public static getCreatePostURL() {
    return this.baseUrl + '/post/save';
  }

  // GET ALL USERS
  public static getSearchUsersURL() {
    return this.baseUrl + '/user/findAll';
  }

  // GET USER BY ID
  public static getUserByIdURL() {
    return this.baseUrl + '/user/findById';
  }

  // GET POSTS
  public static getPostsURL(){
    return this.baseUrl + '/user/findAll';
  }

  // FOLLOW USER
  public static getFollowUserURL() {
    return this.baseUrl + '/user/follow';
  }

  // UNFOLLOW USER
  public static getUnfollowUserURL() {
    return this.baseUrl + '/user/unfollow';
  }
}
