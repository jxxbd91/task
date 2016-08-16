/*
* @Author: admin
* @Date:   2016-08-15 08:35:30
* @Last Modified by:   admin
* @Last Modified time: 2016-08-16 10:02:05
*/

'use strict';
window.onload=function(){
	var oWelcom=document.getElementById('welcom');
	var oIndex=document.getElementById('index');
	var oMask=document.getElementById('mask');
	var oUpload=document.getElementById('upload');
	var oBrand=document.getElementById('brand');
	var oEnd=document.getElementById('end');

	s_h(oWelcom,oIndex,5000,indexFn);

	function s_h(obj1,obj2,sec,callback){
		setTimeout(function(){
			obj1.style.opacity=0;
			obj2.style.opacity=0;
		}, sec);
		obj1.addEventListener('webkitTransitionEnd', function xa(){
			removeClass(obj1,'page_show');
			addClass(obj2,'page_show');
			setTimeout(function(){
				obj2.style.opacity=1;
				obj1.style.opacity=1;
				callback&&callback();
				obj1.removeEventListener('webkitTransitionEnd', xa, false);
			},20)
		},false);

	}
	


	// 首页
	
	function indexFn(){
		var oBList=oIndex.getElementsByClassName('banner_list')[0];
		var aLi=oBList.getElementsByTagName('li');
		var sLi=oIndex.getElementsByClassName('btn_list')[0].children;
		var sX=0;
		var eX=0;
		var mX=0;
		var iNow=0;
		var timer=null;
		oBList.addEventListener('touchstart',fnStart, false);
		oBList.addEventListener('touchmove',fnMove, false);
		oBList.addEventListener('touchend',fnEnd, false);
		function fnStart(ev){
			clearInterval(timer);
			eX=-iNow*aLi[0].offsetWidth;
			oBList.style.WebkitTransition='';
			ev=ev.changedTouches[0];
			sX=ev.pageX;
			oBList.addEventListener('touchmove',function(ev){
				ev.preventDefault();
			},false)
		}
		function fnMove(ev){
			ev=ev.changedTouches[0];
			mX=ev.pageX-sX+eX;
			this.style.WebkitTransform='translateX('+ mX +'px)';
		}
		function fnEnd(){
			var s=(mX-eX)/aLi[0].offsetWidth;

			if(Math.abs(s)>0.3&&s<0){
				iNow++;
			}
			if(s>0.3){
				iNow--;
			}
			if(iNow>4){
				iNow=4;
			}
			if(iNow<0){
				iNow=0;
			}
			oBList.style.WebkitTransform='translateX('+-iNow*aLi[0].offsetWidth+'px)';
			oBList.style.WebkitTransition='1s';
			btnFn();
			timer=setInterval(function(){
				autoPlay();
			},3000)
		}
		timer=setInterval(function(){
			autoPlay();
		},3000)
		function autoPlay(){
			iNow++;
			if(iNow>4){
				iNow=0;
			}
			oBList.style.WebkitTransform='translateX('+ -iNow*aLi[0].offsetWidth+'px)';
			oBList.style.WebkitTransition='0.6s';
			btnFn();
		}
		function btnFn(){
			for(var i=0;i<sLi.length;i++){
				removeClass(sLi[i],'active');
			}
			addClass(sLi[iNow],'active');
		}
		
		(function scoreFn(){
			var oScore=oIndex.getElementsByClassName('score')[0];
			var aLi=oScore.getElementsByTagName('li');
			for(var i=0;i<aLi.length;i++){
				(function (obj){
					var aA=obj.getElementsByTagName('a');
					for(var j=0;j<aA.length;j++){
						aA[j].index=j;
						aA[j].addEventListener('touchstart',function(){
							this.parentNode.value=this.index+1;
							for(var i=0;i<aA.length;i++){
								aA[i].style.WebkitTransition='0.5s';
								aA[i].style.backgroundPosition='-38px center';
							}
							for(var i=0;i<=this.index;i++){
								aA[i].style.WebkitTransition='0.5s';
								aA[i].style.backgroundPosition='0 center';
							}
						},false)
					}	
				})(aLi[i]);	
			}
		})();
		(function brandFn(){
			var oBrand=oIndex.getElementsByClassName('brand')[0];
			var aA=oBrand.getElementsByTagName('a');
			for(var i=0;i<aA.length;i++){
				aA[i].index=i;
				aA[i].addEventListener('touchstart',function(){
					for(var i=0;i<aA.length;i++){
						aA[i].className='';
					}
					this.className='active';
					oBrand.value=this.index+1;
				},false)
			}
		})();
		(function subFn(){
			var oSub=oIndex.getElementsByClassName('submit')[0];
			var oBtn=oSub.getElementsByTagName('input')[0];
			var oBrand=oIndex.getElementsByClassName('brand')[0];
			var oP=oSub.getElementsByTagName('p')[0];
			oBtn.addEventListener('touchstart', function(){
				var onOff1=true;
				var onOff2=true;
				var oScore=oIndex.getElementsByClassName('score')[0];
				var aLi=oScore.getElementsByTagName('li');
				for(var i=0;i<aLi.length;i++){
					if(aLi[i].value==0){
						onOff1=false;
					}
				}
				if(!oBrand.value){
					onOff2=false;
				}
				if(onOff1&&onOff2){
					oMask.style.opacity=1;
					addClass(oMask,'page_show');
					removeClass(oIndex,'page_show');
					document.body.style.overflow='hidden';
					setTimeout(function(){
						addClass(oIndex,'page_show');
					}, 20)
					setTimeout(function(){
						removeClass(oIndex,'page_show');
						document.body.style.overflow='auto';
					}, 1000)
					s_h(oMask,oUpload,1000,upLoadFn);
				}else{
					oP.style.WebkitTransform='translateY(-10px)';
					setTimeout(function(){
						oP.style.WebkitTransform='translateY(30px) scale(0.1)';
					},2000)
					if(!onOff1){
						oP.innerHTML='请给景点评分';
					}else{
						oP.innerHTML='请给景点添加标签';
					}
				}
			}, false)
		})();

	}
	// 文件上传
	function upLoadFn(){
		var aInput=oUpload.getElementsByTagName('input');
		var oSpan=oBrand.getElementsByTagName('h3')[0].getElementsByTagName('span')[0];
		aInput[0].onchange=function(){
			var bT=false;
			if(this.files[0]){
				var t=this.files[0].type.split('/')[0];	
			}
			if(t=='video'){
				bT=true;
				oUpload.value='video';
			}else{
				alert('请上传视频文件');
			}
			if(bT){
				s_h(oUpload,oBrand,500,brandFn);
				oSpan.innerHTML='视频';
			}
		}

		aInput[1].onchange=function(){	
			var bT=false;
			if(this.files[0]){
				var t=this.files[0].type.split('/')[0];	
			}
			if(t=='image'){
				bT=true;
				oUpload.value='image';
			}else{
				alert('请上传图片文件');
			}
			if(bT){
				s_h(oUpload,oBrand,1000,brandFn);
				oSpan.innerHTML='图片';
			}
		}
	}

	// 给上传文件添加标签
	function brandFn(){
		var aA=oBrand.getElementsByTagName('a');
		var oSubmit=oBrand.getElementsByClassName('submit')[0];
		var oP=oSubmit.getElementsByTagName('p')[0];
		var oInput=oSubmit.getElementsByTagName('input')[0];
		for(var i=0;i<aA.length;i++){
			aA[i].addEventListener('touchstart',function(){
				oBrand.onOff=true;
				for(var i=0;i<aA.length;i++){
					removeClass(aA[i],'active');
				}
				addClass(this,'active');
				addClass(oInput,'sub_style');
			},false)
		}
		oInput.addEventListener('touchstart',function(){
			if(oBrand.onOff){
				s_h(oBrand,oEnd,500,endFn);
			}
		},false)
	}
	// 重新评价
	function endFn(){
		var oBtn=oEnd.getElementsByClassName('submit')[0].children[0];
		oBtn.addEventListener('touchstart',function(){
			s_h(oEnd,oIndex,500);
		},false)
	}


	function removeClass(obj,className){
			var str=obj.className;
			var arr=str.split(' ');
			for(var i=0;i<arr.length;i++){
				if(arr[i]==className){
					arr.splice(i,1);
					i--;
				}
			}
			str=arr.join(' ');
			obj.className=str;
	}

	function addClass(obj,className){
		var str=obj.className;
		var arr=str.split(' ');
		arr.push(className);
		str=arr.join(' ');
		obj.className=str;
	}
}