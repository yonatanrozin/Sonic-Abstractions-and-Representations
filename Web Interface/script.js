var scanTimeline = [];

var settings = {} //put defaults in here


function updateSetting(setting, value) {
    settings[setting] = value;
    if (setting == "rayCount") {
        rayscanner.setRays(value);
    }
}

function setup() {
    createCanvas(400, 400);
    //place 2D canvas at top of column
    document.getElementById("2DTools").prepend(document.getElementById("defaultCanvas0"));
    background(0);
}

var socketConnectButton;
window.addEventListener("DOMContentLoaded", function() {
    socketConnectButton = document.getElementById("socketconnectbutton");
})

function socketConnect() {
    
    rayWS = new WebSocket("ws://localhost:8084"); //open websocket

    rayWS.addEventListener("open", function () {
        console.log("Websocket connected!");
        socketConnectButton.disabled = true;
        socketConnectButton.innerHTML = "Websocket connected.";
    });

    rayWS.addEventListener("close", function () {
        console.log("Websocket closed.");
        socketConnectButton.disabled = false;
        socketConnectButton.innerHTML = "Connect to WebSocket";
    });

    //incoming from Max/MSP:
    rayWS.addEventListener("message", msg => {
        data = JSON.parse(msg.data);
        var newScan = new Scan(data); //create a new scan object using data from Max
        newScan.listButtons(); //display options for new scan
    });
}

