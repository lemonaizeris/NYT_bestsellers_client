export interface BestsellerList {
    listName: string;
    displayName: string;
    listNameEncoded: string;
}

export interface SpecificBestsellerTop {
    title: string,
    author: string,
    isbn: number,
    rank: number
}

export interface BookReview {
    url: string,
    summary: string
}

export interface BookReviewsLocation {
    isbn: number,
    title: string,
    author: string,
    listName: string,
    rank: number
}

export interface BestsellersTop10Location {
    listCode: string,
    listName: string
}