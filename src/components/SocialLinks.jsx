import { useMemo } from "react";
import { motion } from "framer-motion";
import { HiOutlineMail } from "react-icons/hi";
import { SiGithub, SiLinkedin } from "react-icons/si";
import { BsTwitterX } from "react-icons/bs";

const SocialLinks = () => {
  const socialLinks = useMemo(
    () => [
      {
        name: "GitHub",
        icon: <SiGithub color="var(--p-color)" size={24} />,
        url: "https://github.com/ashutosh-moharana",
      },
      {
        name: "LinkedIn",
        icon: <SiLinkedin color="var(--p-color)" size={24} />,
        url: "https://linkedin.com/in/ashutosh-moharana",
      },
      {
        name: "Twitter",
        icon: <BsTwitterX color="var(--p-color)" size={24} />,
        url: "https://twitter.com",
      },
      {
        name: "Email",
        icon: <HiOutlineMail color="var(--p-color)" size={24} />,
        url: "mailto:ashutoshmoharana00@gmail.com",
      },
    ],
    []
  );

  return (
    <motion.div className="flex flex-col gap-4 ">
      {socialLinks.map((link, index) => (
        <motion.a
          key={index}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group mb-4 flex items-center gap-3 px-8 py-3  bg-[var(--bg-s-color)] border border-[var(--bg-t-color)] hover:border-[var(--p-color)] hover:scale-95 transition-all"
         
        >
          {link.icon}
          <span className="text-[var(--text-p-color)] ">
            {link.name}
          </span>
        </motion.a>
      ))}
    </motion.div>
  );
};

export default SocialLinks;
