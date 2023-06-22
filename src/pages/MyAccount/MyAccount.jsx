import { useAuth } from "../../context/authContext";
import { useDispatch, useSelector } from "react-redux";
import "./MyAccount.css";
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { getUserDetail, updateProfile } from "../../redux/actions/index";
import NavBar from "../../components/NavBar/NavBar";
import { FaLocationArrow,FaMobileAlt,FaMailBulk } from 'react-icons/fa';
import { ThemeContext } from "../../components/ThemeProvider/ThemeProvider.jsx";
import "../../Styles/colors.css";

export default function MyAccount() {

  const currentUser = useSelector((state) => state.userDetail);
  const boughtList = useSelector((state) => state.allBooks);

  const dispatch = useDispatch();

  const { user, loading, loginWithGoogle } = useAuth(); // Utiliza el hook useAuth del contexto
  const id = user.uid
  const finalUser = currentUser.response

  const historyNew = currentUser.detailShopHistory
  const historyItems = historyNew?.map((e) => {
    return e.items[0].id
  })


  const filteredArray = boughtList.filter((book) => historyItems?.includes(book.id));

  const finalArray = filteredArray.map((book1) => {
    const matchingBook = historyNew.find((book2) => book2.items.some((item) => item.id === book1.id));
    return { ...book1, date: matchingBook.createdAt } 
  })

  const [editing, setEditing] = useState(false);
  const [show, setShow] = useState(false);

  const [newUser, setNewUser] = useState({
    id: id,
    username: finalUser?.username || "",
    lastname: finalUser?.lastname || "",
    email: finalUser?.email || "",
    phone: finalUser?.phone || 0,
    country: finalUser?.country || "",
    photo: finalUser?.photo || "",
  })

  useEffect(() => {
    dispatch(getUserDetail(id));
  }, [dispatch, id]);


  //*******// HANDLE FUNCTIONS (start) //*********//


  function handleChange(e) {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value,
    })
  }


  function handleSave() {
    console.log(newUser);
    dispatch(updateProfile(newUser));
    setEditing(false);
  }

  console.log(historyNew)
  console.log(filteredArray)


  console.log(finalArray)

  //*******// HANDLE FUNCTIONS (end) //*********//



  if (loading) {
    // Aquí puedes mostrar un indicador de carga mientras se verifica la autenticación
    return <p>Loading...</p>;
  }

  if (!finalUser) {
    return (
      <div>
        <p className="no-user">No user logged in</p>
        <button onClick={loginWithGoogle}>Login with Google</button>
      </div>
    )
  }

  const { theme } = useContext(ThemeContext);

  const styles = {
    container: {
      backgroundColor: "var(--color-background)",
      color: "var(--color-text)",
    },
    container2: {
      color: "var(--color-text)",
    },
};

    return (
        <div className="bg-slate-300 min-h-screen flex flex-col"  style={styles.container}>
            <NavBar />
            <div className="mt-5 ml-5 flex"  style={styles.container}>
                {/* <h2 className="welcome-title">
                Welcome{", "}
                <span className="text-[#266386]">
                    {finalUser ? finalUser?.username : user.username}
                </span>
                .
                </h2> */}

                {editing ? (
                <div className="w-96 bg-[#9dc8c5] p-4 items-center shadow rounded-md"  style={styles.container}>
                    <div className="color-input">
                    <div>
                        <img 
                            className="w-82 rounded-full"
                            src={finalUser?.photo}
                            alt={finalUser?.username}/>
                    </div>
                    <div className="flex flex-col">
                        <strong className="color-strong">Username</strong>
                        <input
                            type="text"
                            name="username"
                            value={newUser.username}
                            onChange={(e) => handleChange(e)}
                            className="mb-1"
                        />
                    </div>
                    <div className="flex flex-col">
                        <strong className="color-strong">Lastname</strong>
                        <input
                            type="text"
                            name="lastname"
                            value={newUser.lastname}
                            onChange={(e) => handleChange(e)}
                            className="mb-1"
                        />
                    </div>
                    <div className="flex flex-col">
                        <strong className="color-strong">Email</strong>
                        <input
                            type="text"
                            name="email"
                            value={newUser.email}
                            onChange={(e) => handleChange(e)}
                            className="mb-1"
                        />
                    </div>  
                    <div className="flex flex-col">
                        <strong className="color-strong">Number</strong>
                        <input
                            type="number"
                            name="phone"
                            value={newUser.phone}
                            onChange={(e) => handleChange(e)}
                            className="mb-1"
                        />
                    </div>
                    <div className="flex flex-col">
                        <strong className="color-strong">Country</strong>
                        <input
                            type="text"
                            name="country"
                            value={newUser.country}
                            onChange={(e) => handleChange(e)}
                            className="mb-1"
                        />
                    </div>
                    <div className="flex flex-col">
                        <strong className="color-strong">Image</strong>
                        <input
                            type="text"
                            name="photo"
                            value={newUser.photo}
                            onChange={(e) => handleChange(e)}
                            className="mb-1"
                        />
                    </div>
                    </div>
                    <div className="flex space-x-4 mt-2">
                        <button
                            onClick={() => handleSave()}
                            className="w-full bg-[#02355e] hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                        >
                        Send
                        </button>
                        <button
                            onClick={() => setEditing(false)}
                            className="w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                        >
                            Cancel
                        </button>
                    </div>

                </div>
                ) : (

                <div className="user-info"style={styles.container}>
                    
                    <div className="w-96 bg-[#9dc8c5] p-4 items-center shadow rounded-md" style={styles.container}>

                        <div className="w-82">
                            <img 
                                className="rounded-full"
                                src={finalUser?.photo}
                                alt={finalUser?.username}
                            />
                        </div>

                        <div className="font-bold text-2xl">
                            {finalUser?.name}
                        </div>

                        <div className="mb-3">
                            {finalUser?.username} {finalUser?.lastname}
                        </div>

                        <div className="info-item">
                            <FaMailBulk className="inline-block"/> {finalUser?.email}
                        </div>

                        <div className="info-item">
                            <FaMobileAlt className="inline-block"/> {finalUser?.phone}
                        </div>

                        <div className="info-item">
                            <FaLocationArrow className="inline-block"/> {finalUser?.country}
                        </div>

                        <div className="bg-[#02355e] hover:bg-blue-600 text-white font-bold py-1 px-4 rounded text-center">
                            <button onClick={() => setEditing(true)}>Edit profile</button>
                        </div>

                    </div>

                </div>
                )}
                {show ? (
                    <div className="bg-[#9dc8c5] ml-8 mt-4 items-start flex flex-row m-4 p-3 shadow rounded-md" style={styles.container}>
                        <button className="font-bold" onClick={() => setShow(false)} style={styles.container}>Hide bought books</button>
                        <div className="ml-6 grid grid-cols-4 gap-x-6 gap-y-2">
                            {finalArray.map((el) => {
                            return (
                                <Link to={`/book/ ${el.id}`}>
                                    <div className="mb-4" key={el.id}>
                                        <img src={el.cover} alt={el.title} className="w-32 h-48" />
                                        <p className="font-bold w-32">{el.title}</p>
                                        <p>Price: {el.price} $</p>
                                        <p className="text-sm italic">Bought date: <br/> {el.date.slice(0, 10)}, {el.date.slice(11,16)}</p>
                                    </div>
                                </Link>
                            )
                            })}
                        </div>
                    </div>
                ) : (
                    <div className=" ml-8 mt-4 items-start flex flex-row m-4" style={styles.container}>
                        <button className="font-bold bg-[#9dc8c5] p-3 shadow rounded-md" onClick={() => setShow(true)} style={styles.container}>Show bought books</button>
                    </div>
                )}
            </div>
        </div>
    );
};