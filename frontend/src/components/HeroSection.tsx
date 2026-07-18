'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import * as THREE from 'three';
import styles from './HeroSection.module.css';

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const badgeRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // --- GSAP TEXT INTRO ANIMATIONS ---
    const ctx = gsap.context(() => {
      // Staggered reveal for text elements
      gsap.fromTo(
        [badgeRef.current, titleRef.current, descRef.current, actionsRef.current],
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out' }
      );
    });

    // --- THREE.JS 3D ROBOT CORE ANIMATION ---
    if (!canvasRef.current || !containerRef.current) return;

    const width = canvasRef.current.clientWidth || 600;
    const height = canvasRef.current.clientHeight || 500;

    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 8;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 2.2);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0x7c3aed, 4.0); // Purple key light
    mainLight.position.set(5, 5, 5);
    scene.add(mainLight);

    const fillLight = new THREE.DirectionalLight(0x4f46e5, 2.5); // Indigo fill light
    fillLight.position.set(-5, -3, 3);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(0x06b6d4, 4.0, 15); // Cyan rim light
    rimLight.position.set(0, -4, 2);
    scene.add(rimLight);

    // Group to hold all robot parts (for rotation/movement)
    const robotGroup = new THREE.Group();
    scene.add(robotGroup);

    // 1. Robot Head Core Base (Solid deep dark slate-black shell)
    const headGeometry = new THREE.SphereGeometry(1.5, 32, 32);
    const headMaterial = new THREE.MeshStandardMaterial({
      color: 0x090d16, // Deep dark slate-black
      metalness: 0.8,  // High metalness for sleek metallic look
      roughness: 0.15, // Glossy reflections
      transparent: false,
      opacity: 1.0,
    });
    const headMesh = new THREE.Mesh(headGeometry, headMaterial);
    robotGroup.add(headMesh);

    // 2. Cybernetic Visor Shield
    const visorGeometry = new THREE.CylinderGeometry(1.52, 1.52, 0.7, 32, 1, true, -Math.PI / 2, Math.PI);
    const visorMaterial = new THREE.MeshStandardMaterial({
      color: 0x7c3aed, // Glossy violet visor
      metalness: 0.85,
      roughness: 0.1,
      side: THREE.DoubleSide,
    });
    const visorMesh = new THREE.Mesh(visorGeometry, visorMaterial);
    visorMesh.rotation.x = Math.PI / 2;
    visorMesh.position.z = 0.02;
    robotGroup.add(visorMesh);

    // 3. Glowing LED Eyes (Cyan/Blue emissive spheres)
    const eyeMaterial = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      emissive: 0x06b6d4,
      emissiveIntensity: 6.0,
      roughness: 0.15,
      metalness: 0.1,
    });

    const eyeGeometry = new THREE.SphereGeometry(0.18, 16, 16);

    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(-0.45, 0.1, 1.35);
    robotGroup.add(leftEye);

    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    rightEye.position.set(0.45, 0.1, 1.35);
    robotGroup.add(rightEye);

    // 4. Side Ear Antennae / Communication Modules (Shiny chrome)
    const earGeometry = new THREE.CylinderGeometry(0.2, 0.25, 0.6, 16);
    const earMaterial = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      metalness: 0.9,
      roughness: 0.1,
    });

    const leftEar = new THREE.Mesh(earGeometry, earMaterial);
    leftEar.position.set(-1.6, 0, 0);
    leftEar.rotation.z = Math.PI / 2;
    robotGroup.add(leftEar);

    const rightEar = new THREE.Mesh(earGeometry, earMaterial);
    rightEar.position.set(1.6, 0, 0);
    rightEar.rotation.z = -Math.PI / 2;
    robotGroup.add(rightEar);

    // Antenna on top
    const antennaStemGeom = new THREE.CylinderGeometry(0.04, 0.04, 0.7, 8);
    const antennaStem = new THREE.Mesh(antennaStemGeom, earMaterial);
    antennaStem.position.set(0, 1.8, 0);
    robotGroup.add(antennaStem);

    const antennaTipGeom = new THREE.SphereGeometry(0.12, 16, 16);
    const antennaTipMaterial = new THREE.MeshStandardMaterial({
      color: 0x7c3aed, // Glowing purple beacon
      emissive: 0x7c3aed,
      emissiveIntensity: 5.0,
    });
    const antennaTip = new THREE.Mesh(antennaTipGeom, antennaTipMaterial);
    antennaTip.position.set(0, 2.2, 0);
    robotGroup.add(antennaTip);

    // 5. Outer Holographic Orbit Rings
    const ringGeom = new THREE.TorusGeometry(2.3, 0.03, 8, 100);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0x4f46e5,
      emissive: 0x4f46e5,
      emissiveIntensity: 2.5,
      transparent: true,
      opacity: 0.75,
    });
    const orbitRing1 = new THREE.Mesh(ringGeom, ringMat);
    orbitRing1.rotation.x = Math.PI / 3;
    orbitRing1.rotation.y = Math.PI / 4;
    robotGroup.add(orbitRing1);

    const orbitRing2 = new THREE.Mesh(ringGeom, ringMat);
    orbitRing2.rotation.x = -Math.PI / 4;
    orbitRing2.rotation.y = -Math.PI / 3;
    robotGroup.add(orbitRing2);

    // 6. Neural Network Synapses (Floating particle constellation)
    const particleCount = 60;
    const particleGeom = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities: { x: number; y: number; z: number }[] = [];

    for (let i = 0; i < particleCount; i++) {
      // Random coordinates in a shell around the robot head
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 2.4 + Math.random() * 1.0; // sphere shell radius

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      velocities.push({
        x: (Math.random() - 0.5) * 0.015,
        y: (Math.random() - 0.5) * 0.015,
        z: (Math.random() - 0.5) * 0.015,
      });
    }

    particleGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      color: 0x7c3aed, // Purple particles
      size: 0.08,
      transparent: true,
      opacity: 0.9,
    });
    const particleSystem = new THREE.Points(particleGeom, particleMaterial);
    robotGroup.add(particleSystem);

    // --- Interactive Mouse Movement ---
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      // Normalize mouse coordinates (-1 to 1)
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;

      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      targetX = (x / rect.width) * 2 - 1;
      targetY = -(y / rect.height) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // --- Dynamic Click Animation ---
    const handleCanvasClick = () => {
      // Flash eyes gold and scale up orbit rings
      gsap.to(eyeMaterial.color, { r: 1.0, g: 0.8, b: 0, duration: 0.15, yoyo: true, repeat: 1 });
      gsap.to(eyeMaterial.emissive, { r: 1.0, g: 0.8, b: 0, duration: 0.15, yoyo: true, repeat: 1 });

      gsap.fromTo(
        [orbitRing1.scale, orbitRing2.scale],
        { x: 1, y: 1, z: 1 },
        { x: 1.3, y: 1.3, z: 1.3, duration: 0.5, ease: 'power2.out', yoyo: true, repeat: 1 }
      );
    };

    canvasRef.current.addEventListener('click', handleCanvasClick);

    // --- Animation Loop ---
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smoothly interpolate cursor position (lerp)
      currentX += (targetX - currentX) * 0.07;
      currentY += (targetY - currentY) * 0.07;

      // Rotate robot head to follow cursor
      robotGroup.rotation.y = currentX * 0.6;
      robotGroup.rotation.x = -currentY * 0.4;

      // Make eyes look slightly more extreme for interactive focus
      leftEye.position.x = -0.45 + currentX * 0.1;
      leftEye.position.y = 0.1 + currentY * 0.08;
      rightEye.position.x = 0.45 + currentX * 0.1;
      rightEye.position.y = 0.1 + currentY * 0.08;

      // Orbit rings rotation
      orbitRing1.rotation.z += 0.005;
      orbitRing2.rotation.z -= 0.003;

      // Floating idle animation
      robotGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.12;

      // Rotate particle network
      particleSystem.rotation.y = elapsedTime * 0.05;

      // Update particle positions slightly
      const positionsAttr = particleGeom.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < particleCount; i++) {
        const index = i * 3;
        positionsAttr.array[index] += velocities[i].x;
        positionsAttr.array[index + 1] += velocities[i].y;
        positionsAttr.array[index + 2] += velocities[i].z;

        // Bounce back if they wander too far
        const dist = Math.sqrt(
          positionsAttr.array[index] ** 2 +
          positionsAttr.array[index + 1] ** 2 +
          positionsAttr.array[index + 2] ** 2
        );

        if (dist > 3.6 || dist < 2.0) {
          velocities[i].x *= -1;
          velocities[i].y *= -1;
          velocities[i].z *= -1;
        }
      }
      particleGeom.attributes.position.needsUpdate = true;

      // Render
      renderer.render(scene, camera);
    };

    animate();

    // --- Resize handler ---
    const handleResize = () => {
      if (!canvasRef.current || !containerRef.current) return;
      const w = canvasRef.current.clientWidth;
      const h = canvasRef.current.clientHeight;

      camera.aspect = w / h;
      camera.updateProjectionMatrix();

      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Clean up
    return () => {
      ctx.revert();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (canvasRef.current) {
        canvasRef.current.removeEventListener('click', handleCanvasClick);
      }
      cancelAnimationFrame(animId);
      renderer.dispose();
      scene.clear();
    };
  }, []);

  return (
    <section ref={containerRef} className={styles.hero}>
      {/* Background Glowing Mesh Grid */}
      <div className={styles.heroBg}></div>
      <div className={styles.gridOverlay}></div>

      <div className={styles.heroContainer}>
        {/* Left Column - Copywriting & CTAs */}
        <div className={styles.heroLeft}>
          <span ref={badgeRef} className={styles.badge}>
            <svg className={styles.badgeIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Next-Gen AI Learning Educator
          </span>

          <h1 ref={titleRef} className={styles.heroTitle}>
            Shape Your <span className={styles.highlight}>Engineering</span> Future with AI
          </h1>

          <p ref={descRef} className={styles.heroSubtitle}>
            Unlock hyper-personalized MHT-CET recommendations, target predictive college cutoff algorithms, and learn with an AI-integrated curriculum co-designed by IIT & COEP mentors.
          </p>

          <div ref={actionsRef} className={styles.actions}>
            <Link href="/predictor" className={styles.primaryBtn}>
              Predict Your College
              <svg className={styles.btnArrow} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
            <a href="#courses-section" className={styles.secondaryBtn}>
              Explore AI Courses
            </a>
          </div>

        </div>

        {/* Right Column - 3D Interactive Canvas */}
        <div className={styles.heroRight}>
          <div className={styles.canvasWrapper}>
            <div className={styles.glowBackdrop}></div>
            <canvas ref={canvasRef} className={styles.canvas3d} />
            <div className={styles.canvasHint}>
              <span className={styles.hintDot}></span>
              Move cursor to interact • Click to pulse core
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
