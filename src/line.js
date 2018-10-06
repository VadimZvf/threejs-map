import * as THREE from 'three';
import SimplexNoise from 'simplex-noise';

const simplex = new SimplexNoise();
const DOTS_COUNT = 100;

class Line {
    constructor(params) {
        const defaultParams = { startPoint: { x: 10, y: 20 }, endPoint: { x: 100, y: 50 } };
        this.params = { ...defaultParams, ...params };
    }

    init() {
        this.material = new THREE.LineBasicMaterial({
            color: new THREE.Color(Math.random(), Math.random(), Math.random()),
            linewidth: 5
        });

        this.geometry = new THREE.Geometry();
        this.line = new THREE.Line(this.geometry, this.material);

        this.radius = Math.max(Math.random() * 30, 20);

        const diffX = this.params.endPoint.x - this.params.startPoint.x;
        const diffY = this.params.endPoint.y - this.params.startPoint.y;
        const stepX = diffX / DOTS_COUNT;
        const stepY = diffY / DOTS_COUNT;
        this.points = [];

        for (let j = 0; j < DOTS_COUNT; j++) {
            const vector = new THREE.Vector3(
                this.params.startPoint.x + stepX * j,
                this.params.startPoint.y + stepY * j,
                Math.sin(Math.PI * (j / DOTS_COUNT)) * this.radius
            );
            this.points.push({ x: vector.x, y: vector.y, z: vector.z }); // original points
            this.geometry.vertices.push(vector);
        }
    }

    getInstance() {
        return this.line;
    }

    update(timestamp) {
        let vector;
        for (let j = 0; j < DOTS_COUNT; j++) {
            vector = this.line.geometry.vertices[j];
            const originalPoint = this.points[j];
            const noise = simplex.noise2D(
                originalPoint.x / 2 + timestamp * 0.002,
                originalPoint.z / 2 + timestamp * 0.002
            );

            vector.x = originalPoint.x + (noise * this.radius) / 20;
            vector.z = originalPoint.z + (noise * this.radius) / 20;
        }
        this.line.geometry.verticesNeedUpdate = true;
    }
}

export default Line;
