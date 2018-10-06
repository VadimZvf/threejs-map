import * as THREE from 'three';

const OrbitControls = require('three-orbit-controls')(THREE);

class Camera {
    constructor(params = {}) {
        const defaultParams = { position: { x: 0, y: 0, z: 50 } };
        this.params = { ...defaultParams, ...params };

        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.set(
            this.params.position.x,
            this.params.position.y,
            this.params.position.z
        );
        this.camera.lookAt(new THREE.Vector3());
        this.orbitControls = new OrbitControls(this.camera);
    }

    getInstance() {
        return this.camera;
    }
}

export default Camera;
