require.config({
  
	paths: {
		'jquery' : 'lib/jquery-2.1.1.min',
		'lodash' : 'lib/lodash.min',
		'q' : 'lib/q.min',
		'xss' : 'lib/xss.min',
		
		'jstorage' : 'lib/jstorage.min',
		'moment' : 'lib/moment.min',
		
		'picker' : 'lib/picker.min',
		'pickerdate' : 'lib/picker.date.min',
		
		'modal' : 'lib/modal.min',
		'text' : 'lib/text.min',
		'handlebars' : 'lib/handlebars-v3.0.1.min',
		
		'fastclick' : 'lib/fastclick.min'
	},
	
	shim: {
		
		'jstorage' : {
			exports : 'Jstorage' 
		},
		'moment' : { 
			exports : 'Moment' 
		},
		'handlebars' : {
			exports : 'Handlebars'
		},
		'fastclick' : {
			exports : 'Fastclick'
		}
	}

});

require([

   	  'jquery'	,
   	  'app'
   	  
   	// 위의 디펜던시 로드 완료 후 호출하는 콜백함수  (디펜던시 로드 완료 시점이 페이지 로드 완료 전 일 수도 있다)
   ],	function($, App){
   		
   		$(document.body).ready(function() {
   			App.start();
   		});
   	});


/**
C:\Java\workspace\mid\WebContent\build
C:\Users\lee\git\youth\youth\WebContent\build

node r.js -o cssIn=../css/one.css out=../allInOne/main.css optimizeCss=default

node r.js -o appbuild.js

*/