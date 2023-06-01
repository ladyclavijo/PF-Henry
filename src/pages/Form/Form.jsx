import React, { useEffect, useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { createBooks } from "../../redux/actions/index"

export default function Form() {
    const dispatch = useDispatch();
    const history = useHistory();
    const genres = useSelector((state) => state.genres).sort()
    const [errors, setErrors] = useState({validations})
    const [input, setInput] = useState({
        name: "",
        author:"",
        cover:"",
        description:"",
        price: 0,
        publisher:"",
        publisher_date:"",
        pages:0,
        language:"",
        genres: [],
    });
    const [disable, setDisable] = useState(true); 

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        })
        if(input.name & input.author & input.cover & input.description & input.price & input.publisher & input.publisher_date & input.pages & input.language & input.genres) {
            setDisable(false);
        }
        setErrors(
            validations({
                ...input,
                [e.target.name]: e.target.value,
            })
        );
    };

    function handleSelect(e) {
        setInput({
            ...input,
            genres: [...input.genres, e.target.value],
        });
    }

    function handleDelete(e) {
        setInput({
            ...input,
            genres: input.genres.filter((gen) => gen !== e),
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!input.name & !input.author & !input.cover & !input.description & !input.price & !input.publisher & !input.publisher_date & !input.pages & !input.language & !input.genres) {
                alert("Submit WIP");
                dispatch(createBooks(input));
                setInput({
                    name: "",
                    author:"",
                    cover:"",
                    description:"",
                    price: 0,
                    publisher:"",
                    publisher_date:"",
                    pages:0,
                    language:"",
                    genres: [],
        });
        } else {
            return alert("Submit ERR");
        }
        history.push("/home");
    }

    useEffect(() => {
        dispatch(getGenreList());
    }, [dispatch]);


    return (
        <Fragment>
            <div className="formContainer">
                <form onSubmit={(e) => handleSubmit(e)}>

                    <div className="section"> {/* Input del nombre */}
                        <label>Name:</label>
                        <input
                            type="text"
                            value={input.name}
                            name="name"
                            placeholder="Black House, Bands of Mourning, The Colour of Magic..."
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div>
                        <p className="errors">{errors.name}</p>
                    </div>

                    <div className="section"> {/* Input del autor */}
                        <label>Author:</label>
                        <input
                            type="text"
                            value={input.author}
                            name="author"
                            placeholder="JK Rowling, Stephen King, Brandon Sanderson..."
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div>
                        <p className="errors">{errors.author}</p>
                    </div>

                    <div className="section"> {/* Input de la descripción */}
                        <label>Book description:</label>
                        <input
                            type="text"
                            value={input.description}
                            name="description"
                            placeholder="Once upon a time..."
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div>
                        <p className="errors">{errors.description}</p>
                    </div>

                    <div className="section"> {/* Input del precio */}
                        <label>Price:</label>
                        <input
                            type="text"
                            value={input.price}
                            name="price"
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div>
                        <p className="errors">{errors.cover}</p>
                    </div>

                    <div className="section"> {/* Input de la editorial */}
                        <label>Publisher:</label>
                        <input
                            type="text"
                            value={input.publisher}
                            name="publisher"
                            placeholder="NOVA, Penguin Random House, Wiley..."
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div>
                        <p className="errors">{errors.publisher}</p>
                    </div>

                    <div className="section"> {/* Input de fecha de salida */}
                        <label>Publisher date:</label>
                        <input
                            type="text"
                            value={input.publisher_date}
                            name="publisher_date"
                            placeholder="1/1/1999"
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div>
                        <p className="errors">{errors.publisher_date}</p>
                    </div>

                    <div className="section"> {/* Input de las páginas */}
                        <label>Number of pages:</label>
                        <input
                            type="text"
                            value={input.pages}
                            name="pages"
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div>
                        <p className="errors">{errors.pages}</p>
                    </div>

                    <div className="section"> {/* Input del idioma */}
                        <label>Language:</label>
                        <input
                            type="text"
                            value={input.language}
                            name="language"
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div>
                        <p className="errors">{errors.publisher}</p>
                    </div>

                    <div className="section"> {/* Input de los géneros */}
                        <label>Genres:</label>
                        <select className="genreStyles" onChange={(e) => handleSelect(e)}>
                            <option>Select one or more genres:</option>
                            {
                                genres.map((gen) => {
                                    return (
                                        <option key={gen} name={gen}>
                                            {gen}

                                        </option>
                                    )
                                })
                            }
                        </select>
                        <div className="sort">
                                {input.genres.map((gen) => (
                                <div key={gen} className="selectedGenres">
                                    <p>{gen}</p>
                                    <button onClick={() => handleDelete(el)}>x</button>
                                </div>
                                ))}
                        </div>
                    </div>
                    <div>
                        <p className="errors">{errors.genres}</p>
                    </div>

                    <div className="btnSection">
                        <Link to="/home">
                            <button className="btnCancel">Back to home</button>
                        </Link>
                        <button id="btn" className="btn" type="submit" disabled={disable}>
                            Create book
                        </button>
                    </div>

                </form>
            </div>
        </Fragment>
    )
}
