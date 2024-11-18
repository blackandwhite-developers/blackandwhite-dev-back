export class RecentSearchResponseDTO {
    userId:{
        id: string;
    };
    searchTerm: string;
    createdAt: Date;

    constructor (params: IRecentSearch){
        this.userId = {
            id: params.userId.id
        };
        this.searchTerm = params.searchTerm;
        this.createdAt = params.createdAt;
    }
}