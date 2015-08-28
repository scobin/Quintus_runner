Quintus.ActionPlatformerAIPlayer = function(Q) {
  Q.Sprite.extend("AIPlayer",{

    init: function(p) {

      this._super(p,{
        sheet: "player",
        sprite: "player",
        collisionMask: 1, 
        x: 100,
        y: 555,
        standingPoints: [ [ -16, 44], [ -23, 35 ], [-23,-48], [23,-48], [23, 35 ], [ 16, 44 ]],
        duckingPoints : [ [ -16, 44], [ -23, 35 ], [-23,-10], [23,-10], [23, 35 ], [ 16, 44 ]],
        speed: 0,
        vx:0,
        // distance:0,
        jump: -700,
        opacity: 0.4,
        action: 1
      });

      this.p.points = this.p.standingPoints;

      this.add("2d, animation");
    },

    step: function(dt) {
      this.p.vx += 1;
      this.p.speed = this.p.vx;

      if(this.p.y > 555) {
        this.p.y = 555;
        this.p.landed = 1;
        this.p.vy = 0;
      } else {
        this.p.landed = 0;
      }

      if(this.p.action == 2 && this.p.landed > 0) {
        this.p.vy = this.p.jump;
      } 

      // this.p.points = this.p.standingPoints;
      if(this.p.landed) {
        if(this.p.action == 0) { 
          this.play("duck_right");
          this.p.points = this.p.duckingPoints;
        } else {
          this.play("walk_right");
        }
      } else {
        this.play("jump_right");
      }

      var player = Q("Player").first();
      if (player) {
        if (player.p.x + 60 > this.p.x) {
          this.p.vx += 5;
        } else if (player.p.x + 200 < this.p.x) {
          this.p.vx --;
        }
        
        if (player.p.x < (this.p.x + 30) || player.p.x > (this.p.x - 30)) {
          this.p.type = Q.SPRITE_NONE;
        } else {
          this.p.type = 1;
        }
      }
      // this.stage.viewport.centerOn(this.p.x + 300, 400 );

    }
  });
}
