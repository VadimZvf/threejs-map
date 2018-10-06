import * as THREE from 'three';

const POINTS_COUNT = 1000;

class Space {
    constructor(params) {
        this.params = params;
    }

    init() {
        this.material = new THREE.PointsMaterial({
            size: Math.random(),
            vertexColors: THREE.VertexColors
        });

        this.geometry = new THREE.Geometry();

        for (let index = 0; index < POINTS_COUNT; index++) {
            this.geometry.vertices.push(
                new THREE.Vector3(
                    (Math.random() - 0.5) * 1000,
                    (Math.random() - 0.5) * 1000,
                    (Math.random() - 0.5) * 1000
                )
            );

            this.geometry.colors.push(new THREE.Color(Math.random(), Math.random(), Math.random()));
        }

        this.points = new THREE.Points(this.geometry, this.material);
    }

    getInstance() {
        return this.points;
    }
}

export default Space;
