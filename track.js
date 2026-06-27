import * as THREE from "three";

export class Track{

    constructor(scene){

        this.scene = scene;

        this.build();

    }

    build(){

        // Césped

        const grass = new THREE.Mesh(

            new THREE.PlaneGeometry(600,600),

            new THREE.MeshStandardMaterial({
                color:0x3fb950
            })

        );

        grass.rotation.x=-Math.PI/2;

        this.scene.add(grass);

        // Pista

        const road = new THREE.Mesh(

            new THREE.RingGeometry(45,70,80),

            new THREE.MeshStandardMaterial({
                color:0x4a4a4a
            })

        );

        road.rotation.x=-Math.PI/2;

        road.position.y=0.02;

        this.scene.add(road);

        // Línea de meta

        const finish = new THREE.Mesh(

            new THREE.BoxGeometry(25,.05,2),

            new THREE.MeshStandardMaterial({
                color:0xffffff
            })

        );

        finish.position.set(0,.03,57);

        this.scene.add(finish);

        // Árboles

        for(let i=0;i<40;i++){

            const angle=Math.random()*Math.PI*2;

            const radius=110+Math.random()*120;

            const x=Math.cos(angle)*radius;

            const z=Math.sin(angle)*radius;

            const trunk=new THREE.Mesh(

                new THREE.CylinderGeometry(.4,.6,3),

                new THREE.MeshStandardMaterial({
                    color:0x7a4b24
                })

            );

            trunk.position.set(x,1.5,z);

            this.scene.add(trunk);

            const leaves=new THREE.Mesh(

                new THREE.SphereGeometry(2.3,16,16),

                new THREE.MeshStandardMaterial({
                    color:0x2d8f2d
                })

            );

            leaves.position.set(x,4,z);

            this.scene.add(leaves);

        }

    }

}
