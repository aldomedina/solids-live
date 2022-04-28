import { useEffect } from "react";
import * as THREE from "three";
import { TeapotGeometry } from "three/examples/jsm/geometries/TeapotGeometry.js";
import {
  OrbitControls,
  HalftonePass,
  EffectComposer,
  RenderPass,
} from "three-stdlib";
import material from "../teapot/material";
import materialBG from "../teapot/material-bg";
// UTILS

const randomInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const Teapot = () => {
  useEffect(() => {
    const size = 50;
    const segments = 85;
    const bottom = true;
    const lib = true;
    const body = true;
    const fitLid = true;
    const blinn = true;

    const geometry = new TeapotGeometry(
      size,
      segments,
      bottom,
      lib,
      body,
      fitLid,
      blinn
    );
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.autoRotate = false;
    controls.update();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    let vCheck = false;
    const teapot = new THREE.Mesh(geometry, material());
    scene.add(teapot);

    const geometryPlane = new THREE.PlaneGeometry(
      window.innerWidth / 2,
      400,
      100,
      100
    );
    let mesh = new THREE.Mesh(geometryPlane, materialBG());
    mesh.position.set(-200, 270, -280);
    mesh.scale.multiplyScalar(4);
    mesh.rotationX = -1.0;
    mesh.rotationY = 0.0;
    mesh.rotationZ = 0.1;
    scene.add(mesh);

    camera.position.z = 50;
    const R = function (x, y, t) {
      return Math.floor(192 + 64 * Math.cos((x * x - y * y) / 300 + t));
    };

    const G = function (x, y, t) {
      return Math.floor(
        192 +
          64 *
            Math.sin((x * x * Math.cos(t / 4) + y * y * Math.sin(t / 3)) / 300)
      );
    };

    const B = function (x, y, t) {
      return Math.floor(
        192 +
          64 *
            Math.sin(
              5 * Math.sin(t / 9) +
                ((x - 100) * (x - 100) + (y - 100) * (y - 100)) / 1100
            )
      );
    };
    let t = 0;
    let j = 0;
    let x = randomInteger(0, 32);
    let y = randomInteger(0, 32);
    function animate() {
      controls.update();
      requestAnimationFrame(animate);
      //   teapot.rotation.y += 0.002;
      teapot.material.uniforms.u_randomisePosition.value = new THREE.Vector2(
        j,
        j
      );
      teapot.material.uniforms.u_color1.value = new THREE.Vector3(
        R(x, y, t / 2),
        G(x, y, t / 2),
        B(x, y, t / 2)
      );
      teapot.material.uniforms.u_time.value = t;
      mesh.material.uniforms.u_randomisePosition.value = new THREE.Vector2(
        j,
        j
      );
      mesh.material.uniforms.u_color1.value = new THREE.Vector3(
        R(x, y, t / 2),
        G(x, y, t / 2),
        B(x, y, t / 2)
      );
      mesh.material.uniforms.u_time.value = t;
      if (t % 0.1 == 0) {
        if (vCheck == false) {
          x -= 1;
          if (x <= 0) {
            vCheck = true;
          }
        } else {
          x += 1;
          if (x >= 32) {
            vCheck = false;
          }
        }
      }

      // Increase t by a certain value every frame
      j = j + 0.01;
      t = t + 0.05;

      renderer.render(scene, camera);
    }

    animate();

    window.addEventListener("resize", onWindowResize);

    function onWindowResize() {
      const canvasWidth = window.innerWidth;
      const canvasHeight = window.innerHeight;

      renderer.setSize(canvasWidth, canvasHeight);

      camera.aspect = canvasWidth / canvasHeight;
      camera.updateProjectionMatrix();
    }
  }, []);
  return <></>;
};

export default Teapot;
