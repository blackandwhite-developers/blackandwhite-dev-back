export class PopularSearchResponseDTO {
    searchTerm: string;
    count: number;
    timestamps: Date;

    constructor(params: IPopularSearch) {
        this.searchTerm = params.searchTerm;
        this.count = params.count;
        this.timestamps = params.timestamps;
    }

}