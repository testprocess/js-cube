
let object = {
    screen: undefined
}

class Box {
    constructor(width, height, depth) {
        this.canvas = object.screen.canvas
        this.ctx = object.screen.ctx


        this.draw()
    }

    drawBox(points, color) {
        this.ctx.beginPath();
        this.ctx.fillStyle = color;
        this.ctx.moveTo(points[0][0], points[0][1])

        for (let index = 1; index < points.length; index++) {
            this.ctx.lineTo(points[index][0], points[index][1])
        }

        this.ctx.fill()            
    }

    draw() {
        // this.ctx.beginPath();
        // this.ctx.lineWidth = "6";
        // this.ctx.fillStyle = "white";
        // this.ctx.moveTo(50, 50)
        // this.ctx.lineTo(50, 100)
        // this.ctx.lineTo(100, 100)
        // this.ctx.lineTo(100, 50)
        // this.ctx.fill()


        this.drawBox([
            [50, 50],
            [50, 100],
            [100, 125],
            [100, 75]
        ], "#ffffff")

        this.drawBox([
            [100, 125],
            [100, 75],
            [150, 50],
            [150, 100]
        ], "#cfd0d1")

        this.drawBox([
            [50, 50],
            [100, 75],
            [150, 50],
            [100, 25]
        ], "#b6b7b8")
    }
}

class Screen {
    constructor() {
        this.canvas = document.querySelector("canvas[ref='screen']")
        this.ctx = this.canvas.getContext("2d")
        this.init()
    }

    init() {
        const width = document.body.clientWidth
        const height = document.body.clientHeight

        this.canvas.width = width
        this.canvas.height = height
    }
}

object.screen = new Screen()
new Box(1,1,1)
