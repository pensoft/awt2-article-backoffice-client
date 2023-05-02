export interface IAuthToken {
  access_token: string;
  refresh_token: string;
  expiresIn: number
}

export interface IUserDetail {
  username: string;
  password: string;
}

