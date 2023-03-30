import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import back from '../images/skybox/back.png'
import bottom from '../images/skybox/bottom.png'
import front from '../images/skybox/front.png'
import left from '../images/skybox/left.png'
import right from '../images/skybox/right.png'
import top from '../images/skybox/top.png'
import scifiFloor from '../images/scifi_floor_texture.png'
import crateTexture from '../images/crateTexture.jpg'

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
    right,
    left,
    top,
    bottom,
    front,
    back
]);

//#endregion

//#region Camera creation

/* Creating a perpective camera with FOV: 75, Size: window.innerWidth / window.innerHeight 
   Near Clipping Plane: 0.1 & Far Clipping Plane: 1000*/
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const orbit = new OrbitControls(camera, renderer.domElement);
camera.position.set(0, 2, 5);
orbit.update();

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
    map: textureLoader.load(crateTexture)
});
const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
boxMesh.position.set(0, 2, 0);
boxMesh.castShadow = true;
scene.add(boxMesh);

const planeGeometry = new THREE.PlaneGeometry(30, 30);
const planeMaterial = new THREE.MeshStandardMaterial({
    map: textureLoader.load(scifiFloor),
    side: THREE.DoubleSide
}) 
const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
planeMesh.rotation.x = -0.5 * Math.PI;
planeMesh.receiveShadow = true;
scene.add(planeMesh);
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
const gui = new dat.GUI();

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
function animate(time) {
    boxMesh.rotation.x = time / 1000;
    boxMesh.rotation.y = time / 1000;
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
//#endregion