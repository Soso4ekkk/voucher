class Canvas {
    constructor({WIN, id, width = 600, height = 600}) {
        this.WIN = WIN;
        this.canvas = document.getElementById(id);
        this.canvas.width = width;
        this.canvas.height = height;
        this.context = this.canvas.getContext(`2d`);
    }

    xs(x) {
        return this.canvas.width * (x - this.WIN.LEFT) / this.WIN.WIDTH;
    }

    ys(y) {
        return this.canvas.height - (this.canvas.height * (y - this.WIN.BOTTOM) / this.WIN.HEIGHT);
    }

    sx(x) {
        return this.WIN.WIDTH * x / this.canvas.width;
    }
    
    sy(y) {
        return this.WIN.HEIGHT * y / this.canvas.height;
    }

    clear() {
        this.context.fillStyle = '#eee';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    line(x1, y1, x2, y2, color = '#9e066b', width = 1, isDash) {
        this.context.beginPath();
        this.context.strokeStyle = color;
        this.context.lineWidth = width;
        // пунктирная линия
        if (isDash) {
            this.context.setLineDash([7, 5]);
        } else {
            this.context.setLineDash([]);
        }
        this.context.moveTo(this.xs(x1), this.ys(y1));
        this.context.lineTo(this.xs(x2), this.ys(y2));
        this.context.stroke();
    }

    point(x1, y1, r = 2, color = 'black') {
        this.context.beginPath();
        this.context.strokeStyle = color;
        this.context.fillStyle = color;
        this.context.arc(this.xs(x1), this.ys(y1), r, 0, Math.PI * 2, true);
        this.context.stroke();
        this.context.fill();
    }

    text(str, x, y, colorfill) {
        this.context.font = 'italic 16pt cursive';
        this.context.fillStyle = colorfill;
        this.context.fillText(str, this.xs(x), this.ys(y));
    }

    arc(x1, y1, r = 2, color = 'black') {
        this.context.beginPath();
        this.context.strokeStyle = color;
        this.context.fillStyle = color;
        this.context.arc(this.xs(x1), this.ys(y1), r, 0, Math.PI * 2, true);
        this.context.stroke();
        this.context.fill();
    }

    duga(x1, y1, r, start, end) {
        this.context.beginPath();
        this.context.strokeStyle = 'black';
        this.context.lineWidth = 1;
        this.context.arc(this.xs(x1), this.ys(y1), r, start, end, true);
        this.context.stroke();
    }

    polygon(points, color = '#ff15b155') {
        this.context.beginPath();
        this.context.fillStyle = color;
        this.context.moveTo(this.xs(points[0].x), this.ys(points[0].y));
        for (let i = 1; i < points.length; i++) {
            this.context.lineTo(this.xs(points[i].x), this.ys(points[i].y));
        }
        this.context.lineTo(this.xs(points[0].x), this.ys(points[0].y));
        this.context.closePath();
        this.context.fill();
    }

    /************************************** graph3D **************************************/
    drawImg(img, x, y, width, height) {
        this.context.drawImage(img, x, y, width, height);
    }

    xsPolygon(x) {
        return x / this.WIN.WIDTH * this.canvas.width;
    }

    ysPolygon(y) {
        return this.canvas.height - y / this.WIN.HEIGHT * this.canvas.height;
    }

    textAnim(figure, str, x, y, colorfill, colorstroke) {
        this.context.font = '10pt monospace';
        this.context.fillStyle = colorfill;
        this.context.strokeStyle = colorstroke;
        this.context.strokeText(str, this.xsPolygon(x.x - figure.R / 8), this.ysPolygon(y.y + figure.R / 8));
        this.context.fillText(str, this.xsPolygon(x.x - figure.R / 8), this.ysPolygon(y.y + figure.R / 8));
    }

    text3D(str, x, y, colorfill) {
        this.context.font = '35pt monospace';
        this.context.fillStyle = colorfill;
        this.context.fillText(str, this.xs(x), this.ys(y));
    }

    polygon3D(points, color = '#ff15b155') {
        this.context.beginPath();
        this.context.fillStyle = color;
        this.context.moveTo(this.xsPolygon(points[0].x), this.ysPolygon(points[0].y));
        for (let i = 1; i < points.length; i++) {
            this.context.lineTo(this.xsPolygon(points[i].x), this.ysPolygon(points[i].y));
        }
        this.context.lineTo(this.xsPolygon(points[0].x), this.ysPolygon(points[0].y));
        this.context.closePath();
        this.context.fill();
    }

    arc3D(x, y, r = 2, color = 'black') {
        this.context.beginPath();
        this.context.strokeStyle = color;
        this.context.fillStyle = color;
        this.context.arc(this.xsPolygon(x), this.ysPolygon(y), r, 0, Math.PI * 2, true);
        this.context.stroke();
        this.context.fill();
    }

    line3D(x1, y1, x2, y2, color, width = 1, isDash) {
        this.context.beginPath();
        this.context.strokeStyle = color || '#9e066b';
        this.context.lineWidth = width;
        if (isDash) {
            this.context.setLineDash([7, 5]);
        } else {
            this.context.setLineDash([]);
        }
        this.context.moveTo(this.xsPolygon(x1), this.ysPolygon(y1));
        this.context.lineTo(this.xsPolygon(x2), this.ysPolygon(y2));
        this.context.stroke();
    }

    /*************************************************************************************/
}

export default Canvas;