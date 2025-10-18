import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

const AnimatedSphere: React.FC = () => {
  const sphereRef = useRef<THREE.Mesh>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state) => {
    if (sphereRef.current) {
      const time = state.clock.getElapsedTime();
      const mouseX = mouseRef.current.x;
      const mouseY = mouseRef.current.y;
      
      // Smooth interpolation for mouse-based movement
      const lerpFactor = 0.05;
      
      // Smooth rotation based on mouse position
      const targetRotationX = mouseY * 0.2 + Math.sin(time * 0.3) * 0.1;
      const targetRotationY = mouseX * 0.2 + Math.cos(time * 0.2) * 0.1;
      
      sphereRef.current.rotation.x += (targetRotationX - sphereRef.current.rotation.x) * lerpFactor;
      sphereRef.current.rotation.y += (targetRotationY - sphereRef.current.rotation.y) * lerpFactor;
      
      // Smooth scaling based on mouse movement
      const targetScale = 2 + (Math.abs(mouseX) + Math.abs(mouseY)) * 0.1;
      const currentScale = sphereRef.current.scale.x;
      sphereRef.current.scale.setScalar(currentScale + (targetScale - currentScale) * lerpFactor);
      
      // Smooth position based on mouse
      const targetX = mouseX * 0.3;
      const targetY = mouseY * 0.3;
      
      sphereRef.current.position.x += (targetX - sphereRef.current.position.x) * lerpFactor;
      sphereRef.current.position.y += (targetY - sphereRef.current.position.y) * lerpFactor;
    }
  });

  return (
    <Sphere ref={sphereRef} visible args={[1, 100, 200]}>
      <MeshDistortMaterial
        color="#667eea"
        attach="material"
        distort={0.3}
        speed={1.5}
        roughness={0}
        metalness={0.8}
      />
    </Sphere>
  );
};

const Hero: React.FC = () => {
  const scrollToSection = (sectionId: string) => {
    console.log('Hero scrolling to section:', sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      console.error('Element not found:', sectionId);
    }
  };

  return (
    <section id="home" className="hero section">
      <div className="hero-content">
        <motion.div
          className="hero-text"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1>
            Hi, I'm <span className="gradient-text">Bharath Kumar</span>
          </h1>
          <p>
            A passionate Software Developer specializing in web and mobile app development. 
            I create innovative digital solutions that bring ideas to life.
          </p>
          <div className="hero-buttons">
            <motion.a
              href="#projects"
              className="btn-primary"
              onClick={() => scrollToSection('projects')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View My Work
            </motion.a>
            <motion.a
              href="#contact"
              className="btn-secondary"
              onClick={() => scrollToSection('contact')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get In Touch
            </motion.a>
          </div>
        </motion.div>
        
        <motion.div
          className="hero-3d"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Canvas camera={{ position: [0, 0, 5] }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <AnimatedSphere />
            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
          </Canvas>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
