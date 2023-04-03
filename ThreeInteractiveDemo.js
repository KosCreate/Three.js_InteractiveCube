import * as THREE from 'https://unpkg.com/three/build/three.module.js';
//import * as THREE from 'three'
import { GUI } from 'https://unpkg.com/dat.gui@0.7.9/build/dat.gui.module.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const spaceShip = new URL("./models/Spaceship/scene.gltf", import.meta.url);
const castleURL = new URL("./models/castle/scene.gltf", import.meta.url);

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
initializeAudio();

function initializeAudio() {
    const listener = new THREE.AudioListener();
    camera.add(listener);

    const sound = new THREE.Audio(listener);

    const audioLoader = new THREE.AudioLoader();
    audioLoader.load('./sounds/ambient.mp3', function(buffer)
    {
        sound.setBuffer(buffer);
        sound.setLoop(true);
        sound.setVolume(0.5);
        sound.play();
    });
}

//#endregion
//#region Lighting Creation

/*DIRECTION LIGHT */
createDirectionalLight(THREE.Color.NAMES.whitesmoke, 1);

/*SPOTLIGHT */
const spotlights = [];
const spotlightHelpers = [];
createSpotlight(THREE.Color.NAMES.aqua, new THREE.Vector3(0, 20, 0), 1, 1, 0.5, true);
createSpotlight(THREE.Color.NAMES.aqua, new THREE.Vector3(-10, 20, 0), 1, 1, 0.5, true);
createSpotlight(THREE.Color.NAMES.aqua, new THREE.Vector3(10, 20, 0), 1, 1, 0.5, true);

/*AMBIENT LIGHT */
createAmbientLight(THREE.Color.NAMES.darkgray);

/*FOG */
scene.fog = new THREE.Fog(THREE.Color.NAMES.whitesmoke, 0, 200);

function createSpotlight(color, position, angle, penumbra, intensity, castShadow) {
    const spotLight = new THREE.SpotLight(color);
    const spotlightHelper = new THREE.SpotLightHelper(spotLight);
    spotLight.position.set(position.x, position.y, position.z);
    spotLight.angle = angle;
    spotLight.penumbra = penumbra;
    spotLight.intensity = intensity;
    spotLight.castShadow = castShadow;
    spotlights.push(spotLight);
    spotlightHelpers.push(spotlightHelper);
    scene.add(spotLight);
    scene.add(spotlightHelper);
}

function createDirectionalLight(lightColor, intensity) {
    const directionLight = new THREE.DirectionalLight(lightColor, intensity);
    const directionLightAxesHelper = new THREE.DirectionalLightHelper(directionLight);
    const directionLightShadownHelper = new THREE.CameraHelper(directionLight.shadow.camera);
    directionLight.castShadow = true;
    directionLight.shadow.camera.bottom = -12;
    directionLight.shadow.camera.top = 12;
    directionLight.shadow.camera.left = -12;
    directionLight.shadow.camera.right = 12;
    directionLight.position.set(-30, 20, 10);
    scene.add(directionLight);
    scene.add(directionLightAxesHelper);
    scene.add(directionLightShadownHelper);
}

function createAmbientLight(color) {
    const ambientLight = new THREE.AmbientLight(color);
    scene.add(ambientLight);
}

//#endregion

//#region Geometry Creation... 


createPlane();

function createBox() {
    const boxGeometry = new THREE.BoxGeometry();
    const boxMaterial = new THREE.MeshStandardMaterial({
        map: textureLoader.load('./images/crateTexture.jpg')
    });
    const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
    boxMesh.position.set(0, 2, 0);
    boxMesh.castShadow = true;
    scene.add(boxMesh);
}

function createPlane() {
    const planeGeometry = new THREE.PlaneGeometry(30, 30);
    const planeMaterial = new THREE.MeshStandardMaterial({
        map: textureLoader.load('./images/scifi_floor_texture.png'),
        side: THREE.DoubleSide
    }) 
    const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
    planeMesh.rotation.x = -0.5 * Math.PI;
    planeMesh.receiveShadow = true;
    scene.add(planeMesh);
}

let loadedModel;
const gltfLoader = new GLTFLoader();
gltfLoader.load(castleURL.href, function(gltf) {
    modelLoadingHandling(gltf, new THREE.Vector3(0, 5, 0), new THREE.Vector3(3, 3, 3));
});
//#endregion

function modelLoadingHandling(gltf, position, scale){
    const model = gltf.scene;
    loadedModel = model;
    model.traverse(function(node) {
        if(node.isMesh) {
            node.castShadow = true;
        }
    });
    model.position.set(position.x, position.y, position.z);
    model.scale.set(scale.x, scale.y, scale.z);
    model.isDraggable = true;
    scene.add(model);
}

//#region Creating the axes helpers
const axesHelper = new THREE.AxesHelper(5);
const gridHelper = new THREE.GridHelper(50, 50);
scene.add(gridHelper);
scene.add(axesHelper);

/* End of axes helper creation */

//#region GUI Handling... 
const gui = new GUI();

const spotLightOptions = {
    spotlightColor: THREE.Color.NAMES.aqua,
    angle: 0.5,
    penumbra: 1,
    intensity: 1
}

gui.add(spotLightOptions, "angle", 0.1, 1).onChange(function(e) { 
    spotlights.forEach(function(node) {
        node.angle = e; 
    });
});
gui.add(spotLightOptions, "penumbra", 0.1, 1).onChange(function(e) {
    spotlights.forEach(function(node) {
        node.penumbra = e; 
    });
});
gui.add(spotLightOptions, "intensity", 0.1, 1).onChange(function(e) {
    spotlights.forEach(function(node) {
        node.intensity = e; 
    }); 
});

gui.addColor(spotLightOptions, "spotlightColor").onChange(function(color) {
    spotlights.forEach(function(node){
        node.color = color;
    }); 
});

//#endregion

//#region Raycasting

const mousePosition = new THREE.Vector2();

window.addEventListener('mousemove', onPointerMove);

function onPointerMove(eventPosition) {
    dragObject();
    mousePosition.x = (eventPosition.clientX / window.innerWidth) * 2 - 1;
    mousePosition.y = -(eventPosition.clientY / window.innerHeight) * 2 + 1;
}

const rayCaster = new THREE.Raycaster();
let draggableObject;
//#endregion

//#region MAIN RENDER LOOP
let step = 0;
function animate(time) {
    //moveAnimateModel();

    updateSpotlight();
    renderer.render(scene, camera);
}

function moveAnimateModel() {
   if(loadedModel) {
        step += 0.005;
        loadedModel.position.y = 7 + ( 2 * Math.abs(Math.sin(step)));
        loadedModel.position.z = 2 * Math.abs(Math.cos(step + Math.sin(step)));
    }
    else {
        console.error("could not load model...");
    }
}

function updateSpotlight() {
    spotlights.forEach(function(node) {
        node.angle = spotLightOptions.angle;
        node.penumbra = spotLightOptions.penumbra;
        node.intensity = spotLightOptions.intensity;
    });
    spotlightHelpers.forEach(function(node) {
        node.update();
    });
}

renderer.setAnimationLoop(animate);

window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

const mouseClick = new THREE.Vector2();

window.addEventListener('click', event => {
    if(draggableObject) {
        draggableObject = undefined;
        return;
    }
    mouseClick.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouseClick.y = - (event.clientY / window.innerHeight) * 2 + 1;
    rayCaster.setFromCamera(mouseClick, camera);
    const found = rayCaster.intersectObjects(scene.children);
    if(found.length) {
        let current = found[0].object;
        while(current.parent.parent !== null) {
            current = current.parent;
        }
        if(current.isDraggable) {
            draggableObject = current;
        }
    }
});

function dragObject() {
    if(draggableObject) {
        const found = rayCaster.intersectObjects(scene.children);
        if(found.length) {
            for (let obj3d of found) {
                if(!obj3d.object.isDraggable) {
                    draggableObject.position.x = obj3d.point.x;
                    draggableObject.position.z = obj3d.point.z;
                    break;
                }
            }
        }
    }
};
//#endregion
