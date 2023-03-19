import { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BestsellerList, BestsellersTop10Location } from '../models/books';
import { GetBestsellerLists } from '../routes/books';
import Header from '../components/Header';
import TooManyRequests from '../components/TooManyRequests';
import Loading from '../components/Loading';

import '../styles/BestsellersLists.css';


export default function BestsellersLists() {
    const [bestsellersLists, setBestsellersLists] = useState<BestsellerList[]>([]);
    const navigate = useNavigate();
    const [tooManyRequests, setTooManyRequests] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getLists = async() => {
            setLoading(true);
            GetBestsellerLists().then((response) => {
                setTooManyRequests(false);
                setBestsellersLists(response.data);

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
            <div className='bestsellers-list-container'>
                {(
                    <Fragment>
                        <h1>The New York Times Bestsellers lists</h1>
                    </Fragment>
                )}
                {tooManyRequests && (
                    <Fragment>
                        <TooManyRequests />
                    </Fragment>
                )}
                {!tooManyRequests && bestsellersLists?.map((entry)=> (
                    <button
                        id={entry.listNameEncoded}
                        className='bestsellers-list-button'
                        onClick={()=> {
                            const stateLocation: BestsellersTop10Location = { listCode: entry.listNameEncoded, listName: entry.displayName};
                            navigate('/top10', { state: stateLocation});
                        }}
                    >
                        <a>{bestsellersLists.indexOf(entry)+1})  {entry.displayName}</a>
                    </button>
                ))}
                {loading && (
                    <Loading />
                )}
            </div>
        </div>
    </Fragment>)
}