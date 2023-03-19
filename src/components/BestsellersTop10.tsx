import { Fragment, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { SpecificBestsellerTop, BestsellersTop10Location, BookReviewsLocation } from '../models/books';
import { GetBestsellerTop10 } from '../routes/books';
import Header from '../components/Header';
import TooManyRequests from '../components/TooManyRequests';
import Loading from '../components/Loading';

import '../styles/BestsellersTop10.css';


export default function BestsellersTop10() {
    const [bestsellersTop10, setBestsellersTop10] = useState<SpecificBestsellerTop[]>([]);
    const navigate = useNavigate();
    const [tooManyRequests, setTooManyRequests] = useState(false);
    const [loading, setLoading] = useState(false);

    const currentLocation: BestsellersTop10Location = useLocation().state;
    const [locationVariables] = useState<BestsellersTop10Location>(currentLocation);


    useEffect(() => {
        const getLists = async() => {
            setLoading(true);
            GetBestsellerTop10(locationVariables.listCode).then((response) => {
                setTooManyRequests(false);
                setBestsellersTop10(response.data);
                    
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
            <div className='bestsellers-top10-container'>
                {(locationVariables.listName.length > 0) && (
                    <Fragment>
                        <h1>{locationVariables.listName}</h1>
                        <div className='top10'>Top 10</div>
                    </Fragment>
                )}
                {tooManyRequests && (
                    <Fragment>
                        <TooManyRequests />
                    </Fragment>
                )}
                {(locationVariables.listCode.length > 0 && !tooManyRequests) && (
                    bestsellersTop10.map((entry)=> (
                        <Fragment>
                            <button
                                id={entry.isbn.toString()}
                                className='bestsellers-top10-button'
                                onClick={()=> {
                                    const stateLocation: BookReviewsLocation = {
                                        isbn: entry.isbn, 
                                        title: entry.title, 
                                        author: entry.author,
                                        listName: locationVariables.listName,
                                        rank: entry.rank
                                    };
                                    navigate('/reviews', { state: stateLocation});
                                }}
                            >
                                <h3>{entry.rank}. {entry.title}</h3>
                                <div>By {entry.author}</div>
                                <div>ISBN: {entry.isbn}</div>
                            </button>
                        </Fragment>
                    ))
                )}
                {loading && (
                    <Loading />
                )}
            </div>
        </div>
    </Fragment>)
}