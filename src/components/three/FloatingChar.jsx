import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text3D, Center, Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

const FloatingChar = ({ char, color = "#ef4444" }) => {
    const mesh = useRef();

    useFrame((state) => {
        if (mesh.current) {
            mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
            mesh.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <Center>
                <Text3D
                    ref={mesh}
                    font="/fonts/font.json" // We'll need to provide a font or use a simple shape if font is missing
                    size={4}
                    height={0.5}
                    curveSegments={12}
                    bevelEnabled
                    bevelThickness={0.02}
                    bevelSize={0.02}
                    bevelOffset={0}
                    bevelSegments={5}
                >
                    {char}
                    <MeshDistortMaterial
                        color={color}
                        speed={2}
                        distort={0.3}
                        radius={1}
                    />
                </Text3D>
            </Center>
        </Float>
    );
};

export default FloatingChar;
