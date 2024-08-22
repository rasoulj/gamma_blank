import { graphqlFetcher } from '~/components/atoms/Provider/AuthProvider';
export function fetcher<TData, TVariables>(query: string, variables?: TVariables) {
    return async (): Promise<TData> => {
        return await graphqlFetcher(query, variables);
    };
}