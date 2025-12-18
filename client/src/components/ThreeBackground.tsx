import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeBackgroundProps {
  isDark: boolean;
}

export function ThreeBackground({ isDark }: ThreeBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const objectsRef = useRef<THREE.Object3D[]>([]);
  const animationIdRef = useRef<number | null>(null);
  const lightsRef = useRef<THREE.Light[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear previous scene if it exists
    if (sceneRef.current && rendererRef.current) {
      rendererRef.current.dispose();
      containerRef.current.innerHTML = '';
    }

    // Scene setup with theme-aware background
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const bgColor = isDark ? 0x0a0e27 : 0xf5f7fa;
    const fogColor = isDark ? 0x0a0e27 : 0xf5f7fa;
    scene.background = new THREE.Color(bgColor);
    scene.fog = new THREE.Fog(fogColor, 150, 1000);

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 50;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    rendererRef.current = renderer;
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    containerRef.current.appendChild(renderer.domElement);

    // Lighting setup - theme-aware
    lightsRef.current = [];

    const ambientLight = new THREE.AmbientLight(
      isDark ? 0xffffff : 0xffffff,
      isDark ? 0.4 : 0.6
    );
    scene.add(ambientLight);
    lightsRef.current.push(ambientLight);

    const pointLight1 = new THREE.PointLight(
      isDark ? 0x3b82f6 : 0x2563eb,
      isDark ? 1 : 0.8,
      100
    );
    pointLight1.position.set(30, 30, 30);
    pointLight1.castShadow = true;
    pointLight1.shadow.mapSize.width = 2048;
    pointLight1.shadow.mapSize.height = 2048;
    scene.add(pointLight1);
    lightsRef.current.push(pointLight1);

    const pointLight2 = new THREE.PointLight(
      isDark ? 0x8b5cf6 : 0x7c3aed,
      isDark ? 0.8 : 0.6,
      100
    );
    pointLight2.position.set(-30, -30, 30);
    pointLight2.castShadow = true;
    scene.add(pointLight2);
    lightsRef.current.push(pointLight2);

    const pointLight3 = new THREE.PointLight(
      isDark ? 0x06b6d4 : 0x0891b2,
      isDark ? 0.6 : 0.5,
      100
    );
    pointLight3.position.set(0, 50, -30);
    pointLight3.castShadow = true;
    scene.add(pointLight3);
    lightsRef.current.push(pointLight3);

    // Create gradient background using canvas texture
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;

    if (isDark) {
      // Dark mode gradient: deep blue to purple
      const gradient = ctx.createLinearGradient(0, 0, 512, 512);
      gradient.addColorStop(0, '#0a0e27');
      gradient.addColorStop(0.3, '#1e1b4b');
      gradient.addColorStop(0.6, '#312e81');
      gradient.addColorStop(1, '#4c1d95');
      ctx.fillStyle = gradient;
    } else {
      // Light mode gradient: light blue to white
      const gradient = ctx.createLinearGradient(0, 0, 512, 512);
      gradient.addColorStop(0, '#f5f7fa');
      gradient.addColorStop(0.3, '#e0e7ff');
      gradient.addColorStop(0.6, '#dbeafe');
      gradient.addColorStop(1, '#f3e8ff');
      ctx.fillStyle = gradient;
    }
    ctx.fillRect(0, 0, 512, 512);

    // Add some noise/texture to the gradient
    const imageData = ctx.getImageData(0, 0, 512, 512);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      const noise = Math.random() * 20;
      data[i] += noise;
      data[i + 1] += noise;
      data[i + 2] += noise;
    }
    ctx.putImageData(imageData, 0, 0);

    const texture = new THREE.CanvasTexture(canvas);
    const bgGeometry = new THREE.PlaneGeometry(200, 200);
    const bgMaterial = new THREE.MeshBasicMaterial({ map: texture });
    const bgMesh = new THREE.Mesh(bgGeometry, bgMaterial);
    bgMesh.position.z = -100;
    scene.add(bgMesh);

    // Create particle system
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 2000;
    const positionArray = new Float32Array(particleCount * 3);
    const velocityArray = new Float32Array(particleCount * 3);
    const sizeArray = new Float32Array(particleCount);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positionArray[i] = (Math.random() - 0.5) * 250;
      positionArray[i + 1] = (Math.random() - 0.5) * 250;
      positionArray[i + 2] = (Math.random() - 0.5) * 250;

      velocityArray[i] = (Math.random() - 0.5) * 0.3;
      velocityArray[i + 1] = (Math.random() - 0.5) * 0.3;
      velocityArray[i + 2] = (Math.random() - 0.5) * 0.3;

      sizeArray[i / 3] = Math.random() * 0.8 + 0.2;
    }

    particlesGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(positionArray, 3)
    );
    particlesGeometry.setAttribute(
      'velocity',
      new THREE.BufferAttribute(velocityArray, 3)
    );
    particlesGeometry.setAttribute(
      'size',
      new THREE.BufferAttribute(sizeArray, 1)
    );

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.5,
      color: isDark ? 0x64748b : 0x94a3b8,
      sizeAttenuation: true,
      transparent: true,
      opacity: isDark ? 0.6 : 0.5,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);
    objectsRef.current.push(particles);

    // Create 3D geometric objects with theme-aware colors
    const geometries = [
      {
        geometry: new THREE.TorusGeometry(15, 5, 16, 100),
        material: new THREE.MeshPhongMaterial({
          color: isDark ? 0x3b82f6 : 0x2563eb,
          emissive: isDark ? 0x1e40af : 0x1d4ed8,
          shininess: 100,
          wireframe: false,
        }),
        position: [0, 0, 0],
        rotation: [0, 0, 0],
        scale: 1,
      },
      {
        geometry: new THREE.IcosahedronGeometry(10, 4),
        material: new THREE.MeshPhongMaterial({
          color: isDark ? 0x8b5cf6 : 0x7c3aed,
          emissive: isDark ? 0x6d28d9 : 0x6d28d9,
          shininess: 100,
        }),
        position: [40, 30, -20],
        rotation: [0.5, 0.5, 0],
        scale: 1,
      },
      {
        geometry: new THREE.OctahedronGeometry(12, 2),
        material: new THREE.MeshPhongMaterial({
          color: isDark ? 0x06b6d4 : 0x0891b2,
          emissive: isDark ? 0x0891b2 : 0x0e7490,
          shininess: 100,
        }),
        position: [-40, -30, -20],
        rotation: [0, 0.5, 0],
        scale: 1,
      },
      {
        geometry: new THREE.SphereGeometry(8, 32, 32),
        material: new THREE.MeshPhongMaterial({
          color: isDark ? 0xec4899 : 0xdb2777,
          emissive: isDark ? 0xbe185d : 0xbe185d,
          shininess: 100,
        }),
        position: [30, -40, 0],
        rotation: [0, 0, 0],
        scale: 1,
      },
      {
        geometry: new THREE.TetrahedronGeometry(10, 0),
        material: new THREE.MeshPhongMaterial({
          color: isDark ? 0x10b981 : 0x059669,
          emissive: isDark ? 0x047857 : 0x047857,
          shininess: 100,
        }),
        position: [-30, 40, -10],
        rotation: [0.3, 0.3, 0.3],
        scale: 1,
      },
    ];

    geometries.forEach((obj) => {
      const mesh = new THREE.Mesh(obj.geometry, obj.material);
      mesh.position.set(...(obj.position as [number, number, number]));
      mesh.rotation.set(...(obj.rotation as [number, number, number]));
      mesh.scale.set(obj.scale, obj.scale, obj.scale);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      scene.add(mesh);
      objectsRef.current.push(mesh);
    });

    // Create wireframe lines connecting objects
    const lineGeometry = new THREE.BufferGeometry();
    const linePositions = new Float32Array([
      0, 0, 0, 40, 30, -20, 0, 0, 0, -40, -30, -20, 0, 0, 0, 30, -40, 0, 0, 0,
      0, -30, 40, -10,
    ]);
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));

    const lineMaterial = new THREE.LineBasicMaterial({
      color: isDark ? 0x3b82f6 : 0x2563eb,
      transparent: true,
      opacity: isDark ? 0.2 : 0.15,
      linewidth: 1,
    });

    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);
    objectsRef.current.push(lines);

    // Mouse movement tracking
    const onMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', onMouseMove);

    // Animation loop
    let frameCount = 0;
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);
      frameCount++;

      // Rotate and animate objects
      objectsRef.current.forEach((obj, index) => {
        if (obj instanceof THREE.Points) {
          // Animate particles
          const positions = obj.geometry.attributes.position.array as Float32Array;
          const velocities = obj.geometry.attributes.velocity.array as Float32Array;

          for (let i = 0; i < positions.length; i += 3) {
            positions[i] += velocities[i];
            positions[i + 1] += velocities[i + 1];
            positions[i + 2] += velocities[i + 2];

            // Boundary conditions
            if (Math.abs(positions[i]) > 125) velocities[i] *= -1;
            if (Math.abs(positions[i + 1]) > 125) velocities[i + 1] *= -1;
            if (Math.abs(positions[i + 2]) > 125) velocities[i + 2] *= -1;
          }
          obj.geometry.attributes.position.needsUpdate = true;
        } else if (obj instanceof THREE.Mesh) {
          // Rotate meshes
          obj.rotation.x += 0.002 + index * 0.001;
          obj.rotation.y += 0.003 + index * 0.001;
          obj.rotation.z += 0.001 + index * 0.0005;

          // Move objects based on mouse position
          obj.position.x += (mouseRef.current.x * 50 - obj.position.x) * 0.02;
          obj.position.y += (mouseRef.current.y * 50 - obj.position.y) * 0.02;
        }
      });

      // Update point lights
      if (lightsRef.current.length >= 4) {
        (lightsRef.current[1] as THREE.PointLight).position.x = Math.sin(frameCount * 0.005) * 50;
        (lightsRef.current[1] as THREE.PointLight).position.y = Math.cos(frameCount * 0.003) * 50;

        (lightsRef.current[2] as THREE.PointLight).position.x = Math.cos(frameCount * 0.004) * 50;
        (lightsRef.current[2] as THREE.PointLight).position.y = Math.sin(frameCount * 0.005) * 50;

        (lightsRef.current[3] as THREE.PointLight).position.z = Math.sin(frameCount * 0.006) * 50 - 30;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onMouseMove);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      renderer.dispose();
      geometries.forEach((obj) => {
        obj.geometry.dispose();
        if (obj.material instanceof THREE.Material) {
          obj.material.dispose();
        }
      });
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      bgGeometry.dispose();
      bgMaterial.dispose();
      texture.dispose();
      canvas.remove();
      if (containerRef.current && renderer.domElement.parentNode === containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, [isDark]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-10"
      style={{ width: '100%', height: '100%' }}
    />
  );
}
