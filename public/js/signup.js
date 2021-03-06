//fgnass.github.com/spin.js#v2.0.1
!function(a,b){"object"==typeof exports?module.exports=b():"function"==typeof define&&define.amd?define(b):a.Spinner=b()}(this,function(){"use strict";function a(a,b){var c,d=document.createElement(a||"div");for(c in b)d[c]=b[c];return d}function b(a){for(var b=1,c=arguments.length;c>b;b++)a.appendChild(arguments[b]);return a}function c(a,b,c,d){var e=["opacity",b,~~(100*a),c,d].join("-"),f=.01+c/d*100,g=Math.max(1-(1-a)/b*(100-f),a),h=j.substring(0,j.indexOf("Animation")).toLowerCase(),i=h&&"-"+h+"-"||"";return l[e]||(m.insertRule("@"+i+"keyframes "+e+"{0%{opacity:"+g+"}"+f+"%{opacity:"+a+"}"+(f+.01)+"%{opacity:1}"+(f+b)%100+"%{opacity:"+a+"}100%{opacity:"+g+"}}",m.cssRules.length),l[e]=1),e}function d(a,b){var c,d,e=a.style;for(b=b.charAt(0).toUpperCase()+b.slice(1),d=0;d<k.length;d++)if(c=k[d]+b,void 0!==e[c])return c;return void 0!==e[b]?b:void 0}function e(a,b){for(var c in b)a.style[d(a,c)||c]=b[c];return a}function f(a){for(var b=1;b<arguments.length;b++){var c=arguments[b];for(var d in c)void 0===a[d]&&(a[d]=c[d])}return a}function g(a,b){return"string"==typeof a?a:a[b%a.length]}function h(a){this.opts=f(a||{},h.defaults,n)}function i(){function c(b,c){return a("<"+b+' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">',c)}m.addRule(".spin-vml","behavior:url(#default#VML)"),h.prototype.lines=function(a,d){function f(){return e(c("group",{coordsize:k+" "+k,coordorigin:-j+" "+-j}),{width:k,height:k})}function h(a,h,i){b(m,b(e(f(),{rotation:360/d.lines*a+"deg",left:~~h}),b(e(c("roundrect",{arcsize:d.corners}),{width:j,height:d.width,left:d.radius,top:-d.width>>1,filter:i}),c("fill",{color:g(d.color,a),opacity:d.opacity}),c("stroke",{opacity:0}))))}var i,j=d.length+d.width,k=2*j,l=2*-(d.width+d.length)+"px",m=e(f(),{position:"absolute",top:l,left:l});if(d.shadow)for(i=1;i<=d.lines;i++)h(i,-2,"progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)");for(i=1;i<=d.lines;i++)h(i);return b(a,m)},h.prototype.opacity=function(a,b,c,d){var e=a.firstChild;d=d.shadow&&d.lines||0,e&&b+d<e.childNodes.length&&(e=e.childNodes[b+d],e=e&&e.firstChild,e=e&&e.firstChild,e&&(e.opacity=c))}}var j,k=["webkit","Moz","ms","O"],l={},m=function(){var c=a("style",{type:"text/css"});return b(document.getElementsByTagName("head")[0],c),c.sheet||c.styleSheet}(),n={lines:12,length:7,width:5,radius:10,rotate:0,corners:1,color:"#000",direction:1,speed:1,trail:100,opacity:.25,fps:20,zIndex:2e9,className:"spinner",top:"50%",left:"50%",position:"absolute"};h.defaults={},f(h.prototype,{spin:function(b){this.stop();{var c=this,d=c.opts,f=c.el=e(a(0,{className:d.className}),{position:d.position,width:0,zIndex:d.zIndex});d.radius+d.length+d.width}if(e(f,{left:d.left,top:d.top}),b&&b.insertBefore(f,b.firstChild||null),f.setAttribute("role","progressbar"),c.lines(f,c.opts),!j){var g,h=0,i=(d.lines-1)*(1-d.direction)/2,k=d.fps,l=k/d.speed,m=(1-d.opacity)/(l*d.trail/100),n=l/d.lines;!function o(){h++;for(var a=0;a<d.lines;a++)g=Math.max(1-(h+(d.lines-a)*n)%l*m,d.opacity),c.opacity(f,a*d.direction+i,g,d);c.timeout=c.el&&setTimeout(o,~~(1e3/k))}()}return c},stop:function(){var a=this.el;return a&&(clearTimeout(this.timeout),a.parentNode&&a.parentNode.removeChild(a),this.el=void 0),this},lines:function(d,f){function h(b,c){return e(a(),{position:"absolute",width:f.length+f.width+"px",height:f.width+"px",background:b,boxShadow:c,transformOrigin:"left",transform:"rotate("+~~(360/f.lines*k+f.rotate)+"deg) translate("+f.radius+"px,0)",borderRadius:(f.corners*f.width>>1)+"px"})}for(var i,k=0,l=(f.lines-1)*(1-f.direction)/2;k<f.lines;k++)i=e(a(),{position:"absolute",top:1+~(f.width/2)+"px",transform:f.hwaccel?"translate3d(0,0,0)":"",opacity:f.opacity,animation:j&&c(f.opacity,f.trail,l+k*f.direction,f.lines)+" "+1/f.speed+"s linear infinite"}),f.shadow&&b(i,e(h("#000","0 0 4px #000"),{top:"2px"})),b(d,b(i,h(g(f.color,k),"0 0 1px rgba(0,0,0,.1)")));return d},opacity:function(a,b,c){b<a.childNodes.length&&(a.childNodes[b].style.opacity=c)}});var o=e(a("group"),{behavior:"url(#default#VML)"});return!d(o,"transform")&&o.adj?i():j=d(o,"animation"),h});

window.onload = function () {
	var spinner = initializeSpinner();

	// Get Devices Form View
	var getDevicesForm = document.getElementById('getDevicesForm');
	getDevicesForm.addEventListener("submit", function(event){
		event.preventDefault();
		getDevices();
	}, false);

	document.getElementById('getDevicesButton').onclick = function () {
		getDevices();
	};

	function getDevices () {
		hideAlert();

		var iCloudEmail = document.getElementById('iCloudEmail').value;
		if (iCloudEmail === '') {
			showAlert('Enter your iCloud Email Address');
			return;
		}
		var iCloudPassword = document.getElementById('iCloudPassword').value;
		if (iCloudPassword === '') {
			showAlert('Enter your iCloud Password');
			return;
		}

		toggleSpinner(true);

		var iCloudCredentials = {
			iCloudEmail: iCloudEmail,
			iCloudPassword: iCloudPassword
		};
		var request = new XMLHttpRequest();
		request.open('POST', '/getDevices', true);
		request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		request.onload = onGetDevices;
		request.send(JSON.stringify(iCloudCredentials));

		function onGetDevices () {
			toggleSpinner(false);
			if (request.status === 200) {
				try {
					var response = JSON.parse(request.responseText);
					if (response.data) {
						var devices = response.data.devices;
						if (devices.length > 0) {
							showDeviceSelect(devices);
							return;
						}
					}
				}
				catch (e) { }
			}
			showAlert('Error fetching devices from server');
		}
	}

	// Sign Up Form View

	function showDeviceSelect (devices) {
		document.getElementById('getDevicesView').style.display = 'none';
		document.getElementById('signUpView').style.display = 'block';
		var deviceDropdown = document.getElementById('devices');
		deviceDropdown.options.length = 0;
		devices.forEach (function (device) {
			deviceDropdown.add(new Option(device.name, device.deviceID));
		});
	}

	var signupForm = document.getElementById('signupForm');
	signupForm.addEventListener("submit", function(event){
		event.preventDefault();
		signUp();
	}, false);

	document.getElementById('signUpBotton').onclick = function () {
		signUp();
	};

	function signUp () {
		hideAlert();
		var iCloudEmail = document.getElementById('iCloudEmail').value;
		var signupData = {
			iCloudEmail: iCloudEmail,
			iCloudPassword: document.getElementById('iCloudPassword').value,
			deviceID: document.getElementById('devices').value
		};

		var request = new XMLHttpRequest();
		request.open('POST', '/signup', true);
		request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		request.onload = onSignUp;
		request.send(JSON.stringify(signupData));

		function onSignUp () {
			toggleSpinner(false);
			if (request.status === 200) {
				try {
					var response = JSON.parse(request.responseText);
					if (response !== null) {
						if (response.data && response.data.textID) {
							showTextID(response.data.textID, iCloudEmail);
							return;
						}
						else if (response.error && response.error.message) {
							showAlert('Error signing up: ' + response.error.message);
							return;
						}
					}
				}
				catch (e) { }
			}
			showAlert('Error signing up');
		}
	}

	function showTextID (textID, iCloudEmail) {
		document.getElementById('signUpView').style.display = 'none';
		document.getElementById('showTextIDView').style.display = 'block';
		document.getElementById('textIDMessage').textContent = 'Your text ID is ' + textID;
		document.getElementById('instructionMessage').textContent = 'Text "' + iCloudEmail + ' ' + textID + '" to (415) 528-7662 to find your phone!';
	}

	// Loading spinner functions
	function initializeSpinner () {
		var opts = {
			lines: 13, // The number of lines to draw
			length: 20, // The length of each line
			width: 10, // The line thickness
			radius: 30, // The radius of the inner circle
			corners: 1, // Corner roundness (0..1)
			rotate: 0, // The rotation offset
			direction: 1, // 1: clockwise, -1: counterclockwise
			color: '#000', // #rgb or #rrggbb or array of colors
			speed: 1, // Rounds per second
			trail: 60, // Afterglow percentage
			shadow: false, // Whether to render a shadow
			hwaccel: true, // Whether to use hardware acceleration
			className: 'spinner', // The CSS class to assign to the spinner
			zIndex: 2e9, // The z-index (defaults to 2000000000)
			top: '25%', // Top position relative to parent
			left: '50%' // Left position relative to parent
		};
		return new Spinner(opts);
	}

	function toggleSpinner (toggle) {
		if (toggle) {
			var target = document.getElementById('spinner');
			spinner.spin(target);
		}
		else {
			spinner.stop();
		}
	}


	// Alert box functions
	document.getElementById('alertCloseButton').onclick = function () {
		hideAlert();
	};

	function showAlert (message) {
		document.getElementById('alertContainer').style.display = 'block';
		document.getElementById('alertMessage').textContent = message;
	}

	function hideAlert () {
		document.getElementById('alertContainer').style.display = 'none';
	}
};