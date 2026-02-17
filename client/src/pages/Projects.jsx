const projects = [
  {
    title: "MERN E-Commerce Store",
    description:
      "A full-stack e-commerce platform with authentication, admin dashboard, Stripe payments, product management and order tracking.",
    image:
      "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=1200",
    tech: ["React", "Node.js", "Express", "MongoDB", "Stripe", "Tailwind"],
    link: "https://titancorefrontend.netlify.app/",
  },
  {
    title: "AI Blog Platform",
    description:
      "A scalable blogging platform with JWT authentication, role-based access, rich text editor and RESTful APIs.",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200",
    tech: ["React", "Express", "MongoDB", "JWT", "Cloudinary"],
    link: "#",
  },
];

const Projects = () => {
  return (
    <section
      id="projects"
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
