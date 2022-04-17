
var scanCount = 0;
/*
An array that holds scanned 3D data
Per point: rotation, {x,y,z}, rayNum
*/
class Scan {
    constructor(data) {
        this.points2D = {}; //point data per angle per ray
        this.points2DGrid = []; //iterable point data per angle per ray

        if (data) {
            this.points2DGrid = data.points;
            this.angles = data.angles;
            this.rayCount = data.rayCount;

        } else this.points2DGrid = [];
        this.scanNum = scanCount; scanCount++;

        scanTimeline[this.scanNum] = this;
    }

    process() {

        for (var angle of Object.values(this.points2D)) {
            this.points2DGrid.push([])
            for (var ray of Object.values(angle)) {
                this.points2DGrid[this.points2DGrid.length-1].push(ray)
            }
        }
        this.angles = this.points2DGrid.length;
        this.rayCount = this.points2DGrid[0].length;

        var data = this.points2DGrid;

        for (var angle = 0; angle < data.length; angle++) {
            for (var ray = 0; ray < data[angle].length; ray++) {
                var angle2 = (angle+1)%data.length
                this.points2DGrid[angle2][ray].deltaDist = data[angle][ray].distance - data[angle2][ray].distance;
            }
        }
        console.log(this.points2DGrid)

        
    }

    send() {
        var scanObj = {
            points: this.points2DGrid,
            angles: this.angles,
            rayCount: this.rayCount,
        };
        rayWS.send(JSON.stringify(scanObj));
    }

    view() {

        //REWRITE THIS
        var vertices = [];
        for (var x = 0; x < this.angles; x++) {
            for (var y = 0; y < this.rayCount-1; y++) {
                var x1y1 = getCoords(this.points2DGrid[(x)%this.angles][y]);
                var x1y2 = getCoords(this.points2DGrid[(x)%this.angles][y+1]);
                var x2y1 = getCoords(this.points2DGrid[(x+1)%this.angles][y]);
                var x2y2 = getCoords(this.points2DGrid[(x+1)%this.angles][y+1]);
                
                vertices.push(x1y1.x, x1y1.y, x1y1.z); 
                vertices.push(x1y2.x, x1y2.y, x1y2.z);
                vertices.push(x2y1.x, x2y1.y, x2y1.z);
                vertices.push(x1y2.x, x1y2.y, x1y2.z);
                vertices.push(x2y1.x, x2y1.y, x2y1.z);
                vertices.push(x2y2.x, x2y2.y, x2y2.z);
            }
        }
        var geometry = new THREE.BufferGeometry(); //create geometry from vertices
        geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(vertices), 3));
        geometry.computeVertexNormals();

        document.getElementById("scannedobject").setAttribute("material", "side: double");
        document.getElementById("scannedobject").object3D.children[0].geometry = geometry;
        document.getElementById("scannedobject").object3D.children[0].geometry.needsUpdate = true;
        document.getElementById("scannedobject").object3D.scale.set(1,1,1);
        document.getElementById("scannedobject").object3D.position.set(0,0,0);
    }
    reset() {
        this.points2D = {};
        this.points2DGrid = [];
    }

    listButtons() {
        this.viewButton = document.createElement("button");
        this.viewButton.innerHTML = `View scan #${this.scanNum}`;

        this.sendButton = document.createElement("button");
        this.sendButton.innerHTML = `Send scan #${this.scanNum}`;

        document.getElementById("scanlist").appendChild(this.viewButton);
        document.getElementById("scanlist").appendChild(this.sendButton);

        var superthis = this; // (for use inside event listeners)
        this.viewButton.addEventListener("click", function () {
            superthis.view();
        });

        this.sendButton.addEventListener("click", function () {
            superthis.send();
        });
    }
}

//converts X/Y rotation + radius into (x,y,z)
// function getCoords(yaw, pitch, dist) {
//     var data = {
//         x: (dist * Math.cos(pitch*Math.PI/180) * Math.sin(yaw*Math.PI/180)).toFixed(4),
//         y: (dist * Math.sin(pitch*Math.PI/180)).toFixed(4) * -1,
//         z: (dist * Math.cos(pitch*Math.PI/180) * Math.cos(yaw*Math.PI/180)).toFixed(4),
//     }
//     return data;
// }

function normalizeScale(obj) {
    if (obj.normalized) {
        console.log("object has already been normalized!")
        return; 
    }//if obj has already been normalized

    var bounds = new THREE.Box3().setFromObject(obj.object3D);
    var maxScale = Math.max(
        bounds.max.x - bounds.min.y, 
        bounds.max.y - bounds.min.y, 
        bounds.max.z - bounds.min.z
    ); //get widest dimension
    obj.setAttribute('scale', `${Math.sqrt(2)/maxScale} ${Math.sqrt(2)/maxScale} ${Math.sqrt(2)/maxScale}`); 

    bounds = new THREE.Box3().setFromObject(obj.object3D); 
    var newCenter = bounds.getCenter(); //get new center of mass

    obj.setAttribute('position', `${-newCenter.x} ${-newCenter.y} ${-newCenter.z}`); //move to 0,0,0
    obj.normalized = true; 
}

let noiseOff = 10;
function makePerlinSphere() {

    var vertices = [];
    for (var yaw = -180; yaw < 180; yaw += 2) { //direction on XZ plane
        var yaw2 = (yaw+2+180)%360-180;

        for (var pitch = -90; pitch < 90; pitch += 1) { //angle on XY plane
            var pitch2 = (pitch+1+90)%180-90

            let r1a1 = getSpherical(yaw, pitch, noise(yaw/100+noiseOff, pitch/100+noiseOff));
            let r1a2 = getSpherical(yaw2, pitch, noise((yaw2)/100+noiseOff, pitch/100+noiseOff));
            let r2a1 = getSpherical(yaw, pitch2, noise(yaw/100+noiseOff, (pitch2)/100+noiseOff));
            let r2a2 = getSpherical(yaw2, pitch2, noise((yaw2)/100+noiseOff, (pitch2)/100+noiseOff));

            vertices.push(r1a1.x, r1a1.y, r1a1.z);
            vertices.push(r1a2.x, r1a2.y, r1a2.z);
            vertices.push(r2a1.x, r2a1.y, r2a1.z);

            vertices.push(r1a2.x, r1a2.y, r1a2.z);
            vertices.push(r2a1.x, r2a1.y, r2a1.z);
            vertices.push(r2a2.x, r2a2.y, r2a2.z);
        }
    }
    noiseOff += 3;

    let geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(vertices), 3));
    geometry.computeVertexNormals(true)
    document.getElementById("scannedobject").object3D.children[0].geometry = geometry;
    document.getElementById("scannedobject").object3D.children[0].geometry.needsUpdate = true;
    document.getElementById("scannedobject").object3D.scale.set(1,1,1);
    document.getElementById("scannedobject").object3D.position.set(0,0,0);
    document.getElementById("scannedobject").normalized = false;

}

function getSpherical(yaw, pitch, dist) {
    var data = {
        x: dist * Math.cos(yaw*Math.PI/180) * Math.sin(pitch*Math.PI/180),
        y: dist * Math.sin(yaw*Math.PI/180),
        z: dist * Math.cos(yaw*Math.PI/180) * Math.cos(pitch*Math.PI/180),
    }

    return data;
}