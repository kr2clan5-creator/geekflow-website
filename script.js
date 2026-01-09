const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const colors = ['#ff0080','#7928ca','#00ffff','#ffd700','#0ff'];

class Particle {
  constructor() {
    this.x = Math.random()*canvas.width;
    this.y = Math.random()*canvas.height;
    this.radius = Math.random()*3+1;
    this.color = colors[Math.floor(Math.random()*colors.length)];
    this.vx = (Math.random()-0.5)*1.5;
    this.vy = (Math.random()-0.5)*1.5;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x,this.y,this.radius,0,Math.PI*2);
    ctx.fillStyle = this.color;
    ctx.shadowBlur = 12;
    ctx.shadowColor = this.color;
    ctx.fill();
  }
  update(mouse) {
    const dx = mouse.x - this.x;
    const dy = mouse.y - this.y;
    const dist = Math.sqrt(dx*dx+dy*dy);
    if(dist<100){
      this.vx += dx*0.001;
      this.vy += dy*0.001;
    }
    this.x += this.vx;
    this.y += this.vy;
    if(this.x<0||this.x>canvas.width) this.vx*=-1;
    if(this.y<0||this.y>canvas.height) this.vy*=-1;
    this.draw();
  }
}

for(let i=0;i<300;i++) particles.push(new Particle());

const mouse = {x:canvas.width/2, y:canvas.height/2};
canvas.addEventListener('mousemove', (e)=>{
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particles.forEach(p=>p.update(mouse));
  requestAnimationFrame(animate);
}
animate();

const heading = document.querySelector('h1');
heading.addEventListener('mouseenter',()=> heading.style.color='#ff0');
heading.addEventListener('mouseleave',()=> heading.style.color='#fff');

window.addEventListener('resize', ()=>{
  canvas.width=window.innerWidth;
  canvas.height=window.innerHeight;
});
