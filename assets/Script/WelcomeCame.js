cc.Class({
    extends: cc.Component,

    properties: {
       bgAudio:{
           default:null, 
           url:cc.AudioClip                                       
       },
       startBtn:{
           default:null,
           type:cc.Node
       }
    },
    
    // use this for initialization
    onLoad: function () {
        cc.audioEngine.playMusic(this.bgAudio,true);
        cc.director.preloadScene("MainScene");
        var scaleTo = cc.scaleTo(0.8,0.9);
        var reverse = cc.scaleTo(0.8,1);
        var seq = cc.sequence(scaleTo,reverse);
        var repeat = cc.repeatForever(seq);
        this.startBtn.runAction(repeat);
        this.startBtn.on("touchstart",function(){
             cc.audioEngine.pauseMusic();
             cc.director.loadScene("MainScene");
        });

    },
    

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
