import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.001, 1000);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#project')
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const gridHelper = new THREE.GridHelper(200, 50);
scene.add(gridHelper);

camera.position.z = 30;

// Если хочу добиться вращения вокруг своей оси надо юзать квантернионы
//const geometry = new THREE.Quaternion(10, 10);
const geometry = new THREE.SphereGeometry(5);
const material = new THREE.MeshBasicMaterial({
    color: 'teal',
    wireframe: true
});
const sphere = new THREE.Mesh( geometry, material );
sphere.rotateZ(10);
scene.add(sphere);

const Radius = 8;

const satelliteGeometry = new THREE.SphereGeometry(1);
const satelliteMaterial = new THREE.MeshBasicMaterial({
    color: '#9d2f2f',
    wireframe: true
});
const satellite = new THREE.Mesh( satelliteGeometry, satelliteMaterial );
satellite.position.x = Radius + 3;
scene.add(satellite);

function calcYCoordinate(x, centerX, centerY, radius) {
    const y = Math.sqrt(Math.abs(radius**2 - (x - centerX)**2)) + centerY;
    return direction === 'minus' ? y : -y;
}

// сладкий коэффициент
// +Math.cos(Math.PI/180*90).toFixed(3)

let direction = 'minus';
let angle = 0;


sphere.position.x = 3;

const controls = new OrbitControls(camera, renderer.domElement);

function animate() {
    requestAnimationFrame( animate );
    sphere.rotation.y += 0.001;
    angle += 1;

    if (satellite.position.x >= Radius + 3) {
        direction = 'minus';
    } else if (satellite.position.x <= - (Radius - 3)) {
        direction = 'plus';
    }

    satellite.position.x = +Math.cos(Math.PI/180*angle).toFixed(3) * Radius + 3;
    satellite.position.y = calcYCoordinate(satellite.position.x, 3, 0, Radius);

    controls.update();
    renderer.render( scene, camera );
}

animate();