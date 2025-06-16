import { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import emailjs from '@emailjs/browser';
import Footer from "./Footer";
import SocialLinks from "./SocialLinks";
import { useDevice } from "../contexts/DeviceContext";
import { fadeInLeftVariant } from "../utils/animationVariants";

const Contact = () => {

  // Form state management
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const formRef = useRef();

  // Form validation logic
  const validateForm = () => {
    const errors = {};
    // Check for required fields and email format
    if (!formData.user_name.trim()) {
      errors.user_name = 'Name is required';
    }
    if (!formData.user_email.trim()) {
      errors.user_email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.user_email)) {
      errors.user_email = 'Email is invalid';
    }
    if (!formData.message.trim()) {
      errors.message = 'Message is required';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form input changes with error clearing
  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  }, [formErrors]);

  // Quick form validation check
  const isFormValid = () => {
    return formData.user_name.trim() !== '' && 
           formData.user_email.trim() !== '' && 
           formData.message.trim() !== '';
  };

  // Email submission handler
  const sendEmail = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Get environment variables for EmailJS
    const serviceID = import.meta.env.VITE_EMAIL_SERVICE_ID;
    const templateID = import.meta.env.VITE_EMAIL_TEMPLATE_ID;
    const userID = import.meta.env.VITE_EMAIL_PUBLIC_KEY;

    // Send email using EmailJS
    emailjs.sendForm(serviceID, templateID, formRef.current, userID).then(
      () => {
        setFormData({ user_name: '', user_email: '', message: '' }); 
        setIsSubmitted(true); 
      },
      (err) => {
        setFormErrors({ submit: "Failed to send message. Please try again." });
      }
    );
  };

  return (
    // Main container with responsive layout
    <div
      id="contact"
      className="min-h-screen  relative flex flex-col justify-between overflow-hidden pt-6 md:pt-10 items-center text-[var(--text-p-color)]"
    >
      {/* Header section */}
      <div className="w-full relative px-4 md:px-8 mb-8 md:mb-12">
        <motion.h2
          className="text-[var(--p-color)] text-3xl mb-4 text-center relative pb-4"
         initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount:0.5 }}
            transition={{ duration: 0.5, delay:0.1 }}

        >
          C O N T A C T
          <motion.div 
            className="absolute bottom-0 left-0 right-0 h-[2px]"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{once:true}}
          >
            <div className="h-full bg-gradient-to-r from-transparent via-[var(--p-color)] to-transparent"></div>
          </motion.div>
        </motion.h2>
      </div>

      {/* Main content section */}
      <div className="z-10 w-full max-w-7xl px-4 md:px-8">
        <div className="flex flex-col md:flex-row gap-12 lg:gap-20">
          {/* Left Column - Contact Form */}
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{once:true, amount:0.2}}
          >
            <motion.h3
              className="text-base md:text-lg font-mono text-center text-[var(--text-p-color)] mb-6"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              { isSubmitted ? "Thank you!" : "Let's collaborate"}
            </motion.h3>

            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{once:true, amount:0.2}}
                className="text-center py-8"
              >
                <motion.div 
                  className="w-16 h-16 mx-auto mb-6 text-[var(--p-color)]"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  viewport={{once:true, amount:0.2}}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </motion.div>
                <motion.p 
                  className="text-xl text-[var(--text-p-color)] mb-4 font-mono"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  viewport={{once:true, amount:0.2}}
                >
                  Message sent successfully!
                </motion.p>
                <motion.p 
                  className="text-[var(--text-s-color)] mb-8 font-mono"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  viewport={{once:true, amount:0.2}}
                >
                  I'll get back to you as soon as possible.
                </motion.p>
                <motion.button
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-2 border border-[var(--p-color)] text-[var(--p-color)]  hover:bg-[var(--p-color)] hover:text-[var(--bg-p-color)] transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  viewport={{once:true, amount:0.2}}
                >
                  Send another message
                </motion.button>
              </motion.div>
            ) : (
              <form
                ref={formRef}
                onSubmit={sendEmail}
                className="space-y-6"
              >
                <motion.div
                  variants={fadeInLeftVariant}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{once:true, amount:0.2}}
                  
                >
                  <label className="block text-sm text-[var(--text-s-color)] mb-2">Name</label>
                  <input
                    type="text"
                    name="user_name"
                    value={formData.user_name}
                    onChange={handleInputChange}
                    className={`w-full bg-[var(--bg-s-color)] border ${formErrors.user_name ? 'border-[var(--p-color)]' : 'border-[var(--bg-t-color)]'}  px-4 py-3 focus:outline-none focus:border-[var(--p-color)] transition-colors `}
                    placeholder="Your name"
                  />
                  {formErrors.user_name && (
                    <p className="text-[var(--p-color)] text-xs mt-1">{formErrors.user_name}</p>
                  )}
                </motion.div>

                <motion.div
                  variants={fadeInLeftVariant}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{once:true, amount:0.2}}
                >
                  <label className="block text-sm text-[var(--text-s-color)] mb-2">Email</label>
                  <input
                    type="email"
                    name="user_email"
                    value={formData.user_email}
                    onChange={handleInputChange}
                    className={`w-full bg-[var(--bg-s-color)] border ${formErrors.user_email ? 'border-[var(--p-color)]' : 'border-[var(--bg-t-color)]'}  px-4 py-3 focus:outline-none focus:border-[var(--p-color)] transition-colors `}
                    placeholder="Enter you email"
                  />
                  {formErrors.user_email && (
                    <p className="text-[var(--p-color)] text-xs mt-1">{formErrors.user_email}</p>
                  )}
                </motion.div>

                <motion.div
                  variants={fadeInLeftVariant}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{once:true, amount:0.2}}
                >
                  <label className="block text-sm text-[var(--text-s-color)] mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className={`w-full bg-[var(--bg-s-color)] border ${formErrors.message ? 'border-[var(--p-color)]' : 'border-[var(--bg-t-color)]'}  px-4 py-3 h-32 focus:outline-none focus:border-[var(--p-color)] transition-colors resize-none `}
                    placeholder="Tell me about your project..."
                  />
                  {formErrors.message && (
                    <p className="text-[var(--p-color)] text-xs mt-1">{formErrors.message}</p>
                  )}
                </motion.div>

                <motion.button
                  type="submit"
                  disabled={!isFormValid()}
                  className={`w-full md:w-auto px-8 py-3 font-medium  ${
                    isFormValid()
                      ? 'bg-[var(--p-color)] text-[var(--bg-p-color)] hover:bg-opacity-90'
                      : 'bg-[var(--bg-s-color)] border-1 border-[var(--bg-t-color)] text-[var(--text-s-color)] cursor-not-allowed '
                  } `}
                  whileHover={isFormValid() ? { scale: 1.02 } : {}}
                  whileTap={isFormValid() ? { scale: 0.98 } : {}}
                  variants={fadeInLeftVariant}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{once:true, amount:0.2}}
                >
                  Send Message
                </motion.button>
                {formErrors.submit && (
                  <p className="text-[var(--p-color)] text-xs mt-1">{formErrors.submit}</p>
                )}
              </form>
            )}
          </motion.div>

          {/* Right Column */}
          <motion.div
            className="md:w-96"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{once:true, amount:0.2}}
          >
            

            <motion.h3
              className="text-[var(--text-p-color)] my-8 text-base md:text-lg"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{once:true, amount:0.2}}
            >
             Reach out on any platform—I’ll respond ASAP..
            </motion.h3>

            <SocialLinks className="flex-col" />
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
