const threejsCanvas = document.querySelector('#threejs-canvas');
let width = threejsCanvas.offsetWidth;
let height = threejsCanvas.offsetHeight;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(70, width / height, 1, 1000);
camera.position.set(10, 10, 10);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer(
    {
        antialias: true,
        alpha: true
    }
);

renderer.setSize(width, height); 
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
threejsCanvas.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(5, 5, 5);
const material = new THREE.MeshBasicMaterial();
const cubeMesh = new THREE.Mesh(geometry, material);
scene.add(cubeMesh);

animationLoop();

window.addEventListener('resize', onWindowResize);

function animationLoop() {
    render();
    cubeMesh.rotation.x += 0.01;
    cubeMesh.rotation.y += 0.01;
}

function render() {
    renderer.render(scene, camera);
    window.requestAnimationFrame(animationLoop);
}

function onWindowResize() {
    width = threejsCanvas.offsetWidth;
    height = threejsCanvas.offsetHeight;

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
}