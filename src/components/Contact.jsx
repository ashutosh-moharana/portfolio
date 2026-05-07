import { useRef, useState, useCallback } from "react";
import emailjs from '@emailjs/browser';
import Footer from "./Footer";
import { SiGithub, SiLinkedin, SiLeetcode, SiHackerrank } from "react-icons/si";
import { FiMail, FiPhone } from "react-icons/fi";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { MagneticElement, TextReveal } from "../utils/animations";

gsap.registerPlugin(ScrollTrigger);

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
  const containerRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
      }
    });

    // Heading handled by TextReveal

    tl.fromTo(".contact-form",
      { y: 50, opacity: 0, rotation: -5 },
      { y: 0, opacity: 1, rotation: 1, duration: 0.8, ease: "back.out(1.2)" },
      "-=0.4"
    );

    tl.fromTo(".contact-info",
      { x: 30, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: "power2.out" },
      "-=0.6"
    );
  }, { scope: containerRef });

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
    `w-full bg-background/80 dark:bg-background/60 border-2 ${errorName ? 'border-primary' : 'border-border'} text-foreground text-lg py-4 md:py-3.5 px-6 md:px-5 focus:outline-none focus:border-foreground focus:ring-1 focus:ring-foreground/20 transition-all duration-200 placeholder:text-subtle/50 dark:placeholder:text-subtle/60 font-sans shadow-[3px_3px_0px_var(--color-border)] hover:border-subtle/30 hover:shadow-[4px_4px_0px_var(--color-border)] rounded-md`;

  return (
    <div ref={containerRef} id="contact" className="relative flex flex-col justify-between overflow-hidden pt-28 md:pt-40 bg-background">

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 w-full flex flex-col flex-1 relative z-10">



        <div className="text-center mb-16 md:mb-24 flex flex-col items-center">
          <TextReveal delay={0.1}>
            <h2 className="font-chunky text-6xl sm:text-7xl lg:text-[5rem] mb-4 tracking-wide drop-shadow-sm text-center uppercase">
              <span className="text-foreground">LET'S T</span>
              <span className="text-primary">A</span>
              <span className="text-foreground">LK</span>
            </h2>
          </TextReveal>
          <p className="contact-info font-display text-xl text-subtle mt-1 -rotate-2 opacity-80">Open to work, collaborations & good conversations.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-start pb-24">

          {/* Contact Form Container */}
          <div className="contact-form w-full lg:w-1/2 bg-[#f4f4f5]/95 dark:bg-[#e4e4e7]/10 backdrop-blur-xl p-7 sm:p-10 md:p-14 shadow-[0_25px_80px_rgba(0,0,0,0.15),0_10px_30px_rgba(0,0,0,0.08)] border border-border/40 dark:border-white/10 relative rounded-2xl">
            {/* Decorative Tape — pinned to the card */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-8 bg-primary/30 border border-primary/40 backdrop-blur-xl rotate-2 shadow-sm z-20" />
            <div className="absolute -top-3 right-10 w-16 h-6 bg-secondary/60 border border-secondary backdrop-blur-xl -rotate-3 shadow-sm z-20" />
            {isSubmitted ? (
              <div className="flex flex-col h-full justify-center items-center py-20 text-center">
                <div className="text-primary font-display text-5xl mb-6">Yay!</div>
                <h3 className="text-3xl font-chunky text-foreground mb-4">Message Sent</h3>
                <p className="text-subtle font-sans text-lg mb-8">Thanks for reaching out. I'll get back to you soon.</p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-8 py-3 bg-foreground text-background font-chunky text-lg rounded-xl shadow-[4px_4px_0px_var(--color-primary)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_var(--color-primary)] transition-all"
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form ref={formRef} onSubmit={sendEmail} autoComplete="off" className="flex flex-col gap-7 md:gap-8">
                <div>
                  <input
                    type="text"
                    name="user_name"
                    value={formData.user_name}
                    onChange={handleInputChange}
                    className={inputClasses(formErrors.user_name)}
                    placeholder="Your Name"
                  />
                  {formErrors.user_name && <p className="text-primary text-sm mt-1 font-medium">{formErrors.user_name}</p>}
                </div>

                <div>
                  <input
                    type="email"
                    name="user_email"
                    value={formData.user_email}
                    onChange={handleInputChange}
                    className={inputClasses(formErrors.user_email)}
                    placeholder="Your Email"
                  />
                  {formErrors.user_email && <p className="text-primary text-sm mt-1 font-medium">{formErrors.user_email}</p>}
                </div>

                <div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className={`${inputClasses(formErrors.message)} h-40 resize-none`}
                    placeholder="Write your message here..."
                  />
                  {formErrors.message && <p className="text-primary text-sm mt-1 font-medium">{formErrors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={!isFormValid() || isSending}
                  className={`mt-4 w-full md:w-auto self-start px-10 py-3 font-chunky text-xl rounded-xl transition-all flex items-center justify-center gap-2 ${isSending
                    ? 'bg-muted text-subtle cursor-wait'
                    : isFormValid()
                      ? 'bg-primary text-white shadow-[4px_4px_0px_var(--color-foreground)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_var(--color-foreground)]'
                      : 'bg-muted text-subtle cursor-not-allowed shadow-none border border-border'
                    }`}
                >
                  {isSending ? "Sending..." : "Send Message"}
                </button>
                {formErrors.submit && <p className="text-primary text-sm mt-2 font-medium">{formErrors.submit}</p>}
              </form>
            )}
          </div>

          {/* Socials & Info */}
          <div className="w-full lg:w-1/2 flex flex-col pt-12 md:pt-16 gap-3">
            <h3 className="contact-info font-chunky text-3xl text-foreground mb-2">Reach Out</h3>
            <p className="contact-info font-sans text-base text-subtle/80 mb-10 leading-relaxed max-w-md">
              Whether you have a question, want to collaborate, or just want to say hi - my inbox is always open.
            </p>

            <div className="flex flex-col gap-6 font-sans text-lg items-start">
              <MagneticElement strength={20}>
                <a href="mailto:ashutoshmoharana00@gmail.com" className="contact-info group flex items-center gap-5 text-foreground hover:text-primary transition-colors">
                  <FiMail className="text-3xl text-primary group-hover:-rotate-12 transition-transform" />
                  <span className="font-medium underline decoration-border group-hover:decoration-primary underline-offset-4">ashutoshmoharana00@gmail.com</span>
                </a>
              </MagneticElement>

              <MagneticElement strength={20}>
                <a href="tel:+919937727738" className="contact-info group flex items-center gap-5 text-foreground hover:text-primary transition-colors">
                  <FiPhone className="text-3xl text-primary group-hover:rotate-12 transition-transform" />
                  <span className="font-medium underline decoration-border group-hover:decoration-primary underline-offset-4">(+91) 9937727738</span>
                </a>
              </MagneticElement>
            </div>
          </div>


        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
