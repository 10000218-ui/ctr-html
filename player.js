import * as THREE from "three";

export class Player {

    constructor(scene) {

        this.speed = 0;
        this.maxSpeed = 0.8;
        this.acceleration = 0.02;
        this.friction = 0.01;
        this.turnSpeed = 0.04;

        this.keys = {};

        // Kart
        this.kart = new THREE.Mesh(
            new THREE.BoxGeometry(2,1,3),
            new THREE.MeshStandardMaterial({
                color:0xff3333
            })
        );

        this.kart.position.set(0,0.5,0);

        scene.add(this.kart);

        window.addEventListener("keydown",(e)=>{
            this.keys[e.code]=true;
        });

        window.addEventListener("keyup",(e)=>{
            this.keys[e.code]=false;
        });

    }

    update(){

        if(this.keys["KeyW"] || this.keys["ArrowUp"]){

            this.speed += this.acceleration;

        }

        if(this.keys["KeyS"] || this.keys["ArrowDown"]){

            this.speed -= this.acceleration;

        }

        if(this.speed>this.maxSpeed)
            this.speed=this.maxSpeed;

        if(this.speed<-this.maxSpeed/2)
            this.speed=-this.maxSpeed/2;

        if(!(this.keys["KeyW"]||this.keys["ArrowUp"]||
             this.keys["KeyS"]||this.keys["ArrowDown"])){

            if(this.speed>0)
                this.speed-=this.friction;

            if(this.speed<0)
                this.speed+=this.friction;

            if(Math.abs(this.speed)<0.01)
                this.speed=0;

        }

        if(this.keys["KeyA"]||this.keys["ArrowLeft"]){

            this.kart.rotation.y += this.turnSpeed;

        }

        if(this.keys["KeyD"]||this.keys["ArrowRight"]){

            this.kart.rotation.y -= this.turnSpeed;

        }

        this.kart.position.x -= Math.sin(this.kart.rotation.y)*this.speed;

        this.kart.position.z -= Math.cos(this.kart.rotation.y)*this.speed;

    }

}
