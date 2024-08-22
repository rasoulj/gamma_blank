export type User = {
    email?: string;
};

export type AuthInput = {
    email?: string;
    password?: string;
    phoneNumber?: string;
    fullName?: string;
    provider?: 'none' | Provider;
    redirectUrl?: string;
    gql?: string;
    method?: 'redirect' | 'popup';
};

export type Provider = 'google' | 'facebook' | 'github';
