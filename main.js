const divs = []

const clientX = document.body.offsetWidth

canvas1.width = canvas1.offsetWidth
canvas1.height = canvas1.offsetHeight
const ctx = canvas1.getContext('2d')

let lastX
let lastY

function canvasMouseMoveHandler(e) {

    ctx.moveTo(lastX, lastY)
    ctx.lineTo(e.x, e.y)
    ctx.stroke()
    lastX = e.x
    lastY = e.y
}

canvas1.addEventListener('mousedown', e => {
    lastX = e.x
    lastY = e.y
    // ctx.beginPath()
    canvas1.addEventListener('mousemove', canvasMouseMoveHandler)
})

canvas1.addEventListener('mouseup', () => {
    canvas1.removeEventListener('mousemove', canvasMouseMoveHandler)
})


function randomColor() {
    return `rgba(${Math.random() * 255},${Math.random() * 255}, ${Math.random() * 255}, ${Math.random()/2 + 0.5})`
}

// function resetDragDefault(element) {
//     element.addEventListener("dragover", function (e) {
//         e.preventDefault();
//         e.stopPropagation();
//     }, false);

//     element.addEventListener("dragleave", function (e) {
//         e.preventDefault();
//         e.stopPropagation();
//     }, false);

//     element.addEventListener("drop", function (e) {
//         e.preventDefault();
//         e.stopPropagation();
    
//     })
// }

// resetDragDefault(document)
// resetDragDefault(boxImg)
// resetDragDefault(box)

class MyDiv {
    element
    speedX
    speedY
    _top
    _left
    x
    y
    boxWidth
    boxHeight
    time = 0
    interval = 100
 
    constructor(speedX,speedY, top, left, boxWidth, boxHeight ){
        const div = document.createElement('div')
        // resetDragDefault(div)
        // div.draggable = 'false'
      
        this.element = div
        this.top = top
        this.y = top
        this.x = left 
        this.left = left + boxWidth / 3
        this.speedX = speedX
        this.speedY = speedY
        this.boxHeight = boxHeight
        this.boxWidth = boxWidth


        div.style.width = `${(box.offsetWidth - 20) * Math.random() / 2 + 20}px`
        div.style.height = `${(box.offsetWidth - 20)* Math.random() / 2 + 20}px`
        div.style.position = 'absolute'
       
        div.style.backgroundColor = randomColor()
        div.style.border = Math.random() > 0.5 ? `${Math.random() * 20 + 1}px solid ${randomColor()}` : 'none'
        div.style.borderTopLeftRadius = `${Math.random() * 100}%`
        div.style.borderTopRightRadius = `${Math.random() * 100}%`
        div.style.borderBottomLeftRadius = `${Math.random() * 100}%`
        div.style.borderBottomRightRadius = `${Math.random() * 100}%`
        div.style.boxShadow = Math.random() > 0.5 ? `${Math.random() * 20 + 1}px  ${Math.random() * 20 + 1}px ${Math.random() * 100 + 1}px ${randomColor()}` : 'none'
        
    }

    update(deltaTime) {
        this.time += deltaTime
        if (this.time < this.interval) return;
        this.time = 0
        this.top += this.speedY
        this.left += this.speedX
        this.speedY++
        // console.log(this.offsetHeight)
        if (clientX < this.left + this.element.offsetWidth) {
            this.left = clientX - this.element.offsetWidth
            this.speedX = 0
        }
        if (this.y + this.boxHeight < this.top + this.element.offsetHeight && this.x < this.left) {
            this.top = this.y + this.boxHeight - this.element.offsetHeight
            this.speedY = -this.speedY /2
            if (Math.abs(this.speedY) < 2) {
                this.update = () => null
                let mdX
                let mdY
                const moveHandle = (e) => {
                    this.top = e.y - mdY
                    this.left = e.x - mdX 
                    
                }
               
                this.element.addEventListener('mousedown', e => {
                    e.preventDefault()
                    mdX = e.x - this.left
                    mdY = e.y - this.top

                    document.addEventListener('mousemove', moveHandle)
                })

                document.addEventListener('mouseup', () => {
                    document.removeEventListener('mousemove', moveHandle)
                })


            } 
         
           
        }

    }

    set top(val) {
        this._top = val
        this.element.style.top = val + 'px' 
        // console.log( this.element.style.top);
        
    }

    get top() {
        return this._top
    }

    set left(val) {
        this._left = val
        this.element.style.left = val + 'px'
    }

    get left() {
        return this._left
    }

}



let lastTime = 0
function animate(timestamp) {
    let deltaTime = timestamp - lastTime
    divs.forEach(item => {
        item.update(deltaTime)
    }) 
    requestAnimationFrame(animate)
}

animate(0)

box.addEventListener('click', () => {
    boxImg.style.animation = 'bounce 1s ease-out'
  
    const oneDiv = new MyDiv( Math.random() * 10 + 5, -(Math.random() * 25 + 10), box.offsetTop, box.offsetLeft,box.offsetWidth, box.offsetHeight)
    document.body.appendChild(oneDiv.element)
    divs.push(oneDiv)
})

boxImg.addEventListener('animationend', () => {
    boxImg.style.animation = ''
})

