//获取元素
var getElem=function(selector){
	return document.querySelector(selector)
}

var getAllElem = function(selector){
	return document.querySelectorAll(selector);
}

//获取元素样式
var getCls = function(element){
	return element.getAttribute('class');
}
//设置元素样式
var setCls = function(element,cls){
	element.setAttribute('class',cls)
}

//为元素添加样式
var addCls = function (element,cls){
	var baseCls = getCls(element);
	if(baseCls.indexOf(cls) === -1){
		setCls(element,baseCls+' ' +cls);
	}
}

//为元素删除样式
var delCls = function(element,cls){ 
	var baseCls = getCls(element);
	if(baseCls.indexOf(cls) != -1){
		setCls(element,baseCls.split(cls).join(' ').replace(/\s+/g,' '));
	}
}

//第一步：初始化样式init
var screenAnimateElements = {
	'.screen-1':[
		'.screen-1__heading',
		'.screen-1__phone',
		'.screen-1__shadow',
	],
	'.screen-2':[
		'.screen-2__heading',
		'.screen-2__subheading',
		'.screen-2__phone',
		'.screen-2__point_i_1',
		'.screen-2__point_i_2',
		'.screen-2__point_i_3',
	],
	'.screen-3':[
		'.screen-3__heading',
		'.screen-3__subheading',
		'.screen-3__phone',
		'.screen-3__features',
	],
	'.screen-4':[
		'.screen-4__subheading',
		'.screen-4__heading',
		'.screen-4__type__item_i_1',
		'.screen-4__type__item_i_2',
		'.screen-4__type__item_i_3',
		'.screen-4__type__item_i_4'
	],
	'.screen-5':[
		'.screen-5__subheading',
		'.screen-5__heading',
		'.screen-5__bg'
	]
};
//设置init
var setScreenAnimateInit = function(screenCls){
	var screen = document.querySelector(screenCls);//获取当前屏的元素
	var animateElements=screenAnimateElements[screenCls];//需要设置动画的元素

	for(var i = 0;i<animateElements.length;i++){
				var element = document.querySelector(animateElements[i]);
				var baseCls = element.getAttribute("class");
				element.setAttribute("class",baseCls + ' ' + animateElements[i].substr(1)+'_animate_init');
			}
}
//设置init->done  滚动到哪一屏就播放哪一屏
var playScreenAnimateDone = function(screenCls){
	var screen = document.querySelector(screenCls);//获取当前屏的元素
	var animateElements=screenAnimateElements[screenCls];//需要设置动画的元素
	for(var i = 0;i<animateElements.length;i++){
				var element = document.querySelector(animateElements[i]);
				var baseCls = element.getAttribute("class");
				element.setAttribute("class",baseCls.replace('_animate_init','_animate_done'));
			}
}
//屏幕载入完毕开始播放动画
window.onload = function(){
	console.log('onload');
	for(var k in screenAnimateElements){
		if(k==='.screen-1'){
			setTimeout(playScreenAnimateDone('.screen-1'),1000);
			continue;
		}

		setScreenAnimateInit(k);
	}
}

//第二步：滚动到哪里 就播到哪里
//导航和右侧大纲随屏幕滚动标色
var navItems = getAllElem('.header__nav-item');
var outlineItems = getAllElem('.outline__item');
var switchNavItemsActive = function(idx){
	for(var i = 0; i <navItems.length;i++){
		delCls(navItems[i],'header__nav-item_status_active');

	}
	addCls(navItems[idx],'header__nav-item_status_active');
	navTip.style.left = 70*idx + 'px';
	for(var i = 0; i <outlineItems.length;i++){
		delCls(outlineItems[i],'outline__item_status_active');
	}
	addCls(outlineItems[idx],'outline__item_status_active');
}
window.onscroll = function(){
	console.log('scolling');
	var top = document.body.scrollTop;
	//导航条出现or消失
	if(top>80){
		addCls(getElem('.header'),'header_status_black');
		addCls(getElem('.outline'),'outline_status_in');
	}else{
		delCls(getElem('.header'),'header_status_black');
		delCls(getElem('.outline'),'outline_status_in');
	}
	
	//滚屏播放
	if(top >1){
		playScreenAnimateDone('.screen-1');
		switchNavItemsActive(0);
	}
	if(top > 800*1 - 100){
		playScreenAnimateDone('.screen-2');
		switchNavItemsActive(1);
	}
	if(top > 800*2 - 100){
		playScreenAnimateDone('.screen-3');
		switchNavItemsActive(2);
	}
	if(top > 800*3 - 100){
		playScreenAnimateDone('.screen-4');
		switchNavItemsActive(3);
	}
	if(top > 800*4 - 100){
		playScreenAnimateDone('.screen-5');
		switchNavItemsActive(4);
	}

}
/*
第三步双向定位
 */

var setNavJump = function(i,lib){
	var item = lib[i];
	item.onclick = function(){
		
		document.body.scrollTop = i*800;
	}
}
for(var i = 0;i<navItems.length;i++){
	setNavJump(i,navItems);
}
for(var i = 0;i<outlineItems.length;i++){

	setNavJump(i,outlineItems);
}

/*
滑动门特效实现
 */
var navTip = getElem('.header__nav-tip');
var setTip = function(idx,lib){
	lib[idx].onmouseover=function(){
		navTip.style.left = idx*70 +'px';
	}
	var activeIdx = 0;
	lib[idx].onmouseout = function(){
		for(var i = 0;i<lib.length;i++){
			if(getCls(lib[i]).indexOf('header__nav-item_status_active') >-1){
				activeIdx= i;
				break;
			}
		}
		navTip.style.left = activeIdx*70 +'px';
	}
}
for (var i = 0; i < navItems.length; i++) {
	setTip(i,navItems);
}
