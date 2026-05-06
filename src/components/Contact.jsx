import { useRef, useState, useCallback } from "react";
import emailjs from '@emailjs/browser';
import Footer from "./Footer";
import { SiGithub, SiLinkedin, SiLeetcode, SiHackerrank } from "react-icons/si";
import { FiMail, FiPhone } from "react-icons/fi";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

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

    tl.fromTo(".contact-heading", 
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
    );

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
    `w-full bg-background border-2 ${errorName ? 'border-primary' : 'border-border/60'} text-foreground text-lg py-3 px-4 focus:outline-none focus:border-foreground transition-colors placeholder:text-subtle/70 font-sans shadow-[4px_4px_0px_rgba(0,0,0,0.05)] rounded-md`;

  return (
    <div ref={containerRef} id="contact" className="relative flex flex-col justify-between overflow-hidden pt-20 md:pt-32 bg-background">

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 w-full flex flex-col flex-1 relative z-10">
        
        {/* Decorative Tape */}
        <div className="absolute -top-4 right-1/4 w-24 h-8 bg-secondary/80 backdrop-blur-sm rotate-6 shadow-sm z-20" />

        <div className="contact-heading text-center mb-16">
          <h2 className="font-chunky text-6xl sm:text-7xl lg:text-[5rem] mb-2 tracking-wide drop-shadow-sm text-center uppercase">
            <span className="text-foreground">LET'S T</span>
            <span className="text-primary">A</span>
            <span className="text-foreground">LK</span>
          </h2>
          <p className="font-display text-3xl text-subtle mt-2 -rotate-2">I'd love to hear from you!</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-start pb-20">

          {/* Contact Form Container (looks like a letter) */}
          <div className="contact-form w-full lg:w-1/2 bg-card-bg p-8 md:p-12 shadow-[8px_8px_0px_rgba(0,0,0,0.08)] border border-border/50 relative">
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
              <form ref={formRef} onSubmit={sendEmail} autoComplete="off" className="flex flex-col gap-6">
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
          <div className="w-full lg:w-1/2 flex flex-col pt-8 md:pt-16">
            <h3 className="contact-info font-chunky text-4xl text-foreground mb-6">Reach Out</h3>
            <p className="contact-info font-sans text-lg text-subtle mb-10 leading-relaxed max-w-md">
              Whether you have a question, want to collaborate, or just want to say hi, my inbox is always open.
            </p>

            <div className="flex flex-col gap-6 font-sans text-lg">
              <a href="mailto:ashutoshmoharana00@gmail.com" className="contact-info group flex items-center gap-5 text-foreground hover:text-primary transition-colors">
                <div className="w-14 h-14 rounded-full bg-card-bg shadow-md flex items-center justify-center group-hover:-rotate-12 transition-transform border border-border/50 text-2xl text-primary">
                  <FiMail />
                </div>
                <span className="font-medium underline decoration-border group-hover:decoration-primary underline-offset-4">ashutoshmoharana00@gmail.com</span>
              </a>
              
              <div className="contact-info group flex items-center gap-5 text-foreground">
                <div className="w-14 h-14 rounded-full bg-card-bg shadow-md flex items-center justify-center border border-border/50 text-2xl group-hover:rotate-12 transition-transform text-primary">
                  <FiPhone />
                </div>
                <span className="font-medium">(+91) 9937727738</span>
              </div>
            </div>
          </div>


        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
