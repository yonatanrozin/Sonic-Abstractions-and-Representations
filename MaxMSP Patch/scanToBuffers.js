outlets = 1
inlets = 1

var spectrumSamps = 1024;


var spectrums = new PolyBuffer("spectrums");
var contours = new PolyBuffer("contours");

var spectrumComb = new Buffer("spectrumComb");
var waveDiff = new Buffer("waveDiff");

var scanDict, scan;

var sBufs = [];
var cBufs = [];

//bang received from node script when data received
function bang() { 
	
	spectrums.clear();
	contours.clear();
	
	spectrumComb.send("clear");
	waveDiff.send("clear");
	
	scanDict = new Dict("scan")
	scan = JSON.parse(scanDict.stringify()); //parse scan JSON
	
	spectrumComb.send("sizeinsamps", spectrumSamps);
	waveDiff.send("sizeinsamps", scan.rayCount);
	
	for (var r = 0; r < scan.rayCount; r++) {
		spectrumComb.poke(1, Math.floor((r+1)/(scan.rayCount+1)*spectrumSamps), 1);
	}
	
	for (var a = 0; a < scan.angles; a++) {
		
		spectrums.appendempty(spectrumSamps/48); 
		contours.appendempty(scan.rayCount/48);
		
		cBufs[a] = new Buffer("contours."+(a+1));
		sBufs[a] = new Buffer("spectrums."+(a+1));
		
		
		for (var r = 0; r < scan.rayCount; r++) {
			
			var sFrame = Math.floor((r+1) / scan.rayCount * 50 + 50) * 4;
		
			var dist = scan.points[a][r].distance;

			sBufs[a].poke(1, sFrame, Math.pow(dist, 2));
			cBufs[a].poke(1, r, dist);

		}
	}
	
	outlet(0, "bang");
	
}

function buffertoscan() {
	
	for (var a = 0; a < scan.angles; a++) {
		for (var r = 0; r < scan.rayCount; r++) {
			newDist = rBufs[r].peek(1, a);
			scan.points[a][r].distance = newDist;
		}
	}
	
	scanDict.parse(JSON.stringify(scan));
}


function bufFill() {
	for (var buf in rBufs) {
		buf = rBufs[buf];
		var ampVal;
		for (var f = 0; f < 360; f++) {
			if (parseFloat(buf.peek(1, f)) == 0) {
				buf.poke(1, f, ampVal);
			} else { ampVal = parseFloat(buf.peek(1, f)) }
		}
	}
	outlet(0, "bang");
}
