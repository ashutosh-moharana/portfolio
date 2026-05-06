import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

const NotFound = () => {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center px-6 text-center relative overflow-hidden">
            
            {/* Scrapbook background decoration */}
            <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[50%] bg-primary opacity-10 pointer-events-none rounded-full blur-[100px] z-0" />
            
            {/* Layered Cards / Polaroid effect */}
            <div
                className="relative z-10 bg-card-bg p-8 md:p-16 border border-border/40 shadow-xl rounded-xl max-w-lg w-full flex flex-col items-center rotate-2"
            >
                {/* Tape */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-8 bg-[#D8C3B5]/90 backdrop-blur-sm -rotate-3 mix-blend-multiply shadow-sm z-20" />
                
                <h1
                    className="text-8xl md:text-[120px] font-display text-primary leading-none select-none mb-4"
                >
                    404
                </h1>
                <h2 className="text-4xl md:text-5xl font-chunky text-foreground uppercase tracking-wide mb-6">
                    Page <span className="text-primary">Lost</span>
                </h2>

                <p className="text-subtle text-lg font-sans max-w-sm mb-10 leading-relaxed">
                    Looks like this page was ripped out of the scrapbook. Let's get you back to the main collection.
                </p>

                <Link
                    to="/"
                    className="group relative flex items-center justify-center gap-3 px-8 py-4 bg-primary text-white font-chunky text-xl rounded-xl shadow-[4px_4px_0px_var(--color-foreground)] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[2px_2px_0px_var(--color-foreground)] transition-all"
                >
                    <FiArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform duration-300" />
                    Back to Home
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
