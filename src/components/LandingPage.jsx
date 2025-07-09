import { motion, useScroll } from "framer-motion";
import { useDevice } from "../contexts/DeviceContext";
import Navbar from "./Navbar";
import { fadeInLeftVariant } from "../utils/animationVariants";


const LandingPage = () => {
  const { scrollYProgress } = useScroll();

  const isMobile = useDevice();

  return (
    <div className="h-screen scroll-smooth  flex relative items-center justify-center  overflow-hidden ">
      {/* Progress bar that shows scroll position */}
      <motion.div
        className="fixed top-0 inset-x-0 h-1 bg-primary  origin-left z-2"
        style={{
          scaleX: scrollYProgress,
        }}
      />

      

      {/* Header section with logo and name */}
      <div className="absolute w-screen top-0 left-0 flex items-center justify-between p-4">
        {/* Logo section - only visible on desktop */}
        <div className="hidden md:flex items-center gap-2">
          <motion.img
            className="h-20"
            src="/logo.webp"
            alt="Logo"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          />
          <motion.p
            className="text-heading font-bold"
            variants={fadeInLeftVariant}
            initial="hidden"
            animate="visible"
          >
            A L P H A C O D R
          </motion.p>
        </div>

        {/* Name section with animations */}
        <div className="mr-4">
          <motion.p
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ amount: 0.2, once: true }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 10,
              duration: 0.2,
            }}
            className="font-light text-3xl mt-2  md:text-2xl md:text-right"
          >
            A S H U T O S H
          </motion.p>
          <motion.p
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ amount: 0.2, once: true }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 10,
              duration: 0.2,
            }}
            className="text-heading text-right mt-2 text-4xl md:text-3xl "
          >
            M O H A R A N A
          </motion.p>
        </div>
      </div>

      {/* Central content with circular animation and profile image */}
      <div className="flex h-screen w-screen justify-center items-center">
        {/* Animated circle background */}
        <motion.svg
          className={`${
            isMobile ? "relative left-2" : "h-9/10"
          }  drop-shadow-[0px_0px_10px_var(--color-primary)] rounded-full relative`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 1,
            type: "spring",
            stiffness: 100,
            damping: 10,
          }}
        >
          <circle
            className="fill-none stroke-primary stroke-4"
            cx="50"
            cy="50"
            r="40"
            strokeLinecap="round"
          />
        </motion.svg>

        {/* Profile image with animation */}
        <motion.div
          className={`absolute bottom-0 flex items-center justify-center ${
            isMobile ? "h-1/2 bottom-24" : "h-3/4 mr-8 "
          }`}
          initial={{ y: 150 }}
          animate={{ y: 0 }}
          transition={{ duration: 1 }}
          
        >
          <motion.img
            className="h-full drop-shadow-[0px_0px_20px_rgb(255,255,255,0.2)]"
            src="/Ashu_3.webp"
            alt="Profile"
            loading="lazy"
          />
        </motion.div>
      </div>

      {/* Bottom section with role and location */}
      <motion.div
        className={`absolute left-0 bottom-0 ${
          // Conditional styling for mobile/desktop layout
          isMobile
            ? "box-border h-36 w-full mb-4 px-8 py-4 border-t-1 border-primary rounded-4xl bg-background"
            : "m-4"
        }`}
      >
        <motion.h2
          className="font-semibold text-3xl md:text-4xl tracking-wide "
          variants={fadeInLeftVariant}
          initial="hidden"
          animate="visible"
        >
          FullStack Developer
        </motion.h2>
        <motion.div
          className="flex items-center gap-2 text-xl md:text-2xl md:mt-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <span>From</span>
          <motion.span className="text-primary font-bold">
            IN
          </motion.span>
        </motion.div>
        
      </motion.div>
      

    
      <Navbar />
    </div>
  );
};

export default LandingPage;
