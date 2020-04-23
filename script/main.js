console.log('js.main is working.');


/* GLOBAL VARIABLE */
const canvas = document.getElementById('canvas');
const c = canvas.getContext('2d');

const menuBtn = document.getElementById('menu-btn')
const list = document.getElementById('menu-list')

/* FIX CANVAS */
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();


/* CLASSES */
class Circle {
    constructor(radius, max_speed) {
        this.x = Math.random() * (canvas.width - 2 * radius) + radius;
        this.y = Math.random() * (canvas.height - 2 * radius) + radius;
        this.radius = radius;
        this.velocity = [(Math.random() - 0.5) * max_speed, (Math.random() - 0.5) * max_speed];
        this.colour = ['#801662','#9C8922', '#911ADB', '#25D604', '#1F0FD1'][Math.random() * 5 | 0];
        this.print();
    }

    move() {
        if (this.x + this.velocity[0] > canvas.width - this.radius || this.x + this.velocity[0] < this.radius) {
            this.velocity[0] *= -1;
        }

        if (this.y + this.velocity[1] > canvas.height - this.radius || this.y + this.velocity[1] < this.radius) {
            this.velocity[1] *= -1;
        }
        
        this.x += this.velocity[0];
        this.y += this.velocity[1];
    }

    print() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        c.strokeStyle = 'white'
        c.stroke();
        c.fillStyle = this.colour
        c.fill();
    }
}


class Animation {
    constructor(number, radius, max_speed, mouse_radius) {
        self = this;
        this.number_circles = number;
        this.radius = radius;
        this.max_speed = max_speed;
        this.mouseRadius = mouse_radius;
        this.attraction = false

        this.circles = [];   
        this.mouse = [];

        for (let i = 0; i < this.number_circles; i++) {
            this.circles.push(new Circle(this.radius, this.max_speed));
        }
    }

    activateMouseMove() {
        document.addEventListener('mousemove', function(e) {self.mouse = [e.clientX, e.clientY]});
        document.addEventListener('mouseleave', () => {this.mouse = [undefined, undefined]});
    }

    activateGravity() {
        document.addEventListener('click', () => this.attraction = !this.attraction);
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));

        c.clearRect(0, 0, canvas.width, canvas.height);

        for (let circle of this.circles) {
            if (circle.x < this.mouse[0] + this.mouseRadius && circle.x > this.mouse[0] - this.mouseRadius &&
                circle.y < this.mouse[1] + this.mouseRadius && circle.y > this.mouse[1] - this.mouseRadius) {
                if (circle.radius < this.mouseRadius) circle.radius++;
            } else {
                if (circle.radius > this.radius) circle.radius--;
            }
            
            if (this.attraction) {
                if (circle.x > this.mouse[0]) circle.velocity[0] = -Math.abs(circle.velocity[0]);
                else if (circle.x < this.mouse[0]) circle.velocity[0] = Math.abs(circle.velocity[0]);

                if (circle.y > this.mouse[1]) circle.velocity[1] = -Math.abs(circle.velocity[1]);
                else if (circle.y < this.mouse[1]) circle.velocity[1] = Math.abs(circle.velocity[1]);; 
            }

            circle.move();
            circle.print();
        }
    }

    start() {
        window.onresize = resizeCanvas;
        this.activateMouseMove();
        this.activateGravity();
        this.animate();
    }
}


/***************/
/* MAIN SCRIPT */
/***************/
animation = new Animation(600, 10, 5, 100);
animation.start();



// Make menu draggable and show/hide list
//Make the element draggagle:
function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById('menu')) {
        document.getElementById('menu').onmousedown = dragMouseDown;
    } else {
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

dragElement(document.getElementById("menu"));

menuBtn.addEventListener('click', function() {
    if (list.className.includes('no-display')) {
        list.classList.remove('no-display');
        list.classList += 'show';
        menuBtn.children[0].className = 'fas fa-chevron-up'
    } else {
        list.classList.remove('show');
        list.classList += 'no-display';
        menuBtn.children[0].className = 'fas fa-chevron-down'
    }
})