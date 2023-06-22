import React, { useContext } from 'react';
import NavBar from "../../components/NavBar/NavBar.jsx";
import './about.css';
import Faq from './Faq';
import Footer from "../../components/Footer/Footer.jsx";
import { ThemeContext } from "../../components/ThemeProvider/ThemeProvider.jsx";
import "../../Styles/colors.css";


export default function About() {

  const { theme } = useContext(ThemeContext);

    const styles = {
        container: {
            backgroundColor: "var(--color-background)",
        },
    };



  return (
    <div className={`bg-slate-300 min-h-screen w-screen`} style={styles.container}>
      <NavBar />
      <div className="containerOne">
      <div className="containerOneContent">
        <div className="divAboutLeft">
          <h2 className="titles">Who are we?</h2>
          <p> We are a website that facilitates the online sale of books. We also allow the exchange of books between users of the site. Our goal is to connect book lovers from all over the world, allowing them to buy, sell and exchange books in a simple and secure way.</p>
        </div>
        </div>
      </div>


      <div className="containerTwo">
        <div className="divAboutRight">
          <h2 className="titles">Mission</h2>
          <p>Our mission is to provide users with access to a wide selection of books in a variety of genres, from classic novels to the latest releases. We work closely with reliable bookstores and vendors to ensure that the books offered are of high quality and in good condition.</p>
        </div>
      </div>


      <div className="containerThree">
        <div className="divAboutttLeft">
          <h2 className="titles">Vision</h2>
          <p>Our vision is to become the preferred destination for online book lovers by offering a reliable and convenient platform to buy, sell and exchange books. We strive to create a global community where users can share their passion for reading and discover new stories.</p>
        </div>
      </div>

      <Faq />

      <div className="global">
        <h2 className="titles">Developer Team</h2>
        <div className="containerFlex">
          <div className="column">
            <h3 className="titluloFront">Frontend Developers</h3>
            <ul>
              <li><a href="https://www.linkedin.com/in/bautista-bauz%C3%A1-8ba37325b/" target="blank">Bautista Bauzá</a></li>
              <li><a href="https://www.linkedin.com/in/juan-mart%C3%ADn-salinas-112216236/" target="blank">Juan Salinas</a></li>
              <li><a href="https://www.linkedin.com/in/roberto-arregui-rosas-7a7803206/" target="blank">Roberto Arregui</a></li>
            </ul>
          </div>
          <div className="column">
            <h3 className="titluloBack">Backend Developers</h3>
            <ul>
              <li><a href="https://www.linkedin.com/in/fmaldeco/" target="blank">Franco Aldeco</a></li>
              <li><a href="https://www.linkedin.com/in/ladyclavijo" target="blank">Lady Clavijo</a></li>
              <li><a href="https://www.linkedin.com/in/stivliz" target="blank">Steven Lizarazo</a></li>
              <li><a href="https://www.linkedin.com/in/agust%C3%ADn-ju%C3%A1rez-7a742b237/" target="blank">Agustin Juarez</a></li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}