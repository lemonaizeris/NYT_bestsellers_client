import axios from 'axios';
import { BestsellerList, SpecificBestsellerTop, BookReview } from '../models/books';
import configData from "../config.json";


export const GetBestsellerLists = () => axios.get<BestsellerList[]>(`${configData.SERVER_URL}:${configData.SERVER_PORT}/books`);

export const GetBestsellerTop10 = (listCode: string) => axios.get<SpecificBestsellerTop[]>(`${configData.SERVER_URL}:${configData.SERVER_PORT}/books/${listCode}`);

export const GetBookReviews = (isbn: number) => axios.get<BookReview[]>(`${configData.SERVER_URL}:${configData.SERVER_PORT}/books/reviews/${isbn}`);

