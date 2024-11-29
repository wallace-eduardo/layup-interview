# How to run

Just run index.html on any modern browser. Use the WASD keys to adjust speed and yaw.

### 1. HTML Structure:

* The `<canvas>` element provides a drawing area for the simulation.

* Input fields allow users to change the yaw (direction) and speed of the airplane dynamically.

### 2. JavaScript Logic:

* `updateAirplane()` updates the airplane's position based on its speed and yaw.
* `draw()` handles the rendering of the airplane and its trail.
* The airplane is represented as a triangle, and its trail is drawn as a series of connected line segments.

### 3. Trail Effect:

* The airplane's positions are stored in an array (trail), and older points are removed to limit the trail's length.

* "Unfortunately, the removal of the older points is quite inefficient; it is a linear operation (using array shift). An optimization would be to use a structure that supports efficient appending to the end and removal from the start, such as a linked list.

* Wrapping would cause a visual glitch with the trail causing a line being drawn from the wrapping point, we skip line points that are over 100 pixels in distance

### 4. Boundary Handling:

* The airplane wraps around the canvas when it goes out of bounds.


Unrelated: The CSS took longer than expected

The PNG for the paper airplane in the assets folder comes from kenney assests: https://kenney.nl/assets
