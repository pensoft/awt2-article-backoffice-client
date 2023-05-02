import { IRole, IRoleData } from './roles.interface';

export interface IUsers {
  id: number;
  name: string;
  email: string;
  role: IRole,
  status?: string;
}

export class UsersListAdapter {
  email: string;
  id: number;
  name: string;
  roleFlat: string;
  status: number = 1;

  constructor(item: Partial<IUsers>) {
    Object.assign(this, {
      ...item,
      ...(item.role && {roleFlat: item.role?.name})
    })
  }
}

export interface IUsersOutput extends IUsers {
  roleId: number;
}

export class UserOutputAdapter {
  id?: number;
  name: string;
  email: string;
  password?: string;
  role_id: number;

  constructor(item: Partial<IUsersOutput>) {
    Object.assign(this, {
      ...item,
      role_id: item.roleId
    })
  }
}

export interface IUserOutputResult {
  data: IUsers
}
