# Training Images

This directory contains photos from training sessions, workshops, and educational activities conducted by the Tanzania Physiotherapy Initiative.

## Image Specifications:

- **Format**: JPEG/JPG or PNG
- **Recommended Size**: 800x600 pixels or higher
- **Style**: Training sessions, workshops, hands-on learning, team collaboration
- **Content**: Team members and students engaged in physiotherapy training activities

## Current Images:

The following images are expected to be added:

1. **training_1.jpg** - Training session image 1
2. **training_2.jpg** - Training session image 2  
3. **training_3.jpg** - Training session image 3
4. **training_4.jpg** - Training session image 4
5. **training_5.jpg** - Training session image 5
6. **training_6.jpg** - Training session image 6
7. **training_7.jpg** - Training session image 7
8. **training_8.jpg** - Training session image 8

## Integration:

These images are displayed in the "Training in Action" section of the Approach page, showcasing real training activities that support the organization's programs and initiatives.

## Usage:

- Images are displayed in an interactive carousel/slider
- **Mobile devices**: Images fill the full width of the screen for optimal viewing
- **Desktop/Tablet**: Shows one image at a time with a preview of the next/previous image
- Users can swipe left/right (mobile) or click and drag (desktop) to browse through all training images
- Includes page indicators showing total number of images
- Each image has a fallback placeholder if loading fails
- Images are optimized for web and mobile viewing
- Smooth swipe gestures for easy navigation
- Responsive design adapts to different screen sizes

## Adding New Images:

1. Add your training images to this directory
2. Name them following the pattern: `training_X.jpg` (where X is the number)
3. Update the `trainingImages` array in `lib/features/approach/approach_page.dart` if you add more than 8 images
4. Run `flutter clean && flutter pub get` to refresh assets

Path format in code: `images/training/filename.ext` (without "assets/" prefix)
