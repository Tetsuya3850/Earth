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
  earthMesh = new THREE.Mesh(earthGeo, earthMat);
  earthMesh.position.set(-100, 0, 0);
  earthMesh.rotation.y=3.7;
  earthMesh.rotation.z=0.5;
  scene.add(earthMesh);

  loader = new THREE.TextureLoader();
  loader.load('images/earthmap1k.jpg',
    // Function when resource is loaded
  	function ( texture ) {
  		// do something with the texture
  		earthMat.map = texture
  	},
  	// Function called when download progresses
  	function ( xhr ) {
  		console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
  	},
  	// Function called when download errors
  	function ( xhr ) {
  		console.log( 'An error happened' );
  	});

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
