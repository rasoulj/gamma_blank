export type User = {
    email?: string;
  };
  
  export type AuthInput = {
    email?: string;
    password?: string;
    provider?: 'none' | Provider;
    redirectUrl?: string;
  };
  
  export type Provider = 'google' | 'facebook' | 'github';
  