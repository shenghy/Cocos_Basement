var tmpPlayer = require("Player");
cc.Class({
    extends: cc.Component,

    properties: {
       dieAudio:{
           default:null,
           url:cc.AudioClip
       }
    },

    
    onLoad: function () {
        var self= this;
        var listener = {
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: function (touches, event) {
                var goAction= cc.moveBy(0.2,cc.p(0,140));
                self.node.runAction(goAction);
                return true; //这里必须要写 return true
            },
            onTouchMoved: function (touches, event) {
              
            },
            onTouchEnded: function (touches, event) {
           
            },
            onTouchCancelled: function (touches, event) {
            }
        }
        cc.eventManager.addListener(listener, this.node);
    },
    noteBox:function(){
        return this.node.getBoundingBoxToWorld();
    },
    // called every frame, uncomment this function to activate update callback
     update: function (dt) {
        var player = cc.find("Canvas/normal").getComponent(tmpPlayer);

        if(cc.rectIntersectsRect(player.node.getBoundingBoxToWorld(),this.noteBox())){
            
            cc.audioEngine.playEffect(this.dieAudio,false);
            cc.director.loadScene('OverScene');
           //cc.log('碰撞');
        }

     },
});
