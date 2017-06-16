var WIDTH = window.innerWidth - 30,
    HEIGHT = window.innerHeight - 30;
var container = document.getElementById('container');

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, 0.1, 3000);
camera.position.set(0, 0, 0);

var renderer = new THREE.WebGLRenderer({antialiasing : true});
renderer.setSize(WIDTH, HEIGHT);

container.appendChild(renderer.domElement);

var light = new THREE.DirectionalLight(0xFFFFFF, 1, 0, Math.PI / 2, 1);
light.position.set(4000, 4000, 1500);
light.target.position.set (1000, 3800, 1000);
scene.add(light);

var earthGeo = new THREE.SphereGeometry (30, 40, 400),
    earthMat = new THREE.MeshPhongMaterial();

var loader = new THREE.TextureLoader();
earthMat.map=loader.load('images/earthmap1k.jpg');

var earthMesh = new THREE.Mesh(earthGeo, earthMat);
earthMesh.position.set(-100, 0, 0);
earthMesh.rotation.y=5;

scene.add(earthMesh);

camera.lookAt( earthMesh.position );


function animate() {
   requestAnimationFrame(animate);
   render();
}

function render() {
   earthMesh.rotation.y += 0.001;
   renderer.render(scene, camera);
}



animate();
