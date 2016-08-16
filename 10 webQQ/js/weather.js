/*
* @Author: admin
* @Date:   2016-08-12 20:59:36
* @Last Modified by:   admin
* @Last Modified time: 2016-08-13 10:12:46
*/

'use strict';
// 'http://wthrcdn.etouch.cn/weather_mini?city=' + strCity + '&callback=fn';
	function fn(data){
		if(data.status==1000){
			console.log(data);
			var oDate=new Date();
			oDate.setDate(oDate.getDate()+5);
			oCName.innerHTML=data.data.city+'&nbsp;此时温度: '+data.data.wendu+'℃';
			oWInfo.innerHTML=data.data.ganmao;
			document.cookie='city='+data.data.city+';expires='+oDate;
			for(var i=0;i<aLi.length;i++){
				var oSpan=aLi[i].getElementsByTagName('span')[0];
					aLi[i].innerHTML=data.data.forecast[i].date+'&nbsp;'+data.data.forecast[i].low.substring(3)+'~'+data.data.forecast[i].high.substring(3)+'&nbsp;'+data.data.forecast[i].type+'&nbsp;'+data.data.forecast[i].fengxiang+'&nbsp;'+data.data.forecast[i].fengli;
				if(i==0){
					aLi[i].innerHTML='&nbsp;今&nbsp;天&nbsp;&nbsp;'+data.data.forecast[i].low.substring(3)+'~'+data.data.forecast[i].high.substring(3)+'&nbsp;'+data.data.forecast[i].type+'&nbsp;'+data.data.forecast[i].fengxiang+'&nbsp;'+data.data.forecast[i].fengli;
				}
			}	
		}else{
			alert('请输入正确的城市名');
		}
	}
	var oWeather=document.getElementById('weather');
	var oCity=oWeather.getElementsByClassName('city')[0];
	var oCName=oCity.children[0];
	var oClose=oCity.children[1];
	var oWInfo=oWeather.getElementsByTagName('p')[0];
	var aLi=oWeather.getElementsByTagName('li');
	var oChangeCity=oWeather.getElementsByClassName('change')[0];
	var oAC=oChangeCity.getElementsByTagName('a')[0];
	var oInput=oChangeCity.getElementsByTagName('input')[0];
	oAC.onclick=function(){
		if(oAC.on){
			oInput.style.display='none';
			oAC.innerHTML='切换';
			var str=oInput.value;
			var oScript=document.createElement('script');
			oWeather.appendChild(oScript);
			oScript.src='http://wthrcdn.etouch.cn/weather_mini?city='+str+'&callback=fn';
			oAC.on=!oAC.on
		}else{
			oInput.style.display='inline-block';
			oAC.innerHTML='确定';
			oAC.on=!oAC.on
		}
	}
	// oInput
		