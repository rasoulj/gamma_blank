import IQueryBuilderOptions from './auery_builder/IQueryBuilderOptions';

export type Action = {
    event: 'onClick' | 'onMount';
    name:
        | 'mutation'
        | 'query'
        | 'register'
        | 'login'
        | 'logout'
        | 'resetPassword'
        | 'navigate'
        | 'toast'
        | 'getData';
    options?: IQueryBuilderOptions;
    path?: string;
    onSuccess?: Array<Omit<Action, 'event'>>;
    onError?: Array<Omit<Action, 'event'>>;
    dataName?: string;
};
