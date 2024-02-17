export interface IUsers {
  userOne: string;
}
export interface IAuth {
}
export class Images {
  public static readonly mainLogo: string = './assets/images/logo/my-logo.png';
  public static readonly bannerLogo: string = './assets/images/logo/login.png';
  public static readonly devSkillLogo: string = './assets/images/logo/logo.png';
  public static readonly signInPageLogo: string = './assets/images/logo/jobhub.png';

  public static readonly auth: IAuth = {
  };

  public static readonly users: IUsers = {
    userOne: './assets/images/authpage/profile-image.jpg',
  };
}
