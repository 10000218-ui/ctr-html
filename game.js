import * as THREE from "three";
import { Player } from "./player.js";

// Escena
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);

// Cámara
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

// Render
const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById("game"),
    antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Luz ambiente
scene.add(new THREE.AmbientLight(0xffffff,1));

// Sol
const light = new THREE.DirectionalLight(0xffffff,2);
light.position.set(20,30,20);
scene.add(light);

// Suelo
const floor = new THREE.Mesh(

    new THREE.PlaneGeometry(500,500),

    new THREE.MeshStandardMaterial({
        color:0x3cb043
    })

);

floor.rotation.x = -Math.PI/2;

scene.add(floor);

// Crear jugador
const player = new Player(scene);

// Pantalla de carga
const loading = document.getElementById("loading");
const fill = document.getElementById("fill");

let progress = 0;

const timer = setInterval(()=>{

    progress += 5;

    fill.style.width = progress + "%";

    if(progress>=100){

        clearInterval(timer);

        loading.style.display="none";

        document.getElementById("hud").style.display="block";

        animate();

    }

},40);

// Animación
function animate(){

    requestAnimationFrame(animate);

    player.update();

    // Cámara detrás del kart
    camera.position.x =
        player.kart.position.x +
        Math.sin(player.kart.rotation.y)*8;

    camera.position.z =
        player.kart.position.z +
        Math.cos(player.kart.rotation.y)*8;

    camera.position.y = 5;

    camera.lookAt(
        player.kart.position.x,
        1,
        player.kart.position.z
    );

    renderer.render(scene,camera);

}

// Redimensionar
window.addEventListener("resize",()=>{

    camera.aspect =
        window.innerWidth/window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );

});
