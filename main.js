(function() {
  var script = document.createElement("script");
  script.onload = function() {
    var stats = new Stats();
    document.body.appendChild(stats.dom);
    requestAnimationFrame(function loop() {
      stats.update();
      requestAnimationFrame(loop);
    });
  };
  script.src = "//mrdoob.github.io/stats.js/build/stats.min.js";
  document.head.appendChild(script);
})();

const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("myCanvas"),
  antialias: true,
  alpha: true
});

renderer.setClearColor(0xdcdcdc);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

//Update viewport on resize
window.addEventListener("resize", function() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
});

// 1) CAMERA \\
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  1,
  1000
);
camera.position.set(0, 0, 50);

// 2) SCENE \\
const scene = new THREE.Scene();

// 3) LIGHT \\
const light = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(light);
const pointedLight = new THREE.PointLight(0xffffff, 0.5);
scene.add(pointedLight);

var light3;
//red
light3 = new THREE.DirectionalLight(0xdc143c, 1);
light3.position.set(0, 1, 0);
scene.add(light3);

//blue lagoon
light3 = new THREE.DirectionalLight(0x095062, 1);
light3.position.set(0, -1, 0);
scene.add(light3);

// 4) CONTROLS \\
controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.maxDistance = 200;

// 5) GEOMETRY + MATERIAL \\

// Center geometry
const geometry = new THREE.DodecahedronBufferGeometry(1, 0);
const centerGeometry = new THREE.DodecahedronBufferGeometry(7, 4);

let material = new THREE.MeshLambertMaterial({
  color: 0xdcdcdc,
  wireframe: true
});
const centerMesh = new THREE.Mesh(centerGeometry, material);
scene.add(centerMesh);

// orbiting geometry dust
const shapeCount = 1000;
for (let i = 0; i < shapeCount; i++) {
  material = new THREE.MeshStandardMaterial({ color: 0xdcdcdc });
  const mesh = new THREE.Mesh(geometry, material);
  const px = Math.random() * 100 - 50,
    py = Math.random() * 100 - 50,
    pz = Math.random() * 100 - 50;
  const rx = Math.random() * Math.PI * 2,
    ry = Math.random() * Math.PI * 2,
    rz = Math.random() * Math.PI * 2;
  const scale = Math.random() * 0.5;
  mesh.position.set(px, py, pz);
  mesh.rotation.set(rx, ry, rz);
  mesh.scale.set(scale, scale, scale);

  scene.add(mesh);
}

// 6) RENDER LOOP \\
requestAnimationFrame(render);

function render() {
  // centerMesh.rotation.x += 0.02;
  centerMesh.rotation.y -= 0.02;
  scene.rotation.y += 0.001;

  renderer.render(scene, camera);
  requestAnimationFrame(render);
  controls.update();
  // ccapture
  // capturer.capture(myCanvas);
}
//cccapture gif

// capturer.start();
// setTimeout(function setUp() {
//   capturer.stop();
//   capturer.save();
// }, 7000);
