import { motion } from "framer-motion";


const Footer = () => {
  return (
    <motion.footer
      className="w-full mt-4 py-6 border-t bg-background bg-opacity-50"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      viewport={{once:true,amount:0.4}}
    >
      <div className="text-center  md:mr-2">
        <p className=" text-xs md:text-sm text-subtle">
        &copy; {new Date().getFullYear()} Ashutosh Moharana 
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer;
