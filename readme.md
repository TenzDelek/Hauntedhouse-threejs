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