import Point from '../entities/Point';
import Edge from '../entities/Edge';
import Polygon from '../entities/Polygon';
import Subject from '../entities/Subject';

function parabolicCylinder(count = 10) {
    const points = [];
    const edges = [];
    const polygons = [];

    // точки
    const size = 5;
    for (let i = -count; i < count; i++) {
        for (let j = 0; j < count; j++) {
            const x = i + size / count;
            const y = x * x / size;
            const z = j - size;
            points.push(new Point(x, y, z));
        }
    }

    // ребра
    for (let i = 0; i < points.length; i++) {
        // вдоль
        if (i + 1 < points.length && (i + 1) % count !== 0) 
            edges.push(new Edge(i, i + 1));
        else if ((i + 1) % count === 0) 
            edges.push(new Edge(i, i + 1 - count));
        // поперек
        if (i < points.length - count) 
            edges.push(new Edge(i, i + count));
    }

    // полигоны
    let color1 = '#00ff00'; 
    let color2 = '#00ffff';   
    let k = 0;  
    for (let i = 0; i < points.length / 2 - count; i++) {
        if ((i % count) == 0) {
            k++;
        }
        if (((i + k ) % 2) < 1) {
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
        if ((i % count) == 0) {
            k++;
        }
        if (((i + k ) % 2) < 1) {
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

    return new Subject(points, edges, polygons);
}

export default parabolicCylinder;