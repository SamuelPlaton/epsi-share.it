export class CreateUserDto {
  email: string;
  name: string;
  numen: string;
  password: string;
}

export class ConnectUserDto {
  numen: string;
  password: string;
}

export enum UpdateUserAction {
  CHANGE_PASSWORD = 'change-password',
  UPDATE = 'update',
  CONFIRM_ACCOUNT = 'confirm-account',
  DELETE_ACCOUNT = 'delete-account',
}

export class UpdateUserDto {
  email: string;
  name: string;
  password?: string;
  token: string;
  action: UpdateUserAction;
}
