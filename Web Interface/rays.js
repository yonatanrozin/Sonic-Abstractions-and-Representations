var rayscanner;

AFRAME.registerComponent("rayscanner", {  

    rays : [],
    scan : new Scan(),

    schema: {
        target: {type: "string", default: "scannedobject"}, //id of object to be scanned
    },

    init: function() {
        rayscanner = this;
        this.target = document.getElementById(this.data.target);

        this.target.setAttribute("animation", "autoplay: false; property: rotation; from: 0 0 0; to: 0 360 0; easing: linear; dur: 5000");

        var this1 = this; //to represent "this" inside event listener 
        this1.target.addEventListener('animationcomplete', function() {
            this1.scanComplete(); 
        });
    },
    
    setRays(count) {
        this.rays = []; this.el.innerHTML = ""; //remove existing rays
        for (var r = 0; r < count; r++) {
            this.rays[r] = document.createElement("a-entity");
            this.rays[r].object3D.position.set(2, 0, 0);
            this.rays[r].rayNum = r;

            //add min and max scanning height to map()?
            this.rays[r].setAttribute("raycaster", `showLine: true; objects: .scanned; origin: 0 ${map(r, 0, count-1, -.999, .999)} 0; direction: -1 0 0; far: 5; interval: 0`);
            this.el.appendChild(this.rays[r]);
        }
    },

    tick: function() { //called every frame
        if (this.target.components.animation.animation.paused) { return; };
        background(0);

        for (ray of this.rays) { //get intersection data from each ray (if there is any)
            var intersection = ray.components.raycaster.getIntersection(this.target);
            if (intersection) {
                this.angle = parseInt(this.target.getAttribute('rotation').y.toFixed(0));
                var pointData = {
                    point : intersection.point,
                    distance : 2-intersection.distance,
                    rayNum : ray.rayNum,
                    angle : this.angle,
                };

                var pointX = map(pointData.rayNum, 0, this.rays.length, 0, width);
                var pointY = height/2 - pointData.distance*width/2;
                strokeWeight(5);
                stroke(255);
                point(pointX, pointY);

                if (!this.scan.points2D[pointData.angle]) { this.scan.points2D[pointData.angle] = {} };
                this.scan.points2D[pointData.angle][pointData.rayNum] = pointData;

                // var newShape = document.createElement("a-box");
                // newShape.object3D.position.set(pointData.point.x, pointData.point.y, pointData.point.z);
                // newShape.object3D.scale.set(.1, .1, .1);
                // var greyVal = Math.floor(map(pointData.angle, 0, 360, 0, 16))
                // greyVal = "#" + greyVal.toString(16)+greyVal.toString(16)+greyVal.toString(16)
                // newShape.setAttribute("material", `color: ${greyVal}`);
                // document.getElementById('scene').appendChild(newShape);

            } 
        }

    },

   

    beginScan: function() {
        if (this.rays.length == 0) {
            console.log("ray setup required.");
            return;
        }
        this.scan.reset();
        this.target.components.animation.animation.restart();
    },

    scanComplete: function() {

        this.scan.process();
        this.scan.listButtons();

        this.scan = new Scan();
    }
});

function getCoords(data) {
    
    // var data = {
    //     x: dist * Math.cos(yaw*Math.PI/180) * Math.sin(pitch*Math.PI/180),
    //     y: dist * Math.sin(yaw*Math.PI/180),
    //     z: dist * Math.cos(yaw*Math.PI/180) * Math.cos(pitch*Math.PI/180),
    // }

    // return data;

    var newX = data.distance * Math.cos(data.angle * Math.PI/180);
    var newY = -data.point.y;
    var newZ = data.distance * Math.sin(data.angle * Math.PI/180);

    return {x: newX, y: newY, z: newZ};
}