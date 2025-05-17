import React from "react";
import { Canvas } from "@react-three/fiber";
import { Box, PositionPoint } from "@react-three/drei";
import { OrbitControls } from "@react-three/drei";

// function CardboardBox({ data }) {
function CardboardBox() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas camera={{ position: [3, 3, 3], fov: 50 }}>
        <ambientLight />
        <directionalLight position={[2, 2, 5]} />
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color={"#d2a679"} />
        </mesh>
        <OrbitControls /> don't need just lets you move the box around on its
        axis
      </Canvas>
    </div>
  );
}

export default CardboardBox;
