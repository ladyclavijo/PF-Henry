import React, {Fragment} from "react";
import Card from "../Card/Card.jsx";

export default function Cards() {
    return (
        <Fragment>
            <div className="allBooks">
                {
                    currentBooks.map((book)=> {
                        return (
                            <Card
                                id={book.id}
                                author={book.author}
                                name={book.name}
                                image={book.image}
                                isActive={book.isActive}
                            />
                        )
                    })
                }
            </div>
        </Fragment>
    )
}
