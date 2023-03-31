import * as THREE from 'https://unpkg.com/three/build/three.module.js';
import { GUI } from 'https://unpkg.com/dat.gui@0.7.9/build/dat.gui.module.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const spaceShip = new URL("./models/Spaceship/scene.gltf", import.meta.url);

//#region Initialization
/* Creating the render */

const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.setSize(window.innerWidth, window.innerHeight);

/* Appending the renderer to the canvas body */
document.body.append(renderer.domElement);

const scene = new THREE.Scene();
//#endregion

//#region Image Loading & Skybox...
const textureLoader = new THREE.TextureLoader();
const cubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = cubeTextureLoader.load([
    './images/skybox/right.png',
    './images/skybox/left.png',
    './images/skybox/top.png',
    './images/skybox/bottom.png',
    './images/skybox/front.png',
    './images/skybox/back.png'
]);

//#endregion

//#region Camera creation

/* Creating a perpective camera with FOV: 75, Size: window.innerWidth / window.innerHeight 
   Near Clipping Plane: 0.1 & Far Clipping Plane: 1000*/
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const orbit = new OrbitControls(camera, renderer.domElement);
camera.position.set(0, 2, 5);
orbit.update();


/*Initialing music */
const listener = new THREE.AudioListener();
camera.add(listener);

const sound = new THREE.Audio(listener);

const audioLoader = new THREE.AudioLoader();
audioLoader.load('./sounds/ambient.mp3', function(buffer) {
    sound.setBuffer(buffer);
    sound.setLoop(true);
    sound.setVolume(0.5);
    sound.play();
});

//#endregion

//#region Lighting Creation

/*DIRECTION LIGHT */
const directionLight = new THREE.DirectionalLight(THREE.Color.NAMES.whitesmoke, 1);
directionLight.castShadow = true;
directionLight.shadow.camera.bottom = -12;
directionLight.shadow.camera.top = 12;
directionLight.shadow.camera.left = -12;
directionLight.shadow.camera.right = 12;
directionLight.position.set(-30, 20, 10);

/*SPOTLIGHT */
const spotLight = new THREE.SpotLight(THREE.Color.NAMES.aqua);
spotLight.position.set(0, 7, 0);
spotLight.angle = 0.5;
spotLight.penumbra = 1.0;
spotLight.intensity = 2.0;
spotLight.castShadow = true;

/*AMBIENT LIGHT */
const ambientLight = new THREE.AmbientLight(THREE.Color.NAMES.darkgray);

scene.add(directionLight);
scene.add(ambientLight);
scene.add(spotLight);

/*FOG */
scene.fog = new THREE.Fog(THREE.Color.NAMES.whitesmoke, 0, 200);

//#endregion

//#region Geometry Creation... 
const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshStandardMaterial({
    map: textureLoader.load('./images/crateTexture.jpg')
});
const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
boxMesh.position.set(0, 2, 0);
boxMesh.castShadow = true;
scene.add(boxMesh);

const planeGeometry = new THREE.PlaneGeometry(30, 30);
const planeMaterial = new THREE.MeshStandardMaterial({
    map: textureLoader.load('./images/scifi_floor_texture.png'),
    side: THREE.DoubleSide
}) 
const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
planeMesh.rotation.x = -0.5 * Math.PI;
planeMesh.receiveShadow = true;
scene.add(planeMesh);

let loadedModel;
const gltfLoader = new GLTFLoader();
gltfLoader.load(spaceShip.href, function(gltf) {
    loadedModel = gltf;
    const model = gltf.scene;
    scene.add(model);
    model.position.set(-12, 10, 10);
    model.scale.set(0.1, 0.1, 0.1);
    model.traverse(function(node) {
        if(node.isMesh) {
            node.castShadow = true;
        }
    });
});
//#endregion

//#region Creating the axes helpers
const axesHelper = new THREE.AxesHelper(5);
const gridHelper = new THREE.GridHelper(50, 50);
const directionLightAxesHelper = new THREE.DirectionalLightHelper(directionLight);
const directionLightShadownHelper = new THREE.CameraHelper(directionLight.shadow.camera);
const spotlightHelper = new THREE.SpotLightHelper(spotLight);
scene.add(gridHelper);
scene.add(axesHelper);
scene.add(directionLightAxesHelper);
scene.add(directionLightShadownHelper);
scene.add(spotlightHelper);
/* End of axes helper creation */

//#region GUI Handling... 
const gui = new GUI();

const cubeOptions = {
    cubeColor: THREE.Color.NAMES.aqua,
    wireFrame: false
};

const spotLightOptions = {
    angle: 0.5,
    penumbra: 1,
    intensity: 2
} 

gui.addColor(cubeOptions, "cubeColor").onChange(function(e) { boxMesh.material.color.set(e); });
gui.add(cubeOptions, "wireFrame").onChange(function(e) { boxMesh.material.wireframe = e; });

gui.add(spotLightOptions, "angle", 0.1, 1).onChange(function(e) { spotLight.angle = e; });
gui.add(spotLightOptions, "penumbra", 0.1, 1).onChange(function(e) { spotLight.penumbra = e; });
gui.add(spotLightOptions, "intensity", 0.1, 1).onChange(function(e) { spotLight.intensity = e; });
//#endregion

//#region Raycasting

const mousePosition = new THREE.Vector2();

window.addEventListener('mousemove', function(e) {
    mousePosition.x = (e.clientX / window.innerWidth) * 2 - 1;
    mousePosition.y = -(e.clientY / window.innerHeight) * 2 + 1;
});

const rayCaster = new THREE.Raycaster();
const cubeID = boxMesh.id;

//#endregion

//#region MAIN RENDER LOOP
let step = 0;
function animate(time) {
    boxMesh.rotation.x = time / 1000;
    boxMesh.rotation.y = time / 1000;
    if(loadedModel) {
        step += 0.005;
        loadedModel.scene.position.y = 7 + ( 2 * Math.abs(Math.sin(step)));
        loadedModel.scene.position.z = 2 * Math.abs(Math.cos(step + Math.sin(step)));
    }
    else {
        console.error("could not load model...");
    }
    updateSpotlight();

    rayCaster.setFromCamera(mousePosition, camera);
    const interesects = rayCaster.intersectObjects(scene.children);
    for (let i = 0; i < interesects.length; i++) {
        const element = interesects[i];
        if(element.object.id === cubeID) {
            console.log("found cube");
        }
    }
    renderer.render(scene, camera);
}

function updateSpotlight() {
    spotLight.angle = spotLightOptions.angle;
    spotLight.penumbra = spotLightOptions.penumbra;
    spotLight.intensity = spotLightOptions.intensity;
    spotlightHelper.update();
}

renderer.setAnimationLoop(animate);

window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
//#endregion