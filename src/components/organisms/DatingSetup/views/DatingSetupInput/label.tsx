import { Typography } from "~/components";

export function Label({ children, paddingTop }: { children: string, paddingTop?: number }): JSX.Element {
    return <Typography
        paddingTop={paddingTop ?? 0}
        paddingBottom={2}
        color='gray.800'
        fontSize='md'
        fontWeight='700'
    >
        {children}
    </Typography>
}
