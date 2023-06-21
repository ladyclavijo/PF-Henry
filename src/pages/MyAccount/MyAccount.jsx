import { useAuth } from "../../context/authContext";
import { useDispatch, useSelector } from "react-redux";
import "./MyAccount.css";
import { useEffect, useState } from "react";
import { getUserDetail, updateProfile } from "../../redux/actions/index";
import NavBar from "../../components/NavBar/NavBar";

export default function MyAccount() {

    const currentUser = useSelector((state) => state.userDetail);
    const boughtList = useSelector((state) => state.allBooks);

    const dispatch = useDispatch();

    const { user, loading, loginWithGoogle } = useAuth(); // Utiliza el hook useAuth del contexto
    const id = user.uid
    const finalUser = currentUser.response
    const orderList = finalUser?.orders
    const boughtNew = orderList?.map((e) => {
        return e.items[0].id
    })

    const filteredArray = boughtList.filter((book) => boughtNew?.includes(book.id));

    const [editing, setEditing] = useState(false);
    const [show, setShow] = useState(false);

    useEffect(() => {
        dispatch(getUserDetail(id));
    }, [dispatch, id]);

    const [newUser, setNewUser] = useState({
        username: finalUser?.username || "",
        lastname: finalUser?.lastname || "",
        email: finalUser?.email || "",
        phone: finalUser?.phone || "",
        country: finalUser?.country || "",
        photo: finalUser?.photo || "",
    })

    //*******// HANDLE FUNCTIONS (start) //*********//


    function handleChange(e) {
        setNewUser({
            ...newUser,
            [e.target.name]: e.target.value,
        })
    }


    function handleSave() {
        console.log(newUser);
        dispatch(updateProfile(id, newUser));
        setEditing(false);
    }

    //*******// HANDLE FUNCTIONS (end) //*********//



    if (loading) {
        // Aquí puedes mostrar un indicador de carga mientras se verifica la autenticación
        return <p>Loading...</p>;
    }

    if(!finalUser) {
        return (
            <div>
                <p className="no-user">No user logged in</p>
                <button onClick={loginWithGoogle}>Login with Google</button>
            </div>
        )
    }

    return (
        <div className="bg-slate-300 h-screen w-screen">
            <NavBar />
            <div className="my-account-container">
                <h2 className="welcome-title">
                    Welcome{", "}
                    <span className="text-[#266386]">
                        {finalUser ? finalUser?.username : user.username}
                    </span>
                    .
                </h2>

                {editing ? (
                    <div>
                        <div>
                            <strong>Username: </strong>
                            <input
                                type="text"
                                name="username"
                                value={newUser.username}
                                onChange={(e) => handleChange(e)}
                                className="mb-1"
                            />
                        </div>
                        <div>
                            <strong>Lastname: </strong>
                            <input
                                type="text"
                                name="lastname"
                                value={newUser.lastname}
                                onChange={(e) => handleChange(e)}
                                className="mb-1"
                            />
                        </div>
                        <div>
                            <strong>Email: </strong>
                            <input
                                type="text"
                                name="email"
                                value={newUser.email}
                                onChange={(e) => handleChange(e)}
                                className="mb-1"
                            />
                        </div>
                        <div>
                            <strong>Number: </strong>
                            <input
                                type="number"
                                name="phone"
                                value={newUser.phone}
                                onChange={(e) => handleChange(e)}
                                className="mb-1"
                            />
                        </div>
                        <div>
                            <strong>Country: </strong>
                            <input
                                type="text"
                                name="country"
                                value={newUser.country}
                                onChange={(e) => handleChange(e)}
                                className="mb-1"
                            />
                        </div>
                        <div>
                            <button onClick={() => handleSave()}>Send</button>
                        </div>
                    </div>
                ) : (
                    <div className="user-info">
                        <div>
                            <div className="info-item">
                                <strong>Name </strong> {finalUser?.username} {finalUser?.lastname}
                            </div>
                            <div className="info-item">
                                <strong>Email </strong> {finalUser?.email}
                            </div>
                            <div className="info-item">
                                <strong>Country </strong> {finalUser?.country}
                            </div>
                            <div className="info-item">
                                <strong>Phone </strong> {finalUser?.phone}
                            </div>
                            <div>
                                <strong>IMG </strong> {finalUser?.photo}
                            </div>
                            <br/>
                            <div>
                                <button onClick={() => setEditing(true)}>Edit profile</button>
                            </div>
                            <br/>
                        </div>
                    </div>
                )}
                {show ? (
                    <div>
                        <button onClick={() => setShow(false)}>Hide bought books</button>
                        {filteredArray.map((el) => {
                            return (
                                <div key={el.id}>
                                    <p>{el.title}</p>
                                    <img src={el.cover} alt={el.title} className="w-32"/>
                                    <p>{el.price}</p>
                                </div>
                            )
                        })}
                    </div>
                ) : (
                    <button onClick={() => setShow(true)}>Show bought books</button>
                )
                    
                }
                
                
                
                
                
                {/* {show ? (
                    <div>
                        <button onClick={setShow(true)}>Hide bought books</button>
                        
                    </div>
                ) : (
                    <button onClick={setShow(false)}>Show bought books</button>
                )} */}
            </div>
        </div>
    );
};