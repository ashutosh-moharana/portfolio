import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";


const NotFound = () => {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center px-6 text-center">
            {/* Glowing number */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="relative mb-4"
            >
                <h1
                    className="text-[20vw] md:text-[15vw] font-black uppercase tracking-tighter text-primary/10 leading-none select-none"
                    aria-hidden="true"
                >
                    404
                </h1>
                <motion.span
                    className="absolute inset-0 flex items-center justify-center text-[8vw] md:text-[5vw] font-black tracking-tighter text-heading"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    LOST?
                </motion.span>
            </motion.div>

            <motion.p
                className="text-subtle text-lg md:text-xl font-light max-w-sm mb-10 leading-relaxed"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.35 }}
            >
                This page doesn't exist. But my portfolio does — let's get you back there.
            </motion.p>

            <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
            >
                <Link
                    to="/"
                    className="interactive group/btn relative flex items-center justify-center gap-2 px-6 py-3.5 bg-background text-primary border border-primary/50 font-mono text-sm uppercase tracking-[0.2em] transition-colors duration-200 hover:bg-primary/20 hover:border-primary active:scale-95 overflow-hidden"
                >
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-primary/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 z-0" />
                    <FiArrowLeft size={16} className="relative z-10 group-hover/btn:-translate-x-1 transition-transform duration-300" />
                    <span className="relative z-10">RETURN TO BASE</span>
                </Link>
            </motion.div>
        </div>
    );
};

export default NotFound;
