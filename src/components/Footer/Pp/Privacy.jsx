import './Privacy.css';
import NavBar from '../../NavBar/NavBar';
import Footer from '../Footer';

const Privacy = () => {
  return (
    <div className="pp-container">
      <NavBar />
      <h1 className="pp-title">Privacy Policy</h1>
      <div className="pp-content">
        <p>
          At our book buying and selling platform, we value and respect your privacy. This Privacy Policy outlines how we collect, use, and protect your personal information. By using our services, you consent to the practices described in this policy. We encourage you to read this policy carefully.
        </p>

        <h3>Information Collection</h3>
        <p>
          We may collect personal information, such as your name, email address, and contact details when you register on our platform. Additionally, we may collect information about your interactions with our website, such as the pages visited and the actions taken.
        </p>

        <h3>Use of Information</h3>
        <p>
          We use the collected information to provide and improve our services, personalize your experience, and communicate with you. This includes responding to your inquiries, sending important updates, and providing relevant recommendations.
        </p>

        <h3>Information Sharing</h3>
        <p>
          We may share your personal information with third-party service providers who assist us in operating our platform and delivering services to you. These providers are obligated to maintain the confidentiality and security of your information. We may also disclose your information if required by law or to protect our rights, property, or safety.
        </p>

        <h3>Data Security</h3>
        <p>
          We take appropriate measures to safeguard your personal information against unauthorized access, alteration, or disclosure. However, please note that no method of transmission over the internet or electronic storage is completely secure. We cannot guarantee the absolute security of your information.
        </p>

        <h3>Third-Party Links</h3>
        <p>
          Our platform may contain links to third-party websites or services. We are not responsible for the privacy practices or content of these external sites. We encourage you to review the privacy policies of those third parties before providing any personal information.
        </p>

        <h3>Children`s Privacy</h3>
        <p>
          Our services are not intended for children under the age of 18. We do not knowingly collect personal information from minors. If you believe that a minor has provided us with personal information without parental consent, please contact us, and we will take steps to remove the information from our systems.
        </p>

        <h3>Changes to the Privacy Policy</h3>
        <p>
          We may update our Privacy Policy from time to time. Any changes will be reflected on this page, and the revised policy will be effective when posted. We encourage you to review this page periodically for the latest information.
        </p>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}

export default Privacy;
