import { AuthModel } from '@core/models/auth.model';
import { IRole, IRoleData } from '../../backoffice/users/interfaces/roles.interface';

export class UserModel extends AuthModel {
  id: number;
  username: string;
  password: string;
  fullname: string;
  email: string;
  pic?: string;
  name?: string;
  role?: IRole


  constructor(user: Partial<UserModel>) {
    super(new AuthModel({accessToken: user.accessToken, refreshToken: user.accessToken} as AuthModel))
    Object.assign(this, {...user})
  }
}
