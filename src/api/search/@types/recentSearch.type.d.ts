interface IRecentSearch {
    userId: PIck<IUser, "id">;
    searchTerm: string;
    createdAt: Date;
}

interface IRecentSearchResponseDTO {
    userId: {
        id: string;
    };
    searchTerm: string;
    createdAt: Date;
}