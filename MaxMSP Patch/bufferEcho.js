var spectrums = new PolyBuffer("spectrums");

function echo(samps) {
	
	
	
}


/*

function echo(msg) {
	
	var polyBuf = new PolyBuffer(msg);
	
	for (var b in polyBuf.getshortname()) {
		
		var buf = new Buffer(polyBuf.getshortname()[b])
	
		for (var f1 = 0; f1 < buf.framecount(); f1++) {
			var f2 = (f1+20)%buf.framecount();
			
			var peek1 = buf.peek(1, f1);
			var peek2 = buf.peek(1, f2);
			
			var newVal = peek2 + peek1/2;
			
			buf.poke(1, f2, newVal);
			
		}
	}
}

function gain(msg) {
	
	var polyBuf = new PolyBuffer(msg);
	
	for (var b in polyBuf.getshortname()) {
		
		var buf = new Buffer(polyBuf.getshortname()[b])
	
		for (var f1 = 0; f1 < buf.framecount(); f1++) {
			
			var peek1 = buf.peek(1, f1);
			post(peek1)
			buf.poke(1, f1, peek1 * mag);
			
			peek1 = buf.peek(1, f1);
			post(peek1, "\n")
			
		}
	}
}

function lowpass(msg) {
	var polyBuf = new PolyBuffer(msg);
	
	for (var b in polyBuf.getshortname()) {
		
		var buf = new Buffer(polyBuf.getshortname()[b])
		
		var amp = 0;
	
		for (var f1 = 0; f1 < buf.framecount()+10; f1++) {
			var peek1 = buf.peek(1, f1%buf.framecount());
			
			amp = amp*.9 + peek1*.1

			buf.poke(1, f1, amp);
			
			peek1 = buf.peek(1, f1);
			
		}
	}
}

*/
