import { useState } from "react"
import { useDispatch } from "react-redux"
import { getUserByUsername} from "../../redux/actions"
import "./SearchDashboard.css"

const SearchDashboard = () => {
  
    const [username, setUsername] = useState('');
    // const users = useSelector((state) => state.allUsers)
    const dispatch = useDispatch()
    
    const handleSearchByUsername = (event) => {
        
        const inputValue = event.target.value;
        if(!inputValue ){
            dispatch(getUserByUsername(username))
        }
        setUsername(inputValue)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        dispatch(getUserByUsername(username))
    }

    return (
    <div className="search-form">
        <form onSubmit={handleSubmit} >
            <input 
                type="text"
                placeholder="Search..."
                onChange={handleSearchByUsername}
                name="username"
                value={username}
            />
            <button type="submit">Submit</button>
        </form>
    </div>
    
  )
}

export default SearchDashboard