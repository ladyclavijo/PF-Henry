import React, { useContext} from "react";
import { Link } from "react-router-dom";
import "./Landing.css";
import imagen from "../../assets/landing-image.png"
import logo from "../../assets/Logo.png"
import { ThemeContext } from "../../components/ThemeProvider/ThemeProvider";
import "../../Styles/colors.css";
import SliderComponent from "../../components/Slider/Slider";


export default function Landing() {

  const { theme, toggleTheme } = useContext(ThemeContext);
  const handleToggleTheme = () => {
    toggleTheme();
  };
  const styles = {
    container: {
        backgroundColor: "var(--color-background)",
    },
  };


  return (
    <div className={`landing-page bg-slate-300 min-h-screen w-screen`} style={styles.container}>
      <nav className="navbar">
        <div className="logo">
          <img
            src={logo}
            alt="Book Logo"
            style={{ width: '150px', height: 'auto' }}
          />
        </div>

        {/* ------------ SWITCH DARKMODE ------------ */}

        <label className={`ui-switch ${theme === 'dark' ? 'dark' : ''} landing-switch`}>
          <input type="checkbox" onChange={handleToggleTheme} checked={theme === 'dark'} />
          <div className="slider">
            <div className="circle"></div>
          </div>
        </label>


        <div className="buttons">
          {/* <button className="buttonLog">Log In</button>
          <button className="buttonSign">Sign Up</button> */}

        </div>
      </nav>
      <div className="content">
        <div className="text-container">
          <div className="blue-box">
            <h2>Explore a world of books at your fingertips.</h2>
            <Link to="/home">
              <button className="explore-button">Explore books</button>
            </Link>
          </div>
        </div>
        <div className="image-container">
          <img
            src={imagen}
            alt="Book Image"
            style={{ width: 'auto', height: 'auto' }}
          />
        </div>
      </div>

      <div style={{ display: 'flex', position: 'absolute', bottom: '20px', width: '100%', textAlign: 'center', justifyContent: 'center', paddingBottom: '20px' }}>
        <div className="slider">
    
    <SliderComponent />
  </div>
</div>

    </div>

  );
}