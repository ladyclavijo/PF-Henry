import './TermsandConditions.css';
import NavBar from '../../NavBar/NavBar';
import Footer from '../Footer';

const TermsandConditions = () => {
  return (
    <div className="tac-container">
      <NavBar />
      <h1 className="tac-title">Terms and Conditions</h1>
      <div className="tac-content">
        <p>
          The following terms and conditions set forth the rights and responsibilities governing the use of our book buying and selling platform. By accessing and using our services, you agree to comply with these terms and conditions. We recommend that you read this information carefully before using our platform.
        </p>

        <h3>User Registration</h3>
        <p>
          To use our platform, you must register by providing accurate and complete information. We reserve the right to verify your identity and reject any registration request that we deem inappropriate or fraudulent. Only users over the age of 18 are authorized to use our services. If you are a minor, you must obtain the consent of a parent or legal guardian before registering and using the platform.
        </p>

        <h3>Listing and Selling Books</h3>
        <p>
          Selling users are responsible for providing accurate and complete information about the books they wish to sell. This includes details such as title, author, book condition, price and shipping options. The sale of illegal, counterfeit or copyright infringing books is strictly prohibited. We reserve the right to remove any listing that violates these conditions.
        </p>

        <h3>Communication between Users</h3>
        <p>
          Our platform facilitates communication between users to facilitate transactions. However, any form of harassment, offensive language or inappropriate behavior will not be tolerated. We urge you to maintain respectful and courteous communication with other users. We are not responsible for communication or interactions between users, but we reserve the right to take action if we receive credible reports of inappropriate behavior.
        </p>

        <h3>Transactions and Payments</h3>
        <p>
          Transactions and payments between buyers and sellers will take place outside of our platform, unless otherwise specified. We are not responsible for any problems that may arise during these transactions. Users must agree and comply with payment and shipping terms in a mutually satisfactory manner. Any disputes regarding payment or delivery of books should be resolved directly between the users involved.
        </p>

        <h3>Intellectual Property</h3>
        <p>
          Users must respect the intellectual property rights of others. The publication of content or images that infringe copyrights is not permitted. When posting a book for sale on our platform, you must ensure that you have the necessary rights to do so and guarantee that you are not violating the intellectual property rights of others. We reserve the right to remove any content that infringes intellectual property rights.
        </p>
      </div>
      <div className='footer'>
      <Footer />
      </div>
    </div>
  );
}

export default TermsandConditions;