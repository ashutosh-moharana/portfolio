import { motion } from "framer-motion";


const Footer = () => {
  return (
    <motion.footer
      className="w-full relative mt-4 py-8 border-t border-primary/20 bg-background overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      viewport={{once:true,amount:0.4}}
    >
      {/* Static centred accent line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/4 h-[1px] bg-primary" />
      <div className="text-center flex flex-col items-center gap-2 px-4">
        <p className="text-[10px] md:text-xs font-mono uppercase tracking-[0.3em] text-primary/70">
          END OF TRANSMISSION
        </p>
        <p className="text-[10px] md:text-xs font-mono tracking-widest text-subtle text-center leading-relaxed">
          &copy; {new Date().getFullYear()} ASHUTOSH MOHARANA
          <span className="hidden sm:inline"> | CLEARANCE LEVEL: OMEGA</span>
        </p>
        <p className="text-[9px] sm:hidden font-mono tracking-widest text-subtle/50 uppercase">
          CLEARANCE: OMEGA
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer;
