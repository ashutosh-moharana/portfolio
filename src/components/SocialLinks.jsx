import { useMemo } from "react";
import { HiOutlineMail } from "react-icons/hi";
import { SiGithub, SiLinkedin } from "react-icons/si";
import { BsTwitterX } from "react-icons/bs";

const SocialLinks = () => {
  const socialLinks = useMemo(
    () => [
      {
        name: "GitHub",
        icon: <SiGithub color="var(--color-primary)" size={24} />,
        url: "https://github.com/ashutosh-moharana",
      },
      {
        name: "LinkedIn",
        icon: <SiLinkedin color="var(--color-primary)" size={24} />,
        url: "https://linkedin.com/in/ashutosh-moharana",
      },
      {
        name: "Twitter",
        icon: <BsTwitterX color="var(--color-primary)" size={24} />,
        url: "https://twitter.com",
      },
      {
        name: "Email",
        icon: <HiOutlineMail color="var(--color-primary)" size={24} />,
        url: "mailto:ashutoshmoharana00@gmail.com",
      },
    ],
    []
  );

  return (
    <div className="flex flex-col gap-4 ">
      {socialLinks.map((link, index) => (
        <a
      
          key={index}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group mb-4 text-subtle flex items-center gap-3 px-8 py-3  bg-transparent border  hover:border-primary hover:scale-95  transition-all"
         
        >
          {link.icon}
          
          {link.name}
          
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
