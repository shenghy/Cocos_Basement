cc.Class({
    extends: cc.Component,

    properties: {
   
    },

    // use this for initialization
    onLoad: function () {

    },
    noteBox:function(){
        return this.node.getBoundingBox();
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
