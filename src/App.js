import { BrowserRouter, Routes, Route } from 'react-router-dom';

import store from './store/Store';
import ROUTES from './components/ROUTES/Routes';
import Header from './components/header/Header';

import Calculator from './components/calculator/Calculator';
import Graph2D from './components/graph2D/Graph2D';
import Graph3D from './components/graph3D/Graph3D';
import Page404 from './components/page404/Page404';

import window from './modules/graph2D/functions/functions';

import './App.css';

// постоянная перерисовка сцены
window.requestAnimFrame = (() => {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <div className="header-row"><Header ROUTES = {ROUTES}/></div>
                <Routes>
                    <Route exact path = {ROUTES.MAIN.path} element = {<Calculator/>}/>
                    <Route exact path = {ROUTES.CALCULATOR.path} element = {<Calculator/>}/>
                    <Route exact path = {ROUTES.GRAPH2D.path} element = {<Graph2D store={store}/>}/>
                    <Route exact path = {ROUTES.GRAPH3D.path} element = {<Graph3D/>}/>
                    <Route path="*" element = {<Page404/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;



/******************** РАСКРАСКИ ********************/

/* 

КЛЕТКА для гиперболического параболоида:

let color1 = '#00ff00'; 
let color2 = '#00ffff'; 
for (let i = 0; i < points.length; i++) {
    if (i + 1 + count < points.length && (i + 1) % count !== 0) {
        if (i % 2 === 0) polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color1));
        else polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color2));
    } else if (i + count < points.length && (i + 1) % count === 0 && i%2===0) {
        polygons.push(new Polygon([i, i + 1 - count, i + 1, i + count], color2))
    }
    if ((i + 1 + count) % count === 0) {
        let a = color1;
        color1 = color2;
        color2 = a;
    }
}

КЛЕТКА для тора (бублик, кольцо и тд называйте как хотите):

let color1 = '#00ff00'; 
let color2 = '#00ffff'; 
for (let i = 0; i < points.length; i++) {
    if (i + 1 + count < points.length && (i + 1) % count !== 0) {
        if (i % 2 === 0) polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color1));
        else polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color2));
    } else if (i + count < points.length && (i + 1) % count === 0) {
        polygons.push(new Polygon([i, i + 1 - count, i + 1, i + count], color2))
    }
    if (!points[i + count] && i + 1 < points.length) {
        if (i % 2 === 0) polygons.push(new Polygon([i, i + 1, count - (points.length - i) + 1, count - (points.length - i)], color1));
        else polygons.push(new Polygon([i, i + 1, count - (points.length - i) + 1, count - (points.length - i)], color2));
    }
    polygons.push(new Polygon([19, 0, 380, 399], color2));
    if ((i + 1 + count) % count === 0) {
        let a = color1;
        color1 = color2;
        color2 = a;
    }
}

КЛЕТКА для двуполосного гиперболоида:

let color1 = '#00ff00'; 
let color2 = '#00ffff'; 
for (let i = 0; i < points.length / 2 - count; i++) {
    if (i + 1 + count < points.length && (i + 1) % count !== 0) {
        if (i %2 === 0) polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color1));
        else polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color2));
    } else if (i + count < points.length && (i + 1) % count === 0) {
        polygons.push(new Polygon([i, i + 1 - count, i + 1, i + count], color2))
    }
    if ((i + 1 + count) % count === 0) {
        let a = color1;
        color1 = color2;
        color2 = a;
    }
}
for (let i = points.length / 2; i < points.length; i++) {
    if (i + 1 + count < points.length && (i + 1) % count !== 0) {
        if (i % 2 === 0) polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color1));
        else polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color2));
    } else if (i + count < points.length && (i + 1) % count === 0) {
        polygons.push(new Polygon([i, i + 1 - count, i + 1, i + count], color2))
    }
    if ((i + 1 + count) % count === 0) {
        let a = color1;
        color1 = color2;
        color2 = a;
    }
}

КЛЕТКА для гиперболического цилиндра:

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

КЛЕТКА для параболического цилиндра:

let color1 = '#00ff00'; 
let color2 = '#00ffff';   
let k = 0;  
for (let i = 0; i < points.length; i++) {
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
	
КЛЕТКА для всех остальных фигур:

let color1 = '#00ff00'; 
let color2 = '#00ffff'; 
for (let i = 0; i < points.length; i++) {
    if (i + 1 + count < points.length && (i + 1) % count !== 0) {
        if (i % 2 === 0) polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color1));
        else polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color2));
    } else if (i + count < points.length && (i + 1) % count === 0) {
        polygons.push(new Polygon([i, i + 1 - count, i + 1, i + count], color2))
    }
    if ((i + 1 + count) % count === 0) {
        let a = color1;
        color1 = color2;
        color2 = a;
    }
}
	
ПОЛОСКА вертикальная через 1 для гиперболического параболоида

let color1 = '#00ff00';
let color2 = '#00ffff';
let i = 0;
while (i < points.length) {
    if (i + 1 + count < points.length && (i + 1) % count !== 0) {
        polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color1));
    }
    i++;
    if ((i + 1 + count) % count === 0) {
        let a = color1;
        color1 = color2;
        color2 = a;
    }
}

ПОЛОСКА вертикальная через 1 для тора (бублик, кольцо и тд называйте как хотите):

let color1 = '#00ff00'; 
let color2 = '#00ffff'; 
for (let i = 0; i < points.length; i++) {
    if (i + 1 + count < points.length && (i + 1) % count !== 0 && i % 2 === 0) {
        polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color1));
    } else if (i + 1 + count < points.length && (i + 1) % count !== 0 && i % 2 !== 0) {
        polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color2))
    } else if (i + count < points.length && (i + 1) % count === 0) {
        polygons.push(new Polygon([i, i + 1 - count, i + 1, i + count], color2))
    }
    if (!points[i + count] && i + 1 < points.length) {
        if (i%2===0) polygons.push(new Polygon([i, i + 1, count - (points.length - i) + 1, count - (points.length - i)], color1));
        else polygons.push(new Polygon([i, i + 1, count - (points.length - i) + 1, count - (points.length - i)], color2));
    }
    polygons.push(new Polygon([19, 0, 380, 399], color2));
}

ПОЛОСКА вертикальная через 1 для двуполосного гиперболоида:

let color1 = '#00ff00'; 
let color2 = '#00ffff'; 
for (let i = 0; i < points.length / 2 - count; i++) {
    if (i + 1 + count < points.length && (i + 1) % count !== 0 && i % 2 === 0) {
        polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color1));
    } else if (i + 1 + count < points.length && (i + 1) % count !== 0 && i % 2 !== 0) {
        polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color2))
    } else if (i + count < points.length && (i + 1) % count === 0) {
        polygons.push(new Polygon([i, i + 1 - count, i + 1, i + count], color2))
    }
}
for (let i = points.length / 2; i < points.length; i++) {
    if (i + 1 + count < points.length && (i + 1) % count !== 0 && i % 2 === 0) {
        polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color1));
    } else if (i + 1 + count < points.length && (i + 1) % count !== 0 && i % 2 !== 0) {
        polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color2))
    } else if (i + count < points.length && (i + 1) % count === 0) {
        polygons.push(new Polygon([i, i + 1 - count, i + 1, i + count], color2))
    }
}

ПОЛОСКА вертикальная через 1 для параболического цилиндра:

let color1 = '#00ff00'; 
let color2 = '#00ffff';   
for (let i = 0; i < points.length; i++) {
    if ((i % 2) === 0) {
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

ПОЛОСКА вертикальная через 1 для гиперболического цилиндра:

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
	
ПОЛОСКА вертикальная через 1 для всех остальных фигур:

let color1 = '#00ff00';    
let color2 = '#00ffff';
for (let i = 0; i < points.length; i++) {
    if (i + 1 + count < points.length && (i + 1) % count !== 0 && i % 2 === 0) {
        polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color1));
    } else if (i + 1 + count < points.length && (i + 1) % count !== 0 && i % 2 !== 0) {
        polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color2))
    } else if (i + count < points.length && (i + 1) % count === 0) {
        polygons.push(new Polygon([i, i + 1 - count, i + 1, i + count], color2))
    }
}

ПОЛОСКА вертикальная через 2 для гиперболического параболоида:

let color1 = '#00ff00';    
let color2 = '#00ffff';
let i = 0; 
while (i < points.length) {
    if (i + 1 + count < points.length && (i + 1) % count !== 0 && i % 4 === 0) {
        polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color1));
        polygons.push(new Polygon([i + 1, i + 2, i + 2 + count, i + 1 + count], color1));
        i = i + 1;
    } else if (i + 1 + count < points.length && (i + 1) % count !== 0 && i % 4 !== 0) {
        polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color2));
    } 
    i++;
}

ПОЛОСКА вертикальная через 2 для двуполосного гиперболоида:

let color1 = '#00ff00'; 
let color2 = '#00ffff'; 
let i = 0;
while (i < points.length / 2 - count) {
    if (i + 1 + count < points.length && (i + 1) % count !== 0 && i % 4 === 0) {
        polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color1));
        polygons.push(new Polygon([i + 1, i + 2, i + 2 + count, i + 1 + count], color1));
        i = i + 1;
    } else if (i + 1 + count < points.length && (i + 1) % count !== 0 && i % 4 !== 0) {
        polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color2));
    } else if (i + count < points.length && (i + 1) % count === 0 && i % 4 !== 0) {
        polygons.push(new Polygon([i, i + 1 - count, i + 1, i + count], color2));
    }
    i++;
}
i = points.length / 2;
while (i < points.length) {
    if (i + 1 + count < points.length && (i + 1) % count !== 0 && i % 4 === 0) {
        polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color1));
        polygons.push(new Polygon([i + 1, i + 2, i + 2 + count, i + 1 + count], color1));
        i = i + 1;
    } else if (i + 1 + count < points.length && (i + 1) % count !== 0 && i % 4 !== 0) {
        polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color2));
    } else if (i + count < points.length && (i + 1) % count === 0 && i % 4 !== 0) {
        polygons.push(new Polygon([i, i + 1 - count, i + 1, i + count], color2));
    }
    i++;
}

ПОЛОСКА вертикальная через 2 для тора (бублик, кольцо и тд называйте как хотите):

let color1 = '#00ff00';    
let color2 = '#00ffff';
let i = 0; 
while (i < points.length) {
    if (i + 1 + count < points.length && (i + 1) % count !== 0 && i % 4 === 0) {
        polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color1));
        polygons.push(new Polygon([i + 1, i + 2, i + 2 + count, i + 1 + count], color1));
        i = i + 1;
    } else if (i + 1 + count < points.length && (i + 1) % count !== 0 && i % 4 !== 0) {
        polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color2));
    } else if (i + count < points.length && (i + 1) % count === 0 && i % 4 !== 0) {
        polygons.push(new Polygon([i, i + 1 - count, i + 1, i + count], color2));
    }
    if (!points[i + count] && i + 1 < points.length) {
        if (i % 4 === 0) {
            polygons.push(new Polygon([i, i + 1, count - (points.length - i) + 1, count - (points.length - i)], color1));
            polygons.push(new Polygon([i + 1, i + 2, count - (points.length - i) + 2, count + 1 - (points.length - i)], color1));
            i = i + 1;
        } else polygons.push(new Polygon([i, i + 1, count - (points.length - i) + 1, count - (points.length - i)], color2));
    }
    polygons.push(new Polygon([19, 0, 380, 399], color2));
    i++;
}

ПОЛОСКА вертикальная через 2 для всех остальных фигур:
(для конуса, цилиндра count=16)

let color1 = '#00ff00';    
let color2 = '#00ffff';
let i = 0; 
while (i < points.length) {
    if (i + 1 + count < points.length && (i + 1) % count !== 0 && i % 4 === 0) {
        polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color1));
        polygons.push(new Polygon([i + 1, i + 2, i + 2 + count, i + 1 + count], color1));
        i = i + 1;
    } else if (i + 1 + count < points.length && (i + 1) % count !== 0 && i % 4 !== 0) {
        polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color2));
    } else if (i + count < points.length && (i + 1) % count === 0 && i % 4 !== 0) {
        polygons.push(new Polygon([i, i + 1 - count, i + 1, i + count], color2));
    }
    i++;
}

ПОЛОСКА вертикальная через 3 для двуполосного гиперболоида:
(count=30)

let color1 = '#00ff00'; 
let color2 = '#00ffff'; 
let i = 0;
while (i < points.length / 2 - count) {
    if (i + 1 + count < points.length && (i + 1) % count !== 0 && i % 3 === 0) {
        polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color1));
        polygons.push(new Polygon([i + 1, i + 2, i + 2 + count, i + 1 + count], color1));
        polygons.push(new Polygon([i + 2, i + 3, i + 3 + count, i + 2 + count], color1));
        i = i + 3;
    } else if (i + 1 + count < points.length && (i + 1) % count !== 0 && i % 3 !== 0) {
        polygons.push(new Polygon([i - 1, i, i + count, i + count - 1], color2));
        polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color2));
    } else if (i + count < points.length && (i + 1) % count === 0 && i % 3 !== 0) {
        polygons.push(new Polygon([i, i + 1 - count, i + 1, i + count], color2));
    }
    i++;
}
i = points.length / 2;
while (i < points.length) {
    if (i + 1 + count < points.length && (i + 1) % count !== 0 && i % 3 === 0) {
        polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color1));
        polygons.push(new Polygon([i + 1, i + 2, i + 2 + count, i + 1 + count], color1));
        polygons.push(new Polygon([i + 2, i + 3, i + 3 + count, i + 2 + count], color1));
        i = i + 3;
    } else if (i + 1 + count < points.length && (i + 1) % count !== 0 && i % 3 !== 0) {
        polygons.push(new Polygon([i - 1, i, i + count, i + count - 1], color2));
        polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color2));
    } else if (i + count < points.length && (i + 1) % count === 0 && i % 3 !== 0) {
        polygons.push(new Polygon([i, i + 1 - count, i + 1, i + count], color2));
    }
    i++;
}

ПОЛОСКА вертикальная через 3 для всех остальных фигур:
(для сферы, однополосного гиперболоида count=30)

let color1 = '#00ff00';    
let color2 = '#00ffff';
let i = 0; 
while (i < points.length) {
    if (i + 1 + count < points.length && (i + 1) % count !== 0 && i % 3 === 0) {
        polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color1));
        polygons.push(new Polygon([i + 1, i + 2, i + 2 + count, i + 1 + count], color1));
        polygons.push(new Polygon([i + 2, i + 3, i + 3 + count, i + 2 + count], color1));
        i = i + 3;
    } else if (i + 1 + count < points.length && (i + 1) % count !== 0 && i % 3 !== 0) {
        polygons.push(new Polygon([i - 1, i, i + count, i + count - 1], color2));
        polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color2));
    } else if (i + count < points.length && (i + 1) % count === 0 && i % 3 !== 0) {
        polygons.push(new Polygon([i, i + 1 - count, i + 1, i + count], color2));
    }
    i++;
}

ПОЛОСКА горизонтальная через 1 для гиперболического параболоида:

let color1 = '#00ff00';    
let color2 = '#00ffff';
for (let i = 0; i < points.length; i++) {
    if (i + 1 + count < points.length && (i + 1) % count !== 0) {
        if ( i % 2 === 0) polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color1));
        else polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color2));
    } 
}

ПОЛОСКА горизонтальная через 1 для тора (бублик, кольцо и тд называйте как хотите):

let color1 = '#00ff00';    
let color2 = '#00ffff';
let i = 0; 
while (i < points.length) {
    if (i + 1 + count < points.length && (i + 1) % count !== 0) {
        polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color1));
    } else if (i + count < points.length && (i + 1) % count === 0) {
        polygons.push(new Polygon([i, i + 1 - count, i + 1, i + count], color2))
    }
    if ((i + 1 + count) % count === 0) {
        let a = color1;
        color1 = color2;
        color2 = a;
    }
    if (!points[i + count] && i + 1 < points.length) {
        polygons.push(new Polygon([i, i + 1, count - (points.length - i) + 1, count - (points.length - i)], color1));
    }
    i++;
}

ПОЛОСКА горизонтальная через 1 для двуполосного гиперболоида:

let color1 = '#00ff00'; 
let color2 = '#00ffff'; 
let i = 0;
while (i < points.length / 2 - count) {
    if (i + 1 + count < points.length && (i + 1) % count !== 0) {
        polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color1));
    } else if (i + count < points.length && (i + 1) % count === 0) {
        polygons.push(new Polygon([i, i + 1 - count, i + 1, i + count], color2))
    }
    i++;
    if ((i + 1 + count) % count === 0) {
        let a = color1;
        color1 = color2;
        color2 = a;
    }
}
i = points.length / 2;
while (i < points.length) {
    if (i + 1 + count < points.length && (i + 1) % count !== 0) {
        polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color1));
    } else if (i + count < points.length && (i + 1) % count === 0) {
        polygons.push(new Polygon([i, i + 1 - count, i + 1, i + count], color2))
    }
    i++;
    if ((i + 1 + count) % count === 0) {
        let a = color1;
        color1 = color2;
        color2 = a;
    }
}

ПОЛОСКА горизонтальная через 1 для всех остальных фигур:

let color1 = '#00ff00';
let color2 = '#00ffff';
let i = 0;
while (i < points.length) {
    if (i + 1 + count < points.length && (i + 1) % count !== 0) {
        polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color1));
    } else if (i + count < points.length && (i + 1) % count === 0) {
        polygons.push(new Polygon([i, i + 1 - count, i + 1, i + count], color2))
    }
    i++;
    if ((i + 1 + count) % count === 0) {
        let a = color1;
        color1 = color2;
        color2 = a;
    }
}

РАДУГА для тора (бублик, кольцо и тд называйте как хотите):

let color1 = '#ff0000';
let color2 = '#ffa600';
let color3 = '#ffff00';
let color4 = '#00ff00';
let color5 = '#00ffff';
let color6 = '#0000ff';
let color7 = '#800080';
let i = 0;
let d = 1;
let g = 1;
let color = color1;
while (i < points.length - count) {
    while (i < count * g && (i + 1) % count !== 0) {
        polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color));
        i++;
    }
    if (i < count * g && (i + 1) % count === 0) {
        polygons.push(new Polygon([i, i + 1 - count, i + 1, i + count], color))
    } 
    i = i + 1;
    d++;
    g++;
    if (d === 1) color = color1;
    else if (d === 2) color = color2;
    else if (d === 3) color = color3;
    else if (d === 4) color = color4;
    else if (d === 5) color = color5;
    else if (d === 6) color = color6;
    else if (d === 7) color = color7;
    else if (d === 8) {
        d = 1;
        color = color1; 
    }
}
for (let r = 380; r < 399; r++) {
        polygons.push(new Polygon([r, r + 1, count - (points.length - r) + 1, count - (points.length - r)], color));
}
polygons.push(new Polygon([19, 0, 380, 399], color));

РАДУГА для гиперболического параболоида:

let color1 = '#ff0000';
let color2 = '#ffa600';
let color3 = '#ffff00';
let color4 = '#00ff00';
let color5 = '#00ffff';
let color6 = '#0000ff';
let color7 = '#800080';
let i = 0;
let d = 1;
let g = 1;
let color = color1;
while (i < points.length - count) {
    while (i < count * g && (i + 1) % count !== 0) {
        polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color));
        i++;
    }
    i = i + 1;
    d++;
    g++;
    if (d === 1) color = color1;
    else if (d === 2) color = color2;
    else if (d === 3) color = color3;
    else if (d === 4) color = color4;
    else if (d === 5) color = color5;
    else if (d === 6) color = color6;
    else if (d === 7) color = color7;
    else if (d === 8) {
        d = 1;
        color = color1;
    }
}

РАДУГА для двуполосного гиперболоида:

let color1 = '#ff0000';
let color2 = '#ffa600';
let color3 = '#ffff00';
let color4 = '#00ff00';
let color5 = '#00ffff';
let color6 = '#0000ff';
let color7 = '#800080';
let i = 0;
let d = 1;
let g = 1;
let color = color1;
while (i < points.length / 2 - count) {
    while (i < count * g && (i + 1) % count !== 0) {
        polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color));
        i++;
    }
    if (i < count * g && (i + 1) % count === 0) {
        polygons.push(new Polygon([i, i + 1 - count, i + 1, i + count], color))
    }
    i = i + 1;
    d++;
    g++;
    if (d === 1) color = color1;
    else if (d === 2) color = color2;
    else if (d === 3) color = color3;
    else if (d === 4) color = color4;
    else if (d === 5) color = color5;
    else if (d === 6) color = color6;
    else if (d === 7) color = color7;
    else if (d === 8) {
        d = 1;
        color = color1;
    }
}
i = points.length / 2;
while (i < points.length- count) {
    while (i < count * g && (i + 1) % count !== 0) {
        polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color));
        i++;
    }
    if (i < count * g && (i + 1) % count === 0) {
        polygons.push(new Polygon([i, i + 1 - count, i + 1, i + count], color))
    }
    i = i + 1;
    d++;
    g++;
    if (d === 1) color = color1;
    else if (d === 2) color = color2;
    else if (d === 3) color = color3;
    else if (d === 4) color = color4;
    else if (d === 5) color = color5;
    else if (d === 6) color = color6;
    else if (d === 7) color = color7;
    else if (d === 8) {
        d = 1;
        color = color1;
    }
}

РАДУГА для всех остальных фигур:

let color1 = '#ff0000';
let color2 = '#ffa600';
let color3 = '#ffff00';
let color4 = '#00ff00';
let color5 = '#00ffff';
let color6 = '#0000ff';
let color7 = '#800080';
let i = 0;
let d = 1;
let g = 1;
let color = color1;
while (i < points.length - count) {
    while (i < count * g && (i + 1) % count !== 0) {
        polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color));
        i++;
    }
    if (i < count * g && (i + 1) % count === 0) {
        polygons.push(new Polygon([i, i + 1 - count, i + 1, i + count], color))
    }
    i = i + 1;
    d++;
    g++;
    if (d === 1) color = color1;
    else if (d === 2) color = color2;
    else if (d === 3) color = color3;
    else if (d === 4) color = color4;
    else if (d === 5) color = color5;
    else if (d === 6) color = color6;
    else if (d === 7) color = color7;
    else if (d === 8) {
        d = 1;
        color = color1;
    }
}

КЛЕТКА с 4 квадратиками для гиперболического параболоида:

let color1 = '#00ff00';
let color2 = '#00ffff';
let i = 0;
while (i < points.length) {
    if (i >= 2 * count && i % (2 * count) === 0) {
        let a = color1;
        color1 = color2;
        color2 = a;
    }
    if (i + 1 + count < points.length && (i + 2) % count !== 0) {
        if (i % 2 === 0) {
            polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color1));
            polygons.push(new Polygon([i + 1, i + 2, i + 2 + count, i + 1 + count], color1));
            let a = color1;
            color1 = color2;
            color2 = a;
        }
    } 
    i = i + 2;  
}

КЛЕТКА с 4 квадратиками для двуполосного гиперболоида:

let color1 = '#ff0000';
let color2 = '#ffa600';
let i = 0;
while (i < points.length / 2 - count) {
    if (i >= 2 * count && i % (2 * count) === 0) {
        let a = color1;
        color1 = color2;
        color2 = a;
    }
    if (i + 1 + count < points.length && (i + 2) % count !== 0) {
        if (i % 2 === 0) {
            polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color1));
            polygons.push(new Polygon([i + 1, i + 2, i + 2 + count, i + 1 + count], color1));
            let a = color1;
            color1 = color2;
            color2 = a;
        }
    } else if (i + 1 + count < points.length && (i + 2) % count === 0) {
        polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color1));
        polygons.push(new Polygon([i + 1, i + 2 - count, i + 2, i + 1 + count], color1));
    }
    i = i + 2; 
}
i = points.length / 2;
while (i < points.length - count ) {
    if (i >= 2 * count && i % (2 * count) === 0) {
        let a = color1;
        color1 = color2;
        color2 = a;
    }
    if (i + 1 + count < points.length && (i + 2) % count !== 0) {
        if (i % 2 === 0) {
            polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color1));
            polygons.push(new Polygon([i + 1, i + 2, i + 2 + count, i + 1 + count], color1));
            let a = color1;
            color1 = color2;
            color2 = a;
        }
    } else if (i + 1 + count < points.length && (i + 2) % count === 0) {
        polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color1));
        polygons.push(new Polygon([i + 1, i + 2 - count, i + 2, i + 1 + count], color1));
    }
    i = i + 2; 
}

КЛЕТКА с 4 квадратиками для тора (бублик, кольцо и тд называйте как хотите):

let color1 = '#00ff00';
let color2 = '#00ffff';
let i = 0;
while (i < points.length-2) {
    if (i >= 2 * count && i % (2 * count) === 0) {
        let a = color1;
        color1 = color2;
        color2 = a;
    }
    if (i + 1 + count < points.length && (i + 2) % count !== 0) {
        if (i % 2 === 0) {
            polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color1));
            polygons.push(new Polygon([i + 1, i + 2, i + 2 + count, i + 1 + count], color1));
            let a = color1;
            color1 = color2;
            color2 = a;
        }
    } else if (i + 1 + count < points.length && (i + 2) % count === 0) {
        polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color1));
        polygons.push(new Polygon([i + 1, i + 2 - count, i + 2, i + 1 + count], color1));
    }
    if (!points[i + count] && i + 1 < points.length) {
        console.log(i)
        if (i % 2 === 0) {
            polygons.push(new Polygon([i, i + 1, count - (points.length - i) + 1, count - (points.length - i)], color1));
            polygons.push(new Polygon([i + 1, i + 2, count - (points.length - i) + 2, count + 1 - (points.length - i)], color1));
            let a = color1;
            color1 = color2;
            color2 = a;
        } else if (i % 4 !== 0) {
            polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color1));
            polygons.push(new Polygon([i + 1, i + 2 - count, i + 2, i + 1 + count], color1));
        }
    }
    i = i + 2;  
}
polygons.push(new Polygon([19, 0, 380, 399], color1));
polygons.push(new Polygon([18, 19, 399, 398], color1));

КЛЕТКА с 4 квадратиками для всех остальных фигур:
(count=16)

let color1 = '#00ff00';
let color2 = '#00ffff';
let i = 0;
while (i < points.length) {
    if (i >= 2 * count && i % (2 * count) === 0) {
        let a = color1;
        color1 = color2;
        color2 = a;
    }
    if (i + 1 + count < points.length && (i + 2) % count !== 0) {
        if (i % 2 === 0) {
            polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color1));
            polygons.push(new Polygon([i + 1, i + 2, i + 2 + count, i + 1 + count], color1));
            let a = color1;
            color1 = color2;
            color2 = a;
        }
    } else if (i + 1 + count < points.length && (i + 2) % count === 0) {
        polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color1));
        polygons.push(new Polygon([i + 1, i + 2 - count, i + 2, i + 1 + count], color1));
    }
    i = i + 2;  
}

8 четвертей для сферы:
(count=16)

let color1 = '#ff0000';
let color2 = '#ffa600';
let color3 = '#ffff00';
let color4 = '#00ff00';
let color5 = '#00ffff';
let color6 = '#0000ff';
let color7 = '#800080'; 
let color8 = '#000000';
let a = 4;
let i = 0;
let b = 4;
let color = color1;
while (i < points.length - count) {
    color = color1;
    while (i < b && (i + 1) % count !== 0) {
        polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color));
        i++;
    }
    b = b + 4;
    color = color2;
    while (i < b && (i + 1) % count !== 0) {
        polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color));
        i++;
    }
    b = b + 4;
    color = color3;
    while (i < b && (i + 1) % count !== 0) {
        polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color));
        i++;
    }
    b = b + 4;
    color = color4;
    while (i < b && (i + 1) % count !== 0) {
        polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color));
        i++;
    }
    if (i < b && (i + 1) % count === 0) {
        polygons.push(new Polygon([i, i + 1 - count, i + 1, i + count], color))
    }
    b = b + 4;
    if (i > 50) {
        color1 = color5;
        color2 = color6;
        color3 = color7; 
        color4 = color8; 
    }
    i++;
}

*/
