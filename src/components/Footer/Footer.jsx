import styles from './Footer.module.css';
import logo from "../../assets/images/Logo.png";
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import { FaCcStripe } from 'react-icons/fa';


import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className={styles.piepagina}>
      <div className={styles.grupo1}>
        <div className={styles.box}>
          <figure>
            <Link to="/home">
              <div className={styles.logo} style={{ backgroundImage: `url(${logo})` }}></div>
            </Link>
		<div className={styles.RedSocial}>
              <Link to="#">
                <FaFacebook />
              </Link>
                <Link to="#">
              <FaTwitter />
                </Link>
              <Link to="#">
                <FaInstagram />
              </Link>
        </div>
          </figure>
        </div>
        <div className={styles.box}>
          <h2>Contact Information</h2>
          <p>Phone: 555-1234</p>
          <p>Email: bookbuster29@gmail.com</p>
        </div>

        <div className={styles.box}>
          <h2>Legal</h2>
          <ul className=''>
            <li><Link to="/termsandconditions">Terms and Conditions</Link></li>
            <li><Link to="/privacypolicy">Privacy Policy</Link></li>
            <li><Link to="/about">About Our Company</Link></li>
			<li><Link to="/returnpolicies">Return Policies</Link></li>
          </ul>
        </div>

		<div className={styles.box}>
			<h2>Means of phayment</h2>
			<div className={styles.xxxx}>
				<FaCcStripe size={45}/>
			</div>
		</div>


      </div>
      <div className={styles.grupo2}>
        <small>&copy; {new Date().getFullYear()} PF Henry Group 7. All Rights Reserved.</small>
      </div>
    </footer>
  );
};

export default Footer;
