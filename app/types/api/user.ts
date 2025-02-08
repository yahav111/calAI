export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
}

export interface UpdateUserPayload {
  name?: string;
  email?: string;
  password?: string;
  oldPassword?: string;
}
