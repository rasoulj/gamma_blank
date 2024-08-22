import { ReactNode, CSSProperties } from 'react';

export type InfiniteScrollProps = {
    pageSize?: number;
    height?: number | string;
    fetchNextPage: () => void;
    dataLength: number;
    reverse?: boolean;
    style?: CSSProperties;
    children?: ReactNode;
};
