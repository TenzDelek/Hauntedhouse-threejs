# Note
1. z-fighting
- happens when two object are at the same spot, the gpu doesnt know which
one to is at front resulting in face colliding effect
- sol - haha just add 0.01 to one plane that you want front
2. Math.pi
- most of the angles are i think are using Math.pi

3. Group
- when you want to move or scale many same thing, like here the house have a door and wall and all so we need to move it all at once, here the group comes in picture (easier in react three fiber)

4. scale
- for all at once we can use .set
- if all x,y,z are same use .setScalar

5. to apply alpha 
- use transparent as true

# texture:
- AO (ambient occlusion): Prevents the ambient light being applied to crevices
- Diffuse: The actual color
- Displacement: Will move the vertices up and down to create elevations
- Normal: Will fake the orientation to create details. DX and GL are different ways of orienting the normals and we need to go for GL.
- Rough: How smooth or rough the material is
- Bump: Like the normal map, but it’s a grayscale value (we don’t need it)
- Metal: Defines the metallic parts (we need this one if available)

# photo format
- EXR : large file size
- PNG : Medium file size with no compression artefacts
- JPG : small size with potentials compression
artefacts

# normally
- we use jpg for all texture except for normal where we use png as it carries more data

# to check whether the correct texture is loaded 
- press f12
- go to network tab and disable cache
- click on img and reload 
check whether image are there by seeing preview