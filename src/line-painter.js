import * as THREE from 'three';
import Line from './line';

class LinePainter {
    constructor(params) {
        this.params = params;
        this.lastIntersected = null;
        this.onClick = this.onClick.bind(this);
        this.lines = [];
    }

    init() {
        this.raycaster = new THREE.Raycaster();
        this.group = new THREE.Group();
        window.addEventListener('click', this.onClick, false);
    }

    onClick(event) {
        const mouse = {};
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        this.raycaster.setFromCamera(mouse, this.params.camera);

        const intersects = this.raycaster.intersectObjects(this.params.objects);

        if (intersects[0]) {
            if (this.lastIntersected) {
                this.drawLine(intersects[0].point);
                this.lastIntersected = null;
            } else {
                this.lastIntersected = intersects[0].point;
            }
        }
    }

    drawLine(targetPoint) {
        const line = new Line({
            startPoint: {
                x: this.lastIntersected.x,
                y: this.lastIntersected.y
            },
            endPoint: {
                x: targetPoint.x,
                y: targetPoint.y
            }
        });
        line.init();
        this.group.add(line.getInstance());
        this.lines.push(line);
    }

    getInstance() {
        return this.group;
    }

    update(timestamp) {
        for (let index = 0; index < this.lines.length; index++) {
            this.lines[index].update(timestamp);
        }
    }
}

export default LinePainter;
