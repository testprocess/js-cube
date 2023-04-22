
let object = {
    screen: undefined
}

// class Box {
//     constructor() {

//     }
// }

class Screen {
    constructor() {
        this.canvas = document.querySelector("canvas[ref='screen']")
        this.ctx = this.canvas.getContext("2d")
        this.init()

        this.ctx.beginPath();
        this.ctx.lineWidth = "6";
        this.ctx.fillStyle = "white";
        this.ctx.moveTo(50, 50)
        this.ctx.lineTo(50, 100)
        this.ctx.lineTo(100, 100)
        this.ctx.lineTo(100, 50)

        this.ctx.fill()
        //this.ctx.stroke();
    }

    init() {
        const width = document.body.clientWidth
        const height = document.body.clientHeight

        this.canvas.width = width
        this.canvas.height = height
    }
}

object.screen = new Screen()