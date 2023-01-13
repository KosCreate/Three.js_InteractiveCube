import { OrbitControls } from "./OrbitControls.js";

let camera,scene, renderer;
let directionalLight1,spotLight, orbitControls,ambientLight; 
let showCube = false, showSphere = false, showMultiMesh = true;
const material = new THREE.MeshToonMaterial( {color: 0x6C0BA9} );
let mesh;
let createdMesh = false;
const amount = parseInt(window.location.search.slice(1)) || 10;
const count = Math.pow(amount, 3);
const color = new THREE.Color();
const white = new THREE.Color().setHex( 0xffffff );
let speed = 0.01, step = 0;
const gui = new dat.GUI();

initialize();
animate();
updatedSettings();


function initialize() {
    //Create a scene...
    let width = window.innerWidth;
    let height = window.innerHeight;
    scene = new THREE.Scene(); 
    //scene.fog = new THREE.Fog(0XFFFFF, 0, 150);
    scene.fog = new THREE.FogExp2(0xFFFFFF, 0.01);
    //Create a camera and define the perspective -> Orthographic or perspective
    camera = new THREE.PerspectiveCamera( 70, width/height, 0.1, 1000 );
    camera.position.set(amount + 15, amount + 15, amount + 15);
    camera.lookAt(0, 0, 0);

    //Initialize the renderer
    renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

     //Orbit Controls
     orbitControls = new OrbitControls(camera, renderer.domElement);
     orbitControls.listenToKeyEvents(window)
     orbitControls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
     orbitControls.enableZoom = true;
     orbitControls.enablePan = false;
     orbitControls.minDistance = 10;
     orbitControls.maxDistance = 100;

    //Creating axes helpers...
    const axes = new THREE.AxesHelper(10);
    scene.add(axes);

    const gridHelper = new THREE.GridHelper(100, 25);
    scene.add(gridHelper);
    //#region Creating the lights

    //Create two directional Lights...
    directionalLight1 = new THREE.DirectionalLight(0x192841);
    const directionalLight1Helper = new THREE.DirectionalLightHelper(directionalLight1, 5);
    directionalLight1.position.set(-35, 40, 0);
    scene.add(directionalLight1);
    scene.add(directionalLight1Helper);

    //Create ambient light...
    ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

     //Create a spotlight
     spotLight = new THREE.SpotLight(0xffffff, 1.5 );
     spotLight.position.y = 35;
     spotLight.intensity = 0.5;
     spotLight.castShadow = true;
     const spotlightHelper = new THREE.SpotLightHelper(spotLight);
     scene.add( spotLight );
     scene.add(spotlightHelper);
     spotLight.angle = Math.PI / 9;
     spotLight.castShadow = true;
    //#endregion

    //#region Creating scene objects
    
    //Create a number of objects from the same geometry...
    const planeGeometry = new THREE.PlaneGeometry(100, 100, 50, 50);
    const phongMaterial = new THREE.MeshLambertMaterial(white);
    const planeMesh = new THREE.Mesh(planeGeometry, phongMaterial);
    planeMesh.receiveShadow = true;
    planeMesh.rotation.x = -0.5 * Math.PI;
    scene.add(planeMesh);
    const geometry = new THREE.SphereGeometry(0.5, 64, 64);
    mesh = new THREE.InstancedMesh(geometry, material, count);
    let i = 0;
    const offset = (amount - 2) / 2 
    const matrix = new THREE.Matrix4();
    for ( let x = 0; x < amount; x++) {
        for(let y = 0; y < amount; y++) {
            for(let z = 0; z < amount; z++) {
                matrix.setPosition(offset - x, offset - y, offset - z);
                
                mesh.setMatrixAt(i, matrix);
                mesh.setColorAt(i, color);
                i++;
            }
        }
    }
    mesh.castShadow = true;
    scene.add(mesh);
    //#endregion

    //GUI Handling...
    
    const options = 
    {
        objectColor : '#6C0BA9',
        speed: 0.01
    };

    const geometryOptions = 
    {
        multi : false,
        cube : false,
        sphere : false
    }; 

    const lightingOptions = 
    {
        spotlightRadius : 9.0,
        spotlightPositionX : 0,
        spotlightPositionY : 0,
        spotlightPositionZ : 0,
        directionalLightPositionX : 0,
        directionalLightPositionY : 0,
        directionalLightPositionZ : 0,
        directionalLightRotationX : 0,
        directionalLightRotationY : 0,
        directionalLightRotationZ : 0,
        directionalLightIntensity : 0,
        spotlightIntensity : 0.0
    };

    var generalOptions = gui.addFolder('General Options');
    generalOptions.addColor(options, 'objectColor').onChange(function(e) { mesh.material.color.set(e); });
    generalOptions.add(options, 'speed', 0, 1).onChange(function(e) { speed = e; });
    var lightSettings = gui.addFolder('Lighting Settings');
    lightSettings.add(lightingOptions, 'spotlightRadius', 0 , 20).onChange(function(e) {
        spotLight.angle = Math.PI / e;
    });
    lightSettings.add(lightingOptions, 'spotlightPositionX', -100.0, 100.0).onChange(function(e) { spotLight.position.x = e; });
    lightSettings.add(lightingOptions, 'spotlightPositionY', -100.0, 100.0).onChange(function(e) { spotLight.position.y = e; });
    lightSettings.add(lightingOptions, 'spotlightPositionZ', -100.0, 100.0).onChange(function(e) { spotLight.position.z = e; });
    lightSettings.add(lightingOptions, 'directionalLightPositionX', -100.0, 100.0).onChange(function(e) { directionalLight1.position.x = e; });
    lightSettings.add(lightingOptions, 'directionalLightPositionY', -100.0, 100.0).onChange(function(e) { directionalLight1.position.y = e; });
    lightSettings.add(lightingOptions, 'directionalLightPositionZ', -100.0, 100.0).onChange(function(e) { directionalLight1.position.z = e; });
    lightSettings.add(lightingOptions, 'directionalLightRotationX', 0, 360).onChange(function(e) { directionalLight1.rotation.x = e; });
    lightSettings.add(lightingOptions, 'directionalLightRotationY', 0, 360).onChange(function(e) { directionalLight1.rotation.y = e; });
    lightSettings.add(lightingOptions, 'directionalLightRotationZ', 0, 360).onChange(function(e) { directionalLight1.rotation.z = e; });
    lightSettings.add(lightingOptions, 'spotlightIntensity', 0.0, 1.0).onChange(function(e) { spotLight.intensity = e; });
    lightSettings.add(lightingOptions, 'directionalLightIntensity', 0.0, 1.0).onChange(function(e) { directionalLight1.intensity = e; });
    var geometrySettings = gui.addFolder('Geometry Settings');
    geometrySettings.add(geometryOptions, 'multi').onChange(function(e) { setGeometryToShow(1, e); });
    geometrySettings.add(geometryOptions, 'cube').onChange(function(e) { setGeometryToShow(2, e); });
    geometrySettings.add(geometryOptions, 'sphere').onChange(function(e) { setGeometryToShow(3, e); });
    window.addEventListener('resize', onWindowResize);
    render();
};

function setGeometryToShow(geometryIndexToShow, create) {
    showMultiMesh = geometryIndexToShow === 1;
    showCube = geometryIndexToShow === 2;
    showSphere = geometryIndexToShow === 3;
    createdMesh = !create;
}

function animate(time) {
    requestAnimationFrame(animate);
    orbitControls.update();
    handleDifferentGeometry(); 
    step += speed;
    mesh.position.y = 10 * Math.abs(Math.sin(step));
    render();
};

function handleDifferentGeometry()
{
    if(showMultiMesh) {
        if(!createdMesh) {
            scene.remove(mesh);
            const geometry = new THREE.SphereGeometry(0.5, 64, 64);
            mesh = new THREE.InstancedMesh(geometry, material, count);
            let i = 0;
            const offset = (amount - 2) / 2 
            const matrix = new THREE.Matrix4();
            for ( let x = 0; x < amount; x++) {
                for(let y = 0; y < amount; y++) {
                    for(let z = 0; z < amount; z++) {
                        matrix.setPosition(offset - x, offset - y, offset - z);
                        
                        mesh.setMatrixAt(i, matrix);
                        mesh.setColorAt(i, color);
                        i++;
                    }
                }
            }
            mesh.castShadow = true;
            scene.add(mesh);
            createdMesh = true;
        }
    }

    if(showCube) {
        if(!createdMesh) {
            scene.remove(mesh);
            const cubeGeometry = new THREE.BoxGeometry(5, 5, 5);
            mesh = new THREE.Mesh(cubeGeometry, material);
            scene.add(mesh);
            createdMesh = true;
        }
    }

    if(showSphere) {
        if(!createdMesh) {
            scene.remove(mesh);
            const sphereGeometry = new THREE.SphereGeometry(10, 64, 64);
            mesh = new THREE.Mesh(sphereGeometry, material);
            scene.add(mesh);
            createdMesh = true;
        }
    }
};

function render() {
    renderer.render(scene, camera);
};

function onWindowResize() {
    camera.aspect =  window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function updatedSettings() {
    const positionSettings = {
        positionX: 0,
        positionY: 0,
        positionZ: 0,
        scaleX: 0,
        scaleY: 0,
        scaleZ: 0,
        rotationX:0,
        rotationY:0,
        rotationZ: 0,
        resetPosition: false,
        resetScale: false,
        resetRotation: false
    }
    var positionFolder = gui.addFolder('Mesh Transform');
    positionFolder.add(positionSettings, 'positionX', -100.0, 100.0).onChange(function(e) { mesh.position.x = e; });
    positionFolder.add(positionSettings, 'positionY', -100.0, 100.0).onChange(function(e) { mesh.position.y = e; });
    positionFolder.add(positionSettings, 'positionZ', -100.0, 100.0).onChange(function(e) { mesh.position.z = e; }); 
    positionFolder.add(positionSettings, 'scaleX', 0.0, 2.0).onChange(function(e) { mesh.scale.x = e; });
    positionFolder.add(positionSettings, 'scaleY', 0.0, 2.0).onChange(function(e){ mesh.scale.y = e });
    positionFolder.add(positionSettings, 'scaleZ', 0.0, 2.0).onChange(function(e){ mesh.scale.z = e });
    positionFolder.add(positionSettings, 'rotationX', 0, Math.PI).onChange(function(e) { mesh.rotation.x = e; });
    positionFolder.add(positionSettings, 'rotationY', 0, Math.PI).onChange(function(e){ mesh.rotation.y = e });
    positionFolder.add(positionSettings, 'rotationZ',  0, Math.PI).onChange(function(e){ mesh.rotation.z = e });
    positionFolder.add(positionSettings, 'resetPosition').onChange(function(e) {
        if(e) { mesh.position.set(0, 0, 0); }
    });
    positionFolder.add(positionSettings, 'resetScale').onChange(function(e){ if(e) { mesh.scale.set(1, 1, 1) } });
    positionFolder.add(positionSettings, 'resetRotation').onChange(function(e){ if(e) { mesh.rotation.set(0, 0, 0) } });
}