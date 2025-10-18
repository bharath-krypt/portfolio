import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const InteractiveStars: React.FC = () => {
  const starsRef = useRef<THREE.Points>(null);
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
    if (starsRef.current) {
      const time = state.clock.getElapsedTime();
      const mouseX = mouseRef.current.x;
      const mouseY = mouseRef.current.y;
      
      // Create wave-like movement based on mouse position
      starsRef.current.rotation.x = mouseY * 0.1 + Math.sin(time * 0.5) * 0.1;
      starsRef.current.rotation.y = mouseX * 0.1 + Math.cos(time * 0.3) * 0.1;
      
      // Scale based on mouse movement
      const scale = 1 + (Math.abs(mouseX) + Math.abs(mouseY)) * 0.1;
      starsRef.current.scale.setScalar(scale);
    }
  });

  return (
    <Stars
      ref={starsRef}
      radius={100}
      depth={50}
      count={8000}
      factor={4}
      saturation={0}
      fade
      speed={0.5}
    />
  );
};

const FloatingParticles: React.FC = () => {
  const particlesRef = useRef<THREE.Points>(null);
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
    if (particlesRef.current) {
      const time = state.clock.getElapsedTime();
      const mouseX = mouseRef.current.x;
      const mouseY = mouseRef.current.y;
      
      // Create floating movement
      particlesRef.current.position.x = mouseX * 2;
      particlesRef.current.position.y = mouseY * 2;
      particlesRef.current.position.z = Math.sin(time * 0.5) * 2;
      
      // Rotate particles
      particlesRef.current.rotation.x = time * 0.1;
      particlesRef.current.rotation.y = time * 0.15;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={1000}
          array={new Float32Array(
            Array.from({ length: 1000 * 3 }, () => (Math.random() - 0.5) * 20)
          )}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        color="#667eea"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

const Background3D: React.FC = () => {
  const [isDark, setIsDark] = React.useState(false);

  React.useEffect(() => {
    const checkTheme = () => {
      const isDarkTheme = document.documentElement.classList.contains('dark-theme');
      setIsDark(isDarkTheme);
    };

    checkTheme();
    
    // Watch for theme changes
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      width: '100%', 
      height: '100%', 
      zIndex: 1,
      background: isDark 
        ? 'radial-gradient(ellipse at center, #0a0a0a 0%, #000000 100%)'
        : 'radial-gradient(ellipse at center, #ffffff 0%, #f8f9fa 100%)'
    }}>
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={isDark ? 0.1 : 0.3} />
        <directionalLight position={[10, 10, 5]} intensity={isDark ? 0.3 : 0.5} />
        <InteractiveStars />
        <FloatingParticles />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          enableRotate={false}
          autoRotate={false}
        />
      </Canvas>
    </div>
  );
};

export default Background3D;