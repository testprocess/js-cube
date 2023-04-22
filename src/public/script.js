
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

        this.centerX = this.canvas.width / 2
        this.centerY = this.canvas.height / 2
        this.centerZ = 0

        this.vertices = [
            new Point(this.centerX - this.width, this.centerY - this.height, 0 - this.depth),
            new Point(this.centerX + this.width, this.centerY - this.height, 0 - this.depth),
            new Point(this.centerX + this.width, this.centerY + this.height, 0 - this.depth),
            new Point(this.centerX - this.width, this.centerY + this.height, 0 - this.depth),
            new Point(this.centerX - this.width, this.centerY - this.height, 0 + this.depth),
            new Point(this.centerX + this.width, this.centerY - this.height, 0 + this.depth),
            new Point(this.centerX + this.width, this.centerY + this.height, 0 + this.depth),
            new Point(this.centerX - this.width, this.centerY + this.height, 0 + this.depth),
        ]

        this.edges = [
            [0, 1], [1, 2], [2, 3], [3, 0],
            [4, 5], [5, 6], [6, 7], [7, 4],
            [0, 4], [1, 5], [2, 6], [3, 7]
        ]

        this.faces = [
            [0,1,2,3],
            [4,5,6,7],
            [0,1,5,4],
            [1,2,6,5],
            [2,3,7,6],
            [0,3,7,4]
        ]

        this.draw()

        setInterval(() => {
            this.rotateX(0.02)
            this.rotateZ(0.02)
            this.draw()
        }, 40);
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (const edge of this.edges) {
            this.ctx.beginPath();
            this.ctx.lineWidth = "6";
            this.ctx.strokeStyle = "white";
            this.ctx.moveTo(this.vertices[edge[0]].x, this.vertices[edge[0]].y)
            this.ctx.lineTo(this.vertices[edge[1]].x, this.vertices[edge[1]].y)
            this.ctx.stroke()
        }
        
        for (const face of this.faces) {
            this.ctx.beginPath()
            this.ctx.fillStyle = `#${Math.floor(Math.random()*16777215).toString(16)}`
            this.ctx.moveTo(this.vertices[face[0]].x, this.vertices[face[0]].y)
            this.ctx.lineTo(this.vertices[face[1]].x, this.vertices[face[1]].y)
            this.ctx.lineTo(this.vertices[face[2]].x, this.vertices[face[2]].y)
            this.ctx.lineTo(this.vertices[face[3]].x, this.vertices[face[3]].y)
            this.ctx.fill()
        }
    }

    rotateZ(angle) {
        for (let vertice of this.vertices) {
            const dx = vertice.x - this.centerX
            const dy = vertice.y - this.centerY
            const x = dx * Math.cos(angle) - dy * Math.sin(angle)
            const y = dx * Math.sin(angle) + dy * Math.cos(angle)
            vertice.x = x + this.centerX
            vertice.y = y + this.centerY

        }
    }

    rotateX(angle) {
        for (let vertice of this.vertices) {
            const dz = vertice.z - this.centerZ
            const dy = vertice.y - this.centerY
            const z = dy * Math.cos(angle) - dz * Math.sin(angle)
            const y = dy * Math.sin(angle) + dz * Math.cos(angle)
            vertice.z = z + this.centerZ
            vertice.y = y + this.centerY

        }
    }

    rotateY(angle) {
        for (let vertice of this.vertices) {
            const dz = vertice.z - this.centerZ
            const dx = vertice.x - this.centerX
            const z = dz * Math.cos(angle) - dx * Math.sin(angle)
            const x = dz * Math.sin(angle) + dx * Math.cos(angle)
            vertice.z = z + this.centerZ
            vertice.x = x + this.centerX

        }
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
