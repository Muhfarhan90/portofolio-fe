import React from "react";
import HeadingSection from "./HeadingSection";

const About = () => {
  return (
    <div className="min-h-screen bg-white py-16 px-4 text-center">
      {/* Judul Utama */}
      <h2 className="text-4xl font-extrabold mb-4 tracking-wide text-primary">ABOUT ME</h2>
      <div className="w-14 h-1 bg-purple-600 mx-auto mb-6 rounded-full"></div>
      <p className="text-gray-600 max-w-2xl mx-auto text-lg mb-12">
        Here you will find more information about me, what I do, and my current
        skills mostly in terms of programming and technology
      </p>

      {/* Konten 2 Kolom */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-16 text-left">
        {/* Kiri: Deskripsi */}
        <div className="flex-1">
          <h3 className="text-2xl font-bold mb-4 text-primary">Get to know me!</h3>
          <p className="text-gray-700 mb-4">
            I'm a{" "}
            <span className="font-semibold">
              Frontend Focused Web Developer
            </span>{" "}
            building and managing the Front-end of Websites and Web Applications
            that leads to the success of the overall product. Check out some of
            my work in the <span className="font-semibold">Projects</span>{" "}
            section.
          </p>
          <p className="text-gray-700 mb-4">
            I also like sharing content related to the stuff that I have learned
            over the years in{" "}
            <span className="font-semibold">Web Development</span> so it can
            help other people of the Dev Community. Feel free to Connect or
            Follow me on my{" "}
            <span className="text-blue-600 font-semibold cursor-pointer">
              LinkedIn
            </span>
            .
                  </p>
                  <button className="btn btn-lg btn-primary">Contact</button>
        </div>

        {/* Kanan: Skills */}
        <div className="flex-1">
          <h3 className="text-2xl font-bold mb-4 text-primary">My Skills</h3>
          <div className="flex flex-wrap gap-3">
            {[
              "HTML",
              "CSS",
              "JavaScript",
              "React",
              "Wordpress",
              "PHP",
              "SASS",
              "GIT",
              "Github",
              "Responsive Design",
              "SEO",
              "Terminal",
            ].map((skill, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md font-medium text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
