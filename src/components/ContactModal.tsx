import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCopy, FaTimes, FaPhone, FaEnvelope } from 'react-icons/fa';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'phone' | 'email';
  value: string;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose, type, value }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const handleCall = () => {
    window.open(`tel:${value}`, '_self');
  };

  const handleEmail = () => {
    window.open(`mailto:${value}`, '_self');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="contact-modal"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <div className="modal-icon">
                {type === 'phone' ? <FaPhone /> : <FaEnvelope />}
              </div>
              <button className="close-button" onClick={onClose}>
                <FaTimes />
              </button>
            </div>
            
            <div className="modal-content">
              <h3>{type === 'phone' ? 'Phone Number' : 'Email Address'}</h3>
              <div className="contact-value">
                {value}
              </div>
              
              <div className="modal-actions">
                <motion.button
                  className="copy-button"
                  onClick={handleCopy}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaCopy />
                  {copied ? 'Copied!' : 'Copy'}
                </motion.button>
                
                <motion.button
                  className="action-button"
                  onClick={type === 'phone' ? handleCall : handleEmail}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {type === 'phone' ? 'Call Now' : 'Send Email'}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;
