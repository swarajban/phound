<?php

require_once 'class.sosumi.php';

/**
 * Usage:
 * Get Devices: 'php findIphone.php --action getDevices --username <USERNAME> --password <PASSWORD>'
 * Send Message: 'php findIphone.php --action sendMessage --deviceID <DEVICE_ID> --username <USERNAME> --password <PASSWORD> --subject <SUBJECT> --message <MESSAGE>'
 */


// Command line option
$findIphoneLongOpts = array(
	'action:',
	'username:',
	'password:',
	'deviceID:',
	'subject:',
	'message:'
);
$config = getopt(null, $findIphoneLongOpts);

$result = '';
switch ($config['action']) {
	case 'getDevices':
		$ssm = new Sosumi($config['username'], $config['password']);
		$sosumiDevices = $ssm->devices;
		$devices = array();
		foreach($sosumiDevices as $sosumiDevice) {
			array_push($devices, array(
				'name'      =>  $sosumiDevice->name,
				'class'     =>  $sosumiDevice->deviceClass,
				'model'     =>  $sosumiDevice->deviceModel,
				'deviceID'  =>  $sosumiDevice->id
			));
		}
		$result = json_encode($devices);
		break;

	case 'sendMessage':
		$ssm = new Sosumi($config['username'], $config['password']);
		$devices = $ssm->devices;
		foreach($devices as $phoneNum => $sosumiDevice) {
			if ($config['deviceID'] === $sosumiDevice->id) {
				$ssm->sendMessage($config['message'], true, $phoneNum, $config['subject']);
				$result = '1';
				break;
			}
		}
		break;
}

echo $result;
