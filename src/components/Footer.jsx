import { FiHeart } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="w-full relative mt-auto py-10 bg-background border-t border-border/40 overflow-hidden">
      <div className="text-center flex flex-col items-center gap-3 px-4">
        <p className="font-display text-3xl text-primary/80 -rotate-2 mb-2">
          Thank you for visiting!
        </p>
        <p className="text-sm font-sans font-medium text-subtle text-center flex items-center justify-center gap-1.5">
          &copy; {new Date().getFullYear()} Ashutosh Moharana. Crafted with <FiHeart className="text-primary fill-primary/20" />
        </p>
      </div>
    </footer>
  );
};

export default Footer;
