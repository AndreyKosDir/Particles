import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import {degreesToRadians} from "./src/Utils";

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

const Radius = 2;

const satelliteGeometry = new THREE.SphereGeometry(0.2);
const satelliteMaterial = new THREE.MeshBasicMaterial({
    color: 'white',
    wireframe: true
});
const satellite = new THREE.Mesh( satelliteGeometry, satelliteMaterial );

// satellite.position.x = Radius;
// satellite.position.y = Radius;

scene.add(satellite);

// function calcYCoordinate(x, centerX, centerY, radius) {
//     const y = Math.sqrt(Math.abs(radius**2 - (x - centerX)**2)) + centerY;
//     return direction === 'minus' ? y : -y;
// }
//
// function calcYCoordinate3D(x, z, centerX, centerY, centerZ, radius) {
//     const y = Math.sqrt(Math.abs(radius**2 - (x - centerX)**2 - (z - centerZ)**2)) + centerY;
//     return direction === 'minus' ? y : -y;
// }

// сладкий коэффициент
// +Math.cos(Math.PI/180*90).toFixed(3)

// формула для расчета координат в 3D
// (x - h)^2 + (y - k)^2 + (z - l)^2 = r^2
// где h, k, l - координаты центра окружности для осей x, y, z соответственно

// let direction = 'minus';
let angleU = 50;
// Пока не на что не влияет
let angleQ = 0;


// sphere.position.x = 3;

const controls = new OrbitControls(camera, renderer.domElement);

// const anotherAngle = Math.cos(Math.PI/180*10)*Radius;
// satellite.position.x = Math.cos(Math.PI/180*20)*Radius;
// satellite.position.y = Math.sin(Math.PI/180*20)*Radius;

// const Radius3D = Math.sqrt(satellite.position.x**2 + satellite.position.y**2);



function animate() {
    requestAnimationFrame( animate );
    // sphere.rotation.y += 0.001;


    //
    // satellite.position.x = +Math.cos(Math.PI/180*angle).toFixed(3) * Radius;
    // satellite.position.y = calcYCoordinate(satellite.position.x, 0, 0, Radius);

    // satellite.position.x = +Math.cos(Math.PI/180*angle).toFixed(3) * Radius;
    // satellite.position.z = +Math.cos(Math.PI/180*angle).toFixed(3) * Radius;
    // satellite.position.y = calcYCoordinate3D(satellite.position.x, satellite.position.z, 0, 0, 0, Radius3D);


    // Заработало для заданного значения x и z = radius, но угол постоянный
    // satellite.position.x = +Math.cos(Math.PI/180*angle).toFixed(3) * Radius;
    // satellite.position.y = +Math.cos(Math.PI/180*angle).toFixed(3) * Radius;
    // satellite.position.z = calcYCoordinate3D(satellite.position.x, satellite.position.y, 0, 0, 0, Radius3D);

    // Если увеличивать в 10 раз меньше, чем angleQ - будет происходить вращение ещё и в другом направлении
    // let angleU = 30;
    // let angleQ = 0;
    // angleQ += 0.1;

    angleQ += 2;
    angleU += 0;
    satellite.position.z = Radius * Math.sin(degreesToRadians(angleQ)) * Math.cos(degreesToRadians(angleU))
    satellite.position.y = Radius * Math.sin(degreesToRadians(angleQ)) * Math.sin(degreesToRadians(angleU))
    satellite.position.x = Radius * Math.cos(degreesToRadians(angleQ))

    // варианты вращений:
    // +angleQ
    // 1) x, y, z
    // 2) z, y, x
    // 2) z, x, y

    controls.update();
    renderer.render( scene, camera );
}

animate();