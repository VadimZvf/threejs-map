import * as THREE from 'three';
import Stats from 'stats-js';
import Camera from './camera';
import Map from './map';
import Space from './space';

class App {
    constructor(params = {}) {
        const defaultParams = {};
        this.params = { ...defaultParams, ...params };

        // events bindings
        this.resizeCanvas = this.resizeCanvas.bind(this);
    }

    init() {
        this.canvas = document.getElementById('canvas');
        this.scene = new THREE.Scene();
        this.camera = new Camera();

        this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas });
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        const axesHelper = new THREE.AxesHelper(10);
        this.scene.add(axesHelper);

        this.directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
        this.directionalLight.position.set(1, 1, 1).normalize();
        this.scene.add(this.directionalLight);

        this.map = new Map({
            camera: this.camera
        });
        this.map.init();
        this.scene.add(this.map.getInstance());
        this.scene.add(this.map.getLines());

        this.space = new Space();
        this.space.init();
        this.scene.add(this.space.getInstance());

        this.createStatsContainer();
        window.addEventListener('resize', this.resizeCanvas);
    }

    createStatsContainer() {
        this.stats = new Stats();
        this.stats.domElement.style.position = 'absolute';
        this.stats.domElement.style.left = '0px';
        this.stats.domElement.style.top = '0px';
        this.stats.setMode(0);
        document.body.appendChild(this.stats.domElement);
    }

    resizeCanvas() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    render() {
        if (this.stats) this.stats.begin();

        this.renderer.render(this.scene, this.camera.getInstance());
        // this.camera.rotateY(Math.sin(timestamp / 10000));

        if (this.stats) this.stats.end();
    }

    update(timestamp) {
        this.map.update(timestamp);
    }
}

export default App;
