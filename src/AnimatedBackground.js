import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

function randRange(min, max) {
  return Math.random() * (max - min) + min;
}

const AnimatedBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mountNode = mountRef.current;
    const scene = new THREE.Scene();

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1200
    );
    camera.position.z = 400;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setClearColor(0x07031a, 1);
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountNode.appendChild(renderer.domElement);

    // Starfield
    const starGeometry = new THREE.BufferGeometry();
    const starCount = 3500;
    const positions = [];
    const colorsArr = [];
    const cList = [
      new THREE.Color("white"),
      new THREE.Color("#93c5fd"),
      new THREE.Color("#d8b4fe"),
      new THREE.Color("#f9a8d4")
    ];
    for (let i = 0; i < starCount; i++) {
      positions.push(
        (Math.random() - 0.5) * 1200,
        (Math.random() - 0.5) * 900,
        (Math.random() - 0.45) * 1100
      );
      const starCol = cList[Math.floor(Math.random() * cList.length)];
      colorsArr.push(starCol.r, starCol.g, starCol.b);
    }
    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    starGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colorsArr, 3));
    const starMaterial = new THREE.PointsMaterial({
      size: 1.3,
      vertexColors: true,
      transparent: true,
      opacity: 0.96
    });
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // Shooting Stars
    let comets = [];
    let cometTimer = 0;

    function spawnComet() {
      // Random angle: 220 to 340deg (downward, slightly leftward)
      const angle = randRange(Math.PI * 1.05, Math.PI * 1.4);
      const len = randRange(220, 430);
      const cometHead = new THREE.Mesh(
        new THREE.SphereGeometry(randRange(2.1, 3.6), 12, 12),
        new THREE.MeshBasicMaterial({ color: 0xffffff, emissive: 0xffffff, transparent: true })
      );
      
      // Start offscreen at a random Y
      const startX = randRange(-580, 400);
      const startY = randRange(-390, 310);
      cometHead.position.set(startX, startY, -120 + randRange(-40, 80));

      // Trail: create a set of Points fading out
      const tailSegments = 38;
      const tailGeo = new THREE.BufferGeometry();
      const tailPos = [];
      const tailColors = [];
      for (let i = 0; i < tailSegments; i++) {
        const t = i / tailSegments;
        // Each point further along behind the comet head
        tailPos.push(
          startX - Math.cos(angle) * len * t,
          startY - Math.sin(angle) * len * t,
          cometHead.position.z
        );
        // Alpha fades as you go to the back
        const c = new THREE.Color(0xffffff);
        // Tint bluish towards tail’s end
        c.lerp(new THREE.Color("#93c5fd"), t*0.7);
        tailColors.push(c.r, c.g, c.b);
      }
      tailGeo.setAttribute("position", new THREE.Float32BufferAttribute(tailPos, 3));
      tailGeo.setAttribute("color", new THREE.Float32BufferAttribute(tailColors, 3));
      const tailMat = new THREE.PointsMaterial({
        size: 3.2,
        vertexColors: true,
        transparent: true,
        opacity: 0.86
      });
      const cometTail = new THREE.Points(tailGeo, tailMat);

      // For movement:
      const speed = randRange(13, 23);
      const movement = {
        angle,
        dx: Math.cos(angle) * speed,
        dy: Math.sin(angle) * speed,
        age: 0,
        fade: 1.0,
        trailLen: len,
        maxLife: randRange(40, 65)
      };

      scene.add(cometHead);
      scene.add(cometTail);
      comets.push({ cometHead, cometTail, movement });
    }

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Animate the starfield
      stars.rotation.x += 0.00016;
      stars.rotation.y += 0.00022;

      // Update all comets
      comets.forEach(obj => {
        const { cometHead, cometTail, movement } = obj;
        cometHead.position.x += movement.dx;
        cometHead.position.y += movement.dy;

        // Move the tail too (each segment follows the head)
        const posArr = cometTail.geometry.attributes.position.array;
        for (let i = posArr.length - 3; i >= 3; i -= 3) {
          // Each point takes the place of the previous
          posArr[i] = posArr[i-3];
          posArr[i+1] = posArr[i-2];
          posArr[i+2] = posArr[i-1];
        }
        // First point follows the head
        posArr[0] = cometHead.position.x;
        posArr[1] = cometHead.position.y;
        posArr[2] = cometHead.position.z;
        cometTail.geometry.attributes.position.needsUpdate = true;

        // More dramatic sparkle/fade
        cometHead.material.opacity = Math.max(0, movement.fade);
        cometTail.material.opacity = Math.max(0, movement.fade * 0.8);

        movement.age += 1;
        if (movement.age > movement.maxLife * 0.7) {
          movement.fade -= 0.045;
        }
      });

      // Remove finished comets
      comets = comets.filter(obj => {
        const { cometHead, cometTail, movement } = obj;
        if (movement.fade <= 0) {
          scene.remove(cometHead);
          scene.remove(cometTail);
          cometHead.geometry.dispose();
          cometHead.material.dispose();
          cometTail.geometry.dispose();
          cometTail.material.dispose();
          return false;
        }
        return true;
      });

      // Random new comet spawn
      cometTimer--;
      if (cometTimer <= 0) {
        if (Math.random() > 0.45) spawnComet();
        cometTimer = randRange(80, 180);
      }
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      mountNode.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      id="bg-canvas"
      ref={mountRef}
      style={{ width: '100vw', height: '100vh', position: 'fixed', zIndex: -1 }}
    />
  );
};

export default AnimatedBackground;
