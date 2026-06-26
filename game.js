import * as THREE from "three";

// Canvas
const canvas = document.getElementById("game");

// Escena
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87CEEB);

// Cámara
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

// Render
const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Luz
const sun = new THREE.DirectionalLight(0xffffff, 2);
sun.position.set(20, 30, 10);
scene.add(sun);

scene.add(new THREE.AmbientLight(0xffffff, 1));

// Césped
const grass = new THREE.Mesh(
    new THREE.PlaneGeometry(300,300),
    new THREE.MeshPhongMaterial({
        color:0x2eb82e
    })
);

grass.rotation.x = -Math.PI/2;
scene.add(grass);

// Pista
const track = new THREE.Mesh(
    new THREE.RingGeometry(35,60,64),
    new THREE.MeshPhongMaterial({
        color:0x444444
    })
);

track.rotation.x = -Math.PI/2;
track.position.y=0.01;
scene.add(track);

// Kart
const kart = new THREE.Group();

const body = new THREE.Mesh(
    new THREE.BoxGeometry(3,1,5),
    new THREE.MeshPhongMaterial({
        color:0xff3b30
    })
);

body.position.y=1;
kart.add(body);

// Ruedas
for(let x of [-1.4,1.4]){
    for(let z of [-2,2]){

        const wheel=new THREE.Mesh(
            new THREE.CylinderGeometry(.45,.45,.4,20),
            new THREE.MeshPhongMaterial({
                color:0x111111
            })
        );

        wheel.rotation.z=Math.PI/2;
        wheel.position.set(x,.45,z);

        kart.add(wheel);
    }
}

scene.add(kart);

kart.position.set(0,0,47);

// Controles
const keys={};

window.addEventListener("keydown",e=>{
    keys[e.key.toLowerCase()]=true;
});

window.addEventListener("keyup",e=>{
    keys[e.key.toLowerCase()]=false;
});

let speed=0;
let angle=0;

function update(){

    if(keys["w"])
        speed+=0.01;

    if(keys["s"])
        speed-=0.01;

    speed*=0.98;

    if(keys["a"])
        angle+=0.03;

    if(keys["d"])
        angle-=0.03;

    kart.rotation.y=angle;

    kart.position.x+=Math.sin(angle)*speed;
    kart.position.z+=Math.cos(angle)*speed;

    camera.position.x=kart.position.x-Math.sin(angle)*10;
    camera.position.y=7;
    camera.position.z=kart.position.z-Math.cos(angle)*10;

    camera.lookAt(
        kart.position.x,
        2,
        kart.position.z
    );

    document.getElementById("speed").innerHTML=
        Math.abs(speed*500).toFixed(0)+" KM/H";
}

// Pantalla de carga
let load=0;

const fill=document.getElementById("fill");

const interval=setInterval(()=>{

    load+=5;

    fill.style.width=load+"%";

    if(load>=100){

        clearInterval(interval);

        document.getElementById("loading").style.display="none";
        document.getElementById("hud").style.display="block";

        animate();

    }

},40);

// Animación
function animate(){

    requestAnimationFrame(animate);

    update();

    renderer.render(scene,camera);

}

window.addEventListener("resize",()=>{

camera.aspect=window.innerWidth/window.innerHeight;

camera.updateProjectionMatrix();

renderer.setSize(window.innerWidth,window.innerHeight);

});
