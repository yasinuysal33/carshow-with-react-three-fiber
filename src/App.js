import {
  CubeCamera,
  Environment,
  OrbitControls,
  PerspectiveCamera,
  Html,
  useProgress,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import {
  Bloom,
  ChromaticAberration,
  DepthOfField,
  EffectComposer,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import React, { Suspense } from "react";
import { Boxes } from "./Boxes";
import { Car } from "./Car";
import { FloatingGrid } from "./FloatinGrid";
import { Ground } from "./Ground";
import { Rings } from "./Rings";
import "./style.css";
import LoadingSpinner from "./ui/LoadingSpinner";

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <LoadingSpinner />
      <div className="loading">{Math.round(progress)}%</div>
    </Html>
  );
}

function CarShow() {
  return (
    <>
      <OrbitControls target={[0, 0.35, 0]} maxPolarAngle={2.45} />
      <PerspectiveCamera makeDefault fov={50} position={[3, 2, 5]} />
      <color args={[0, 0, 0]} attach="background" />
      <CubeCamera resolution={256} frames={Infinity}>
        {(texture) => (
          <>
            <Environment map={texture} />
            <Car />
            {/* Elements out of Environement component are exluded from the render list of the Environment for the reflection attitude. That means every element except the car is rendered as environment. Very good for car reflections. Shortly all reflections will be directed to the exluded elements*/}
          </>
        )}
      </CubeCamera>

      <Rings />
      <Boxes />
      <FloatingGrid />

      {/* <Cloud opacity={0.5} speed={0.1} width={30} depth={0.1} segments={40} /> */}

      <spotLight
        color={[1, 0.25, 0.7]}
        intensity={1.5}
        angle={0.6}
        penumbra={0.5}
        position={[5, 5, 0]}
        castShadow
        shadow-bias={-0.0001}
      />
      <spotLight
        color={[0.14, 0.5, 1]}
        intensity={2}
        angle={0.6}
        penumbra={0.5}
        position={[-5, 5, 0]}
        castShadow
        shadow-bias={-0.0001}
      />

      <Ground />

      <EffectComposer>
        {/* <DepthOfField focusDistance={0.0035} focalLength={0.01} bokehScale={3} height={480} />  // blurring effect for after a specific distance */}
        <DepthOfField
          focusDistance={0.0035}
          focalLength={0.01}
          bokehScale={3}
          height={480}
        />
        <Bloom
          blendFunction={BlendFunction.ADD}
          intensity={1.3} // The bloom intensity.
          resolutionX={300} // render width
          resolutionY={300} // render height
          kernelSize={5} // blur kernel size
          luminanceThreshold={0.15} // luminance threshold. Raise this value to mask out darker elements in the scene.
          luminanceSmoothing={0.025} // smoothness of the luminance threshold. Range is [0, 1]
        />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL} // blend mode
          offset={[0.0, 0.0]} // color offset -- like Expanding a new copy of the elements like trembling
        />
      </EffectComposer>
      {/* <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color={"red"} />
      </mesh> */}
    </>
  );
}

function App() {
  return (
    <Canvas shadows>
      <Suspense fallback={<Loader />}>
        <CarShow />
      </Suspense>
    </Canvas>
  );
}

export default App;
