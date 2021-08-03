export type UserType = {
    fullName: string;
    email: string;
    password: string;
    username: string;
    bio?: string;
    workspaces?: {}[];
    activities?: {}[];
    cards?: {}[];
    createdAt: Date;
}

export type UsersType = UserType[]