
import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

interface AvatarModelProps {
  className?: string;
  isSpeaking?: boolean;
}

const AvatarModel: React.FC<AvatarModelProps> = ({ className, isSpeaking = false }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);
  const modelRef = useRef<THREE.Group | null>(null);
  const animationsRef = useRef<THREE.AnimationClip[]>([]);
  const actionRef = useRef<THREE.AnimationAction | null>(null);
  const talkingActionRef = useRef<THREE.AnimationAction | null>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Initialize scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf5f8fb); // Light background color
    
    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0, 10, 10);
    scene.add(directionalLight);

    // Initialize camera
    const camera = new THREE.PerspectiveCamera(
      45,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 1.6, 2.5); // Position camera to see the avatar properly
    camera.lookAt(0, 1.5, 0);

    // Initialize renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    // In newer versions of Three.js, outputEncoding was replaced with outputColorSpace
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    
    // Clear any existing canvas
    containerRef.current.innerHTML = '';
    containerRef.current.appendChild(renderer.domElement);

    // Initialize GLTF loader
    const loader = new GLTFLoader();

    // Load the avatar model
    // Using a free readyplayer.me female avatar URL
    loader.load(
      'https://models.readyplayer.me/65cde7c08c1b50b9be8c45ab.glb',
      (gltf) => {
        modelRef.current = gltf.scene;
        scene.add(modelRef.current);
        
        // Center the model
        const box = new THREE.Box3().setFromObject(modelRef.current);
        const center = box.getCenter(new THREE.Vector3());
        modelRef.current.position.x = -center.x;
        modelRef.current.position.y = -center.y;
        modelRef.current.position.z = -center.z;
        
        // Setup animation
        mixerRef.current = new THREE.AnimationMixer(modelRef.current);
        animationsRef.current = gltf.animations;
        
        // Set up default idle animation
        const idleAnimation = THREE.AnimationClip.findByName(gltf.animations, 'Idle');
        if (idleAnimation) {
          actionRef.current = mixerRef.current.clipAction(idleAnimation);
          actionRef.current.play();
        } else if (gltf.animations.length) {
          // If no idle animation, play the first animation
          actionRef.current = mixerRef.current.clipAction(gltf.animations[0]);
          actionRef.current.play();
        }
        
        // Find a talking animation if available 
        const talkingAnimation = THREE.AnimationClip.findByName(gltf.animations, 'Talking') || 
                                THREE.AnimationClip.findByName(gltf.animations, 'Talk') ||
                                THREE.AnimationClip.findByName(gltf.animations, 'Speaking');
        
        if (talkingAnimation) {
          talkingActionRef.current = mixerRef.current.clipAction(talkingAnimation);
        }
        
        setIsLoaded(true);
      },
      (xhr) => {
        console.log(`${(xhr.loaded / xhr.total) * 100}% loaded`);
      },
      (error) => {
        console.error('An error happened loading the avatar:', error);
      }
    );

    // Animation loop
    const clock = new THREE.Clock();
    
    const animate = () => {
      requestAnimationFrame(animate);
      
      const delta = clock.getDelta();
      if (mixerRef.current) mixerRef.current.update(delta);
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return;
      
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      
      // Dispose THREE.js resources
      scene.traverse((object) => {
        if ((object as THREE.Mesh).isMesh) {
          const mesh = object as THREE.Mesh;
          if (mesh.geometry) mesh.geometry.dispose();
          
          if (mesh.material) {
            if (Array.isArray(mesh.material)) {
              mesh.material.forEach((material) => material.dispose());
            } else {
              mesh.material.dispose();
            }
          }
        }
      });
      
      renderer.dispose();
    };
  }, []);
  
  // Handle switching between idle and talking animations based on isSpeaking prop
  useEffect(() => {
    if (!isLoaded || !mixerRef.current) return;
    
    if (isSpeaking && talkingActionRef.current) {
      if (actionRef.current) {
        actionRef.current.fadeOut(0.5);
      }
      talkingActionRef.current.reset().fadeIn(0.5).play();
    } else if (!isSpeaking && actionRef.current) {
      if (talkingActionRef.current) {
        talkingActionRef.current.fadeOut(0.5);
      }
      actionRef.current.reset().fadeIn(0.5).play();
    }
  }, [isSpeaking, isLoaded]);
  
  return <div ref={containerRef} className={`w-full h-full ${className}`} />;
};

export default AvatarModel;
