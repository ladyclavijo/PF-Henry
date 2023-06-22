import React, { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  getAllGenres,
  createBooks,
  switchUpdateBook,
  updateBook,
  getBookDetail,
} from "../../redux/actions/index.jsx";
import NavBar from "../../components/NavBar/NavBar.jsx";
import { useAuth } from "../../context/authContext.jsx";
import Swal from "sweetalert2";

function validateForm(input) {
  let errors = {};
  // Title
  if (!input.title) errors.title = "Books must have a title.";
  else errors.title = "";
  // Description
  if (!input.description)
    errors.description = "Books must have a short description (max 500 chr)";
  else if (!/^[\s\S]{1,5000}$/.test(input.description)) {
    errors.description = "The description must have a maximum of 5000 letters";
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
  // Stock
  if (!input.stock) errors.stock = "Books must have a stock.";
  else if (!/^[1-9]\d*$/.test(input.stock)) {
    errors.stock = "The stock must be an integer greater than zero.";
  } else errors.stock = "";

  return errors;
}
function validateFormDetails(input) {
  let errors = {};
  // Title
  if (!input.title) errors.title = "Books must have a title.";
  else errors.title = "";
  // Description
  if (!input.description)
    errors.description = "Books must have a short description (max 500 chr)";
  else if (!/^[\s\S]{1,5000}$/.test(input.description)) {
    errors.description = "The description must have a maximum of 5000 letters";
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

  // Pages
  if (!input.pages) errors.pages = "Books must have a page number.";
  else errors.pages = "";

  // Stock
  if (!input.stock) errors.stock = "Books must have a stock.";
  else if (!/^[1-9]\d*$/.test(input.stock)) {
    errors.stock = "The stock must be an integer greater than zero.";
  } else errors.stock = "";

  return errors;
}

export default function Form({ book }) {
  if (!book) {
    const authUser = useAuth()?.user?.uid;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const [disable, setDisable] = useState(true);
    const [errors, setErrors] = useState({});
    const genre = useSelector((state) => state.allGenres);
    const [secondSelectVisible, setSecondSelectVisible] = useState(false);
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
      stock: "",
      userId: authUser,
    });
    function handleChange(e) {
      if (e.target.name === "author") {
        setInput({
          ...input,
          [e.target.name]: [e.target.value],
        });
      } else if (
        e.target.name === "price" ||
        e.target.name === "pages" ||
        e.target.name === "stock"
      ) {
        setInput({
          ...input,
          [e.target.name]: Number(e.target.value),
        });
      } else if (e.target.name === "genre") {
        setInput({
          ...input,
          [e.target.name]: [Number(e.target.value)],
        });
        setSecondSelectVisible(true);
      } else {
        setInput({
          ...input,
          [e.target.name]: e.target.value,
        });
      }

      // if (
      //   input.title &&
      //   input.description &&
      //   input.cover &&
      //   input.price &&
      //   input.publisher &&
      //   input.publisher_date &&
      //   input.pages &&
      //   input.language &&
      //   input.genre &&
      //   input.author &&
      //   input.stock
      // ) {
      //   setDisable(false);
      // } else {
      //   setDisable(true);
      // }

      setErrors(
        validateForm({
          ...input,
          [e.target.name]: e.target.value,
        })
      );
    }
    const handleSecondSelectChange = (e) => {
      if (e.target.name === "genre") {
        setInput({
          ...input,
          [e.target.name]: [...input.genre, Number(e.target.value)],
        });
      }
    };
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
        !errors.author &&
        !errors.stock
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
          stock: "",
        });
      } else {
        return alert("Something went wrong. Please try again.");
      }
      navigate("/home");
    }
    useEffect(() => {
      dispatch(getAllGenres());
    }, [dispatch, input]);
    return (
      <div className="bg-slate-300 h-screen w-screen">
        <NavBar />
        <div className="mt-5 bg-[#52e6c3] border-2 border-[#52e6c3] w-5/12 h-9/12 rounded-1 mx-auto p-2">
          <div>
            <h2 className="text-xl font-bold mb-3">Upload your book</h2>
          </div>
          <div className="bg-[#ffffff] p-3">
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className="mt-1 mb-1 p-1 bg-[#52e6c3]">
                <input
                  className="peer block w-full"
                  type="text"
                  value={input.title}
                  name="title"
                  placeholder=" Title"
                  onChange={(e) => handleChange(e)}
                />
                <div>
                  <p className="text-xs text-[#ff0b11] italic mt-0.5">
                    {errors.title}
                  </p>
                </div>
              </div>
              <div className="p-1 mt-1 mb-1 bg-[#52e6c3]">
                <input
                  className="peer block w-full"
                  type="text"
                  value={input.cover}
                  name="cover"
                  placeholder=" Cover URL"
                  onChange={(e) => handleChange(e)}
                />
                <div>
                  <p className="text-xs text-[#ff0b11] italic mt-0.5">
                    {errors.cover}
                  </p>
                </div>
              </div>
              <div className="p-1 mt-1 mb-1 bg-[#52e6c3]">
                <input
                  className="peer block w-full"
                  type="number"
                  value={input.price}
                  name="price"
                  placeholder=" Price"
                  onChange={(e) => handleChange(e)}
                />
                <div>
                  <p className="text-xs text-[#ff0b11] italic mt-0.5">
                    {errors.price}
                  </p>
                </div>
              </div>
              <div className="p-1 mt-1 mb-1 bg-[#52e6c3]">
                <input
                  className="peer block w-full"
                  type="text"
                  value={input.publisher}
                  name="publisher"
                  placeholder=" Publisher"
                  onChange={(e) => handleChange(e)}
                />
                <div>
                  <p className="text-xs text-[#ff0b11] italic mt-0.5">
                    {errors.publisher}
                  </p>
                </div>
              </div>
              <div className="p-1 mt-1 mb-1 bg-[#52e6c3]">
                <input
                  className="peer block w-full"
                  type="date"
                  value={input.publisher_date}
                  name="publisher_date"
                  placeholder=" Publisher date"
                  onChange={(e) => handleChange(e)}
                />
                <div>
                  <p className="text-xs text-[#ff0b11] italic mt-0.5">
                    {errors.publisher_date}
                  </p>
                </div>
              </div>
              <div className="p-1 mt-1 mb-1 bg-[#52e6c3]">
                <input
                  className="peer block w-full"
                  type="number"
                  value={input.pages}
                  name="pages"
                  placeholder=" Page number"
                  onChange={(e) => handleChange(e)}
                />
                <div>
                  <p className="text-xs text-[#ff0b11] italic mt-0.5">
                    {errors.pages}
                  </p>
                </div>
              </div>
              <div className="p-1 mt-1 mb-1 bg-[#52e6c3]">
                <select
                  className="peer block w-full"
                  name="language"
                  onChange={(e) => handleChange(e)}
                >
                  <option disabled selected>
                    Select a language
                  </option>
                  <option value="es">Español</option>
                  <option value="en">English</option>
                </select>
                <div>
                  <p className="text-xs text-[#ff0b11] italic mt-0.5">
                    {errors.language}
                  </p>
                </div>
              </div>
              <div className="p-1 mt-1 mb-1 bg-[#52e6c3]">
                <input
                  className="peer block w-full"
                  type="text"
                  value={input.author}
                  name="author"
                  placeholder=" Author"
                  onChange={(e) => handleChange(e)}
                />
                <div>
                  <p className="text-xs text-[#ff0b11] italic mt-0.5">
                    {errors.author}
                  </p>
                </div>
              </div>

              <div className="p-1 mt-1 mb-1 bg-[#52e6c3]">
                <select
                  name="genre"
                  onChange={(e) => handleChange(e)}
                  className="peer block w-full"
                >
                  <option disabled selected>
                    Select a genre
                  </option>
                  {genre.map((gen) => (
                    <option key={gen.id} value={gen.id}>
                      {gen.name}
                    </option>
                  ))}
                </select>
                <div>
                  <p className="text-xs text-[#ff0b11] italic mt-0.5">
                    {errors.genre}
                  </p>
                </div>
                {secondSelectVisible && (
                  <div>
                    <select
                      name="genre"
                      onChange={handleSecondSelectChange}
                      className="peer block w-full"
                    >
                      <option disabled selected>
                        Select a genre
                      </option>
                      {genre.map((gen) => (
                        <option key={gen.id} value={gen.id}>
                          {gen.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
              <div className="p-1 mt-1 mb-1 bg-[#52e6c3]">
                <input
                  className="peer block w-full"
                  type="number"
                  value={input.stock}
                  name="stock"
                  placeholder=" Stock"
                  onChange={(e) => handleChange(e)}
                />
                <div>
                  <p className="text-xs text-[#ff0b11] italic mt-0.5">
                    {errors.stock}
                  </p>
                </div>
              </div>
              <div className="p-1 mt-1 mb-1 bg-[#52e6c3]">
                <textarea
                  className="peer block w-full"
                  rows="3"
                  type="text"
                  value={input.description}
                  name="description"
                  placeholder=" Description"
                  onChange={(e) => handleChange(e)}
                  maxLength="5001"
                />
                <div>
                  <p className="text-xs text-[#ff0b11] italic mt-0.5">
                    {errors.description}
                  </p>
                </div>
              </div>

              <div className="buttonSection">
                <Link to="/home">
                  <button className="m-1 bg-[#01017a] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Cancel
                  </button>
                </Link>
                <button
                  id="btn"
                  className="mt-1 m-1 bg-[#01017a] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  type="submit"
                  disabled={errors.length}
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  } else if (book) {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({});
    const [input, setInput] = useState({
      id: book.id,
      title: book.title,
      description: book.description,
      cover: book.cover,
      price: Number(book.price),
      pages: Number(book.pages),
      stock: Number(book.stock),
    });
    const handlerHideEditPost = () => {
      dispatch(switchUpdateBook(false));
    };
    function handleChange(e) {
      if (
        e.target.name === "price" ||
        e.target.name === "pages" ||
        e.target.name === "stock"
      ) {
        setInput({
          ...input,
          [e.target.name]: Number(e.target.value),
        });
      } else if (e.target.name === "description") {
        setInput({
          ...input,
          description: e.target.value,
        });
      } else {
        setInput({
          ...input,
          [e.target.name]: e.target.value,
        });
      }
      setErrors(
        validateFormDetails({
          ...input,
          [e.target.name]: e.target.value,
        })
      );
    }
    async function handleSubmit(e) {
      e.preventDefault();

      const successfullyAlert = () => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your book has been updated.",
          showConfirmButton: false,
          timer: 1500,
        });
      };

      const errorAlert = () => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Oops...",
          text: `Fill in the required fields.`,
        });
      };

      if (
        !errors.title &&
        !errors.description &&
        !errors.cover &&
        !errors.price &&
        !errors.pages &&
        !errors.stock
      ) {
        Swal.fire({
          position: "center",
          icon: "info",
          title: "Updating book...",
          showConfirmButton: false,
        });

        await dispatch(updateBook(book.id, input));
        await dispatch(getBookDetail(book.id));
        setInput({
          title: "",
          description: "",
          cover: "",
          price: "",
          pages: "",
          stock: "",
        });
        Swal.close();
        successfullyAlert();
        dispatch(switchUpdateBook(false));
      } else {
        Swal.close();
        errorAlert();
      }
    }

    return (
      <div className="bg-slate-300 h-screen w-screen">
        <NavBar />
        <div className="mt-5 bg-[#52e6c3] border-2 border-[#52e6c3] w-5/12 h-9/12 rounded-1 mx-auto p-2">
          <div>
            <h2 className="text-xl font-bold mb-3">Update your book</h2>
          </div>

          <div className="bg-[#ffffff] p-3">
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className="mt-1 mb-1 p-1 bg-[#52e6c3]">
                <input
                  className="peer block w-full"
                  type="text"
                  value={input.title}
                  name="title"
                  placeholder="Title"
                  onChange={(e) => handleChange(e)}
                />
                <div>
                  <p className="text-xs text-[#ff0b11] italic mt-0.5">
                    {errors.title}
                  </p>
                </div>
              </div>

              <div className="p-1 mt-1 mb-1 bg-[#52e6c3]">
                <input
                  className="peer block w-full"
                  type="text"
                  value={input.cover}
                  name="cover"
                  placeholder=" Cover URL"
                  onChange={(e) => handleChange(e)}
                />
                <div>
                  <p className="text-xs text-[#ff0b11] italic mt-0.5">
                    {errors.cover}
                  </p>
                </div>
              </div>

              <div className="p-1 mt-1 mb-1 bg-[#52e6c3]">
                <input
                  className="peer block w-full"
                  type="number"
                  value={input.price}
                  name="price"
                  placeholder=" Price"
                  onChange={(e) => handleChange(e)}
                />
                <div>
                  <p className="text-xs text-[#ff0b11] italic mt-0.5">
                    {errors.price}
                  </p>
                </div>
              </div>
              <div className="p-1 mt-1 mb-1 bg-[#52e6c3]">
                <input
                  className="peer block w-full"
                  type="number"
                  value={input.pages}
                  name="pages"
                  placeholder=" Page number"
                  onChange={(e) => handleChange(e)}
                />
                <div>
                  <p className="text-xs text-[#ff0b11] italic mt-0.5">
                    {errors.pages}
                  </p>
                </div>
              </div>

              <div className="p-1 mt-1 mb-1 bg-[#52e6c3]">
                <input
                  className="peer block w-full"
                  type="number"
                  value={input.stock}
                  name="stock"
                  placeholder=" Stock"
                  onChange={(e) => handleChange(e)}
                />
                <div>
                  <p className="text-xs text-[#ff0b11] italic mt-0.5">
                    {errors.stock}
                  </p>
                </div>
              </div>
              <div className="p-1 mt-1 mb-1 bg-[#52e6c3]">
                <textarea
                  className="peer block w-full"
                  rows="10"
                  type="text"
                  value={input.description}
                  name="description"
                  placeholder=" Description"
                  onChange={(e) => handleChange(e)}
                  maxLength="5001"
                />
                <div>
                  <p className="text-xs text-[#ff0b11] italic mt-0.5">
                    {errors.description}
                  </p>
                </div>
              </div>
              <div className="buttonSection">
                <button
                  className="m-1 bg-[#01017a] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={handlerHideEditPost}
                >
                  Cancel
                </button>
                <button
                  id="btn"
                  className="mt-1 m-1 bg-[#01017a] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  type="submit"
                  disabled={errors.length}
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
