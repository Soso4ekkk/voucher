import Point from '../entities/Point';
import Edge from '../entities/Edge';
import Polygon from '../entities/Polygon';
import Subject from '../entities/Subject';

function hyperbolicCylinder(count = 10, a = 5, b = 2) {
    const points = [];
    const edges = [];
    const polygons = [];

    /********************* точки *********************/
    const dt = 2 * Math.PI / count;
    for (let i = -Math.PI; i <= Math.PI; i += dt) {
        for (let j = -Math.PI; j < Math.PI; j += dt) {
            points.push(new Point(
                b * Math.sinh(i),
                a * Math.cosh(i),
                j * 2,
            ));
        }
    }

    for (let i = -Math.PI; i <= Math.PI; i += dt) {
        for (let j = -Math.PI; j < Math.PI; j += dt) {
            points.push(new Point(
                (-1) * b * Math.sinh(i), 
                (-1) * a * Math.cosh(i),
                j * 2
            ));
        }
    }

    /*************************************************/

    /***************************** ребра *****************************/
    for (let i = 0; i < points.length / 2 - count; i++) {
        // вдоль
        if (i + 1 < points.length && (i + 1) % count !== 0) 
            edges.push(new Edge(i, i + 1));
        else if ((i + 1) % count === 0) 
            edges.push(new Edge(i, i + 1 - count));
        // поперек
        if (i < points.length - count) 
            edges.push(new Edge(i, i + count));
    }

    for (let i = points.length / 2; i < points.length; i++) {
        // вдоль
        if (i + 1 < points.length && (i + 1) % count !== 0) 
            edges.push(new Edge(i, i + 1));
        else if ((i + 1) % count === 0) 
            edges.push(new Edge(i, i + 1 - count));
        // поперек
        if (i < points.length - count) 
            edges.push(new Edge(i, i + count));
    }

    /*****************************************************************/

    /******************************* полигоны *******************************/
    let color1 = '#00ff00'; 
    let color2 = '#00ffff';   
    for (let i = 0; i < points.length / 2 - count; i++) {
        if ((i % 2) === 0 ) {
            if (i + 1 + count < points.length && (i + 1) % count !== 0)  {
                polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color1));
            } else if (i + 1 + count < points.length && (i + 1) % count !== 0)  {
                polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color1))
            }
        } else {
            if (i + 1 + count < points.length && (i + 1) % count !== 0)  {
                polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color2));
            } else if (i + 1 + count < points.length && (i + 1) % count !== 0) {
                polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color2))
            }
        }
    }
    for (let i = points.length / 2; i < points.length; i++) {
        if ((i % 2) === 0 ) {
            if (i + 1 + count < points.length && (i + 1) % count !== 0)  {
                polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color1));
            } else if (i + 1 + count < points.length && (i + 1) % count !== 0)  {
                polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color1))
            }
        } else {
            if (i + 1 + count < points.length && (i + 1) % count !== 0)  {
                polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color2));
            } else if (i + 1 + count < points.length && (i + 1) % count !== 0) {
                polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color2))
            }
        }
    }

    /************************************************************************/

    return new Subject(points, edges, polygons);
}

export default hyperbolicCylinder;