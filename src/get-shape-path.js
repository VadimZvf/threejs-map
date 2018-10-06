import * as THREE from 'three';

const RESIZE_COEF = 20;

const MAP_WIDTH = 2000;
const MAP_HEIGHT = 1001;

export default operations => {
    const path = new THREE.ShapePath();
    let startX;
    let startY;
    let prevX = 0;
    let prevY = 0;

    function setPoint(o, x, y) {
        path[o]((x - MAP_WIDTH / 2) / RESIZE_COEF, (-y + MAP_HEIGHT / 2) / RESIZE_COEF);
    }

    /* eslint-disable indent */
    for (let opIndex = 0; opIndex < operations.length; opIndex++) {
        const command = operations[opIndex][0];
        switch (command) {
            case 'M':
            case 'm':
                if (typeof startX !== 'number' && typeof startY !== 'number') {
                    setPoint('moveTo', operations[opIndex][1], operations[opIndex][2]);
                } else {
                    setPoint(
                        'moveTo',
                        prevX + operations[opIndex][1],
                        prevY + operations[opIndex][2]
                    );
                }
                startX = prevX + operations[opIndex][1];
                prevX += operations[opIndex][1];
                startY = prevY + operations[opIndex][2];
                prevY += operations[opIndex][2];
                break;
            case 'l':
                prevX += operations[opIndex][1];
                prevY += operations[opIndex][2];
                setPoint('lineTo', prevX, prevY);
                break;
            case 'Z':
            case 'z':
                setPoint('lineTo', startX, startY);
                break;
            default:
                throw new Error(`Wrong path command: ${command}`);
        }
    }
    /* eslint-enable indent */

    return path.toShapes(false, true);
};
