import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { LuNotebook } from "react-icons/lu";

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
                    className="interactive group/btn relative flex items-center gap-2 px-7 py-3.5 bg-primary/10 text-primary border border-primary/30 font-bold rounded-full overflow-hidden text-sm tracking-wider transition-all duration-300 hover:border-primary/80 active:scale-95"
                >
                    <FiArrowLeft size={16} className="group-hover/btn:-translate-x-1 transition-transform duration-300" />
                    <span className="relative z-10">Back to Portfolio</span>
                    <div className="absolute inset-0 bg-primary/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-out z-0" />
                </Link>
            </motion.div>
        </div>
    );
};

export default NotFound;
