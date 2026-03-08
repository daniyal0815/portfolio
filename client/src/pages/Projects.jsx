const projects = [
  {
    title: "Titan Core E-Commerce Store",
    description:
      "A full-stack e-commerce platform with authentication, admin dashboard, Stripe payments, product management and order tracking.",
    image:
      "https://ik.imagekit.io/hpqi0fsjo/Titan-Core.jpg",
    tech: ["React", "Node.js", "Express", "MongoDB", "Stripe", "Tailwind"],
    link: "https://titancorefrontend.netlify.app/",
  },
  {
    title: "AI Fitness Tracker",
    description:
      "AI Fitness Tracker is a modern web application designed to help users monitor and improve their fitness journey using intelligent insights. The platform allows users to track workouts, monitor progress, and receive personalized fitness recommendations powered by AI.",
    image:
      "https://res.cloudinary.com/dbbe8vlaw/image/upload/v1772997435/Fit-Track_wuwowv.jpg",
    tech: ["React", "Express", "MongoDB", "JWT", "Cloudinary"],
    link: "https://bhatta-fitness-tracker.vercel.app/",
  },
  {
    title: "AI Resume Builder",
    description:
      "AI Resume Builder is a full-stack MERN application designed to help users create professional resumes effortlessly. The platform allows users to input their details, generate AI-enhanced content, and customize different sections such as personal information, experience, education, projects, and skills.",
    image:
      "https://ik.imagekit.io/hpqi0fsjo/Resume-Builder.jpg",
    tech: ["React", "Express", "MongoDB", "JWT", "Cloudinary"],
    link: "https://daniyal-resume-builder.netlify.app/",
  },
];

const Projects = () => {
  return (
    <section
      
      className="min-h-screen bg-white dark:bg-black text-black dark:text-white px-6 py-24"
    >
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-bold">My Projects</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-4">
            Projects I’ve worked on. Each one crafted with performance,
            scalability and clean UI in mind.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-12">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden hover:shadow-2xl transition duration-300"
            >
              {/* Image */}
              <div className="overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-8">
                <h2 className="text-2xl font-semibold mb-4">
                  {project.title}
                </h2>

                <p className="text-gray-500 dark:text-gray-400 mb-6">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-3 mb-6">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="text-sm px-4 py-1 rounded-full border border-gray-300 dark:border-gray-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Button */}
                <a
                  href={project.link}
                  className="inline-flex items-center gap-2 text-sm font-medium hover:underline"
                >
                  Preview →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
