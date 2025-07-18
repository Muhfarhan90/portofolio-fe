import React from "react";
import { FaBook, FaGithub, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa";

const Hero = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-400 to-white flex items-center justify-center relative px-4">
      {/* Sidebar Sosial */}
      <div className="hidden sm:flex flex-col gap-4 fixed top-1/3 left-0 z-10 bg-white rounded-r-lg p-4">
        <a href="#" className="text-black hover:text-blue-600">
          <FaLinkedin size={24} />
        </a>
        <a href="#" className="text-black hover:text-sky-400">
          <FaTwitter size={24} />
        </a>
        <a href="#" className="text-black hover:text-red-600">
          <FaYoutube size={24} />
        </a>
        <a href="#" className="text-black hover:text-gray-800">
          <FaGithub size={24} />
        </a>
        <a href="#" className="text-black hover:text-purple-600">
          <FaBook size={24} />
        </a>
      </div>

      {/* Konten Utama */}
      <div className="max-w-2xl text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-6">
          <span className="text-black">
            HEY, I'M MUHAMMAD FARHAN HIDAYATULLOH
          </span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 mb-8">
          A Result-Oriented Web Developer building and managing Websites and Web
          Applications that leads to the success of the overall product
        </p>
        <button className="btn btn-lg btn-primary text-white font-semibold px-6 py-3 rounded-lg shadow-md transition">
          PROJECTS
        </button>
      </div>
    </div>
  );
};

export default Hero;
