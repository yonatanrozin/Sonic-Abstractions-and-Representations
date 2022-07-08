# Sonic-Abstractions-and-Representations
A process of temporary translation from 3D shape data to a sonic wavetable, proposing an alternative definition of sound which is both strictly representational and artificial. Demonstration and process videos coming soon!

Created for ITP 2022 Thesis. A video of the final thesis presentation can be found [here](https://vimeo.com/715864777).

## Introduction
  The “sound” of an object has traditionally been defined by the wave that results from a vibration through its physical body. When defined in this way, however, sound is not intrinsic to the object in question; it’s affected by a multitude of additional external parameters, most significantly those concerning the cause of the vibration. Of the infinite sounds a drum can produce, when struck with various objects at various points and velocities, none can be considered intrinsic to the drum itself. _Sonic Abstractions and Representations_ seeks to establish an alternative, more intrinsic definition of sound which, though not produced by the object naturally, is a product solely of its own physical features. This is accomplished through a web interface which translates 3D points along the object’s surface to samples in a sonic wavetable.
  
    A virtual 3D model is intersected by a vertical stack of up to 30 rays (lasers). These rays can measure the distance between their starting point and the point of intersection with the object. The distance of each ray is graphed over time as the object makes a single 360-degree spin, resulting in a wavetable with a number of waves equal to the number of rays used. With the help of Max/MSP, each wave is repeated at audio frequencies (between 30Hz and 20kHz) through a speaker to produce an oscillating sound as the software cycles back and forth between the various waves in the wavetable.
  
  Additionally, _Sonic Abstractions_ offers the inverse of the process described above: the sonic data representing an object can be returned to its initial physical form. Between the initial transformation and the subsequent inverse, the object in its sonic form can be subjected to any number of previously non-applicable audio filters and effects. For example, an echo can be applied to a tetrahedron, the low frequencies can be filtered out of a cube. Every sound filter results in a corresponding visual transformation in the re-created physical form: the tetrahedron now has additional edges, the corners of the cube are now round.
  
  Though a novel application, the concept behind it is in fact rather ubiquitous. We convert objects, ideas of objects and phenomenons back and forth into various forms all the time. Microphones convert audible sound into analog electrical signals, which we can manipulate and transmit at will. Speakers convert those signals back into the original format to be heard. Just as electrical signals are an analog of sound, _Sonic Abstractions_ presents the idea of sound as an analog of shape. We're not making sound using an object, we're just translating the object data into the same format used by digital sounds and back.
  
  _Sonic Abstractions_ is the latest step in a fascination with representing objects in formats in which they don’t naturally exist. Its predecessor, [_The Contour Synthesizer_](https://github.com/yonatanrozin/a-contour-synthesizer), used an array of sensors to encode the upper contour of a 2D object in a repeating waveform. Smoother objects subsequently created smoother timbres while objects with jagged edges created harsher ones. In both this project and the previous, the produced sounds serve both as representations and as abstractions: they are strictly intrinsic but informed only by a limited selection of physical properties. 
  
## Software
- Browser interface 
  - [THREE.js](https://threejs.org/) and [A-frame](https://aframe.io/) virtual 3D environment
  - [P5.js](https://p5js.org/) 2D canvas
- [Max/MSP](https://cycling74.com/products/max) synthesizer patch
  - WebSocket Node.js for Max script 

## Special Thanks
- To my thesis advisor [Sharon Lee De La Cruz](https://www.sharonleedelacruz.com/) for her endless inspiration and guidance!
- To [Luisa Pereira](https://www.luisapereira.net/), [Luke DuBois](https://www.lukedubois.com/) and [Billy Bennett](https://billybennett.tv/) for fueling and guiding my interest in synthesized sounds!
