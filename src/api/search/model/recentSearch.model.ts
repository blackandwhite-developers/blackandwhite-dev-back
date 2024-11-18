export class RecentSearch implements IRecentSearch {
    userId: Pick<IUser, 'id'>;
    searchTerm: string;
    createdAt: Date;

    constructor(params: IRecentSearch) {
        this.userId = params.userId;
        this.searchTerm = params.searchTerm;
        this.createdAt = params.createdAt;
    }
} 