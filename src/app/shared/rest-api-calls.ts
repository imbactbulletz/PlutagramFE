export abstract class RESTAPI {
  static baseUrl = 'http://localhost:8080';
  static photoServerUrl = 'http://localhost/WebServer/Documents';
  static socketUrl = 'http://localhost:8080' + '/socket';
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
  public static getPostsURL() {
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

  // LIKE POST
  public static getLikePostURL() {
    return this.baseUrl + '/post/addLikeToPost';
  }

  // UNLIKE POST
  public static getUnlikePostURL() {
    return this.baseUrl + '/post/addUnlikeToPost';
  }

  // SHARE POST
  public static getSharePostURL() {
    return this.baseUrl + '/post/sharePost';
  }

  // POST COMMENT
  public static getPostCommentUrl() {
    return this.baseUrl + '/post/addCommentToPost';
  }

  // GET FRIEND POSTS
  public static getFriendPosts() {
    return this.baseUrl + '/post/findTop50';
  }

  // GET CHAT CHANNELS
  public static getChatChannels() {
    return this.baseUrl + '/user/getChatChannels';
  }

}
