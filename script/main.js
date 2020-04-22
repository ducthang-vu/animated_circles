console.log('js.main is working.');

const canvas = document.getElementById('canvas');
const c = canvas.getContext('2d');
const radius = 30

var circles = [] //will contain 100 circles


/* Fix canvas dimensions */
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


class Circle {
    constructor(radius) {
        this.x = Math.random() * (innerWidth - 2 * radius) + radius;
        this.y = Math.random() * (innerHeight - 2 * radius) + radius;
        this.radius = radius;
        this.velocity = [(Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10];

        this.print();
    }

    move() {
        if (this.x + this.velocity[0] > innerWidth - radius || this.x + this.velocity[0] < radius) {
            this.velocity[0] *= -1
        }

        if (this.y + this.velocity[1] > innerWidth - radius || this.y + this.velocity[1] < radius) {
            this.velocity[1] *= -1
        }
        
        this.x += this.velocity[0]
        this.y += this.velocity[1]
    }

    print() {
        c.beginPath();
        c.arc(this.x, this.y, radius, 0, 2 * Math.PI);
        c.strokeStyle = 'red';
        c.stroke();
        c.fillStyle = 'blue';
        c.fill();
    }
}


for (let i = 0; i < 100; i++) {
    circles.push(new Circle(30))
}


function animate() {
    requestAnimationFrame(animate)

    c.clearRect(0, 0, c.width, c.height)
    for (circle of circles) {
        circle.move()
        circle.print()
    }
}

animate()