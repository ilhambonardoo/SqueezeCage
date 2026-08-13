import { useGLTF } from "@react-three/drei";

export default function Box() {
  const gltf = useGLTF("/3D/box.glb");

  return <primitive object={gltf.scene} scale={1} position={[0, -1, 0]} />;
}

useGLTF.preload("/3D/box.glb");
