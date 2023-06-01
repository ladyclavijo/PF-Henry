import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../../components/NavBar/NavBar.jsx";
import Card from "../../components/Card/Card.jsx";
import Loader from '../../components/Loader/Loader.jsx';
import Pagination from "../../components/Pagination/Pagination.jsx";
import { getBooks } from "../../redux/actions/index.jsx";

export default function Home() {

  const [cardsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const bookSorted = useSelector(state => state.bookSorted);
  const currentPages = useSelector(state => state.paginated);
  const error = useSelector(state => state.error);

  const lastCardIndex = currentPages * cardsPerPage;
  const firstCardIndex = lastCardIndex - cardsPerPage;
  const currentCards = bookSorted.slice(firstCardIndex, lastCardIndex);


  useEffect(()=>{
    setLoading(true);
    dispatch(getBooks());
    setTimeout(()=>{
        setLoading(false);
    },1000);
  },[dispatch]);


  return (
    <div>
      <div>
        <NavBar setLoading={setLoading} />
      </div>
      <div>
        <div>
          {loading ? (
            <Loader />
          ) : (
            currentCards?.map((book) => {
              return (
                <Card 
                key={book.id}
                id={book.id} 
                title={book.title} 
                author={book.author} 
                cover={book.cover} 
                isActive={book.isActive}
                genres={book.genres} 
                />
              )
            })
          )}
        </div>
      </div>
      {!error.length && (
        <Pagination 
        cardsPerPage={cardsPerPage}
        bookSorted={bookSorted.length}/>
      )}
    </div>

  );
};
