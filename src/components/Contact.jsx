import { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import emailjs from '@emailjs/browser';
import Footer from "./Footer";
import { SiGithub, SiLinkedin } from "react-icons/si";
import { FiArrowUpRight } from "react-icons/fi";

const Contact = () => {
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const formRef = useRef();

  const validateForm = () => {
    const errors = {};
    if (!formData.user_name.trim()) errors.user_name = 'Name is required';
    if (!formData.user_email.trim()) {
      errors.user_email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.user_email)) {
      errors.user_email = 'Email is invalid';
    }
    if (!formData.message.trim()) errors.message = 'Message is required';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  }, [formErrors]);

  const isFormValid = () => {
    return formData.user_name.trim() !== '' &&
      formData.user_email.trim() !== '' &&
      formData.message.trim() !== '';
  };

  const sendEmail = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSending(true);

    const serviceID = import.meta.env.VITE_EMAIL_SERVICE_ID;
    const templateID = import.meta.env.VITE_EMAIL_TEMPLATE_ID;
    const userID = import.meta.env.VITE_EMAIL_PUBLIC_KEY;

    emailjs.sendForm(serviceID, templateID, formRef.current, userID).then(
      () => {
        setFormData({ user_name: '', user_email: '', message: '' });
        setIsSubmitted(true);
        setIsSending(false);
      },
      (err) => {
        setFormErrors({ submit: "Failed to send message. Please try again." });
        setIsSending(false);
      }
    );
  };

  const inputClasses = (errorName) =>
    `w-full bg-transparent border-b ${errorName ? 'border-primary' : 'border-border/50'} text-foreground text-xl md:text-2xl py-4 focus:outline-none focus:border-primary transition-colors caret-primary placeholder:text-subtle/50 font-light`;

  return (
    <div id="contact" className="relative flex flex-col justify-between overflow-hidden pt-10 md:pt-16 bg-background">

      <div className="px-6 md:px-12 lg:px-24 flex flex-col flex-1">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mb-8 md:mb-12 z-10 border-b border-primary/20 pb-4 relative overflow-hidden"
      >
        {/* Animated sliding line */}
        <motion.div
          className="absolute left-0 bottom-[-1px] h-[2px] bg-primary"
          initial={{ width: 0 }}
          whileInView={{ width: "33%" }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        />
        <span className="text-primary font-mono text-xs tracking-[0.3em] uppercase mb-4 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-primary block animate-pulse" />
            SECURE COMMLINK
        </span>
        <div className="relative w-fit">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-5xl md:text-8xl lg:text-9xl font-cinematic uppercase tracking-widest text-heading leading-none"
          >
            TRANSMISSION
          </motion.h2>
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: [0, 0.7, 0, 0.5, 0], x: [0, -10, 8, -4, 0], skewX: [0, 14, -10, 6, 0] }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: 0.15, ease: "linear" }}
            className="absolute inset-0 text-5xl md:text-8xl lg:text-9xl font-cinematic uppercase tracking-widest text-primary leading-none select-none pointer-events-none"
            aria-hidden="true"
          >
            TRANSMISSION
          </motion.h2>
        </div>
      </motion.div>

      {/* Main content section */}
      <div className="w-full flex-1 flex flex-col lg:flex-row gap-10 md:gap-16 lg:gap-32 z-10 pb-10 md:pb-20">

        {/* Left Column - Contact Form */}
        <motion.div
          className="lg:w-1/2"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }}
        >
          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="flex flex-col h-full bg-black/60 p-8 border border-primary justify-center relative"
            >
              <div className="absolute top-0 left-0 w-4 h-[2px] bg-primary" />
              <div className="absolute top-0 left-0 w-[2px] h-4 bg-primary" />
              <div className="absolute bottom-0 right-0 w-4 h-[2px] bg-primary" />
              <div className="absolute bottom-0 right-0 w-[2px] h-4 bg-primary" />
              <div className="w-16 h-16 mx-auto mb-8 text-primary border border-primary flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8">
                  <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="text-3xl font-cinematic tracking-widest text-center text-primary mb-4">PACKET RECEIVED</h3>
              <p className="text-center text-subtle font-mono text-xs uppercase tracking-widest mb-10">Data encrypted.<br /> Signal acknowledged.</p>

              <button
                onClick={() => setIsSubmitted(false)}
                className="interactive group relative mx-auto px-8 py-3 bg-black text-primary font-mono text-xs uppercase tracking-[0.2em] border border-primary/50 hover:border-primary hover:bg-primary/20 transition-all duration-200 active:scale-95 overflow-hidden"
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-primary/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 z-0" />
                <span className="relative z-10">INITIATE NEW PING</span>
              </button>
            </motion.div>
          ) : (
            <form ref={formRef} onSubmit={sendEmail} autoComplete="off" className="flex flex-col gap-10">

              <div className="relative group interactive">
                <input
                  type="text"
                  name="user_name"
                  autoComplete="name"
                  value={formData.user_name}
                  onChange={handleInputChange}
                  className={inputClasses(formErrors.user_name)}
                  placeholder="OPERATIVE NAME..."
                />
                {formErrors.user_name && <p className="text-primary text-xs mt-2 absolute">{formErrors.user_name}</p>}
                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-primary group-focus-within:w-full transition-all duration-500 ease-out"></div>
              </div>

              <div className="relative group interactive">
                <input
                  type="email"
                  name="user_email"
                  autoComplete="email"
                  value={formData.user_email}
                  onChange={handleInputChange}
                  className={inputClasses(formErrors.user_email)}
                  placeholder="SECURE EMAIL..."
                />
                {formErrors.user_email && <p className="text-primary text-xs mt-2 absolute">{formErrors.user_email}</p>}
                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-primary group-focus-within:w-full transition-all duration-500 ease-out"></div>
              </div>

              <div className="relative group interactive">
                <textarea
                  name="message"
                  autoComplete="off"
                  value={formData.message}
                  onChange={handleInputChange}
                  className={`${inputClasses(formErrors.message)} h-40 resize-none`}
                  placeholder="TRANSMISSION MESSAGE..."
                />
                {formErrors.message && <p className="text-primary text-xs mt-2 absolute">{formErrors.message}</p>}
                <div className="absolute bottom-2 left-0 h-[2px] w-0 bg-primary group-focus-within:w-full transition-all duration-500 ease-out"></div>
              </div>

              <button
                type="submit"
                disabled={!isFormValid() || isSending}
                className={`interactive group relative mt-4 w-full md:w-auto self-start px-12 py-4 font-mono text-xs tracking-[0.2em] uppercase transition-all duration-300 flex items-center justify-center gap-3 overflow-hidden ${isSending
                  ? 'bg-black text-primary border border-primary cursor-wait'
                  : isFormValid()
                    ? 'bg-black text-primary border border-primary/50 hover:scale-105 active:scale-95 hover:bg-primary/20 hover:border-primary'
                    : 'bg-black/50 text-subtle/50 cursor-not-allowed border border-border/30'
                  }`}
              >
                {isFormValid() && !isSending && (
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-primary/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                )}
                <span className="relative z-10 flex items-center justify-center gap-3">
                  {isSending ? (
                    <>
                      <svg className="animate-spin h-4 w-4 text-primary" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      Sending...
                    </>
                  ) : "Send Message"}
                </span>
              </button>
              {formErrors.submit && <p className="text-primary text-sm mt-2">{formErrors.submit}</p>}
            </form>
          )}
        </motion.div>

        {/* Right Column - Socials & Outreach */}
        <motion.div
          className="lg:w-1/2 flex flex-col justify-end lg:pl-10"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="flex flex-col gap-8 md:gap-12 mt-12 lg:mt-0">
            <div className="flex flex-col">
              <h3 className="text-3xl md:text-6xl lg:text-7xl font-cinematic uppercase tracking-widest text-foreground leading-none mb-4">
                ESTABLISH <span className="text-primary">LINK</span>
              </h3>
              {/* Scanner underline — faint track + looping primary scanner bar */}
              <div className="relative h-[2px] mb-6 bg-primary/20 overflow-hidden">
                <motion.div
                  className="absolute top-0 h-full w-[30%] bg-primary"
                  animate={{ left: ["0%", "70%", "0%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
              <p className="text-subtle text-xs md:text-sm font-mono tracking-wide border-l-2 border-primary/30 pl-4 py-1">
                Awaiting connection protocols. Ping directly on any network array below.
              </p>
              <a
                href="mailto:ashutoshmoharana00@gmail.com"
                className="interactive group inline-flex items-center gap-2 mt-8 text-subtle hover:text-primary transition-colors font-mono text-xs md:text-sm tracking-[0.2em]"
              >
                <span className="border-b border-border/50 group-hover:border-primary pb-0.5 transition-colors">
                  ashutoshmoharana00@gmail.com
                </span>
              </a>
              <a
                href="tel:9937727738"
                className="interactive group inline-flex items-center gap-2 mt-4 text-subtle hover:text-primary transition-colors font-mono text-sm md:text-base tracking-wide"
              >
                <span className="border-b border-border/50 group-hover:border-primary pb-0.5 transition-colors">
                  (+91) 9937727738
                </span>
              </a>
            </div>

            <div className="flex flex-row flex-wrap gap-4 relative">
              <a
                href="https://github.com/ashutosh-moharana"
                target="_blank"
                className="interactive group relative flex-1 md:flex-none justify-center flex items-center px-4 md:px-6 py-3 min-w-[140px] md:min-w-0 bg-black text-primary border border-primary/50 font-mono text-xs uppercase tracking-[0.2em] transition-colors duration-200 hover:bg-primary/20 hover:border-primary active:scale-95 overflow-hidden"
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-primary/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 z-0" />
                <span className="relative z-10 flex items-center gap-3 tracking-wide">
                  <SiGithub size={16} className="transition-colors duration-300" />
                  <span>GitHub</span>
                  <FiArrowUpRight className="ml-1 opacity-0 -translate-x-3 translate-y-3 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300 ease-out hidden md:block" size={16} />
                </span>
              </a>
               <a
                href="https://linkedin.com/in/ashutosh-moharana"
                target="_blank"
                className="interactive group relative flex-1 md:flex-none justify-center flex items-center px-4 md:px-6 py-3 min-w-[140px] md:min-w-0 bg-black text-primary border border-primary/50 font-mono text-xs uppercase tracking-[0.2em] transition-colors duration-200 hover:bg-primary/20 hover:border-primary active:scale-95 overflow-hidden"
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-primary/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 z-0" />
                <span className="relative z-10 flex items-center gap-3 tracking-wide">
                  <SiLinkedin size={16} className="transition-colors duration-300" />
                  <span>LinkedIn</span>
                  <FiArrowUpRight className="ml-1 opacity-0 -translate-x-3 translate-y-3 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300 ease-out hidden md:block" size={16} />
                </span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
      </div>

      <Footer />

    </div>
  );
};

export default Contact;
