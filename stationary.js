var stationary = (function(){
	var default_options = {
		"stationary_container"	: "stationary",
		"stationary_width"  	:	"100%",
		"stationary_height" 	:	"250px",
		"stationary_font_size"  :	"12px",
		"stationary_font_color" :	"#000",
		"stationary_background"	:	"#ddd",
		"boxList"				:	[
										{"id":"companyName","value":"Harapartners","xPosition":"30px","yPosition":"30px","width":"150px","height":"30px","htmltag":"input","type":"text"},
										{"id":"name","value":"jsu","xPosition":"230px","yPosition":"120px","width":"150px","height":"30px","htmltag":"input","type":"text"},
										{"id":"phone","value":"5555555555","xPosition":"230px","yPosition":"151px","width":"150px","height":"30px","htmltag":"input","type":"text"},
										{"id":"address","value":"abccdd eeff","xPosition":"230px","yPosition":"181px","width":"150px","height":"50px","htmltag":"textarea","type":"textarea"},		
										{"id":"submit","value":"Save","xPosition":"70px","yPosition":"-30px","width":"50px","height":"30px","htmltag":"input","type":"button"},
										{"id":"bgSelect","value":"select","xPosition":"0px","yPosition":"-30px","width":"50px","height":"30px","htmltag":"select","type":"select"}
									]
	};
	
	var bgImage;
	
	return {
		initialization	:	function(stationaryW,stationaryH,backgroundImage){		
			//get images from JSON
			bgImage = JSON.parse(backgroundImage);
			//initial style
			document.getElementById(default_options.stationary_container).setAttribute("style","background:"+((!!bgImage.length)?("url('"+bgImage[0]+"');"):default_options.stationary_background)+";width:"+((!!stationaryW)?stationaryW:default_options.stationary_width)+";height:"+((!!stationaryH)?stationaryH:default_options.stationary_height)+";font-size:"+default_options.stationary_font_size+";color:"+default_options.stationary_font_color+";");		
			//initial box
			for(var i = 0; i < default_options.boxList.length; i++){
				document.getElementById(default_options.stationary_container).appendChild(this.renderItem(default_options.boxList[i],default_options.boxList[i].type));
			}
		},
		
		renderItem	:	function(boxObj,controller){
			var renderElement = document.createElement(boxObj.htmltag);
			renderElement.id = boxObj.id;
			renderElement.setAttribute("style","left:"+boxObj.xPosition+";top:"+boxObj.yPosition+";width:"+boxObj.width+";height:"+boxObj.height+";");	
			if(controller != "select"){
				renderElement.type = boxObj.type;
				renderElement.value = boxObj.value;
				renderElement.setAttribute("readonly","readonly");
			}else{
				for(var i = 0; i < bgImage.length; i++){
					var option = document.createElement("option");
					option.value= bgImage[i];
					var bgImageArray = bgImage[i].split("/");
					option.text = bgImageArray[bgImageArray.length-1];
					renderElement.add(option);
				}
			}
			
			this.eventHandling(renderElement,controller);
			return renderElement;
		},
		
		eventHandling : function(elementObj,controller){
			if(controller == "select"){
				elementObj.addEventListener("change",function(){
					document.getElementById(default_options.stationary_container).style.backgroundImage="url('"+this.children[this.selectedIndex].value+"')";
				});
			}
			else{
				elementObj.addEventListener("mouseover",function(){
					elementObj.removeAttribute("readonly");
				});
				elementObj.addEventListener("mouseout",function(){
					elementObj.setAttribute("readonly","readonly");
				});
			}
		}
	}
})()