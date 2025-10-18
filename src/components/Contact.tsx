import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaLinkedin, FaGithub, FaTwitter, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import ContactModal from './ContactModal';

const Contact: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalType, setModalType] = React.useState<'phone' | 'email'>('email');
  const [modalValue, setModalValue] = React.useState('');

  const openModal = (type: 'phone' | 'email', value: string) => {
    console.log('Opening modal:', type, value);
    setModalType(type);
    setModalValue(value);
    setModalOpen(true);
  };

  const closeModal = () => {
    console.log('Closing modal');
    setModalOpen(false);
  };

  return (
    <section id="contact" className="contact section">
      <div className="container">
        <motion.div
          className="contact-content"
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2>Let's Work Together</h2>
          <p>
            I'm always interested in new opportunities and exciting projects. 
            Whether you have a question or just want to say hi, I'll try my best to get back to you!
          </p>
          
          <div className="contact-buttons">
            <motion.button
              className="btn-primary"
              onClick={() => openModal('email', 'bharathkumar0603@gmail.com')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaEnvelope /> Send Email
            </motion.button>
            <motion.button
              className="btn-secondary"
              onClick={() => openModal('phone', '+919515206929')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaPhone /> Call Me
            </motion.button>
          </div>

          <div className="social-links">
            <motion.a
              href="https://linkedin.com/in/bharath-kumar"
              className="social-link"
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaLinkedin />
            </motion.a>
            <motion.a
              href="https://github.com/bharath-kumar"
              className="social-link"
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaGithub />
            </motion.a>
            <motion.a
              href="https://twitter.com/bharath_dev"
              className="social-link"
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaTwitter />
            </motion.a>
            <motion.button
              className="social-link"
              onClick={() => openModal('email', 'bharathkumar0603@gmail.com')}
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaEnvelope />
            </motion.button>
          </div>

          <motion.div
            className="contact-info"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{ marginTop: '40px', color: '#cccccc' }}
          >
            <p><FaMapMarkerAlt /> Hyderabad, India</p>
            <p><FaEnvelope /> bharathkumar0603@gmail.com</p>
            <p><FaPhone /> +91 9515206929</p>
          </motion.div>
        </motion.div>
      </div>
      
      <ContactModal
        isOpen={modalOpen}
        onClose={closeModal}
        type={modalType}
        value={modalValue}
      />
    </section>
  );
};

export default Contact;
