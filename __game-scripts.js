pc.script.createLoadingScreen((function(e){var t,n;t=["body {","    background-color: #283538;","}","","#application-splash-wrapper {","    position: absolute;","    top: 0;","    left: 0;","    height: 100%;","    width: 100%;","    background-color: #283538;","    display: flex;","    align-items: center;","    justify-content: center;","}","","#application-splash {","    text-align: center;","}","","#progress-circle {","    width: 100px;","    height: 100px;","    border-radius: 50%;","    background: conic-gradient(#1d292c 0deg, #1d292c 360deg);","    position: relative;","    display: flex;","    align-items: center;","    justify-content: center;","}","","#progress-percentage {","    position: absolute;","    color: white;","    font-family: Arial, sans-serif;","    font-size: 36px;","}","","@media (max-width: 480px) {","    #progress-circle {","        width: 80px;","        height: 80px;","    }","    #progress-percentage {","        font-size: 16px;","    }","}"].join("\n"),(n=document.createElement("style")).type="text/css",n.styleSheet?n.styleSheet.cssText=t:n.appendChild(document.createTextNode(t)),document.head.appendChild(n),function(){var e=document.createElement("div");e.id="application-splash-wrapper",document.body.appendChild(e);var t=document.createElement("div");t.id="application-splash",e.appendChild(t);var n=document.createElement("div");n.id="progress-circle",t.appendChild(n);var r=document.createElement("div");r.id="progress-percentage",r.textContent="0%",n.appendChild(r)}(),e.on("preload:end",(function(){e.off("preload:progress")})),e.on("preload:progress",(function(e){var t=document.getElementById("progress-percentage"),n=document.getElementById("progress-circle");if(t&&n){e=Math.min(1,Math.max(0,e));var r=Math.floor(100*e);t.textContent=r+"%";var a=3.6*r;n.style.background=`conic-gradient(#ff0000 ${a}deg, #1d292c ${a}deg)`}})),e.on("start",(function(){var e=document.getElementById("application-splash-wrapper");e.parentElement.removeChild(e)}))}));var Movement=pc.createScript("movement");Movement.attributes.add("speed",{type:"number",default:5}),Movement.attributes.add("slideFactor",{type:"number",default:.1}),Movement.prototype.initialize=function(){this.targetX=this.entity.getPosition().x},Movement.prototype.update=function(t){var e=this.entity.getPosition();this.app.keyboard.isPressed(pc.KEY_A)&&(this.targetX-=this.speed*t),this.app.keyboard.isPressed(pc.KEY_D)&&(this.targetX+=this.speed*t),e.x=pc.math.lerp(e.x,this.targetX,this.slideFactor),this.entity.setPosition(e)};var MovementBot=pc.createScript("movementBot");MovementBot.attributes.add("speed",{type:"number",default:5}),MovementBot.attributes.add("slideFactor",{type:"number",default:.1}),MovementBot.prototype.initialize=function(){this.targetX=this.entity.getPosition().x},MovementBot.prototype.update=function(t){var e=this.entity.getPosition();this.app.keyboard.isPressed(pc.KEY_LEFT)&&(this.targetX-=this.speed*t),this.app.keyboard.isPressed(pc.KEY_RIGHT)&&(this.targetX+=this.speed*t),e.x=pc.math.lerp(e.x,this.targetX,this.slideFactor),this.entity.setPosition(e)};var MoveRb=pc.createScript("moveRb");MoveRb.attributes.add("speed",{type:"number",default:10}),MoveRb.attributes.add("friction",{type:"number",default:.9}),MoveRb.prototype.initialize=function(){},MoveRb.prototype.update=function(t){var e=this.entity.rigidbody.linearVelocity;this.app.keyboard.isPressed(pc.KEY_A)?e.x=pc.math.lerp(e.x,-this.speed,this.friction*t):this.app.keyboard.isPressed(pc.KEY_D)?e.x=pc.math.lerp(e.x,this.speed,this.friction*t):e.x=pc.math.lerp(e.x,0,this.friction*t),this.entity.rigidbody.linearVelocity=e};var MoveRbbot=pc.createScript("moveRbbot");MoveRbbot.attributes.add("speed",{type:"number",default:10}),MoveRbbot.attributes.add("friction",{type:"number",default:.9}),MoveRbbot.prototype.initialize=function(){},MoveRbbot.prototype.update=function(t){var e=this.entity.rigidbody.linearVelocity;this.app.keyboard.isPressed(pc.KEY_LEFT)?e.x=pc.math.lerp(e.x,-this.speed,this.friction*t):this.app.keyboard.isPressed(pc.KEY_RIGHT)?e.x=pc.math.lerp(e.x,this.speed,this.friction*t):e.x=pc.math.lerp(e.x,0,this.friction*t),this.entity.rigidbody.linearVelocity=e};var PuckShooter=pc.createScript("puckShooter");PuckShooter.attributes.add("forceMagnitude",{type:"number",default:10,title:"Сила удара",description:"Сила, с которой шайба будет отбиваться"}),PuckShooter.attributes.add("angle",{type:"number",default:45,title:"Угол удара (градусы)",description:"Угол, под которым шайба будет отбиваться"}),PuckShooter.attributes.add("extraGravity",{type:"number",default:10,title:"Дополнительная гравитация",description:"Дополнительная сила, ускоряющая падение шайбы"}),PuckShooter.prototype.initialize=function(){this.app.keyboard.on(pc.EVENT_KEYDOWN,this.onKeyDown,this)},PuckShooter.prototype.update=function(t){var e=this.entity.rigidbody.linearVelocity;e.y-=this.extraGravity*t,this.entity.rigidbody.linearVelocity=e},PuckShooter.prototype.shootPuck=function(t){var e=pc.math.DEG_TO_RAD*this.angle,i=new pc.Vec3(Math.cos(e)*t,Math.sin(e),0);i.normalize().scale(this.forceMagnitude);var o=this.entity.rigidbody.linearVelocity;o.x=0,this.entity.rigidbody.linearVelocity=o,this.entity.rigidbody.applyImpulse(i)},PuckShooter.prototype.resetVelocity=function(){var t=this.entity.rigidbody.linearVelocity;t.x=0,this.entity.rigidbody.linearVelocity=t},PuckShooter.prototype.onKeyDown=function(t){t.key===pc.KEY_H?this.shootPuck(-1):t.key===pc.KEY_F&&this.shootPuck(1)};var Stick=pc.createScript("stick");Stick.attributes.add("targetScriptEntity",{type:"entity",description:"Объект с целевым скриптом для выполнения удара"}),Stick.prototype.initialize=function(){this.entity.collision?this.entity.collision.on("triggerenter",this.onTriggerEnter,this):console.error("Клюшка должна иметь компонент collision.")},Stick.prototype.onTriggerEnter=function(t){if(t.tags.has("puck")&&this.targetScriptEntity.script&&this.targetScriptEntity.script.puckShooter){if(this.entity.tags.has("npc"))return void this.targetScriptEntity.script.puckShooter.shootPuck(-1);this.targetScriptEntity.script.puckShooter.shootPuck(1)}};var Gates=pc.createScript("gates");Gates.attributes.add("puck",{type:"entity"}),Gates.attributes.add("gameManager",{type:"entity"}),Gates.prototype.initialize=function(){this.entity.collision.on("triggerenter",this.onTriggerEnter,this)},Gates.prototype.onTriggerEnter=function(t){if(t.tags.has("puck")){if(this.puck.script.puckShooter.resetVelocity(),this.entity.tags.has("npc"))return void this.gameManager.script.gameManager.playerGoal();this.gameManager.script.gameManager.enemyGoal()}};var GameManager=pc.createScript("gameManager");GameManager.attributes.add("player",{type:"entity"}),GameManager.attributes.add("enemy",{type:"entity"}),GameManager.attributes.add("puck",{type:"entity"}),GameManager.attributes.add("startPlayerPos",{type:"entity"}),GameManager.attributes.add("startEnemyPos",{type:"entity"}),GameManager.attributes.add("startPuckPos",{type:"entity"}),GameManager.attributes.add("gatesPosPlayer",{type:"entity"}),GameManager.attributes.add("gatesPosEnemy",{type:"entity"}),GameManager.attributes.add("gatesPosPuckPlayer",{type:"entity"}),GameManager.attributes.add("gatesPosPuckEnemy",{type:"entity"}),GameManager.prototype.initialize=function(){this.player.rigidbody.teleport(this.startPlayerPos.getPosition()),this.enemy.rigidbody.teleport(this.startEnemyPos.getPosition()),this.puck.rigidbody.teleport(this.startPuckPos.getPosition())},GameManager.prototype.playerGoal=function(){this.player.rigidbody.teleport(this.gatesPosPlayer.getPosition()),this.enemy.rigidbody.teleport(this.gatesPosEnemy.getPosition()),this.puck.rigidbody.teleport(this.gatesPosPuckEnemy.getPosition())},GameManager.prototype.enemyGoal=function(){this.player.rigidbody.teleport(this.gatesPosPlayer.getPosition()),this.enemy.rigidbody.teleport(this.gatesPosEnemy.getPosition()),this.puck.rigidbody.teleport(this.gatesPosPuckPlayer.getPosition())},GameManager.prototype.update=function(t){};pc.extend(pc,function(){var TweenManager=function(t){this._app=t,this._tweens=[],this._add=[]};TweenManager.prototype={add:function(t){return this._add.push(t),t},update:function(t){for(var i=0,e=this._tweens.length;i<e;)this._tweens[i].update(t)?i++:(this._tweens.splice(i,1),e--);if(this._add.length){for(let t=0;t<this._add.length;t++)this._tweens.indexOf(this._add[t])>-1||this._tweens.push(this._add[t]);this._add.length=0}}};var Tween=function(t,i,e){pc.events.attach(this),this.manager=i,e&&(this.entity=null),this.time=0,this.complete=!1,this.playing=!1,this.stopped=!0,this.pending=!1,this.target=t,this.duration=0,this._currentDelay=0,this.timeScale=1,this._reverse=!1,this._delay=0,this._yoyo=!1,this._count=0,this._numRepeats=0,this._repeatDelay=0,this._from=!1,this._slerp=!1,this._fromQuat=new pc.Quat,this._toQuat=new pc.Quat,this._quat=new pc.Quat,this.easing=pc.Linear,this._sv={},this._ev={}},_parseProperties=function(t){var i;return t instanceof pc.Vec2?i={x:t.x,y:t.y}:t instanceof pc.Vec3?i={x:t.x,y:t.y,z:t.z}:t instanceof pc.Vec4||t instanceof pc.Quat?i={x:t.x,y:t.y,z:t.z,w:t.w}:t instanceof pc.Color?(i={r:t.r,g:t.g,b:t.b},void 0!==t.a&&(i.a=t.a)):i=t,i};Tween.prototype={to:function(t,i,e,s,n,r){return this._properties=_parseProperties(t),this.duration=i,e&&(this.easing=e),s&&this.delay(s),n&&this.repeat(n),r&&this.yoyo(r),this},from:function(t,i,e,s,n,r){return this._properties=_parseProperties(t),this.duration=i,e&&(this.easing=e),s&&this.delay(s),n&&this.repeat(n),r&&this.yoyo(r),this._from=!0,this},rotate:function(t,i,e,s,n,r){return this._properties=_parseProperties(t),this.duration=i,e&&(this.easing=e),s&&this.delay(s),n&&this.repeat(n),r&&this.yoyo(r),this._slerp=!0,this},start:function(){var t,i,e,s;if(this.playing=!0,this.complete=!1,this.stopped=!1,this._count=0,this.pending=this._delay>0,this._reverse&&!this.pending?this.time=this.duration:this.time=0,this._from){for(t in this._properties)this._properties.hasOwnProperty(t)&&(this._sv[t]=this._properties[t],this._ev[t]=this.target[t]);this._slerp&&(this._toQuat.setFromEulerAngles(this.target.x,this.target.y,this.target.z),i=void 0!==this._properties.x?this._properties.x:this.target.x,e=void 0!==this._properties.y?this._properties.y:this.target.y,s=void 0!==this._properties.z?this._properties.z:this.target.z,this._fromQuat.setFromEulerAngles(i,e,s))}else{for(t in this._properties)this._properties.hasOwnProperty(t)&&(this._sv[t]=this.target[t],this._ev[t]=this._properties[t]);this._slerp&&(i=void 0!==this._properties.x?this._properties.x:this.target.x,e=void 0!==this._properties.y?this._properties.y:this.target.y,s=void 0!==this._properties.z?this._properties.z:this.target.z,void 0!==this._properties.w?(this._fromQuat.copy(this.target),this._toQuat.set(i,e,s,this._properties.w)):(this._fromQuat.setFromEulerAngles(this.target.x,this.target.y,this.target.z),this._toQuat.setFromEulerAngles(i,e,s)))}return this._currentDelay=this._delay,this.manager.add(this),this},pause:function(){this.playing=!1},resume:function(){this.playing=!0},stop:function(){this.playing=!1,this.stopped=!0},delay:function(t){return this._delay=t,this.pending=!0,this},repeat:function(t,i){return this._count=0,this._numRepeats=t,this._repeatDelay=i||0,this},loop:function(t){return t?(this._count=0,this._numRepeats=1/0):this._numRepeats=0,this},yoyo:function(t){return this._yoyo=t,this},reverse:function(){return this._reverse=!this._reverse,this},chain:function(){for(var t=arguments.length;t--;)t>0?arguments[t-1]._chained=arguments[t]:this._chained=arguments[t];return this},onUpdate:function(t){return this.on("update",t),this},onComplete:function(t){return this.on("complete",t),this},onLoop:function(t){return this.on("loop",t),this},update:function(t){if(this.stopped)return!1;if(!this.playing)return!0;if(!this._reverse||this.pending?this.time+=t*this.timeScale:this.time-=t*this.timeScale,this.pending){if(!(this.time>this._currentDelay))return!0;this._reverse?this.time=this.duration-(this.time-this._currentDelay):this.time-=this._currentDelay,this.pending=!1}var i=0;(!this._reverse&&this.time>this.duration||this._reverse&&this.time<0)&&(this._count++,this.complete=!0,this.playing=!1,this._reverse?(i=this.duration-this.time,this.time=0):(i=this.time-this.duration,this.time=this.duration));var e,s,n=0===this.duration?1:this.time/this.duration,r=this.easing(n);for(var h in this._properties)this._properties.hasOwnProperty(h)&&(e=this._sv[h],s=this._ev[h],this.target[h]=e+(s-e)*r);if(this._slerp&&this._quat.slerp(this._fromQuat,this._toQuat,r),this.entity&&(this.entity._dirtifyLocal(),this.element&&this.entity.element&&(this.entity.element[this.element]=this.target),this._slerp&&this.entity.setLocalRotation(this._quat)),this.fire("update",t),this.complete){var a=this._repeat(i);return a?this.fire("loop"):(this.fire("complete",i),this.entity&&this.entity.off("destroy",this.stop,this),this._chained&&this._chained.start()),a}return!0},_repeat:function(t){if(this._count<this._numRepeats){if(this._reverse?this.time=this.duration-t:this.time=t,this.complete=!1,this.playing=!0,this._currentDelay=this._repeatDelay,this.pending=!0,this._yoyo){for(var i in this._properties){var e=this._sv[i];this._sv[i]=this._ev[i],this._ev[i]=e}this._slerp&&(this._quat.copy(this._fromQuat),this._fromQuat.copy(this._toQuat),this._toQuat.copy(this._quat))}return!0}return!1}};var BounceOut=function(t){return t<1/2.75?7.5625*t*t:t<2/2.75?7.5625*(t-=1.5/2.75)*t+.75:t<2.5/2.75?7.5625*(t-=2.25/2.75)*t+.9375:7.5625*(t-=2.625/2.75)*t+.984375},BounceIn=function(t){return 1-BounceOut(1-t)};return{TweenManager:TweenManager,Tween:Tween,Linear:function(t){return t},QuadraticIn:function(t){return t*t},QuadraticOut:function(t){return t*(2-t)},QuadraticInOut:function(t){return(t*=2)<1?.5*t*t:-.5*(--t*(t-2)-1)},CubicIn:function(t){return t*t*t},CubicOut:function(t){return--t*t*t+1},CubicInOut:function(t){return(t*=2)<1?.5*t*t*t:.5*((t-=2)*t*t+2)},QuarticIn:function(t){return t*t*t*t},QuarticOut:function(t){return 1- --t*t*t*t},QuarticInOut:function(t){return(t*=2)<1?.5*t*t*t*t:-.5*((t-=2)*t*t*t-2)},QuinticIn:function(t){return t*t*t*t*t},QuinticOut:function(t){return--t*t*t*t*t+1},QuinticInOut:function(t){return(t*=2)<1?.5*t*t*t*t*t:.5*((t-=2)*t*t*t*t+2)},SineIn:function(t){return 0===t?0:1===t?1:1-Math.cos(t*Math.PI/2)},SineOut:function(t){return 0===t?0:1===t?1:Math.sin(t*Math.PI/2)},SineInOut:function(t){return 0===t?0:1===t?1:.5*(1-Math.cos(Math.PI*t))},ExponentialIn:function(t){return 0===t?0:Math.pow(1024,t-1)},ExponentialOut:function(t){return 1===t?1:1-Math.pow(2,-10*t)},ExponentialInOut:function(t){return 0===t?0:1===t?1:(t*=2)<1?.5*Math.pow(1024,t-1):.5*(2-Math.pow(2,-10*(t-1)))},CircularIn:function(t){return 1-Math.sqrt(1-t*t)},CircularOut:function(t){return Math.sqrt(1- --t*t)},CircularInOut:function(t){return(t*=2)<1?-.5*(Math.sqrt(1-t*t)-1):.5*(Math.sqrt(1-(t-=2)*t)+1)},BackIn:function(t){var i=1.70158;return t*t*((i+1)*t-i)},BackOut:function(t){var i=1.70158;return--t*t*((i+1)*t+i)+1},BackInOut:function(t){var i=2.5949095;return(t*=2)<1?t*t*((i+1)*t-i)*.5:.5*((t-=2)*t*((i+1)*t+i)+2)},BounceIn:BounceIn,BounceOut:BounceOut,BounceInOut:function(t){return t<.5?.5*BounceIn(2*t):.5*BounceOut(2*t-1)+.5},ElasticIn:function(t){var i,e=.1;return 0===t?0:1===t?1:(!e||e<1?(e=1,i=.1):i=.4*Math.asin(1/e)/(2*Math.PI),-e*Math.pow(2,10*(t-=1))*Math.sin((t-i)*(2*Math.PI)/.4))},ElasticOut:function(t){var i,e=.1;return 0===t?0:1===t?1:(!e||e<1?(e=1,i=.1):i=.4*Math.asin(1/e)/(2*Math.PI),e*Math.pow(2,-10*t)*Math.sin((t-i)*(2*Math.PI)/.4)+1)},ElasticInOut:function(t){var i,e=.1,s=.4;return 0===t?0:1===t?1:(!e||e<1?(e=1,i=.1):i=s*Math.asin(1/e)/(2*Math.PI),(t*=2)<1?e*Math.pow(2,10*(t-=1))*Math.sin((t-i)*(2*Math.PI)/s)*-.5:e*Math.pow(2,-10*(t-=1))*Math.sin((t-i)*(2*Math.PI)/s)*.5+1)}}}()),function(){pc.AppBase.prototype.addTweenManager=function(){this._tweenManager=new pc.TweenManager(this),this.on("update",(function(t){this._tweenManager.update(t)}))},pc.AppBase.prototype.tween=function(t){return new pc.Tween(t,this._tweenManager)},pc.Entity.prototype.tween=function(t,i){var e=this._app.tween(t);return e.entity=this,this.once("destroy",e.stop,e),i&&i.element&&(e.element=i.element),e};var t=pc.AppBase.getApplication();t&&t.addTweenManager()}();var FadeImage=pc.createScript("fadeImage");FadeImage.attributes.add("duration",{type:"number",default:1,title:"Duration",description:"Длительность анимации (в секундах)"}),FadeImage.attributes.add("durationOutlineAlpha",{type:"number",default:1,title:"Duration",description:"Длительность анимации (в секундах)"}),FadeImage.attributes.add("durationLeftMove",{type:"number",default:.5,title:"Duration",description:"Длительность анимации (в секундах)"}),FadeImage.attributes.add("durationRightMove",{type:"number",default:.5,title:"Duration",description:"Длительность анимации (в секундах)"}),FadeImage.attributes.add("left",{type:"entity"}),FadeImage.attributes.add("right",{type:"entity"}),FadeImage.attributes.add("outline",{type:"entity"}),FadeImage.prototype.initialize=function(){this.entity.element&&(this.entity.element.opacity=0),this.isAnimating=!1,this.sceneName="Loader";this.app.scenes.find(this.sceneName);this.app.once("update",(function(){console.log("Сцена загружена и началось обновление!"),this.startAnimation()}),this)},FadeImage.prototype.startAnimation=function(){!this.isAnimating&&this.entity.element&&(this.isAnimating=!0,this.entity.enabled=!0,this.entity.element.opacity=0,this.app.tween(this.entity.element).to({opacity:1},this.duration,pc.Linear).onComplete((()=>{this.onAnimationComplete()})).start())},FadeImage.prototype.moveLeft=function(){this.left.tween(this.left.getLocalPosition()).to({x:0,y:0,z:0},this.durationLeftMove,pc.SineOut).onComplete((()=>{this.moveRight()})).start()},FadeImage.prototype.moveRight=function(){this.right.tween(this.right.getLocalPosition()).to({x:0,y:0,z:0},this.durationRightMove,pc.SineOut).onComplete((()=>{this.outline.enabled=!0,this.outline.element.opacity=0,this.app.tween(this.outline.element).to({opacity:1},this.durationOutlineAlpha,pc.Linear).onComplete((()=>{this.app.scenes.changeScene("Menu")})).start()})).start()},FadeImage.prototype.onAnimationComplete=function(){this.left.enabled=!0,this.right.enabled=!0,this.moveLeft()};var MainMenu=pc.createScript("mainMenu");MainMenu.attributes.add("selectPlayer",{type:"entity"}),MainMenu.attributes.add("selectMode",{type:"entity"}),MainMenu.attributes.add("card",{type:"entity"}),MainMenu.attributes.add("modeFast",{type:"entity"}),MainMenu.attributes.add("modeLegend",{type:"entity"}),MainMenu.prototype.initialize=function(){this.card.button.on("click",this.onLoadMode,this),this.modeFast.button.on("click",this.onLoadScene,this),this.modeLegend.button.on("click",this.onLoadScene,this)},MainMenu.prototype.onLoadMode=function(){this.selectPlayer.enabled=!1,this.selectMode.enabled=!0},MainMenu.prototype.onLoadScene=function(){this.app.scenes.changeScene("GameScene")};var Vkgame=pc.createScript("vkgame");Vkgame.prototype.initialize=function(){console.log("Start"),console.log(vkBridge),console.log("End"),vkBridge.send("VKWebAppInit",{}),console.log("End1"),bridge.send("VKWebAppShare",{link:"https://vk.com/vkappsdev"}).then((e=>{e.result})).catch((e=>{console.log(e)})),console.log("End2")};