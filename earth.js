var scene, camera, light, renderer, controls;
var earthGeo, earthMat, loader, earthMesh;
var WIDTH = window.innerWidth - 30,
    HEIGHT = window.innerHeight - 30;
var container = document.getElementById('container');

init();
render();

function init() {
  scene = new THREE.Scene();

  renderer = new THREE.WebGLRenderer({antialiasing : true});
  renderer.setSize(WIDTH, HEIGHT);
  container.appendChild(renderer.domElement);

  camera = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, 0.1, 3000);
  camera.position.set(0, 0, 0);

  controls = new THREE.OrbitControls( camera, renderer.domElement );
  controls.addEventListener( 'change', render );

  earthGeo = new THREE.SphereGeometry (30, 40, 400)
  earthMat = new THREE.MeshPhongMaterial();
  loader = new THREE.TextureLoader();
  earthMat.map=loader.load('images/earthmap1k.jpg', render);
  earthMesh = new THREE.Mesh(earthGeo, earthMat);
  earthMesh.position.set(-100, 0, 0);
  earthMesh.rotation.y=3.7;
  earthMesh.rotation.z=0.5;
  scene.add(earthMesh);

  camera.lookAt( earthMesh.position );

  light = new THREE.DirectionalLight(0xFFFFFF, 1, 0, Math.PI / 2, 1);
  light.position.set(4000, 4000, 1500);
  light.target.position.set (1000, 3800, 1000);
  scene.add(light);

}

function render() {
  renderer.render( scene, camera );
}



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
