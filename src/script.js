import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Timer } from 'three/addons/misc/Timer.js'
import GUI from 'lil-gui'

/**
 * Base
 */
// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()


//texture
const textureloader=new THREE.TextureLoader()
//floor
const flooralphatexture= textureloader.load('./floor/alpha.jpg')
const floorcolortexture= textureloader.load('./floor/concrete_pavers_1k/concrete_pavers_diff_1k.jpg')
const floorarmtexture= textureloader.load('./floor/concrete_pavers_1k/concrete_pavers_arm_1k.jpg')
const floornormaltexture= textureloader.load('./floor/concrete_pavers_1k/concrete_pavers_nor_gl_1k.jpg')
const floordisplacementtexture= textureloader.load('./floor/concrete_pavers_1k/concrete_pavers_disp_1k.jpg')

//wall
const wallcolortexture= textureloader.load('./wall/rock_wall_08_1k/rock_wall_08_diff_1k.jpg')
const wallarmtexture= textureloader.load('./wall/rock_wall_08_1k/rock_wall_08_arm_1k.jpg')
const wallnormaltexture= textureloader.load('./wall/rock_wall_08_1k/rock_wall_08_nor_gl_1k.jpg')


//roof
const roofcolortexture= textureloader.load('./roof/roof_slates_02_1k/roof_slates_02_diff_1k.jpg')
const roofarmtexture= textureloader.load('./roof/roof_slates_02_1k/roof_slates_02_arm_1k.jpg')
const roofnormaltexture= textureloader.load('./roof/roof_slates_02_1k/roof_slates_02_nor_gl_1k.jpg')

//bush
const bushcolortexture= textureloader.load('./bush/leaves_forest_ground_1k/leaves_forest_ground_diff_1k.jpg')
const busharmtexture= textureloader.load('./bush/leaves_forest_ground_1k/leaves_forest_ground_arm_1k.jpg')
const bushnormaltexture= textureloader.load('./bush/leaves_forest_ground_1k/leaves_forest_ground_nor_gl_1k.jpg')

//grave
const gravecolortexture= textureloader.load('./grave/plastered_stone_wall_1k/plastered_stone_wall_diff_1k.jpg')
const gravearmtexture= textureloader.load('./grave/plastered_stone_wall_1k/plastered_stone_wall_arm_1k.jpg')
const gravenormaltexture= textureloader.load('./grave/plastered_stone_wall_1k/plastered_stone_wall_nor_gl_1k.jpg')

//door
const doorColorTexture = textureloader.load('./door/color.jpg')
const doorAlphaTexture = textureloader.load('./door/alpha.jpg')
const doorAmbientOcclusionTexture = textureloader.load('./door/ambientOcclusion.jpg')
const doorHeightTexture = textureloader.load('./door/height.jpg')
const doorNormalTexture = textureloader.load('./door/normal.jpg')
const doorMetalnessTexture = textureloader.load('./door/metalness.jpg')
const doorRoughnessTexture = textureloader.load('./door/roughness.jpg')

doorColorTexture.colorSpace = THREE.SRGBColorSpace
//fixing texture color
floorcolortexture.colorSpace=THREE.SRGBColorSpace
wallcolortexture.colorSpace=THREE.SRGBColorSpace
roofcolortexture.colorSpace=THREE.SRGBColorSpace
bushcolortexture.colorSpace=THREE.SRGBColorSpace
gravecolortexture.colorSpace=THREE.SRGBColorSpace
//roof
roofarmtexture.repeat.set(3,1)
roofcolortexture.repeat.set(3,1)
roofnormaltexture.repeat.set(3,1)

roofarmtexture.wrapS=THREE.RepeatWrapping
roofcolortexture.wrapS=THREE.RepeatWrapping
roofnormaltexture.wrapS=THREE.RepeatWrapping

//grave
gravearmtexture.repeat.set(0.3,0.4)
gravecolortexture.repeat.set(0.3,0.4)
gravenormaltexture.repeat.set(0.3,0.4)

//bush
busharmtexture.repeat.set(2,1)
bushcolortexture.repeat.set(2,1)
bushnormaltexture.repeat.set(2,1)

busharmtexture.wrapS=THREE.RepeatWrapping
bushcolortexture.wrapS=THREE.RepeatWrapping
bushnormaltexture.wrapS=THREE.RepeatWrapping
//for scale we repeat the texture making it small (floor)
floorcolortexture.repeat.set(6,6)
floorcolortexture.wrapS= THREE.RepeatWrapping
floorcolortexture.wrapT= THREE.RepeatWrapping

floorarmtexture.repeat.set(6,6)
floorarmtexture.wrapS= THREE.RepeatWrapping
floorarmtexture.wrapT= THREE.RepeatWrapping

floornormaltexture.repeat.set(6,6)
floornormaltexture.wrapS= THREE.RepeatWrapping
floornormaltexture.wrapT= THREE.RepeatWrapping

floordisplacementtexture.repeat.set(6,6)
floordisplacementtexture.wrapS= THREE.RepeatWrapping
floordisplacementtexture.wrapT= THREE.RepeatWrapping

/**
 * House
 */
// Temporary sphere
// const sphere = new THREE.Mesh(
//     new THREE.SphereGeometry(1, 32, 32),
//     new THREE.MeshStandardMaterial({ roughness: 0.7 })
// )
// scene.add(sphere)
//floor
const floor =new THREE.Mesh(
    new THREE.PlaneGeometry(20,20,100,100),
    new THREE.MeshStandardMaterial({
        alphaMap:flooralphatexture,
        transparent:true,
        map:floorcolortexture,
        aoMap:floorarmtexture,
        roughnessMap:floorarmtexture,
        metalnessMap:floorarmtexture,
        normalMap:floornormaltexture,
        displacementMap:floordisplacementtexture,
        displacementScale:0.1, //this two are not needed for now (as we are using tile)
        displacementBias:-0.1
    
    })
)

gui.add(floor.material, 'displacementScale').min(0).max(1).step(0.001).name('floorDisplacementScale')
gui.add(floor.material, 'displacementBias').min(-1).max(1).step(0.001).name('floorDisplacementBias')
floor.rotation.x= - Math.PI * 0.5
scene.add(floor)

//house group
const house =new THREE.Group()
scene.add(house)
//wall
const walls=new THREE.Mesh(
    new THREE.BoxGeometry(4,2.5,4),//width,height,depth
    new THREE.MeshStandardMaterial({
        map:wallcolortexture,
        aoMap:wallarmtexture,
        roughnessMap:wallarmtexture,
        metalnessMap:wallarmtexture,
        normalMap:wallnormaltexture,
    })
)
walls.position.y += 1.25 // as 2.5/2 is 1.25
house.add(walls)

const roof= new THREE.Mesh(
    new THREE.ConeGeometry(3.5,1.5,4),
    new THREE.MeshStandardMaterial({
        map:roofcolortexture,
        aoMap:roofarmtexture,
        roughnessMap:roofarmtexture,
        metalnessMap:roofarmtexture,
        normalMap:roofnormaltexture
        
    })
)
roof.position.y += 2.5+0.75 //we added 0.75 as it the height (1.5)/2 the mid point is at center of the cone
roof.rotation.y = Math.PI * 0.25
house.add(roof)

//door
const door=new THREE.Mesh (
    new THREE.PlaneGeometry(2.2,2.2,100,100),
    new THREE.MeshStandardMaterial({
        map: doorColorTexture,
        transparent: true,
        alphaMap: doorAlphaTexture,
        aoMap: doorAmbientOcclusionTexture,
        displacementMap: doorHeightTexture,
        normalMap: doorNormalTexture,
        metalnessMap: doorMetalnessTexture,
        roughnessMap: doorRoughnessTexture,
        displacementScale: 0.15,
        displacementBias: -0.04,
    })
)
door.position.y=1
door.position.z=2 +0.01
house.add(door)

//bushes
const bushGeometry=new THREE.SphereGeometry(1,16,16)
const bushMaterial=new THREE.MeshStandardMaterial({
    color:"#ccffcc",
    map:bushcolortexture,
    aoMap:busharmtexture,
    roughnessMap:busharmtexture,
    metalnessMap:busharmtexture,
    normalMap:bushnormaltexture,
})
const bush1=new THREE.Mesh(bushGeometry,bushMaterial)
bush1.scale.set(0.5,0.5,0.5) //we can us setscalar here
bush1.position.set(0.8,0.2,2.2)
bush1.rotation.x=-0.75

const bush2=new THREE.Mesh(bushGeometry,bushMaterial)
bush2.scale.setScalar(0.25) //we can us setscalar here
bush2.position.set(1.4,0.1,2.1)
bush2.rotation.x=-0.75

const bush3=new THREE.Mesh(bushGeometry,bushMaterial)
bush3.scale.set(0.4,0.4,0.4) //we can us setscalar here
bush3.position.set(-0.8,0.1,2.2)
bush3.rotation.x=-0.75

const bush4=new THREE.Mesh(bushGeometry,bushMaterial)
bush4.scale.set(0.15,0.15,0.15) //we can us setscalar here
bush4.position.set(-1,0.05,2.6)
bush4.rotation.x=-0.75

house.add(bush1,bush2,bush3,bush4)

//grave
const graveGeomtry=new THREE.BoxGeometry(0.6,0.8,0.2)
const graveMaterials= new THREE.MeshStandardMaterial({
    map:gravecolortexture,
    aoMap:gravearmtexture,
    roughnessMap:gravearmtexture,
    metalnessMap:gravearmtexture,
    normalMap:gravenormaltexture,
})



const graves=new THREE.Group()
scene.add(graves)

for(let i=0;i<30;i++)
    {
        const radius=3 + Math.random()*4
        const angle=Math.random() * Math.PI *2
        const x=Math.sin(angle) * radius
        const z=Math.cos(angle) * radius
        const grave=new THREE.Mesh(graveGeomtry,graveMaterials)
        grave.position.x=x
        grave.position.y= Math.random() * 0.4
        grave.position.z=z

        //for rotation
        grave.rotation.x= (Math.random() - 0.5) * 0.4
        grave.rotation.y= (Math.random() - 0.5) * 0.4
        grave.rotation.z= (Math.random() - 0.5) * 0.4
        graves.add(grave)
    }



/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#ffffff', 0.5)
scene.add(ambientLight)

// Directional light
const directionalLight = new THREE.DirectionalLight('#ffffff', 1.5)
directionalLight.position.set(3, 2, -8)
scene.add(directionalLight)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 4
camera.position.y = 2
camera.position.z = 5
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const timer = new Timer()

const tick = () =>
{
    // Timer
    timer.update()
    const elapsedTime = timer.getElapsed()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()