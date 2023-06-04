import React, { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getAllGenres, createBooks } from "../../redux/actions/index.jsx";

function validateForm(input) {
  let errors = {};
  // Title
  if (!input.title) errors.title = "Books must have a title.";
  else errors.title = "";

  // Description
  if (!input.description)
    errors.description = "Books must have a short description (max 500 chr)";
  else if (!/^[\s\S]{1,1000}$/.test(input.description)) {
    errors.description = "The description must have a maximum of 1000 letters";
  } else errors.description = "";

  // Cover
  if (!input.cover) errors.cover = "Books must have a cover photo.";
  else if (!/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(input.cover)) {
    errors.cover = "Books must have a URL photo.";
  } else {
    errors.cover = "";
  }

  // Price
  if (!input.price) errors.price = "Books must have a price.";
  else errors.price = "";

  // Publisher
  if (!input.publisher) errors.publisher = "Books must have a publisher.";
  else errors.publisher = "";

  // Publisher date
  if (!input.publisher_date)
    errors.publisher_date = "Books must have a publisher date.";
  else errors.publisher_date = "";

  // Pages
  if (!input.pages) errors.pages = "Books must have a page number.";
  else errors.pages = "";

  // Language
  if (!input.language) errors.language = "Books must have a main language.";
  else if (!/(^[A-Za-z]).{1,}$/.test(input.language)) {
    errors.language = "The language must have a minimun of 2 letters";
  } else if (!/(^[A-Za-z]).{1,1}$/.test(input.language)) {
    errors.language = "The language must have a maximum of 2 letters";
  } else {
    errors.language = "";
  }

  // Genres
  if (!input.genre[0]) {
    errors.genre = "Books must have at least one genre.";
  } else errors.genre = "";

  // Authors
  if (!input.author[0]) errors.author = "Books must have at least one author.";
  else errors.author = "";

  return errors;
}

export default function Form() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [disable, setDisable] = useState(true);
  const [errors, setErrors] = useState({});
  const genre = useSelector((state) => state.genre);
  const [input, setInput] = useState({
    title: "",
    description: "",
    cover: "",
    price: "",
    publisher: "",
    publisher_date: "",
    pages: "",
    language: "",
    author: [],
    genre: [],
  });

  function handleChange(e) {
    if (e.target.name === "author") {
      setInput({
        ...input,
        [e.target.name]: [e.target.value],
      });
    } else if (e.target.name === "price" || e.target.name === "pages") {
      setInput({
        ...input,
        [e.target.name]: Number(e.target.value),
      });
    } else if (e.target.name === "genre") {
      setInput({
        ...input,
        [e.target.name]: [e.target.value],
      });
    } else {
      setInput({
        ...input,
        [e.target.name]: e.target.value,
      });
    }

    if (
      input.title &&
      input.description &&
      input.cover &&
      input.price &&
      input.publisher &&
      input.publisher_date &&
      input.pages &&
      input.language &&
      input.genre &&
      input.author
    ) {
      setDisable(false);
    } else {
      setDisable(true);
    }

    setErrors(
      validateForm({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }
  // function handleDelete(el) {
  //     setInput({
  //         ...input,
  //         genres: input.genres.filter((gen) => gen !== el),
  //     });
  // }

  function handleSubmit(e) {
    e.preventDefault();
    if (
      !errors.title &&
      !errors.description &&
      !errors.cover &&
      !errors.price &&
      !errors.publisher &&
      !errors.publisher_date &&
      !errors.pages &&
      !errors.language &&
      !errors.genre &&
      !errors.author
    ) {
      alert("Your book has been created.");
      dispatch(createBooks(input));
      setInput({
        title: "",
        description: "",
        cover: "",
        price: "",
        publisher: "",
        publisher_date: "",
        pages: "",
        language: "",
        author: [],
        genre: [],
      });
    } else {
      return alert("Something went wrong. Please try again.");
    }
    navigate("/home");
  }

  useEffect(() => {
    dispatch(getAllGenres());
  }, [dispatch]);
  return (
    <Fragment>
      <div className="mainContainer">
        <div>
          <h2>Book creator</h2>
        </div>

        <div className="container">
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="section">
              <label>Title:</label>
              <input
                type="text"
                value={input.title}
                name="title"
                placeholder="Title"
                onChange={(e) => handleChange(e)}
              />
              <div>
                <p className="eerror">{errors.title}</p>
              </div>
            </div>

            <div className="section">
              <label>Description:</label>
              <textarea
                rows="5"
                type="text"
                value={input.description}
                name="description"
                placeholder="Description"
                onChange={(e) => handleChange(e)}
                maxLength="500"
              />
              <div>
                <p className="error">{errors.description}</p>
              </div>
            </div>

            <div className="section">
              <label>Cover URL:</label>
              <input
                type="text"
                value={input.cover}
                name="cover"
                placeholder="URL"
                onChange={(e) => handleChange(e)}
              />
              <div>
                <p className="error">{errors.cover}</p>
              </div>
            </div>

            <div className="section">
              <label>Price:</label>
              <input
                type="number"
                value={input.price}
                name="price"
                placeholder="Price"
                onChange={(e) => handleChange(e)}
              />
              <div>
                <p className="error">{errors.price}</p>
              </div>
            </div>

            <div className="section">
              <label>Publisher:</label>
              <input
                type="text"
                value={input.publisher}
                name="publisher"
                placeholder="Publisher"
                onChange={(e) => handleChange(e)}
              />
              <div>
                <p className="error">{errors.publisher}</p>
              </div>
            </div>

            <div className="section">
              <label>Publisher date:</label>
              <input
                type="date"
                value={input.publisher_date}
                name="publisher_date"
                placeholder="Publisher date"
                onChange={(e) => handleChange(e)}
              />
              <div>
                <p className="error">{errors.publisher_date}</p>
              </div>
            </div>

            <div className="section">
              <label>Pages:</label>
              <input
                type="number"
                value={input.pages}
                name="pages"
                placeholder="Pages"
                onChange={(e) => handleChange(e)}
              />
              <div>
                <p className="error">{errors.pages}</p>
              </div>
            </div>

            <div className="section">
              <label>Language:</label>
              <input
                type="text"
                value={input.language}
                name="language"
                placeholder="Language"
                onChange={(e) => handleChange(e)}
              />
              <div>
                <p className="error">{errors.language}</p>
              </div>
            </div>
            <div className="section">
              <label>Author</label>
              <input
                type="text"
                value={input.author}
                name="author"
                placeholder="Author"
                onChange={(e) => handleChange(e)}
              />
              <div>
                <p className="error">{errors.author}</p>
              </div>
            </div>

            <div className="{styles.section}">
              <label>Genre</label>
              <select
                name="genre"
                onChange={(e) => handleChange(e)}
                className="styledGenres"
              >
                <option>Select a genre</option>
                {genre.map((gen) => {
                  return (
                    <option key={gen.id} name={gen.name}>
                      {gen.name}
                    </option>
                  );
                })}
              </select>
              <div>
                <p className="error">{errors.genre}</p>
              </div>
            </div>

            <div className="buttonSection">
              <Link to="/home">
                <button className="cancelButton">Cancelar</button>
              </Link>
              <button
                id="btn"
                className="error"
                type="submit"
                disabled={disable}
              >
                Crear
              </button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
}
