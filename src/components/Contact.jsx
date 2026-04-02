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
    <div id="contact" className="relative flex flex-col justify-between overflow-hidden pt-10 md:pt-16 px-6 md:px-12 lg:px-24 bg-background">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mb-8 md:mb-12 z-10"
      >
        <span className="text-primary font-mono text-sm tracking-widest uppercase mb-4 block">Get In Touch</span>
        <h2 className="text-5xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter text-heading leading-none">
          Contact
        </h2>
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
              className="flex flex-col h-full bg-muted/20 p-8 rounded-2xl border border-border/30 justify-center"
            >
              <div className="w-16 h-16 mx-auto mb-8 text-primary rounded-full bg-primary/10 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8">
                  <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="text-3xl font-semibold text-center text-foreground mb-4 tracking-tight">Message Received</h3>
              <p className="text-center text-subtle text-lg mb-10 font-light">I'll get back to you as soon as possible.</p>

              <button
                onClick={() => setIsSubmitted(false)}
                className="interactive mx-auto px-8 py-3 bg-primary/10 text-primary border border-primary/30 font-semibold rounded-full hover:bg-primary/20 hover:border-primary/60 transition-colors duration-200 active:scale-95"
              >
                Send Another
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
                  placeholder="What's your name?"
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
                  placeholder="What's your email?"
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
                  placeholder="Tell me about your project..."
                />
                {formErrors.message && <p className="text-primary text-xs mt-2 absolute">{formErrors.message}</p>}
                <div className="absolute bottom-2 left-0 h-[2px] w-0 bg-primary group-focus-within:w-full transition-all duration-500 ease-out"></div>
              </div>

              <button
                type="submit"
                disabled={!isFormValid() || isSending}
                className={`interactive mt-4 w-full md:w-auto self-start px-12 py-4 font-semibold rounded-full transition-all duration-300 flex items-center justify-center gap-3 ${isSending
                  ? 'bg-primary/20 text-primary border border-primary/30 cursor-wait'
                  : isFormValid()
                    ? 'bg-foreground text-background hover:scale-105 active:scale-95 hover:bg-primary hover:text-primary-foreground'
                    : 'bg-muted/50 text-subtle cursor-not-allowed border border-border/50'
                  }`}
              >
                {isSending ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-primary" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    Sending...
                  </>
                ) : "Send Message"}
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
              <h3 className="text-3xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter text-foreground leading-none mb-6">
                Let's <span className="text-primary">Collaborate</span>
              </h3>
              <p className="text-subtle text-base md:text-xl font-light tracking-wide">
                Got a project in mind? Reach out on any platform and let's craft something extraordinary together.
              </p>
              <a
                href="mailto:ashutoshmoharana00@gmail.com"
                className="interactive group inline-flex items-center gap-2 mt-4 text-subtle hover:text-primary transition-colors font-mono text-sm md:text-base tracking-wide"
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
                className="interactive group relative flex-1 md:flex-none justify-center flex items-center px-4 md:px-6 py-3 min-w-[140px] md:min-w-0 bg-primary/5 text-primary border border-primary/30 font-semibold rounded-full overflow-hidden transition-all duration-500 hover:border-primary/80 active:scale-95 backdrop-blur-md"
              >
                <span className="relative z-10 flex items-center gap-3 tracking-wide">
                  <SiGithub size={20} className="transition-colors duration-300" />
                  <span className="text-sm md:text-base font-bold tracking-widest text-foreground uppercase">GitHub</span>
                  <FiArrowUpRight className="ml-1 text-primary opacity-0 -translate-x-3 translate-y-3 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300 ease-out hidden md:block" size={18} />
                </span>
                <div className="absolute inset-0 bg-primary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] z-0"></div>
              </a>
               <a
                href="https://linkedin.com/in/ashutosh-moharana"
                target="_blank"
                className="interactive group relative flex-1 md:flex-none justify-center flex items-center px-4 md:px-6 py-3 min-w-[140px] md:min-w-0 bg-primary/5 text-primary border border-primary/30 font-semibold rounded-full overflow-hidden transition-all duration-500 hover:border-primary/80 active:scale-95 backdrop-blur-md"
              >
                <span className="relative z-10 flex items-center gap-3 tracking-wide">
                  <SiLinkedin size={20} className="transition-colors duration-300" />
                  <span className="text-sm md:text-base font-bold tracking-widest text-foreground uppercase">LinkedIn</span>
                  <FiArrowUpRight className="ml-1 text-primary opacity-0 -translate-x-3 translate-y-3 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300 ease-out hidden md:block" size={18} />
                </span>
                <div className="absolute inset-0 bg-primary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] z-0"></div>
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />

    </div>
  );
};

export default Contact;
