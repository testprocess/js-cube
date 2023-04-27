
let object = {
    screen: undefined
}

class Vector {
    constructor(x, y, z) {
        this.x = x || 0
        this.y = y || 0
        this.z = z || 0
    }

    dotProduct(vector) {
        return (this.x * vector.x) + (this.y * vector.y) + (this.z * vector.z) 
    }

    crossProduct(vector) {
        return {
            x: (this.y * vector.z) - (this.z * vector.y), 
            y: (this.z * vector.x) - (this.x * vector.z),
            z: (this.x * vector.y) - (this.y * vector.x)
        }
    }
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

        this.cameraVector = new Vector(this.centerX, this.centerY, -this.depth)

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
        }, 10);
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        const id = Math.floor(Math.random()*16777215).toString(4)

        for (const edge of this.edges) {
            this.ctx.beginPath();
            this.ctx.lineWidth = "6";
            this.ctx.strokeStyle = "white";
            this.ctx.moveTo(this.vertices[edge[0]].x, this.vertices[edge[0]].y)
            this.ctx.lineTo(this.vertices[edge[1]].x, this.vertices[edge[1]].y)
            this.ctx.stroke()
        }
        
        for (const face of this.faces) {
            const v1 = [
                this.vertices[face[0]].x - this.vertices[face[1]].x, 
                this.vertices[face[0]].y - this.vertices[face[1]].y, 
                this.vertices[face[0]].z - this.vertices[face[1]].z
            ]

            const v2 = [
                this.vertices[face[0]].x - this.vertices[face[2]].x, 
                this.vertices[face[0]].y - this.vertices[face[2]].y, 
                this.vertices[face[0]].z - this.vertices[face[2]].z
            ]

            const vector1 = new Vector(v1[0], v1[1], v1[2])
            const vector2 = new Vector(v2[0], v2[1], v2[2])

            const cross = vector1.crossProduct(vector2)
            const dot = this.cameraVector.dotProduct(cross)
            console.log(id, dot)

            if (dot > 0) {
                this.ctx.beginPath()
                this.ctx.fillStyle = `#ffffff` // {Math.floor(Math.random()*16777215).toString(16)}
                this.ctx.moveTo(this.vertices[face[0]].x, this.vertices[face[0]].y)
                this.ctx.lineTo(this.vertices[face[1]].x, this.vertices[face[1]].y)
                this.ctx.lineTo(this.vertices[face[2]].x, this.vertices[face[2]].y)
                this.ctx.lineTo(this.vertices[face[3]].x, this.vertices[face[3]].y)
                this.ctx.fill()
            }


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
