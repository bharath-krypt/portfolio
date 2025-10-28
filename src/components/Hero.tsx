import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Box, Torus, Octahedron, Plane } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

// Custom 3D Model Component
const CustomModel: React.FC<{
  modelPath: string;
  scale?: [number, number, number];
  position?: [number, number, number];
  rotation?: [number, number, number];
}> = ({ modelPath, scale = [2, 2, 2], position = [0, 0, 0], rotation = [0, 0, 0] }) => {
  const modelRef = useRef<THREE.Group>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  // Load the 3D model (suspends until ready)
  const { scene, animations } = useGLTF(modelPath);

  // Create animation mixer
  const mixer = React.useMemo(() => {
    if (animations && animations.length > 0) {
      return new THREE.AnimationMixer(scene);
    }
    return null;
  }, [animations, scene]);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Start playing model animations when mixer is ready
  useEffect(() => {
    console.log('Animations:', animations);
    console.log('Animations length:', animations?.length);
    console.log('Mixer:', mixer);

    if (mixer && animations && animations.length > 0) {
      console.log('Playing animations...');
      // Play all animations
      animations.forEach((clip, index) => {
        console.log(`Animation ${index}:`, clip.name, clip.duration);
        const action = mixer.clipAction(clip);
        action.play();
      });
    } else {
      console.log('No animations found or mixer not ready');
    }
  }, [mixer, animations]);

  useFrame((state, delta) => {
    if (modelRef.current) {
      const time = state.clock.getElapsedTime();
      const mouseX = mouseRef.current.x;
      const mouseY = mouseRef.current.y;

      // Update model animations if mixer exists
      if (mixer) {
        mixer.update(delta);
        // Debug: log every 60 frames (about once per second)
        if (Math.floor(time) % 1 === 0 && Math.floor(time * 100) % 100 === 0) {
          console.log('Mixer updating, delta:', delta);
        }
      }

      // Smooth interpolation for mouse-based movement
      const lerpFactor = 0.05;

      // Initialize position if not set
      if (modelRef.current.position.x === 0 && modelRef.current.position.y === 0 && modelRef.current.position.z === 0) {
        modelRef.current.position.set(position[0], position[1], position[2]);
      }

      // Smooth rotation around its own Y-axis (spinning in place)
      const targetRotationY = time * 0.5 + mouseX * 0.2;

      // Keep X and Z rotations at 0, only rotate on Y-axis around its own center
      modelRef.current.rotation.x = 0;
      modelRef.current.rotation.y = targetRotationY;
      modelRef.current.rotation.z = 0;

      // Smooth scaling based on mouse movement
      const targetScale = 1 + (Math.abs(mouseX) + Math.abs(mouseY)) * 0.1;
      const currentScale = modelRef.current.scale.x;
      modelRef.current.scale.setScalar(currentScale + (targetScale - currentScale) * lerpFactor);

      // Smooth position based on mouse (relative to base position)
      const baseX = position[0];
      const baseY = position[1];
      const targetX = baseX + mouseX * 0.3;
      const targetY = baseY + mouseY * 0.3;

      modelRef.current.position.x += (targetX - modelRef.current.position.x) * lerpFactor;
      modelRef.current.position.y += (targetY - modelRef.current.position.y) * lerpFactor;
    }
  });

  // Scene will be provided by Suspense boundary when ready

  return (
    <group ref={modelRef} rotation={rotation}>
      <primitive object={scene} scale={scale} />
    </group>
  );
};

// Animated Geometric Shapes Component (fallback when no custom models)
const AnimatedShapes: React.FC = () => {
  const shapesRef = useRef<THREE.Group>(null);
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
    if (shapesRef.current) {
      const time = state.clock.getElapsedTime();
      const mouseX = mouseRef.current.x;
      const mouseY = mouseRef.current.y;

      // Smooth interpolation for mouse-based movement
      const lerpFactor = 0.05;

      // Smooth rotation based on mouse position
      const targetRotationX = mouseY * 0.2 + Math.sin(time * 0.3) * 0.1;
      const targetRotationY = mouseX * 0.2 + Math.cos(time * 0.2) * 0.1;

      shapesRef.current.rotation.x += (targetRotationX - shapesRef.current.rotation.x) * lerpFactor;
      shapesRef.current.rotation.y += (targetRotationY - shapesRef.current.rotation.y) * lerpFactor;

      // Smooth scaling based on mouse movement
      const targetScale = 1 + (Math.abs(mouseX) + Math.abs(mouseY)) * 0.1;
      const currentScale = shapesRef.current.scale.x;
      shapesRef.current.scale.setScalar(currentScale + (targetScale - currentScale) * lerpFactor);

      // Smooth position based on mouse
      const targetX = mouseX * 0.3;
      const targetY = mouseY * 0.3;

      shapesRef.current.position.x += (targetX - shapesRef.current.position.x) * lerpFactor;
      shapesRef.current.position.y += (targetY - shapesRef.current.position.y) * lerpFactor;
    }
  });

  return (
    <group ref={shapesRef}>
      {/* Main cube */}
      <Box args={[1, 1, 1]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#667eea" metalness={0.8} roughness={0.2} />
      </Box>

      {/* Floating torus */}
      <Torus args={[0.6, 0.2, 16, 32]} position={[1.5, 0.5, 0]}>
        <meshStandardMaterial color="#764ba2" metalness={0.6} roughness={0.3} />
      </Torus>

      {/* Octahedron */}
      <Octahedron args={[0.4]} position={[-1.2, -0.8, 0]}>
        <meshStandardMaterial color="#f093fb" metalness={0.7} roughness={0.1} />
      </Octahedron>
    </group>
  );
};

// Multiple Models Component - You can add multiple models here
const ModelScene: React.FC = () => {
  const [hasCustomModels, setHasCustomModels] = useState(false);

  // Check if any custom models exist
  useEffect(() => {
    // Enable custom models since we have the Porsche model
    setHasCustomModels(true);
  }, []);

  return (
    <>
      {hasCustomModels ? (
        <>
          {/* Subtle ground plane for a clean shadow on light background */}
          <Plane args={[30, 30]} rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.6, -1]}>
            <meshStandardMaterial color="#ffffff" transparent opacity={0.15} />
          </Plane>

          {/* Low poly man working at a laptop */}
          <CustomModel
            modelPath="/models/low_poly_man_working_at_a_table_with_a_laptop.glb"
            scale={[0.4, 0.4, 0.4]}
            position={[4, -1, 0]}
            rotation={[0, -Math.PI / 8, 0]}
          />
        </>
      ) : (
        /* Show animated geometric shapes when no custom models are loaded */
        <AnimatedShapes />
      )}
    </>
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
            Hi, I'm
            <br />
            <span className="gradient-text name-large">Bharath</span>
            <br />
            <span className="gradient-text">kumar</span>
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
          <Canvas
            camera={{ position: [0, 0, 8], fov: 50 }}
            gl={{ antialias: true, alpha: true }}
          >
            {/* Brighter, studio-like lighting */}
            <ambientLight intensity={1} />
            <directionalLight position={[6, 8, 6]} intensity={2.2} castShadow />
            <directionalLight position={[-6, 4, 4]} intensity={1.2} />
            <pointLight position={[0, 2, 6]} intensity={1.5} />
            {/* Custom 3D Models - full-bleed on right */}
            <React.Suspense fallback={null}>
              <ModelScene />
            </React.Suspense>
            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.2} />
          </Canvas>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
