/*
* @Author: admin
* @Date:   2016-08-08 07:55:27
* @Last Modified by:   admin
* @Last Modified time: 2016-08-15 08:15:47
*/

'use strict';
window.onload=function(){
	console.log(document.cookie);
	var oHeader=document.getElementById('header');
	var oChangebg=document.getElementById('changebg');
	var oMain=document.getElementById('main');
	var oFile=document.getElementById('file');
	var aUl=oFile.getElementsByTagName('ul');
	var oRegister=document.getElementById('register');
	var oLogin=document.getElementById('login_box');
	var oUser=document.getElementById('user');
	var oChangePas=document.getElementById('change_pas');
	var oC=document.getElementById('canvas');
	var oMenu=document.getElementById('menu');
	var oTheme=document.getElementById('theme');
	var oNote=document.getElementById('note');
	var ANote=document.getElementById('add_note');
	var oFMenu=document.getElementById('file_menu');
	
	var iNow=0;
	var onOff=false;
	var bT='true';
	var nodeNumber=0;
	bodyImg();   			//主屏幕的背景图设置；
	asideFn();   			//侧边栏的效果；
	for(var i=0;i<5;i++){
		toBig(aUl[i]);
	}    					//页面布局
	navFn();				//切换页面导航栏
	headFn();				//顶部导航
	login_check();   		//登陆验证
	menuFn();
	canvasFn();   		//canva绘制的时钟
	
	// 更改窗口大小
	window.onresize=function(){
		for(var i=0;i<5;i++){
			toBig(aUl[i]);
			asideFn();
		}

	}
	// 页面点击环境菜单消失
	document.onclick=function(){
		oMenu.style.display='none';
		oFMenu.style.display='none';
	}
	// 侧边导航栏
	function asideFn(){
		var oDiv=oMain.getElementsByTagName('div')[0];
		var oUl=oDiv.getElementsByTagName('ul')[0];
		var aLi=oUl.getElementsByTagName('li');
		var aImg=oUl.getElementsByTagName('img');
		var arr=[];
		var iW=aImg[0].offsetWidth;
		var iH=aImg[0].offsetHeight;
		var sH=document.documentElement.clientHeight;
		var aLong=oDiv.offsetTop+oDiv.offsetHeight+30;
		if(aLong>sH||oDiv.offsetHeight>sH-130){
			oDiv.style.top=sH-oDiv.offsetHeight-30+'px';
		}
		if(sH>oDiv.offsetHeight+130){
			oDiv.style.top=130+'px';
		}
		document.onmousemove=function(ev){
			var sTop=document.documentElement.scrollTop||document.body.scrollTop;
			var ev=ev||event;
			for(var i=0;i<aLi.length;i++){
				var oImg=aLi[i].getElementsByTagName('img')[0];
				var a=ev.clientX-aLi[i].offsetLeft-aLi[i].offsetWidth/2;
				var b=ev.clientY+sTop-aLi[i].offsetTop-oDiv.offsetTop-aLi[i].offsetHeight/2-oHeader.offsetHeight;
				var dis=Math.sqrt(a*a+b*b)/200;
				if(dis>0.5){
					dis=0.5;
				}
				oImg.style.width=iW*(1.5-dis)+'px';
				oImg.style.height=iH*(1.5-dis)+'px';
			}
		}

	}
	// main中的可以拖拽文件夹部分
	function fileFn(obj){
		var zindex=1;
		var aLi=obj.getElementsByTagName('li');
		var oInput=obj.getElementsByTagName('input');
		var arr1=[];
		var arr2=[];
		if(getCookie('rank')){
			onOff=getCookie('rank');
		}if(getCookie('freedom')){
			bT=getCookie('freedom');
		}
		// 进行布局转换
		var oLong=aLi[0].clientHeight*aLi.length+130;
		var dLong=document.documentElement.clientHeight;
		// 对页面高度和桌面文件总长度进行判断
		if(oLong>dLong){
			if(onOff=='true'){  //横向排列
				var sLong=dLong-130;
				var n=Math.floor(sLong/aLi[0].clientHeight);
				for(var i=0;i<aLi.length;i++){
					aLi[i].style.position='absolute';
					oInput[i].readOnly='readonly';
				}
				for(var i=0;i<aLi.length;i++){
					aLi[i].style.left=Math.floor(i/n)*aLi[0].clientWidth+100+'px';
					aLi[i].style.top=i%n*aLi[0].clientHeight+100+'px';
				}	
			}else{   //纵向排列
				for(var i=0;i<aLi.length;i++){
					aLi[i].style.position='';
					oInput[i].readOnly='readonly';
				}
				for(var i=0;i<aLi.length;i++){
					aLi[i].style.cssFloat='left';
				}
			}
		}else{
			for(var i=0;i<aLi.length;i++){
				aLi[i].style.position='';
				oInput[i].readOnly='readonly';
			}

			for(var i=0;i<aLi.length;i++){
				aLi[i].style.cssFloat='left';
			}
			if(onOff=='true'){
				for(var i=0;i<aLi.length;i++){
					aLi[i].style.cssFloat='';
				}	
			}	
		}

		for(var i=0;i<aLi.length;i++){
			arr1[arr1.length]=aLi[i].offsetLeft;
			arr2[arr2.length]=aLi[i].offsetTop;
		}
		for(var i=0;i<aLi.length;i++){
			aLi[i].style.position='absolute';
			aLi[i].style.left=arr1[i]+'px';
			aLi[i].style.top=arr2[i]+'px';
			aLi[i].style.zIndex=zindex;
		}
		// 对桌面每一个文件进行操作
		for(var i=0;i<aLi.length;i++){
			aLi[i].index=i;
			// 开始设置拖拽功能
			aLi[i].onmousedown=function(ev){
				for(var i=0;i<aLi.length;i++){
					aLi[i].style.background='';
				}
				var ev=ev||event;
				if(ev.button==0){  //判断是否是左键进行单击
					var oX=ev.clientX-this.offsetLeft;
					var oY=ev.clientY-this.offsetTop;
					var _this=this;
					zindex++;
					this.style.zIndex=zindex;
					oMain.onmousemove=function(ev){
						var ev=ev||event;
						var disX=ev.clientX-oX;
						var disY=ev.clientY-oY;
						_this.style.left=disX+'px';
						_this.style.top=disY+'px';
						return false;
					}
					oMain.onmouseup=function(){
						oMain.onmousemove=oMain.onmouseup=null;
						if(bT=='true'){   //判断是否是自由排列——不是自由排列
							if(!getNear(_this,aUl[iNow])){  //iNOw是一个全局变量，主要作用是让可以拖拽的页面与nav上的号码一致；
								startMove(_this,{'left':arr1[_this.index],'top':arr2[_this.index]},'hc');
							}else{
								var cIn=_this.index;
								_this.index=getNear(_this,aUl[iNow]).index;
								getNear(_this,aUl[iNow]).index=cIn;
								startMove(_this,{'left':arr1[_this.index],'top':arr2[_this.index]},'hc');
								startMove(getNear(_this,aUl[iNow]),{'left':arr1[cIn],'top':arr2[cIn]},'hc');
							}	
						}
					}	
				}
			}
			// 桌面文件的右键菜单功能
			aLi[i].oncontextmenu=function(ev){
				var ev=ev||event;
				ev.cancelBubble=true;
				var _this=this;
				oMenu.style.display='none';
				oFMenu.style.display='block';
				oFMenu.style.left=ev.clientX+'px';
				oFMenu.style.top=ev.clientY+'px';
				oFMenu.style.zIndex=getStyle(this,'z-index')+1;
				fMenuFn(_this);
				return false;
			}
		}
	}
	// 文件夹环境菜单
	function fMenuFn(obj){
		var aLi=oFMenu.getElementsByTagName('li');
		for(var i=0;i<aLi.length;i++){
			aLi[i].index=i;
			aLi[i].onclick=function(){
				switch(this.index){
					case 0:
						break;
					case 1:
						obj.parentNode.removeChild(obj);
						for(var i=0;i<aUl.length;i++){
							fileFn(aUl[i]);
						}
						break;
					case 2:
						var str=obj.children[1].value;
						obj.children[1].readOnly='';
						obj.children[1].select();
						obj.children[1].onblur=function(){
							if(this.value==''){
								this.value=str;
							}
							this.readOnly='readonly';
						}
						break;
				}
			}
		}
	}
	// main中的导航
	function navFn(){
		var oNav=document.getElementById('nav_fix');
		var oUl=oNav.getElementsByTagName('ul')[0];
		var aLi=oNav.getElementsByClassName('number');
		var oDiv=oNav.getElementsByTagName('div')[0];
		var oLast=oUl.lastElementChild||oUl.lastChild;
		var oFile_show=oFile.getElementsByClassName('file_show')[0];
		var aInput=oDiv.getElementsByTagName('input');
		var iW=oFile.offsetWidth;
		oLast.onclick=function(){
			searchFn();
			this.onoff=!this.onoff;
			if(this.onoff){
				oDiv.style.display='block';
			}else{
				oDiv.style.display='none';
			}
		}
		for(var i=0;i<aLi.length;i++){
			aLi[i].onclick=function(){
				for(var i=0;i<aLi.length;i++){
					removeClass(aLi[i],'active');
				}
				addClass(this,'active');
				iNow=this.innerHTML-1;
				startMove(oFile_show,{'left':-iW*iNow},'hc');
			}
		}
		function searchFn(){
			var aUl=oFile.getElementsByTagName('ul');
			
			aInput[1].onclick=function(){
				var str=aInput[0].value;
				for(var i=0;i<aUl.length;i++){
					aUl[i].index=i;
					var aText=aUl[i].getElementsByTagName('input');
					for(var j=0;j<aInput.length;j++){
						if(aText[j].value==str){
							aText[j].parentNode.style.background='rgba(0,0,0,0.5)';
							iNow=aUl[i].index;
							startMove(oFile_show,{'left':-iW*iNow},'hc');
							for(var i=0;i<aLi.length;i++){
								removeClass(aLi[i],'active');
							}
							addClass(aLi[iNow],'active');
							return ;
						}
					}
				}
			}
		}
	}
	// 通过cookie更改body的背景
	function bodyImg(){
		if(getCookie('bgImg')){
			var cook=getCookie('bgImg');
			document.body.style.backgroundImage='url(images/bg'+ cook +'.jpg)';	
		}else{
			document.body.style.backgroundImage='url(images/bg0.jpg)';	
		}
		if(getCookie('u_log')=='yes'){
			userFn();
		}
		
	}
	// 顶部导航功能
	function headFn(){
		var aLi1=oHeader.getElementsByTagName('li');
		var oUl1=oChangebg.getElementsByTagName('ul')[0];
		var aLi2=oUl1.getElementsByTagName('li');
		var aImg=oChangebg.children[2].children[0].getElementsByTagName('img');
		var oH=0;
		var iNumber=0;
		changebgFn();
		show(oRegister,aLi1[2]);
		show(oLogin,aLi1[1]);
		show(oWeather,aLi1[3],function(){
			if(getCookie('city')){
				var c=getCookie('city');
			}else{
				var c='温州';
			}
			
			var oScript=document.createElement('script');
			oWeather.appendChild(oScript);
			oScript.src='http://wthrcdn.etouch.cn/weather_mini?city='+c+'&callback=fn';
			drag(oWeather);
		});
		// 背景图的切换
		function changebgFn(){
			// 背景切换界面的显示
			aLi1[0].onclick=function(){
				oChangebg.style.display='block';
				oH=Math.round(parseFloat(getStyle(oChangebg,'height')));
				oChangebg.style.height='0px';
				startMove(oChangebg,{'height':oH,'opacity':100},'hc');
			}
			// 背景切换界面的隐藏
			aLi2[aLi2.length-1].onclick=function(){
				startMove(oChangebg,{'height':0,'opacity':0},'hc',function(){
					oChangebg.style.display='none';
					oChangebg.style.height=oH+'px';
				});
			}
			// 切换背景图
			for(var i=0;i<aLi2.length-1;i++){
				aLi2[i].index=i;
				aLi2[i].onclick=function(){
					for(var i=0;i<aLi2.length-1;i++){
						removeClass(aLi2[i],'active');
					}
					addClass(this,'active');
					if(this.index<aLi2.length-2){
						iNumber=this.index;
						for(var i=0;i<aImg.length;i++){
							aImg[i].src='images/'+ (this.index*12+i) +'.jpg';
						}	
					}else{

					}
					
				}
			}
			// 鼠标悬浮更换右侧的背景图
			for(var i=0;i<aImg.length;i++){
				aImg[i].index=i;
				aImg[i].onmouseover=function(){
					var oDiv=oChangebg.children[2].children[1];
					oDiv.style.backgroundImage='url('+ this.src +')';
				}
				// 更改body的背景图片
				aImg[i].onclick=function(){
					var n=this.index+(iNumber*12);
					document.body.style.backgroundImage='url(images/bg'+ n +'.jpg)';
					setCookie('bgImg',n,5);
				}
			}	
		}
		// 注册、登陆界面显示
		function show(obj1,obj2,endfn){
			var oH=parseInt(getStyle(obj1,'height'));
			var oA=obj1.children[0].getElementsByTagName('a')[0];
			obj2.onclick=function(){
				open(obj1);
				checkFn();
				endfn&&endfn();
			}
			oA.onclick=function(){
				close(obj1);
			}
		}
	}
	// 显示
	function open(obj1){
		var oH=parseInt(getStyle(obj1,'height'));
		var oText=obj1.getElementsByClassName('xt');
		if(obj1.querySelector('[type=checkbox]')){
			if(getCookie('remb')=='true'){
				oText[0].value=getCookie('phNum');
				oText[1].value=getCookie('log_pas');
			}else{
				oText[0].value='';
				oText[1].value='';
			}
		}else{
			if(oText[0]){
				oText[0].value='';
			}
			if(oText[1]){
				oText[1].value='';
			}
			if(oText[2]){
				oText[2].value='';
			}
		}
		obj1.style.opacity=0;
		obj1.style.display='block';
		obj1.style.height='0px';
		startMove(obj1,{'height':oH,'top':150,'opacity':100},'hc');
	}
	// 关闭
	function close(obj1){
		var oH=parseInt(getStyle(obj1,'height'));
		startMove(obj1,{'height':0,'top':0,'opacity':0},'hc',function(){
					obj1.style.height=oH+'px';
					obj1.style.display='none';
					asideFn();
				})
	}
	// 注册用户的正则验证
	function checkFn(){
		var oBtn=oRegister.getElementsByClassName('btn')[0].children[0];
		var oText=oRegister.getElementsByClassName('xt');
		var aRadio=oRegister.querySelectorAll('[type=radio]');
		// 注册验证
		oBtn.onclick=function(){
			var onOff=false;
			var num=oText[0].value;
			var pas1=oText[1].value;
			var pas2=oText[2].value;
			var re1=/^13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9]\d{8}$/g;
			var re2=/^\w{6,12}$/g;
			var rad=0;
			for(var i=0;i<aRadio.length;i++){
				if(aRadio[i].checked){
					rad=aRadio[i].value;
					onOff=true;
				}
			}
			if(re1.test(num)&&re2.test(pas1)&&pas1===pas2&&onOff){
				if(num==getCookie('phNum')){
					alert('用户已存在');
				}else{
					var oH=parseInt(getStyle(oRegister,'height'));
					alert('注册成功');
					close(oRegister);
					setTimeout(function(){
						open(oLogin);
					},500)
				}
				setCookie('phNum',num,30);
				setCookie('pas',pas1,30);
				setCookie('sex',rad,30);
			}else{
				if(!re1.test(num)){
					console.log(num);
					alert('注册失败,请输入正确的11位手机号');	
				}else if(!re2.test(pas1)){
					console(!re2.test(pas1));
					alert('注册失败,密码格式错误');	
				}else if(pas1!==pas2){
					alert('注册失败,两次输入密码不一致');	
				}else if(!onOff){
					alert('注册失败,请选择性别');	
				}
				
			}
		}
		// 注册板块的拖动
		drag(oRegister);
	}
	//登陆用户验证
	function login_check(){
		var oBtn=oLogin.getElementsByClassName('btn')[0].children[0]; 
		var oText=oLogin.getElementsByClassName('xt');
		var oCheckbox=oLogin.querySelector('[type=checkbox]');
		oBtn.onclick=function(){
			if(getCookie('u_log')=='yes'){
				alert('您已经在线');
			}else{
				var user=oText[0].value;
				var pasw=oText[1].value;
				if(oCheckbox.checked){
					setCookie('remb','true',30);
				}else{
					setCookie('remb','false',30);
				}
				if(user==getCookie('phNum')&&pasw==getCookie('pas')){
					alert('登陆成功');
					setCookie('log_pas',pasw,30);
					setCookie('u_log','yes',0);
					close(oLogin);
					userFn();
				}else{
					setCookie('log_pas',' ',30);
					if(user!=getCookie('phNum')){
						alert('用户名错误');
					}else if(pasw!=getCookie('pas')){
						alert('密码错误');
					}
				}	
			}
		}
		drag(oLogin);
	}
	// 用户登录成功显示用户信息
	function userFn(){
		oUser.style.display='block';
		if(getCookie('sex')=='man'){
			oUser.style.background='url(images/man.png) no-repeat left center';
		}else{
			oUser.style.background='url(images/woman.png) no-repeat left center';
		}
		var oUl=oUser.getElementsByTagName('ul')[0];
		var aLi=oUl.children;
		oUser.onmouseover=function(){
			oUl.style.display='block';
			oUl.style.background='#fff';
			oUl.style.color='#000';
			oUl.style.zIndex=1000000;
		}	
		oUl.onmouseout=function(){
			this.style.display='none';
		}
		aLi[1].onclick=function(){
			open(oChangePas);
			changePas();
		}
		aLi[2].onclick=zx;
	}
	// 注销登录
	function zx(){
		var result= confirm('确定注销吗？');
		if(result){
			oUser.style.display='none';
		}
		setCookie('u_log','no',0);
	}
	// 更改密码
	function changePas(){
		var aBtn=oChangePas.getElementsByClassName('btn')[0].children;
		var aText=oChangePas.getElementsByClassName('xt');
		aBtn[0].onclick=function(){
			var re=/^\w{6,12}$/;
			var str1=aText[0].value;
			var str2=aText[1].value;
			if(str1==getCookie('pas')){
				var n=re.test(str2);
				if(n){
					alert('密码修改成功');
					setCookie('pas',str2,30);
					close(oChangePas);
				}else{
					alert('请输入正确的密码格式');
				}
			}else{
				alert('原密码错误');
			}
		}
		aBtn[1].onclick=function(){
			close(oChangePas);
		}
	}
	// 时钟
	function canvasFn(){
		oC.style.left=getCookie('clockX')+'px';
		oC.style.top=getCookie('clockY')+'px';
		var oGc=oC.getContext('2d');
		var oDate=0;
		var oHou=0;
		var oMin=0;
		var oSec=0;
		var oYear=0;
		var oMon=0;
		var oDat=0;
		clock();
		dragC(oC);
		var cenW=oC.width/2;
		var cenH=oC.height/2;
		setInterval(function(){
			oDate=new Date();
			oYear=oDate.getFullYear();
			oMon=oDate.getMonth();
			oDat=oDate.getDate();
			oSec=oDate.getSeconds();
			oMin=oDate.getMinutes()+oSec/60;
			oHou=oDate.getHours()+oMin/60;
			clock();

		},1000)
		
		function clock(){

			oGc.clearRect(0, 0, oC.width, oC.height);

			oGc.lineWidth=20;
			oGc.strokeStyle='red';
			oGc.beginPath();
			oGc.arc(cenW,cenH,150,0,360,false);
			oGc.stroke();
			oGc.closePath();

			oGc.fillStyle='#fff';
			oGc.beginPath();
			oGc.arc(cenW,cenH,140,0,360,false);
			oGc.fill();
			oGc.closePath();

			for(var i=0;i<60;i++){
				oGc.lineWidth=2;
				oGc.strokeStyle='black';
				oGc.beginPath();
				oGc.moveTo(cenW, cenH);
				oGc.arc(cenW,cenH,138,6*i*Math.PI/180,6*(i+1)*Math.PI/180,false);
				oGc.stroke();
				oGc.closePath();	
			}

			oGc.fillStyle='#fff';
			oGc.beginPath();
			oGc.arc(cenW,cenH,128,0,360,false);
			oGc.fill();
			oGc.closePath();

			for(var i=0;i<12;i++){
				oGc.lineWidth=5;
				oGc.strokeStyle='black';
				oGc.beginPath();
				oGc.moveTo(cenW, cenH);
				oGc.arc(cenW,cenH,138,30*i*Math.PI/180,30*(i+1)*Math.PI/180,false);
				oGc.stroke();
				oGc.closePath();	
			}

			oGc.fillStyle='#fff';
			oGc.beginPath();
			oGc.arc(cenW,cenH,120,0,360,false);
			oGc.fill();
			oGc.closePath();

			oGc.lineWidth=6;
			oGc.strokeStyle='#fff';
			oGc.beginPath();
			oGc.arc(cenW,cenH,137,0,360,false);
			oGc.stroke();
			oGc.closePath();



			oGc.save();
			oGc.strokeStyle='red';
			oGc.lineWidth=10;
			oGc.lineJoin='round';
			oGc.translate(cenW, cenH);
			oGc.rotate((oSec*6-133)*Math.PI/180);
			oGc.translate(60,60);
			oGc.beginPath();
			oGc.moveTo(0, 0);
			oGc.arc(0, 0, 10, 0, 0, false);
			oGc.stroke();
			oGc.closePath();
			oGc.restore();

			oGc.lineWidth=8;
			oGc.strokeStyle='black';
			oGc.beginPath();
			oGc.moveTo(cenW, cenH);
			oGc.arc(cenW, cenH, 60, (oHou*30-90)*Math.PI/180, (oHou*30-90)*Math.PI/180, false);
			oGc.stroke();
			oGc.closePath();	

			oGc.lineWidth=6;
			oGc.strokeStyle='blue';
			oGc.beginPath();
			oGc.moveTo(cenW, cenH);
			oGc.arc(cenW, cenH, 90, (oMin*6-90)*Math.PI/180, (oMin*6-90)*Math.PI/180, false);
			oGc.stroke();
			oGc.closePath();

			oGc.lineWidth=4;
			oGc.strokeStyle='red';
			oGc.beginPath();
			oGc.moveTo(cenW, cenH);
			oGc.arc(cenW, cenH, 110, (oSec*6-90)*Math.PI/180, (oSec*6-90)*Math.PI/180, false);
			oGc.stroke();
			oGc.closePath();

			oGc.lineWidth=4;
			oGc.strokeStyle='red';
			oGc.beginPath();
			oGc.moveTo(cenW, cenH);
			oGc.arc(cenW, cenH, 30, (oSec*6+90)*Math.PI/180, (oSec*6+90)*Math.PI/180, false);
			oGc.stroke();
			oGc.closePath();

			oGc.fillStyle='#000';
			oGc.beginPath();
			oGc.arc(cenW, cenH, 10, 0, 360, false);
			oGc.fill();
			oGc.closePath();

			oGc.font='20px impact';
			for(var i=0;i<12;i++){
				oGc.save();
				oGc.translate(cenW, cenH);
				oGc.rotate(30*(i+1)*Math.PI/180);
				oGc.translate(-7, -90);
				oGc.fillText((i+1), 0, 0);
				oGc.textBaseLine='top';
				oGc.restore();	
			}

			oGc.font='10px impact';
			var w=(oC.width-oGc.measureText('2016年8月11日').width)/2;
			oGc.fillText(oYear+'年'+(oMon+1)+'月'+oDat+'日',w,210);
			oGc.textBaseLine='top';
		}
	}
	// 右键菜单
	function menuFn(){
		var aLi2=oMenu.children[0].children;
		oMenu.style.display='block';
		var oH=oMenu.clientHeight;
		oMenu.style.display='none';
		// 单击右键出现自定义环境菜单
		document.oncontextmenu=function(ev){
			var ev=ev||event;
			var sTop=document.documentElement.scrollTop||document.body.scrollTop;
			var oX=ev.clientX+1;
			var oY=ev.clientY+sTop+1;
			var sH=document.documentElement.clientHeight;
			oFMenu.style.display='none';
			oMenu.style.display='block';
			oMenu.style.left=oX+'px';
			if((oY-sTop)>(sH-oH)){
				oY=sH-oH+sTop;
			}
			oMenu.style.top=oY+'px';
			return false;
		}
		fn0(aLi2[0]); //大小图标查看方式
		fn1(aLi2[1]); //图标的排列方式
		// 菜单单项进行操作
		for(var i=0;i<aLi2.length;i++){
			aLi2[i].index=i;
			// 鼠标移入对应的菜单项出现效果
			aLi2[i].onmouseover=function(ev){
				addClass(this,'shadow');
				var ev=ev||event;
				ev.cancelBubble=true;
				if(this.index==0||this.index==1){
					addClass(this,'active');
					var aLi=this.getElementsByTagName('li');
					if(this.index==1){
						for(var i=0;i<aLi.length;i++){
								aLi[i].style.color='';
							}
						if(getCookie('rank')){
							if(getCookie('rank')=='true'&&getCookie('freedom')=='true'){
								
								aLi[1].style.color='red';
							}else if(getCookie('rank')=='false'&&getCookie('freedom')=='true'){
								aLi[0].style.color='red';
							}else if(getCookie('freedom')=='false'){
								aLi[2].style.color='red';
							}		
						}else{
							aLi[0].style.color='red';
						}
					}else if(this.index==0){
						for(var i=0;i<aLi.length;i++){
							aLi[i].style.color='';
						}
						if(getCookie('smb')){
							if(getCookie('smb')=='s'){
									aLi[0].style.color='red';
								}else if(getCookie('smb')=='m'){
									aLi[1].style.color='red';
								}else if(getCookie('smb')=='b'){
									aLi[2].style.color='red';
								}		
							}else{
								aLi[0].style.color='red';
						}
					}
					for(var i=0;i<aLi.length;i++){
						aLi[i].onmouseover=function(ev){
							addClass(this,'shadow');
							var ev=ev||event;
						}
						aLi[i].onmouseout=function(){
							removeClass(this,'shadow');
						}	
					}
				}
			}
			// 鼠标移开对应的菜单项效果消失
			aLi2[i].onmouseout=function(){
				removeClass(this,'shadow');
				removeClass(this,'active');
			}
			// 对菜单项进行点击操作
			aLi2[i].onclick=function(ev){
				var ev=ev||event;
				ev.cancelBubble=true;
				var oX=ev.clientX;
				var oY=ev.clientY;
				switch(this.index){
					case 2:
					 	location.reload(); //刷新
						break;
					case 3:
						break;
					case 4:
						fn4();		//新建文件夹
						break;
					case 5:
						fn5();  	//个性化设置
						break;
					case 6:
						fn6(oX,oY);     //创建便笺
						break;
					case 7:
						zx();		//注销登录
						break;
				}
				oMenu.style.display='none';
			}

		}
	}
	// 图标大小
	function fn0(obj){
		var aLi=obj.getElementsByTagName('li');
		for(var i=0;i<aLi.length;i++){
			aLi[i].index=i;
			aLi[i].onclick=function(){
				for(var i=0;i<aUl.length;i++){
					if(this.index==0){
						setCookie('smb','s',5);
					}else if(this.index==1){
						setCookie('smb','m',5);
					}else if(this.index==2){
						setCookie('smb','b',5);
					}
					toBig(aUl[i]);
				}
			}
		}
	}
	function toBig(obj){
		var sLi=obj.getElementsByTagName('li');
		if(getCookie('smb')=='m'){
			for(var i=0;i<sLi.length;i++){
				sLi[i].style.width=100+'px';
				sLi[i].style.height=100+'px';
			}
		}else if(getCookie('smb')=='b'){
			for(var i=0;i<sLi.length;i++){
				sLi[i].style.width=120+'px';
				sLi[i].style.height=120+'px';
			}
			
		}else if(getCookie('smb')=='s'||!getCookie('smb')){
			for(var i=0;i<sLi.length;i++){
				sLi[i].style.width=90+'px';
				sLi[i].style.height=90+'px';
			}
		}
		fileFn(obj);
	}
	// 图标排列方式
	function fn1(obj){
		var aLi=obj.getElementsByTagName('li');
		for(var i=0;i<aLi.length;i++){
			aLi[i].index=i;
			aLi[i].onclick=function(){
				// 横向排列
				if(this.index==0){
					onOff=false;   //纵向排列的按钮关闭
					bT=true;       //自由排列关闭
					setCookie('rank',onOff,5);
					setCookie('freedom',bT,5);
					for(var i=0;i<aUl.length;i++){
						fileFn(aUl[i]);
					}
				//纵向排列
				}else if(this.index==1){
					onOff=true;
					bT=true;
					setCookie('rank',onOff,5);
					setCookie('freedom',bT,5);
					for(var i=0;i<aUl.length;i++){
						fileFn(aUl[i]);
					}
				// 自由排列
				}else if(this.index==2){
					bT=false;
					setCookie('rank',onOff,5);
					setCookie('freedom',bT,5);
				}	
			}
		}
	}
	// 新建文件夹
	function fn4(){
		var oLi=document.createElement('li');
		var oA=document.createElement('a');
		oA.href='javascript:';
		var oImg=document.createElement('img');
		oImg.src='images/6.png';
		oA.appendChild(oImg);
		oLi.appendChild(oA);
		var oInput=document.createElement('input');
		oInput.type='text';
		oInput.value='新建文件夹';
		oLi.appendChild(oInput);
		aUl[iNow].appendChild(oLi);
		toBig(aUl[iNow]);
		oInput.readOnly='';
		oInput.select();
		oInput.onblur=function(){
			if(this.value==''){
				this.value='新建文件夹';
			}
			this.readOnly='readonly';
		}
	}
	// 个性化设置
	function fn5(){
		oTheme.style.display='block';
		var tHeader=oTheme.getElementsByClassName('t_header')[0];
		var oA=tHeader.getElementsByTagName('a')[0];
		var aLi=oTheme.getElementsByTagName('li');
		for(var i=0;i<aLi.length;i++){
			aLi[i].index=i;
			aLi[i].onclick=function(){
				var n=this.index+1;
				document.body.style.backgroundImage='url(images/bg'+'0'+n +'.jpg)';
				setCookie('bgImg','0'+n,5);
			}
		}
		oA.onclick=function(){
			oTheme.style.display='none';
			asideFn();
		}
		drag(oTheme);
	}
	// 便笺
	function fn6(x,y){
		var oA=oNote.children[0].getElementsByTagName('a')[0];
		var oSpan=oNote.children[0].getElementsByTagName('span')[0];
		var oUl=oNote.getElementsByClassName('note_list')[0];
		var oTeA=ANote.getElementsByTagName('textarea')[0];
		var aA=ANote.getElementsByTagName('a');
		var sH=document.documentElement.clientHeight;
		var sW=document.documentElement.clientWidth;
		oNote.style.display='block';
		var oH=oNote.clientHeight;
		var oW=oNote.clientWidth;
		var onOff=false;
		var nLi=0;
		if(x>(sW-oW)){
			x=sW-oW;
		}
		if(y>(sH-oH)){
			y=sH-oH;
		}
		if(sH<oH){
			y=110;
		}
		oNote.style.left=x-50+'px';
		oNote.style.top=y-100+'px';
		cNode();
		// 打开便笺页面时根据本地数据进行内容的添加
		function cNode(){
			oUl.innerHTML='';
			for(var i=0;i<window.localStorage.length/2;i++){
				var oLi=document.createElement('li');
				oLi.className='clearfix';
				var oSpan=document.createElement('span');
				oSpan.style.cssFloat='left';
				oSpan.innerHTML=window.localStorage.getItem('node'+(window.localStorage.length/2-i-1));
				var oEm=document.createElement('em');
				oEm.style.cssFloat='right';
				oEm.style.marginRight='20px';
				oEm.innerHTML=window.localStorage.getItem('time'+(window.localStorage.length/2-i-1));
				oLi.appendChild(oSpan);
				oLi.appendChild(oEm);
				oUl.insertBefore(oLi,oUl.children[0]);	
			}
			nCon();
		}
		// 对便笺内容修改、、删除
		function nCon(){
			var aLi=oUl.getElementsByTagName('li');
			for(var i=0;i<aLi.length;i++){
				aLi[i].index=i;
				aLi[i].onclick=function(){
					onOff=true;
					nLi=this.index;
					var _this=this;
					showNode();
					oTeA.value=_this.children[0].innerHTML;
					// 删除按钮
					aA[0].onclick=function(){
						var e=confirm('你确定要删除这条便笺吗？');
						if(e){
							oUl.removeChild(_this);
							ANote.style.display='none';	
							nCon();
							oNote.style.display='block';
							onOff=false;
						}
					}
				}
			}
		}
		// 关闭便笺页面
		oA.onclick=function(){
			startMove(oNote,{'height':0,'opacity':0},'hc',function(){
				oNote.style.display='none';
				oNote.style.height=oH+'px';
				oNote.style.opacity=1;
			});
			asideFn();
			var oUl=oNote.getElementsByClassName('note_list')[0];
			var aLi=oUl.children;
			window.localStorage.clear();
			if(aLi.length>0){
				for(var i=0;i<aLi.length;i++){
					var oSpan=aLi[i].children[0];
					var oEm=aLi[i].getElementsByTagName('em')[0];
					window.localStorage.setItem('node'+i,oSpan.innerHTML);
					window.localStorage.setItem('time'+i,oEm.innerHTML);
				}	
			}
			
		}
		// 添加便笺
		oSpan.onclick=showNode;
		function showNode(){
			ANote.style.left=oNote.offsetLeft+oNote.offsetWidth/2+'px';
			ANote.style.top=oNote.offsetTop+'px';
			ANote.style.display='block';
			oNote.style.display='none';
			if(onOff){
				var aLi=oUl.getElementsByTagName('li');
				oTeA.value=aLi[nLi].children[0].innerHTML;
			}else{
				oTeA.value='';
			}
			drag(ANote);
		}
		// 输入便笺内容
		aNoFn();
		function aNoFn(){
			// 保存按钮
			aA[1].onclick=function(){
				ANote.style.display='none';	
				oNote.style.display='block';
				var oDate=new Date();
				var oMon=oDate.getMonth();
				var oDat=oDate.getDate();
				if(onOff){
					var aLi=oUl.getElementsByTagName('li');
					aLi[nLi].children[0].innerHTML=oTeA.value;
					onOff=false;
				}else{
					if(oTeA.value!=''){
						var oLi=document.createElement('li');
						oLi.className='clearfix';
						var oSpan=document.createElement('span');
						oSpan.style.cssFloat='left';
						oSpan.innerHTML=oTeA.value;
						var oEm=document.createElement('em');
						oEm.style.cssFloat='right';
						oEm.style.marginRight='20px';
						oEm.innerHTML=(oMon+1)+'月'+oDat+'日';
						oLi.appendChild(oSpan);
						oLi.appendChild(oEm);
						oUl.insertBefore(oLi,oUl.children[0]);	
					}	
				}
				nCon();
			}
		}
		drag(oNote);
	}
	// 获取指定元素的指定属性值
	function getStyle(obj,attr){
		return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj)[attr];
	}
	// 运动框架
	function startMove(obj,target,style,endfn){
		clearInterval(obj.timer);
		var ispeed=0;
		var iNow=0;
		obj.timer=setInterval(function(){
			var bStop=true;
			for(var attr in target){
				if(style=='tx'){

				}else if(style='hc'){
					if(attr=='opacity'){
						var step=(target[attr]-parseInt(getStyle(obj,attr)*100))/5;
					}else{
						var step=(target[attr]-parseInt(getStyle(obj,attr)))/5;
					}
					step=step>0?Math.ceil(step):Math.floor(step);
					if(attr=='opacity'){
						var dir=parseInt(getStyle(obj,attr)*100)+step;
					}else{
						var dir=parseFloat(getStyle(obj,attr))+step;
					}
					if(Math.abs(dir-target[attr])<1){
						dir=target[attr];
					}
					if(dir!=target[attr]){
						bStop=false;
					}
					if(attr=='opacity'){
						obj.style[attr]=dir/100;
					}else{
						obj.style[attr]=dir+'px';
					}
						
				}
			}
			if(bStop){
				clearInterval(obj.timer);
				console.log('end');
				endfn&&endfn();
			}	
		},30)
	}
	// 碰撞检测
	function crash(obj1,obj2){
		var L1=obj1.offsetLeft;
		var R1=obj1.offsetLeft+obj1.offsetWidth;
		var T1=obj1.offsetTop;
		var B1=obj1.offsetTop+obj1.offsetHeight;
		var L2=obj2.offsetLeft;
		var R2=obj2.offsetLeft+obj1.offsetWidth;
		var T2=obj2.offsetTop;
		var B2=obj2.offsetTop+obj1.offsetHeight;
		if(L1<R2&&R1>L2&&T1<B2&&B1>T2){
			return true;
		}

	}	
	// 计算距离
	function dis(obj1,obj2){
		var a1=obj1.offsetLeft+obj1.offsetWidth/2;
		var b1=obj1.offsetTop+obj1.offsetHeight/2;
		var a2=obj2.offsetLeft+obj2.offsetWidth/2;
		var b2=obj2.offsetTop+obj2.offsetHeight/2;
		var a=a1-a2;
		var b=b1-b2;
		return Math.round(Math.sqrt(a*a+b*b));
	}	
	// 获取离目标最近的距离的元素
	function getNear(obj1,obj2){ //函数的返回值是数组arr的下标
		var iMin=999999999;
		var iMinIndex=-1;
		var aLi=obj2.getElementsByTagName('li');
		// arr是多个被碰撞li与this的距离的数组；
		for(var i=0;i<aLi.length;i++){
			if(obj1==aLi[i]){
				continue;
			}else{
				if(crash(obj1,aLi[i])){
					var oDis=dis(obj1,aLi[i]);
					if(iMin>oDis){
						iMin=oDis;
						iMinIndex=i;
					}
				}
			}
		}
		if(iMinIndex==-1){
			return null;
		}else{
			return aLi[iMinIndex];
		}
	}
	// 移除class
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
	// 添加class
	function addClass(obj,className){
		var str=obj.className;
		var arr=str.split(' ');
		arr.push(className);
		str=arr.join(' ');
		obj.className=str;
	}
	// 设置cookie
	function setCookie(name,value,num){
		var oDate=new Date();
		oDate.setDate(oDate.getDate()+num);
		document.cookie=name+'='+value+';expires='+oDate;
	}
	// 通过指定的cookie属性名称获取相应的属性值
	function getCookie(ck){
		var arr=[];
		var str=document.cookie;
		var arr1=str.split('; ');
		for(var i=0;i<arr1.length;i++){
			var arr2=arr1[i].split('=');
			arr.push(arr2);
		}
		for(var i=0;i<arr.length;i++){
			if(arr[i][0]==ck){
				return arr[i][1];
			}
		}
	}	
	// 拖动1
	function drag(obj){
			obj.children[0].onmousedown=function(ev){
				var ev=ev||event;
				var stX=ev.clientX-this.parentNode.offsetLeft-this.parentNode.offsetWidth/2;
				var stY=ev.clientY-this.parentNode.offsetTop;
				var _this=this.parentNode;
				var aW=document.documentElement.clientWidth-this.parentNode.clientWidth+this.offsetWidth/2;
				var aH=document.documentElement.clientHeight-this.parentNode.clientHeight;
				document.onmousemove=function(ev){
					var ev=ev||event;
					var L=ev.clientX-stX;
					var T=ev.clientY-stY;
					if(L<_this.offsetWidth/2){
						L=_this.offsetWidth/2;
					}else if(L>aW){
						L=aW;
					}
					if(T<0){
						T=0;
					}else if(T>aH){
						T=aH;
					}
					_this.style.left=L+'px';
					_this.style.top=T+'px';
					return false;
				}
				document.onmouseup=function(){
					document.onmousemove=document.onmouseup=null;
					asideFn();
				}
			}	
	}
	// 时钟的拖动
	function dragC(obj){
		obj.onmousedown=function(ev){
			var ev=ev||event;
			var stX=ev.clientX-this.offsetLeft;
			var stY=ev.clientY-this.offsetTop;
			var _this=this;
			var aW=document.documentElement.clientWidth-this.clientWidth;
			var aH=document.documentElement.clientHeight-this.clientHeight;
			document.onmousemove=function(ev){
				var ev=ev||event;
				var L=ev.clientX-stX;
				var T=ev.clientY-stY;
				if(L<200){
					L=200;
				}else if(L>aW){
					L=aW;
				}
				if(T<30){
					T=30;
				}else if(T>aH){
					T=aH;
				}
				_this.style.left=L+'px';
				_this.style.top=T+'px';
				return false;
			}
			document.onmouseup=function(ev){
				var ev=ev||event;
				var endX=ev.clientX-stX;
				var endY=ev.clientY-stY;
				setCookie('clockX',endX,30);
				setCookie('clockY',endY,30);
				document.onmousemove=document.onmouseup=null;
				asideFn();
			}
		}	

	}
}