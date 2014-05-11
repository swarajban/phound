window.onload = function () {

	document.getElementById('getDevicesButton').onclick = function () {
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

		var signupData = {
			iCloudEmail: iCloudEmail,
			iCloudPassword: iCloudPassword
		};
		var request = new XMLHttpRequest();
		request.open('POST', '/getDevices', true);
		request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		request.onload = onSignup;
		request.send(JSON.stringify(signupData));

		function onSignup () {
			if (request.status === 200) {
				try {
					var response = JSON.parse(request.responseText);
					if (response.data) {
						var devices = response.data.devices;
						if (devices.length > 0) {
							console.log(devices);
							return;
						}
					}
				}
				catch (e) { }
			}
			showAlert('Error fetching devices from server');
		}
	};

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