Quintus.ActionPlatformerPlayer = function(Q) {
  Q.Sprite.extend("Player",{

    init: function(p) {

      this._super(p,{
        sheet: "player",
        sprite: "player",
        collisionMask: 1, 
        x: 40,
        y: 555,
        standingPoints: [ [ -16, 44], [ -23, 35 ], [-23,-48], [23,-48], [23, 35 ], [ 16, 44 ]],
        duckingPoints : [ [ -16, 44], [ -23, 35 ], [-23,-10], [23,-10], [23, 35 ], [ 16, 44 ]],
        speed: 0,
        vx:0,
        distance:0,
        jump: -700
      });

      this.p.points = this.p.standingPoints;

      this.add("2d, animation");
    },

    step: function(dt) {
      // this.p.vx += (this.p.speed - this.p.vx)/4;
      this.p.vx ++;
      this.p.distance ++;
      Q.stageScene('hud', 3, this.p);

      if(this.p.y > 555) {
        this.p.y = 555;
        this.p.landed = 1;
        this.p.vy = 0;
      } else {
        this.p.landed = 0;
      }

      if(Q.inputs['up'] && this.p.landed > 0) {
        this.p.vy = this.p.jump;
      } 

      this.p.points = this.p.standingPoints;
      if(this.p.landed) {
        if(Q.inputs['down']) { 
          this.play("duck_right");
          this.p.points = this.p.duckingPoints;
        } else {
          this.play("walk_right");
        }
      } else {
        this.play("jump_right");
      }

      this.stage.viewport.centerOn(this.p.x + 300, 400 );

    }
  });
}
