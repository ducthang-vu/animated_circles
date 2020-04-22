console.log('js.main is working.');

const canvas = document.getElementById('canvas');
const c = canvas.getContext('2d');

const number_circles = 200
const radius = 30;
const max_speed = 5;
const mouseRadius = 75;

var circles = [];    //will contain 100 circles
var mouse = [];


/* Fix canvas dimensions */
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.onresize = resizeCanvas;


class Circle {
    constructor(radius) {
        this.x = Math.random() * (canvas.width - 2 * radius) + radius;
        this.y = Math.random() * (canvas.height - 2 * radius) + radius;
        this.radius = radius;
        this.velocity = [(Math.random() - 0.5) * max_speed, (Math.random() - 0.5) * max_speed];

        this.print();
    }

    move() {
        if (this.x + this.velocity[0] > canvas.width - radius || this.x + this.velocity[0] < radius) {
            this.velocity[0] *= -1;
        }

        if (this.y + this.velocity[1] > canvas.height - radius || this.y + this.velocity[1] < radius) {
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
        c.fillStyle = ['red', 'yellow', 'orange'][Math.random() * 3 | 0];
        c.fill();
    }
}


function animate() {
    requestAnimationFrame(animate);

    c.clearRect(0, 0, canvas.width, canvas.height);

    for (circle of circles) {
        if (circle.x < mouse[0] + mouseRadius && circle.x > mouse[0] - mouseRadius &&
            circle.y < mouse[1] + mouseRadius && circle.y > mouse[1] - mouseRadius) {
            if (circle.radius < mouseRadius) circle.radius++
        } else {
            if (circle.radius > radius) circle.radius--
        }

        circle.move();
        circle.print();
    }
}



/* MAIN SCRIPT */

for (let i = 0; i < number_circles; i++) {
    circles.push(new Circle(30));
}

document.addEventListener('mousemove', function(e) {mouse = [e.clientX, e.clientY]})
animate();