var stationary = (function(){
	var default_options = {
		"stationary_container"	: "stationary",
		"stationary_width"  	:	"430px",
		"stationary_height" 	:	"250px",
		"stationary_font_size"  :	"12px",
		"stationary_font_color" :	"#000",
		"stationary_background"	:	"#ddd",
		"stationary_font_family":	"Arial",
		"boxList"				:	[
										{"id":"companyName","value":"Company Name","xPosition":"30px","yPosition":"30px","width":"150px","height":"30px","htmltag":"input","type":"text"},
										{"id":"name","value":"Name","xPosition":"230px","yPosition":"120px","width":"150px","height":"30px","htmltag":"input","type":"text"},
										{"id":"phone","value":"Phone Number","xPosition":"230px","yPosition":"151px","width":"150px","height":"30px","htmltag":"input","type":"text"},
										{"id":"address","value":"Address","xPosition":"230px","yPosition":"181px","width":"150px","height":"50px","htmltag":"textarea","type":"textarea"}		
									]
	};
	
	var bgImage;
	var boxListContainer;
	var exportJson;
	var websiteUrl;
	var realDimension = new Array();
	
	return {
		initialization	:	function(stationaryW,stationaryH,baseUrl,backgroundImage,boxListInput,fontSize,fontColor,fontFamily){		
			//get images from JSON
			bgImage = JSON.parse(backgroundImage);
			//initial style
			var reSizeHeight = this.reSize(stationaryW,stationaryH)+"px";
			realDimension = [stationaryW, stationaryH];
			var bgImagePreviewArray = bgImage[0].split(".");

			document.getElementById(default_options.stationary_container).setAttribute("style","color:"+((!!fontColor)?fontColor:default_options.stationary_font_color)+";font-size:"+((!!fontSize)?fontSize:default_options.stationary_font_size)+";background:"+((!!bgImage.length)?("url('"+baseUrl + bgImagePreviewArray[0]+"_preview."+bgImagePreviewArray[1]+"')"):default_options.stationary_background)+";width:"+default_options.stationary_width+";height:"+((!!stationaryH)?reSizeHeight:default_options.stationary_height)+";font-size:"+default_options.stationary_font_size+";color:"+default_options.stationary_font_color+";");		
			websiteUrl = baseUrl;
			
			//initial box
			if(boxListInput != undefined){
				boxListContainer = JSON.parse(boxListInput);
			}else boxListContainer = default_options.boxList; 
			
			for(var i = 0; i < boxListContainer.length; i++){
				document.getElementById(default_options.stationary_container).appendChild(this.renderItem(boxListContainer[i],boxListContainer[i].type));
			}
		},
		
		renderItem	:	function(boxObj,controller){
			var renderElement = document.createElement(boxObj.htmltag);
			renderElement.id = boxObj.id;
			renderElement.name=boxObj.id;
			renderElement.setAttribute("style","left:"+boxObj.xPosition+";top:"+boxObj.yPosition+";width:"+boxObj.width+";height:"+boxObj.height+";");	
			if(controller != "select"){
				renderElement.type = boxObj.type;
				renderElement.value = boxObj.value;
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
		
		exportStationary : function(){
			exportJson = new Array();
			var stationary = document.getElementById(default_options.stationary_container);
			var bgImageJsonArray = document.getElementById(default_options.stationary_container).style.backgroundImage.slice(5,-2).split("_preview");
			var bgImageJsonNameArray = bgImageJsonArray[0].split("/");
			var bgImageJson = bgImageJsonNameArray[bgImageJsonNameArray.length-1]+bgImageJsonArray[1];
			
			
			exportJson ={
				"stationary_width" : realDimension[0],
				"stationary_height" : realDimension[1],
				//"stationary_background" : //document.getElementById("bgSelect").children[document.getElementById("bgSelect").selectedIndex].value,
				"stationary_background" : bgImageJson,
				"stationary_font_size"  :	stationary.style.fontSize,
				"stationary_font_color" :	stationary.style.color,
				"stationary_font_family":	stationary.style.fontFamily,
				"box_list" : boxListContainer
			};
			
			document.getElementById("stationary_pdf").value = JSON.stringify(exportJson);
			
		},
		
		eventHandling : function(elementObj,controller){
			if(controller == "select"){
				elementObj.addEventListener("change",function(){
					document.getElementById(default_options.stationary_container).style.backgroundImage="url('"+websiteUrl+this.children[this.selectedIndex].value+"')";
				});
			}else if(controller == "button"){
				if(elementObj.id == "submit"){
					elementObj.addEventListener("click",function(){
						stationary.exportStationary();
					});
				}
			}
		},
		
		reSize : function(sW,sH){
			var ratio = parseInt(sH)/parseInt(sW);
			return ratio*parseInt(default_options.stationary_width);
		}
	}
})()
