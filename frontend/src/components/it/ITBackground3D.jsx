import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, useScroll } from '@react-three/drei';
import * as THREE from 'three';
import { useScroll as useFramerScroll, useTransform, useSpring } from 'framer-motion';

const Scene = () => {
    const sphereRef = useRef();
    const { scrollYProgress } = useFramerScroll();

    // Smooth scroll progress
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Transformations based on scroll
    const scale = useTransform(smoothProgress, [0, 1], [0.8, 1.2]);
    const rotationX = useTransform(smoothProgress, [0, 1], [0, Math.PI]);
    const rotationY = useTransform(smoothProgress, [0, 1], [0, Math.PI * 2]);
    const distort = useTransform(smoothProgress, [0, 0.5, 1], [0.3, 0.5, 0.4]);

    useFrame((state) => {
        if (!sphereRef.current) return;
        const time = state.clock.getElapsedTime();

        // Manual rotation for extra life even when not scrolling
        sphereRef.current.rotation.x += 0.001;
        sphereRef.current.rotation.y += 0.002;

        // Sync with scroll transforms
        sphereRef.current.scale.setScalar(scale.get());
        sphereRef.current.rotation.x = rotationX.get() + time * 0.1;
        sphereRef.current.rotation.y = rotationY.get() + time * 0.2;
    });

    return (
        <>
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
            <pointLight position={[-10, -10, -10]} color="#3b82f6" intensity={2} />
            <pointLight position={[10, 5, -5]} color="#a855f7" intensity={2} />

            <Float speed={2} rotationIntensity={1} floatIntensity={2}>
                <Sphere ref={sphereRef} args={[1, 100, 100]} scale={1}>
                    <MeshDistortMaterial
                        color="#1e293b"
                        attach="material"
                        distort={0.4}
                        speed={2}
                        roughness={0}
                        metalness={1}
                        emissive="#0f172a"
                    />
                </Sphere>
            </Float>

            {/* Background Particles/Stars */}
            <StarsCount scrollYProgress={smoothProgress} />
        </>
    );
};

const StarsCount = ({ scrollYProgress }) => {
    const count = 2000;
    const points = useMemo(() => {
        const p = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            p[i * 3] = (Math.random() - 0.5) * 10;
            p[i * 3 + 1] = (Math.random() - 0.5) * 10;
            p[i * 3 + 2] = (Math.random() - 0.5) * 10;
        }
        return p;
    }, [count]);

    const pointsRef = useRef();

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        const scrollValue = scrollYProgress.get();
        pointsRef.current.rotation.y = time * 0.05 + scrollValue * 2;
        pointsRef.current.rotation.x = time * 0.02 + scrollValue;
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={points.length / 3}
                    array={points}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial size={0.015} color="#4f46e5" transparent opacity={0.6} sizeAttenuation />
        </points>
    );
};

const ITBackground3D = () => {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none bg-[#070b14]">
            <Canvas camera={{ position: [0, 0, 3], fov: 75 }}>
                <Scene />
            </Canvas>
            <div className="absolute inset-0 bg-gradient-to-b from-[#070b14]/50 via-transparent to-[#070b14]" />
        </div>
    );
};

export default ITBackground3D;
