import { useFrame, useLoader } from "@react-three/fiber";
import { useEffect } from "react";
import { RepeatWrapping, TextureLoader } from "three";

export function FloatingGrid() {
  const diffuse = useLoader(
    TextureLoader,
    process.env.PUBLIC_URL + "textures/grid-texture.png"
  );

  useEffect(() => {
    diffuse.wrapS = RepeatWrapping;
    diffuse.wrapT = RepeatWrapping;
    diffuse.anisotropy = 4;
    diffuse.repeat.set(30, 30); // the # in the specified area below
    diffuse.offset.set(0, 0);
  }, [diffuse]);

  useFrame((state, delta) => {
    let t = -state.clock.getElapsedTime() * 0.68;
    diffuse.offset.set(0, t);
  }); // This is one way of creating movement for the wrapped elements. Other way is changing the position.

  return (
    <>
      <mesh rotation-x={-Math.PI * 0.5} position={[0.0, 0.025, 0]}>
        <planeGeometry args={[35, 35]} />
        <meshBasicMaterial
          color={[1, 1, 1]}
          opacity={0.15}
          map={diffuse}
          alphaMap={diffuse} // Meaning is black colors are transparent, white colors are opaque with the help of transparent property below
          transparent={true}
        />
      </mesh>
    </>
  );
}
