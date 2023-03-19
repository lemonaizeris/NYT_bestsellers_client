import { Fragment, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { BookReview, BookReviewsLocation } from '../models/books';
import { GetBookReviews } from '../routes/books';
import Header from '../components/Header';
import TooManyRequests from '../components/TooManyRequests';
import Loading from '../components/Loading';

import '../styles/BookReviews.css';


export default function BookReviews() {
    const [bookReviews, setBookReviews] = useState<BookReview[]>([]);
    const [tooManyRequests, setTooManyRequests] = useState(false);
    const [loading, setLoading] = useState(false);

    const currentLocation: BookReviewsLocation = useLocation().state;
    const [locationVariables] = useState<BookReviewsLocation>(currentLocation);

    useEffect(() => {
        const getLists = async() => {
            setLoading(true);
            GetBookReviews(locationVariables.isbn).then((response) => {
                setTooManyRequests(false);
                setBookReviews(response.data);

                setLoading(false);
            }).catch((error)=>{
                if(error.response.status == 429){
                    setTooManyRequests(true);
                }
                setLoading(false);
            })
        }

        getLists();
    }, []);

    return (<Fragment>
        <div>
            <Header />
            <div className='book-reviews-container'>
                {(locationVariables.isbn > 0) && (
                    <Fragment>
                        <h3>{locationVariables.listName} Rank {locationVariables.rank}</h3>
                        <h1>{locationVariables.title} by {locationVariables.author}</h1>
                    </Fragment>
                )}
                {tooManyRequests && (
                    <Fragment>
                        <TooManyRequests />
                    </Fragment>
                )}
                {(locationVariables.isbn > 0 && !tooManyRequests) && (
                    bookReviews.map((entry)=> (
                        <Fragment>
                            <div className='book-review'>
                                <a>Review summary:</a>
                                <p>{entry.summary}</p>
                                <div onClick={()=> {window.location.replace(entry.url);}}>Full review on New York Times.</div>
                            </div>
                        </Fragment>
                    ))
                )}
                {(bookReviews.length <= 0 && !loading && !tooManyRequests) && (
                    <Fragment>
                        <div className='book-review'>
                            <a>No reviews available.</a>
                        </div>
                    </Fragment>
                )}
                {loading  && (
                    <Loading />
                )}
            </div>
        </div>
    </Fragment>)
}