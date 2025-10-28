# 3D Model Integration Guide

## How to Add Custom 3D Models to Your Portfolio

### ✅ Current Status
- **Sphere removed completely** - No more ball!
- **Multiple model support** - Add as many models as you want
- **Geometric shapes fallback** - Shows animated shapes when no custom models are loaded
- **Easy customization** - Each model can have different scale, position, and rotation

### Step 1: Get a 3D Model

**Best Sources for Free Models:**
1. **Sketchfab** (https://sketchfab.com) - Huge collection, many free models
2. **Poly Haven** (https://polyhaven.com) - High-quality free models
3. **Mixamo** (https://mixamo.com) - Character models and animations
4. **Free3D** (https://free3d.com) - Various free models
5. **TurboSquid** (https://turbosquid.com) - Mix of free and paid

**Recommended File Formats:**
- **GLTF/GLB** (best for web) - Most optimized
- **FBX** - Good for animations
- **OBJ** - Simple geometry

### Step 2: Add Your Model to the Project

1. **Download your model** (preferably in GLB format)
2. **Place it in the models folder:**
   ```
   public/models/your-model-name.glb
   ```
3. **Update the ModelScene component in Hero.tsx:**
   ```tsx
   // Change this line to enable custom models:
   setHasCustomModels(true);

   // Then add your models:
   <CustomModel
     modelPath="/models/your-model-name.glb"
     scale={[2, 2, 2]}
     position={[0, 0, 0]}
   />
   ```

### Step 3: Enable Custom Models

To switch from geometric shapes to your custom models, edit the `ModelScene` component in `Hero.tsx`:

```tsx
// Change this line from false to true:
setHasCustomModels(true);
```

### Step 4: Add Multiple Models

You can add multiple models with different properties:

```tsx
{hasCustomModels ? (
  <>
    {/* Main character/model */}
    <CustomModel
      modelPath="/models/character.glb"
      scale={[2, 2, 2]}
      position={[0, 0, 0]}
    />

    {/* Floating objects */}
    <CustomModel
      modelPath="/models/floating-object.glb"
      scale={[0.8, 0.8, 0.8]}
      position={[2, 1, 0]}
    />

    {/* Background elements */}
    <CustomModel
      modelPath="/models/background.glb"
      scale={[0.5, 0.5, 0.5]}
      position={[-2, -1, -1]}
    />
  </>
) : (
  <AnimatedShapes />
)}
```

### Step 5: Model Optimization Tips

**For Best Performance:**
- Keep file size under 5MB
- Use GLB format (binary GLTF)
- Optimize textures (512x512 or smaller)
- Reduce polygon count if possible

**Online Optimization Tools:**
- **glTF Pipeline** (https://github.com/CesiumGS/gltf-pipeline)
- **Blender** (free 3D software for optimization)
- **Sketchfab** (has optimization features)

### Step 4: Customize Model Behavior

You can modify the model behavior in `Hero.tsx`:

**Scale:** Change the scale array `[2, 2, 2]` to make it bigger/smaller
**Animation:** Modify the `useFrame` function for different movements
**Lighting:** Adjust `ambientLight` and `directionalLight` intensity

### Example Model Suggestions

**Tech/Programming Related:**
- Laptop/Computer models
- Code symbols (brackets, semicolons)
- Abstract geometric shapes
- Circuit boards
- Robot characters

**Creative/Artistic:**
- Abstract sculptures
- Geometric patterns
- Character avatars
- Architectural elements

### Troubleshooting

**Model not loading?**
- Check file path is correct
- Ensure file is in `public/models/` folder
- Verify file format is supported (GLB/GLTF recommended)
- Check browser console for errors

**Model too big/small?**
- Adjust the scale array: `scale={[1, 1, 1]}` for smaller, `scale={[3, 3, 3]}` for bigger

**Performance issues?**
- Reduce model complexity
- Optimize textures
- Use smaller file sizes

### Current Setup

The portfolio is currently configured to:
- Try loading a custom model from `/models/your-model.glb`
- Fall back to the animated sphere if the model fails to load
- Apply mouse-responsive animations to whatever model loads
- Auto-rotate the model slowly

Replace `your-model.glb` with your actual model filename!
