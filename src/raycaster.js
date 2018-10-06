import * as THREE from 'three';
// import throttle from './throttle';

class Raycaster {
    constructor(params) {
        this.camera = params.camera;
        this.objects = params.objects;
        this.onIntersect = params.onIntersect;
        this.onOutIntersect = params.onOutIntersect;
        this.onMouseMove = this.onMouseMove.bind(this);
        // this.update = throttle(this.update, 300, false);

        this.lastIntersected = null;
    }

    init() {
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        window.addEventListener('mousemove', this.onMouseMove, false);
    }

    update() {
        this.raycaster.setFromCamera(this.mouse, this.camera);

        const intersects = this.raycaster.intersectObjects(this.objects);

        if (this.lastIntersected && this.lastIntersected != intersects[0]) {
            this.onOutIntersect(this.lastIntersected);
        }

        if (intersects[0]) {
            this.onIntersect(intersects[0].object);
            this.lastIntersected = intersects[0].object;
        }
    }

    onMouseMove(event) {
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }
}

export default Raycaster;
