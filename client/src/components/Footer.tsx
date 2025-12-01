import React from "react";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";
import logo from "../../public/icon.svg";

interface TeamMember {
  name: string;
  linkedin?: string;
  github?: string;
  twitter?: string;
}

const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  const { theme } = useTheme();

  const teamMembers: TeamMember[] = [
    {
      name: "Sumanth Shetty",
      linkedin: "https://www.linkedin.com/in/sumanth-shetty-dev/",
      github: "https://github.com/HelloSumanthShetty",
      twitter: "https://x.com/sumShetty_dev"
    },
    {
      name: "Karthik Tammanna Gouda",
      linkedin: "https://linkedin.com/in/karthik-tammanna-gouda",
      github: "https://github.com/karthik-tammanna-gouda",
      twitter: "https://twitter.com/karthik_tammanna"
    },
    {
      name: "Kushal G Naik",
      linkedin: "https://linkedin.com/in/kushal-g-naik",
      github: "https://github.com/kushal-g-naik",
      twitter: "https://twitter.com/kushal_g_naik"
    },
    {
      name: "RaviGovinda Bhat",
      linkedin: "https://linkedin.com/in/ravigovinda-bhat",
      github: "https://github.com/ravigovinda-bhat",
      twitter: "https://twitter.com/ravigovinda_bhat"
    }
  ];

  return (
    <footer id="about" className={`w-full py-8 ${
      theme === 'dark' 
        ? 'bg-[#0f0f0f] text-gray-300' 
        : 'bg-gray-50 text-gray-700'
    }`}>
      <div className="max-w-7xl mx-auto px-4">
        {/* Logo and Name */}
        <div className="flex items-center justify-center space-x-2 mb-6">
          <img src={logo} alt="Etheryo logo" className="w-8 h-8" />
          <h1 className={`text-lg font-semibold ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>Etheryo</h1>
        </div>

        {/* Quick Links */}
        <div className="flex flex-wrap justify-center space-x-6 text-sm mb-8">
          <a 
            href="#home" 
            className={`transition-colors cursor-pointer ${
              theme === 'dark' 
                ? 'hover:text-white text-gray-300' 
                : 'hover:text-gray-900 text-gray-600'
            }`}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Home
          </a>
          <a 
            href="#services" 
            className={`transition-colors cursor-pointer ${
              theme === 'dark' 
                ? 'hover:text-white text-gray-300' 
                : 'hover:text-gray-900 text-gray-600'
            }`}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Services
          </a>
          <a 
            href="#transactions" 
            className={`transition-colors cursor-pointer ${
              theme === 'dark' 
                ? 'hover:text-white text-gray-300' 
                : 'hover:text-gray-900 text-gray-600'
            }`}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('transactions')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Transactions
          </a>
          <a 
            href="#about" 
            className={`transition-colors cursor-pointer ${
              theme === 'dark' 
                ? 'hover:text-white text-gray-300' 
                : 'hover:text-gray-900 text-gray-600'
            }`}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            About
          </a>
        </div>

        <div className={`w-4/5 mx-auto h-[1px] mb-8 ${
          theme === 'dark' ? 'bg-gray-600' : 'bg-gray-300'
        }`}></div>

        <div className="mb-8">
          <h3 className={`text-center font-semibold mb-4 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Built by <span className="text-blue-400 dark:text-blue-400 text-blue-600">Sumanth Shetty's Team</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <div 
                key={index} 
                className={`rounded-lg p-4 border transition-all ${
                  theme === 'dark' 
                    ? 'bg-gray-800/30 border-gray-700/50 hover:border-blue-500/50' 
                    : 'bg-white border-gray-200 hover:border-blue-400 shadow-sm'
                }`}
              >
                <h4 className={`font-medium mb-3 text-center text-sm ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  {member.name}
                </h4>
                <div className="flex justify-center gap-3">
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-blue-600/20 hover:bg-blue-600/30 border border-blue-600/30 hover:border-blue-500 flex items-center justify-center transition-all duration-300 hover:scale-110"
                      aria-label={`${member.name} LinkedIn`}
                      title="LinkedIn"
                    >
                      <FaLinkedin className="text-blue-400 text-sm" />
                    </a>
                  )}
                  {member.github && (
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-gray-700/50 hover:bg-gray-600/50 border border-gray-600/50 hover:border-gray-500 flex items-center justify-center transition-all duration-300 hover:scale-110"
                      aria-label={`${member.name} GitHub`}
                      title="GitHub"
                    >
                      <FaGithub className="text-gray-300 text-sm" />
                    </a>
                  )}
                  {member.twitter && (
                    <a
                      href={member.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-blue-400/20 hover:bg-blue-400/30 border border-blue-400/30 hover:border-blue-400 flex items-center justify-center transition-all duration-300 hover:scale-110"
                      aria-label={`${member.name} Twitter`}
                      title="Twitter"
                    >
                      <FaTwitter className="text-blue-400 text-sm" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      
        <div className={`w-4/5 mx-auto h-[1px] mb-4 ${
          theme === 'dark' ? 'bg-gray-600' : 'bg-gray-300'
        }`}></div>

        
        <p className={`text-xs text-center ${
          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
        }`}>
          © {year} Etheryo. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
