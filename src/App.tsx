import './App.css';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import BestsellersLists from './components/BestsellersLists';
import BestsellersTop10 from './components/BestsellersTop10';
import BookReviews from './components/BookReviews';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/' element={<BestsellersLists />} />
          <Route path='/top10/' element={<BestsellersTop10 />} />
          <Route path='/reviews/' element={<BookReviews />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
