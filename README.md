# Sonic-Abstractions-and-Representations
A process of temporary translation from 3D shape data to a sonic wavetable, proposing an alternative definition of sound which is both strictly representational and artificial.

Created for ITP 2022 Thesis.

## Introduction
  The “sound” of an object has traditionally been defined by the wave that results from a vibration through its physical body. When defined in this way, however, sound is not intrinsic to the object in question; it’s affected by a multitude of additional external parameters, most significantly those concerning the cause of the vibration. Of the infinite sounds a drum can produce, when struck with various objects at various points and velocities, none can be considered intrinsic to the drum itself. _Sonic Abstractions and Representations_ seeks to establish an alternative definition of sound which, though not produced by the object naturally, is a product solely of its own physical features. This is accomplished through a process which translates 3D points along the object’s surface to samples in an audible wavetable. The process considers only shape as a parameter; other features such as texture, color, weight and density are not considered.
	Additionally, _Sonic Abstractions_ offers the inverse of the process described above: the sonic data representing an object can be returned to its initial physical form. Between the initial transformation and the subsequent inverse, the object in its sonic form can be subjected to any number of previously non-applicable audio filters and effects. For example, an echo can be applied to a tetrahedron, the low frequencies can be filtered out of a cube. Every sound filter results in a corresponding visual transformation in the re-created physical form: the tetrahedron now has additional edges, the corners of the cube are now round.
  Sonic Abstractions is the latest step in a fascination with representing objects in formats in which they don’t naturally exist. Its predecessor, [_The Contour Synthesizer_](https://github.com/yonatanrozin/a-contour-synthesizer), used an array of sensors to encode the upper edge of a 2D object in a repeating waveform. Smoother objects subsequently created smoother timbres while objects with jagged edges created harsher ones. In both this project and the previous, the produced sounds serve both as representations and as abstractions: they are strictly intrinsic but informed only by a limited selection of physical properties. 
  
  A virtual 3D model is scanned in 360 degrees by up to 50 rays. The points of intersection from each ray per angle are graphed on a 2D coordinate plane, creating a series of up to 360 graphs which can be routed as waveforms through a speaker at high frequencies to create an audible sound, whose timbre is directly informed by the contours of the object.
  
## Software
- Browser interface 
  - [THREE.js](https://threejs.org/) and [A-frame](https://aframe.io/) virtual 3D environment
  - [P5.js](https://p5js.org/) 2D canvas
- [Max/MSP](https://cycling74.com/products/max) synthesizer patch
  - WebSocket Node.js for Max script 
