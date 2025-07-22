// import React, { useEffect, useState } from "react";
// import { getProjects } from "../services/api/projects";

const Projects = () => {
  // const [projects, setProjects] = useState([]);

  // useEffect(() => {
  //   getProjects().then((data) => setProjects(data));
  // }, []);

  // console.log(projects);
  return (
    <section className="bg-white py-20 px-6 text-center">
      {/* Judul */}
      <h2 className="text-4xl font-extrabold mb-4 tracking-wide">PROJECTS</h2>
      <div className="w-14 h-1 bg-purple-600 mx-auto mb-6 rounded-full"></div>
      <p className="text-gray-600 max-w-3xl mx-auto text-lg mb-16">
        Here you will find some of the personal and clients projects that I
        created with each project containing its own case study
      </p>

      {/* Kontainer Project */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
        {/* Gambar */}
        <div className="flex-1">
          <img
            src="/images/dopefolio.png" // ganti dengan path lokal gambar kamu
            alt="Dopefolio Screenshot"
            className="w-full rounded-lg shadow-md"
          />
        </div>

        {/* Deskripsi */}
        <div className="flex-1 text-left">
          <h3 className="text-2xl font-bold mb-3">Dopefolio</h3>
          <p className="text-gray-700 mb-6">
            Dopefolio is a successful Open-Source project that I created which
            have been featured on some of the biggest tech sites like
            CSS-Tricks, Hostinger, etc & used by thousands of developers
            globally
          </p>
          <a
            href="#"
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-md transition-all inline-block"
          >
            CASE STUDY
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
