Quintus.ActionPlatformerBox = function(Q) {
	Q.Sprite.extend("Box",{
		init: function() {

			var levels = [ 565, 540, 500, 450 ];

			var player = Q("Player").first();
			var offsetX = 0;
			if (player) {
				offsetX = player.p.x
			}
			this._super({
					x: offsetX + Q.width + 50,
					y: levels[Math.floor(Math.random() * 3)],
					frame: Math.random() < 0.5 ? 1 : 0,
					scale: 2,
					type: 1,
					sheet: "crates",
					vx: -600 + 200 * Math.random(),
					vy: 0,
					ay: 0,
					speed: 100,
					theta: (300 * Math.random() + 200) * (Math.random() < 0.5 ? 1 : -1),
					isHit: 0
				});

			this.on("hit");
		},

		step: function(dt) {
			this.p.x += this.p.vx * dt;

			this.p.vy += this.p.ay * dt;
			this.p.y += this.p.vy * dt;
			if(this.p.y != 565) {
				this.p.angle += this.p.theta * dt;
			}

			if(this.p.y > 800) { this.destroy(); }

		},

		hit: function(collision) {
			this.p.type = 0;
			this.p.collisionMask = Q.SPRITE_NONE;
			this.p.vx = 200;
			this.p.ay = 400;
			this.p.vy = -300;
			this.p.opacity = 0.5;
			if(collision.obj.isA("Player") && this.p.isHit == 0) {
				this.p.isHit = 1;
				
				if (collision.obj.p.speed > 500) {
					Q.stageScene("endGame",1, { label: "GAME OVER!" }); 
				    collision.obj.destroy();
				} else {
					collision.obj.p.speed -= this.p.speed;
					collision.obj.p.vx = collision.obj.p.speed;
				}
				
			}
		}


	});
}