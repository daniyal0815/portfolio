import react from "../assets/react.svg";
import node from "../assets/node.svg";
import mongodb from "../assets/mongodb.svg";
import express from "../assets/express.svg";
import javascript from "../assets/javascript.svg";
import mysql from "../assets/mysql.svg";

const About = () => {
  return (
    <div
      className="min-h-screen px-4 pt-32 
                 bg-white dark:bg-zinc-950 
                 text-black dark:text-zinc-100"
    >
      <div className="max-w-4xl mx-auto text-center">

        {/* Section Label */}
        <p className="text-gray-500 dark:text-zinc-400 mb-4 text-3xl">
          About Me
        </p>

        {/* Content */}
        <div className="space-y-6 text-lg text-gray-600 dark:text-zinc-400 leading-relaxed max-w-3xl mx-auto">
          <p>
            My name is Daniyal Raza, and I am a Frontend Engineer with 3+ years of real-world experience designing fast,
            usable, and SEO-friendly web applications. My specialty is crafting smooth-looking UIs with React.js, Next.js,
            Tailwind CSS, and shadcn/ui and bringing things to life with Framer Motion.
          </p>

          <p>
            Alongside my frontend experience, I possess good full-stack skills in JavaScript and TypeScript,
            and familiar experience in Node.js, Express, and databases like MongoDB and MySQL.
            This allows me to manage projects from start-to-finish, from designing smooth UIs through connecting scalable backends.
          </p>

          <p>
            I have built software for product companies, clinics, and start-ups, delivering maximum performance,
            engagement, and lead capture through precise engineering. Writing elegant, up-to-date code and discovering new tools and trends thrills me.
          </p>

          <p>
            Outside of work, I enjoy cricket and a good cup of tea, but now I am used to drinking coffee.
            I'm always up for learning, experimenting,
            and growing and looking for opportunities where I can bring value toward impactful products and inventive teams.
          </p>
        </div>

        {/* Skills Scroll Section */}
        <div className="relative mt-20 overflow-hidden">
          <div className="flex gap-16 animate-scroll whitespace-nowrap">

            <img src={react} className="h-12 opacity-70 dark:opacity-60" alt="React" />
            <img src={node} className="h-12 opacity-70 dark:opacity-60" alt="Node" />
            <img src={mongodb} className="h-12 opacity-70 dark:opacity-60" alt="MongoDB" />
            <img src={express} className="h-12 opacity-70 dark:opacity-60" alt="Express" />
            <img src={javascript} className="h-12 opacity-70 dark:opacity-60" alt="JavaScript" />
            <img src={mysql} className="h-12 opacity-70 dark:opacity-60" alt="MySQL" />

            {/* Duplicate for infinite scroll */}
            <img src={react} className="h-12 opacity-70 dark:opacity-60" alt="React" />
            <img src={node} className="h-12 opacity-70 dark:opacity-60" alt="Node" />
            <img src={mongodb} className="h-12 opacity-70 dark:opacity-60" alt="MongoDB" />
            <img src={express} className="h-12 opacity-70 dark:opacity-60" alt="Express" />
            <img src={javascript} className="h-12 opacity-70 dark:opacity-60" alt="JavaScript" />
            <img src={mysql} className="h-12 opacity-70 dark:opacity-60" alt="MySQL" />
          </div>

          {/* Left Gradient Fade */}
          <div className="absolute left-0 top-0 h-full w-20 
                          bg-gradient-to-r 
                          from-white dark:from-zinc-950 
                          to-transparent"></div>

          {/* Right Gradient Fade */}
          <div className="absolute right-0 top-0 h-full w-20 
                          bg-gradient-to-l 
                          from-white dark:from-zinc-950 
                          to-transparent"></div>
        </div>

      </div>
    </div>
  );
};

export default About;
