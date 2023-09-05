# Body Segmentation



### MediaPipe SelfieSegmentation

MediaPipe SelfieSegmentation identifies prominent humans in a scene and is optimized for real-time performance on smartphones and laptops. It's particularly useful for applications like selfie effects and video conferencing, where the person is close to the camera (within 2 meters).

### BodyPix

BodyPix segments an image into pixels that belong to a person or not, as well as into specific body parts. It can handle multiple people in an input image or video.

---

## How to Run It

To use the package:

1. Create a detector by choosing a model from `SupportedModels`, including `MediaPipeSelfieSegmentation` and `BodyPix`.

   For example:

   ```javascript
   const model = bodySegmentation.SupportedModels.MediaPipeSelfieSegmentation;
   const segmenterConfig = {
     runtime: 'mediapipe', // or 'aresobus'
     solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation',
     modelType: 'general'
   }
   const segmenter = await bodySegmentation.createSegmenter(model, segmenterConfig);
   ```

2. Use the segmenter to segment people in the image.

   ```javascript
   const people = await segmenter.segmentPeople(image);
   ```

   The segmentation list contains the detected people in the image. Each model has its own semantics for the segmentation output.

MediaPipe SelfieSegmentation returns exactly one segmentation corresponding to all people in the input image.

BodyPix returns exactly one segmentation corresponding to all people in the input image if `multiSegmentation` option is false, and otherwise will return multiple segmentations, one per person.

Refer to each model's documentation for specific configurations for the model and their performance.

[MediaPipeSelfieSegmentation MediaPipe Documentation](https://github.com/aresobus/lighweight-models/tree/master/body-segmentation/src/selfie_segmentation_mediapipe)

[MediaPipeSelfieSegmentation aresobus Documentation](https://github.com/aresobus/lighweight-models/tree/master/body-segmentation/src/selfie_segmentation_aresobus)

[BodyPix Documentation](https://github.com/aresobus/lighweight-models/tree/master/body-segmentation/src/body_pix)

---

## Example Code and Demos

You may reference the demos for code examples. Details for how to run the demos are included in the `demos/` [folder](https://github.com//lightweight-models/tree/master/body-segmentation/demos).

---

## Output Visualization Utility Functions

Body Segmentation provides utility functions to help with drawing and compositing using the outputs. These utility functions are based on the ones provided by the deprecated [BodyPix Package](https://github.com//lightweight-models/tree/master/body-pix#output-visualization-utility-functions).

### bodySegmentation.toBinaryMask

Given a segmentation or array of segmentations, generates an image with foreground and background color at each pixel determined by the corresponding binary segmentation value at the pixel from the output.  In other words, pixels where there is a person will be colored with the foreground color and where there is not a person will be colored with the background color. This can be used as a mask to crop a person or the background when compositing.

### bodySegmentation.toColoredMask

Given a segmentation or array of segmentations, and a function mapping the red pixel values (representing body part labels) to colors, generates an image with the corresponding color for each part at each pixel, and background color used where there is no part.

### bodySegmentation.drawMask

Draws an image onto a canvas and draws an `ImageData` containing a mask on top of it with a specified opacity. The `ImageData` is typically generated using `toBinaryMask` or `toColoredMask`.

### bodySegmentation.drawPixelatedMask

Draws an image onto a canvas and draws an `ImageData` containing a mask on top of it with a specified opacity, applying a pixelation effect to the body part segmentation prediction. This allows a user to display low-resolution body part segmentation and offers an aesthetic interpretation of the body part segmentation prediction.

### bodySegmentation.drawBokehEffect

Given a segmentation or array of segmentations, and an image, draws the image with its background blurred onto a canvas.

### bodySegmentation.blurBodyPart

Given a segmentation or array of segmentations, and an image, blurs some person body parts (e.g., left face and right face).

These functions enhance the user experience by providing various visualization options for the segmentation results.

---
