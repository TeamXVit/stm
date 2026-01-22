import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import * as random from 'maath/random/dist/maath-random.esm';

function Particles(props) {
    const ref = useRef();
    const [sphere] = useMemo(() => [random.inSphere(new Float32Array(3000), { radius: 10 })], []);

    useFrame((state, delta) => {
        ref.current.rotation.x -= delta / 10;
        ref.current.rotation.y -= delta / 15;
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
                <PointMaterial transparent color="#ef4444" size={0.03} sizeAttenuation={true} depthWrite={false} />
            </Points>
        </group>
    );
}

function InteractiveSphere({ basePosition, color, speed, distort, radius, size }) {
    const mesh = useRef();

    useFrame((state) => {
        if (mesh.current) {
            const { x, y } = state.pointer;
            // Smoothly move towards the mouse position relative to base position
            mesh.current.position.x = THREE.MathUtils.lerp(mesh.current.position.x, basePosition[0] + x * 2, 0.05);
            mesh.current.position.y = THREE.MathUtils.lerp(mesh.current.position.y, basePosition[1] + y * 2, 0.05);
        }
    });

    return (
        <Sphere ref={mesh} args={[size, 64, 64]} position={basePosition}>
            <MeshDistortMaterial
                color={color}
                speed={speed}
                distort={distort}
                radius={radius}
            />
        </Sphere>
    );
}

const Scene3D = ({ color = "#ef4444" }) => {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
            <Canvas camera={{ position: [0, 0, 15], fov: 75 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />

                <Particles />

                <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
                    <InteractiveSphere basePosition={[-5, 2, 0]} color={color} speed={3} distort={0.4} radius={1} size={1} />
                </Float>

                <Float speed={2} rotationIntensity={1.5} floatIntensity={1}>
                    <InteractiveSphere basePosition={[6, -3, 2]} color="#f97316" speed={2} distort={0.5} radius={1} size={0.8} />
                </Float>

                <Float speed={1} rotationIntensity={0.5} floatIntensity={3}>
                    <InteractiveSphere basePosition={[0, 0, -5]} color={color} speed={4} distort={0.3} radius={1} size={1.2} />
                </Float>
            </Canvas>
        </div>
    );
};

export default Scene3D;
