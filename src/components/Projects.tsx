import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const Projects: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce solution built with React, Node.js, and MongoDB. Features include user authentication, payment integration, and admin dashboard.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'JWT'],
      github: '#',
      live: '#'
    },
    {
      title: 'Mobile Banking App',
      description: 'A cross-platform mobile banking application developed with React Native. Includes features like account management, transfers, and transaction history.',
      technologies: ['React Native', 'Firebase', 'Redux', 'Expo'],
      github: '#',
      live: '#'
    },
    {
      title: '3D Portfolio Website',
      description: 'An interactive portfolio website featuring Three.js 3D elements, smooth animations, and responsive design.',
      technologies: ['React', 'Three.js', 'Framer Motion', 'TypeScript'],
      github: '#',
      live: '#'
    },
    {
      title: 'Task Management System',
      description: 'A collaborative task management platform with real-time updates, team collaboration features, and project tracking capabilities.',
      technologies: ['Vue.js', 'Express.js', 'Socket.io', 'PostgreSQL'],
      github: '#',
      live: '#'
    },
    {
      title: 'AI Chat Application',
      description: 'An intelligent chat application powered by AI, featuring natural language processing and smart response generation.',
      technologies: ['React', 'Python', 'OpenAI API', 'WebSocket'],
      github: '#',
      live: '#'
    },
    {
      title: 'Weather Dashboard',
      description: 'A comprehensive weather dashboard with location-based forecasts, interactive maps, and detailed weather analytics.',
      technologies: ['Next.js', 'Chart.js', 'Weather API', 'Tailwind CSS'],
      github: '#',
      live: '#'
    }
  ];

  return (
    <section id="projects" className="projects section">
      <div className="container">
        <motion.div
          className="projects-content"
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2>Featured Projects</h2>
          <div className="projects-grid">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                className="project-card"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <div className="project-image">
                  <span>🚀</span>
                </div>
                <div className="project-content">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="project-tech">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                  <div className="project-links">
                    <a href={project.github} className="btn-secondary">
                      <FaGithub /> Code
                    </a>
                    <a href={project.live} className="btn-primary">
                      <FaExternalLinkAlt /> Live Demo
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
