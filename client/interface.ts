export interface loginCredentials {
  email: string;
  password: string;
}

export interface user {
  id: string;
  name: string;
  email?: string;
}

export interface loginPayload {
  access_token: string;
  user: user;
}
