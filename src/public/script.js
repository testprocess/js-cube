
let object = {
    screen: undefined
}

class Point {
    constructor(x, y, z) {
        this.x = x
        this.y = y
        this.z = z
    }
}

class Box {
    constructor(width, height, depth) {
        this.canvas = object.screen.canvas
        this.ctx = object.screen.ctx

        this.width = width
        this.height = height
        this.depth = depth

        this.draw()
    }

    draw() {

        const centerX = this.canvas.width / 2
        const centerY = this.canvas.height / 2

        const vertices = [
            new Point(centerX - this.width, centerY - this.height, 0 - this.depth),
            new Point(centerX + this.width, centerY - this.height, 0 - this.depth),
            new Point(centerX + this.width, centerY + this.height, 0 - this.depth),
            new Point(centerX - this.width, centerY + this.height, 0 - this.depth),
            new Point(centerX - this.width, centerY - this.height, 0 + this.depth),
            new Point(centerX + this.width, centerY - this.height, 0 + this.depth),
            new Point(centerX + this.width, centerY + this.height, 0 + this.depth),
            new Point(centerX - this.width, centerY + this.height, 0 + this.depth),
        ]

        const edges = [
            [0, 1], [1, 2], [2, 3], [3, 0],
            [4, 5], [5, 6], [6, 7], [7, 4],
            [0, 4], [1, 5], [2, 6], [3, 7]

        ]

        console.log(vertices, edges)

        for (const edge of edges) {
            this.ctx.beginPath();
            this.ctx.lineWidth = "6";
            this.ctx.strokeStyle = "white";
            this.ctx.moveTo(vertices[edge[0]].x, vertices[edge[0]].y)
            this.ctx.lineTo(vertices[edge[1]].x, vertices[edge[1]].y)
            this.ctx.stroke()
            
        }
        // this.ctx.beginPath();
        // this.ctx.lineWidth = "6";
        // this.ctx.fillStyle = "white";
        // this.ctx.moveTo(50, 50)
        // this.ctx.lineTo(50, 100)
        // this.ctx.lineTo(100, 100)
        // this.ctx.lineTo(100, 50)
        // this.ctx.fill()

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
new Box(80,80,80)
