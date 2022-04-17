const path = require('path');
const Max = require('max-api');
const WebSocket = require('ws');

const wss = new WebSocket.Server( {port: 8084} );

var newScan;

//websocket successfully connected:
wss.on('connection', ws=> {
	
	Max.post("WebSocket client connected.");
	
	//incoming scan through webSocket
	ws.addEventListener('message', function (event) {
		Max.setDict("scan", JSON.parse(event.data));
		Max.post("Scan received.");
		Max.outletBang();		
	});
	

	//incoming return scan message
	Max.addHandler("returnTo3D", async function() {
		var scan = await Max.getDict("scan");
		ws.send(JSON.stringify(scan));
	})
	
});