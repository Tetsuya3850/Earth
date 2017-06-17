var scene, camera, light, renderer, controls, stats;
var earthGeo, earthMat, loader, earthMesh;
var WIDTH = window.innerWidth - 30,
    HEIGHT = window.innerHeight - 30;
var container = document.getElementById('container');

function init() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, 0.1, 3000);

  renderer = new THREE.WebGLRenderer({antialiasing : true});
  renderer.setSize(WIDTH, HEIGHT);

  earthGeo = new THREE.SphereGeometry (30, 40, 400)
  earthMat = new THREE.MeshNormalMaterial();
  earthMesh = new THREE.Mesh(earthGeo, earthMat);
  earthMesh.position.set(-100, 0, 0);
  earthMesh.rotation.y=3.7;
  earthMesh.rotation.z=0.5;
  scene.add(earthMesh);

  camera.position.set(0, 0, 0);
  camera.lookAt( earthMesh.position );

  controls = new THREE.OrbitControls( camera );

  

  addStatsObject();

  container.appendChild(renderer.domElement);

  render();
}

function addStatsObject() {
    stats = new Stats();
    stats.setMode(0);

    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';

    document.body.appendChild( stats.domElement );
}

function render() {
  stats.update();
  controls.update();
  renderer.render( scene, camera );
  requestAnimationFrame(render);
}

function handleResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.onload = init;

window.addEventListener('resize', handleResize, false);



/*
function animate() {
   requestAnimationFrame(animate);
   render();
}
function render() {
   earthMesh.rotation.y += 0.001;
   renderer.render(scene, camera);
}
animate();
*/
