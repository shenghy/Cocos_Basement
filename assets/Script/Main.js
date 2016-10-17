cc.Class({
    extends: cc.Component,

    properties: {
      player:{
          default:null,
          type:cc.Node
      },
      dici:{
          default:null,
          type:cc.Prefab
      },
      diciCount:0,
      bgAudio:{
           default:null, 
           url:cc.AudioClip                                       
       },
       jumpAudio:{
           default:null,
            url:cc.AudioClip 
       },
       playTime:60, //游戏时间，倒计时
       timeLabe:{
           default:null,
           type:cc.Label
       },
       scoreLabel:{
           default:null,
           type:cc.Label
       },
       score:0,
       dc_duration:140,//地刺的间隔距离

    },

    playerMoveLeft:function(){
        var goLeft= cc.moveTo(0.2,cc.p(-this.node.width/2+80,this.player.getPositionY()));
        var goL1= cc.moveTo(0.1,cc.p(-this.node.width/2+80+30,this.player.getPositionY()));
        var goL2= cc.moveTo(0.1,cc.p(-this.node.width/2+80,this.player.getPositionY()));
        var sque=cc.sequence(goL1,goL2);
        
        if(this.player.rotationY==0)
        {
            this.player.rotationY=0;
            this.player.runAction(sque);
        }
        else{
            this.player.rotationY=0;
            this.player.runAction(goLeft);
        }
        
    },
    playerMoveRight:function(){
        var goRight= cc.moveTo(0.2,cc.p(this.node.width/2-80,this.player.getPositionY()));
        var goR1= cc.moveTo(0.1,cc.p(this.node.width/2-80-30,this.player.getPositionY()));
        var goR2= cc.moveTo(0.1,cc.p(this.node.width/2-80,this.player.getPositionY()));
        var sque=cc.sequence(goR1,goR2);
       
        if(this.player.rotationY==180){
             this.player.rotationY=180;
            this.player.runAction(sque);
        }
        else{
             this.player.rotationY=180;
             this.player.runAction(goRight);
        }
       
    },
    //得到新的地刺
    NewDici:function(){
        this.diciCount+=1;
        var newDici = cc.instantiate(this.dici);
        this.node.addChild(newDici);
        var randD= cc.random0To1();
        if(randD>=0.5){
            newDici.rotationY=0;
        }else{
            newDici.rotationY=180;
        }
        newDici.setPosition(this.diciPosition(randD));
        
      
    },
    //地刺的出现位置
    diciPosition:function(randD){
        
        var randX=0;
        var randY=0;
        //大于0.5在右边，小于0.5在左边出现
        if(randD>=0.5){
            randX=this.node.width/2-80;
        }else{
            randX=-this.node.width/2+80;
        }
        if(this.diciCount<=8){
            randY=(this.node.height/2)-(this.dc_duration*this.diciCount)-this.dc_duration*1;
        }else{
            randY=(this.node.height/2)-(this.dc_duration*8)-this.dc_duration*1;
        }
        return cc.p(randX,randY);
    },
    
    //监听玩家操控
    setInputControl:function(){
        var self = this;
        var listener = {
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: function (touches, event) {
                cc.audioEngine.playEffect(self.jumpAudio,false);
                var target = event.getCurrentTarget();//获取事件所绑定的target
                var locationInNode = target.convertToNodeSpace(touches.getLocation());
                //cc.log('locationInNode: ' + locationInNode.x);
                if(locationInNode.x>self.node.width/2){
                   self.playerMoveRight();//player向右移动
                }else{
                   self.playerMoveLeft();//player向左移动
                }
                //把分数存储到本地
                self.score+=1;
                cc.sys.localStorage.setItem("score",self.score);
                
                self.scoreLabel.string = self.score;
                self.NewDici();
                return true; //这里必须要写 return true
            },
            onTouchMoved: function (touches, event) {
              
            },
            onTouchEnded: function (touches, event) {
           
            },
            onTouchCancelled: function (touches, event) {
            }
        }
        cc.eventManager.addListener(listener, self.node);
    },

    // use this for initialization
    onLoad: function () {
       this.score=0;
       //设置音效的音量
       cc.audioEngine.setEffectsVolume(0.2);
       cc.audioEngine.playMusic(this.bgAudio,true);
       cc.director.preloadScene("OverScene");
       this.setInputControl();
       this.player.setPosition(-this.node.width/2+80,this.node.height/2-175);
        for(var i=0;i<8;i++)
        {
            this.NewDici();
        }

        this.schedule(function(){
            this.playTime--;
            this.timeLabe.string = "倒计时:"+this.playTime;
            if(this.playTime<=0){
                cc.audioEngine.pauseMusic();
                cc.director.loadScene('OverScene');
            }
        },1);
       
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
