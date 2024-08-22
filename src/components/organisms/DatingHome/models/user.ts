export type MoreInfo = {
    term: string,
    def: string,
}

export type DatingUser = {
    id: number,
    email: string,
    avatar: string[],
    name: string,
    address: string,
    age: number,
    gender: string,
    blueTick?: boolean,

    about?: string,
    basics?: string[],
    moreAbout?: string[],
    interestedIn?: number[],
    moreInfo?: MoreInfo[],

    why?: string,
    height: number,
}