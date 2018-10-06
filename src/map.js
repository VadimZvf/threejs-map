import * as THREE from 'three';
import Country from './country';
import Raycaster from './raycaster';
import LinePainter from './line-painter';
import countriesData from './countries.json';

class Map {
    constructor(params = {}) {
        const defaultParams = {};
        this.camera = params.camera;
        this.params = { ...defaultParams, ...params };
        this.onIntersect = this.onIntersect.bind(this);
        this.onOutIntersect = this.onOutIntersect.bind(this);
    }

    init() {
        this.map = new THREE.Group();
        this.countries = [];

        for (let index = 0; index < countriesData.length; index++) {
            const countryData = countriesData[index];
            const country = new Country({
                path: countryData.path,
                code: countryData.code,
                name: countryData.name
            });
            country.init();
            this.countries.push(country);
            this.map.add(country.getInstance());
        }

        this.raycaster = new Raycaster({
            camera: this.camera.getInstance(),
            objects: this.map.children,
            onIntersect: this.onIntersect,
            onOutIntersect: this.onOutIntersect
        });
        this.raycaster.init();

        this.linePainter = new LinePainter({
            camera: this.camera.getInstance(),
            objects: this.map.children
        });
        this.linePainter.init();

        this.countryNameContainer = document.getElementById('countryName');
    }

    getInstance() {
        return this.map;
    }

    getLines() {
        return this.linePainter.getInstance();
    }

    getCountries() {
        return this.countries;
    }

    onIntersect(country) {
        for (let index = 0; index < this.countries.length; index++) {
            const countryModel = this.countries[index];
            if (countryModel.getInstance() == country) {
                countryModel.onIntersect();
                this.countryNameContainer.innerText = countryModel.getName();
            }
        }
    }

    onOutIntersect(country) {
        for (let index = 0; index < this.countries.length; index++) {
            const countryModel = this.countries[index];
            if (countryModel.getInstance() == country) {
                countryModel.onOutIntersect();
            }
        }
    }

    update(timestamp) {
        this.raycaster.update(timestamp);
        this.linePainter.update(timestamp);
    }

    render() {}
}

export default Map;
