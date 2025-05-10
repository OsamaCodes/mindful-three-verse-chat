
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

interface ThreeBrainWaveProps {
  className?: string;
}

const ThreeBrainWave: React.FC<ThreeBrainWaveProps> = ({ className }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50, 
      containerRef.current.clientWidth / containerRef.current.clientHeight, 
      0.1, 
      1000
    );
    camera.position.z = 15;

    // Create renderer with transparent background
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true 
    });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    // Clear any existing canvas
    containerRef.current.innerHTML = '';
    containerRef.current.appendChild(renderer.domElement);

    // Create wave particles
    const particlesCount = 8000;
    const particles = new THREE.BufferGeometry();
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);

    const color1 = new THREE.Color(0x8b5cf6); // Purple from soothing palette
    const color2 = new THREE.Color(0x4387e6); // Blue from mindful palette
    const color3 = new THREE.Color(0x22c55e); // Green from calm palette

    for (let i = 0; i < particlesCount; i++) {
      // Position particles in a spherical pattern
      const angle = Math.random() * Math.PI * 2;
      const radius = 5 + Math.random() * 5;
      const height = (Math.random() - 0.5) * 5;
      
      positions[i * 3] = Math.cos(angle) * radius; // x
      positions[i * 3 + 1] = height; // y
      positions[i * 3 + 2] = Math.sin(angle) * radius; // z

      // Randomly assign colors with more blue/purple dominance
      const colorRnd = Math.random();
      let particleColor;
      
      if (colorRnd < 0.5) {
        particleColor = color2; // 50% blue
      } else if (colorRnd < 0.8) {
        particleColor = color1; // 30% purple
      } else {
        particleColor = color3; // 20% green
      }
      
      colors[i * 3] = particleColor.r;
      colors[i * 3 + 1] = particleColor.g;
      colors[i * 3 + 2] = particleColor.b;
    }

    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Create material for particles
    const particleMaterial = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
    });

    // Create the particle system
    const particleSystem = new THREE.Points(particles, particleMaterial);
    scene.add(particleSystem);

    // Add subtle ambient lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambientLight);

    // Animation function
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate the particle system
      particleSystem.rotation.y += 0.002;
      
      // Create wave effect in the particles
      const positions = particles.attributes.position.array as Float32Array;
      const time = Date.now() * 0.0005;
      
      for (let i = 0; i < particlesCount; i++) {
        const ix = i * 3;
        const iy = i * 3 + 1;
        const iz = i * 3 + 2;
        
        // Get current position
        const x = positions[ix];
        const y = positions[iy];
        const z = positions[iz];
        
        // Apply subtle wave effect
        positions[iy] = y + Math.sin(x / 2 + time) * 0.02;
        positions[iz] = z + Math.cos(y / 2 + time) * 0.02;
      }
      
      particles.attributes.position.needsUpdate = true;
      
      renderer.render(scene, camera);
    };

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return;
      
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      
      particles.dispose();
      particleMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className={className} />;
};

export default ThreeBrainWave;
