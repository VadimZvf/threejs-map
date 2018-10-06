import * as THREE from 'three';
import parsePath from 'parse-svg-path';
import getShape from './get-shape-path';
import path from './path';

class Country {
    constructor(params = {}) {
        const defaultParams = {
            path
        };
        this.params = { ...defaultParams, ...params };
    }

    init() {
        const parsedPath = parsePath(this.params.path);
        this.path = getShape(parsedPath);
        this.color = new THREE.Color(0xd0d0d0);
        this.material = new THREE.MeshLambertMaterial({
            color: this.color,
            emissive: 0x090909
        });
        this.geometry = new THREE.ExtrudeGeometry(this.path, {
            curveSegments: 0,
            steps: 1,
            depth: 1,
            bevelEnabled: false
        });
        this.mesh = new THREE.Mesh(this.geometry, this.material);
    }

    getInstance() {
        return this.mesh;
    }

    getName() {
        return this.params.name;
    }

    onIntersect() {
        this.material.color = new THREE.Color(0xff0000);
        this.mesh.position.x = 0.1;
        this.material.needsUpdate = true;
    }

    onOutIntersect() {
        this.material.color = new THREE.Color(0xd0d0d0);
        this.mesh.position.x = 0;
        this.material.needsUpdate = true;
    }

    // update() {}

    // render() {}
}

export default Country;
