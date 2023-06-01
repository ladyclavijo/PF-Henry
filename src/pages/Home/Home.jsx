import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../../components/NavBar/NavBar.jsx";
// import Filters from "../../components/Filters/Filters.jsx";
import Cards from "../../components/Cards/Cards.jsx";
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

  // const allBooks = useSelector((state) => state.allBooks);

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
                <Cards 
                key={book.id}
                id={book.id}
                title= {book.title}
                cover={book.title}
                author={book.name}
                description={book.description}
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

    // <div>

    //   <NavBar></NavBar>
    //   <Filters></Filters>
    //   <Cards allBooks={allBooks}></Cards>
    //   <Pagination></Pagination>
    // </div>
  );
};
