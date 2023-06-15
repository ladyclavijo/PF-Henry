import './ReturnPolicies.css';
import NavBar from '../../NavBar/NavBar';
import Footer from '../Footer';

const ReturnPolicies = () => {
  return (
    <div className="return-policies-container">
      <NavBar />
      <h1 className="return-policies-title">Return Policies</h1>
      <div className="return-policies-content">
        <p>
          At our book buying and selling platform, we want to ensure your satisfaction with your purchases. This Return Policy outlines the guidelines for returning books and requesting refunds. By using our services, you agree to comply with these policies. Please read this information carefully.
        </p>

        <h3>Returns and Refunds</h3>
        <p>
          If you are not satisfied with your purchase, you may request a return and refund within 30 days of receiving the book. To be eligible for a return and refund, the book must be in the same condition as when you received it. Any damages or signs of wear may affect the eligibility for a refund.
        </p>

        <h3>Return Process</h3>
        <p>
          To initiate a return, please contact our customer support team with your order details and reason for the return. We will provide you with instructions on how to proceed. Please note that you may be responsible for the return shipping costs unless the book arrived damaged or was misrepresented in the listing.
        </p>

        <h3>Refund Processing</h3>
        <p>
          Once we receive the returned book and verify its condition, we will process the refund. The refund will be issued to the original payment method used for the purchase. Please allow up to 5 business days for the refund to reflect in your account.
        </p>

        <h3>Contact Us</h3>
        <p>
          If you have any questions or need further assistance regarding our return policies, please contact our customer support team. We are here to help you.
        </p>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}

export default ReturnPolicies;
