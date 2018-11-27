var selectedMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, flatShading: true, name: 6 });
var badSelectedMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000, flatShading: true, name: 6 });



var matDiffuse = new THREE.TextureLoader().load( 'textures/metal1/Metal_Grill_001_COLOR.jpg' );
matDiffuse.repeat.set( 1, 2 );

var matDisplacement = new THREE.TextureLoader().load( 'textures/metal1/Metal_Grill_001_DISP.png' );
matDisplacement.repeat.set( 1, 2 );

var matNormal = new THREE.TextureLoader().load( 'textures/metal1/Metal_Grill_001_NORM.jpg' );
matNormal.repeat.set( 1, 2 );

var matRoughness = new THREE.TextureLoader().load( 'textures/metal1/Metal_Grill_001_ROUGH.jpg' );
matRoughness.repeat.set( 1, 2 );

var matOCC = new THREE.TextureLoader().load( 'textures/metal1/Metal_Grill_001_OCC.jpg' );
matOCC.repeat.set( 1, 2 );

var matMask = new THREE.TextureLoader().load( 'textures/metal1/Metal_Grill_001_MASK.jpg' );
matMask.repeat.set( 1, 2 );

var matMaterial = new THREE.MeshStandardMaterial( {color: 'red', map: matDiffuse } );
matMaterial.transparent = true;
matMaterial.normalMap = matNormal;
matMaterial.roughnessMap = matRoughness;
matMaterial.aoMap = matOCC;

var matMaterial2 = new THREE.MeshStandardMaterial( {color: 'darkgreen', map: matDiffuse } );
matMaterial2.transparent = true;
matMaterial2.normalMap = matNormal;
matMaterial2.roughnessMap = matRoughness;
matMaterial2.aoMap = matOCC;

var matMaterial3 = new THREE.MeshStandardMaterial( {color: 'blue', map: matDiffuse } );
matMaterial3.transparent = true;
matMaterial3.normalMap = matNormal;
matMaterial3.roughnessMap = matRoughness;
matMaterial3.aoMap = matOCC;

var matMaterial4 = new THREE.MeshStandardMaterial( {color: 'gold', map: matDiffuse } );
matMaterial4.transparent = true;
matMaterial4.normalMap = matNormal;
matMaterial4.roughnessMap = matRoughness;
matMaterial4.aoMap = matOCC;

var matMaterial5 = new THREE.MeshStandardMaterial( {color: 'aqua', map: matDiffuse } );
matMaterial5.transparent = true;
matMaterial5.normalMap = matNormal;
matMaterial5.roughnessMap = matRoughness;
matMaterial5.aoMap = matOCC;

var matMaterial6 = new THREE.MeshStandardMaterial( {color: 'lime', map: matDiffuse } );
matMaterial6.transparent = true;
matMaterial6.normalMap = matNormal;
matMaterial6.roughnessMap = matRoughness;
matMaterial6.aoMap = matOCC;

var matMaterial7 = new THREE.MeshStandardMaterial( {color: 'silver', map: matDiffuse } );
matMaterial7.transparent = true;
matMaterial7.normalMap = matNormal;
matMaterial7.roughnessMap = matRoughness;
matMaterial7.aoMap = matOCC;

var matMaterial8 = new THREE.MeshStandardMaterial( {color: 'magenta', map: matDiffuse } );
matMaterial8.transparent = true;
matMaterial8.normalMap = matNormal;
matMaterial8.roughnessMap = matRoughness;
matMaterial8.aoMap = matOCC;

var matMaterial9 = new THREE.MeshStandardMaterial( {color: 'black', map: matDiffuse } );
matMaterial9.transparent = true;
matMaterial9.normalMap = matNormal;
matMaterial9.roughnessMap = matRoughness;
matMaterial9.aoMap = matOCC;


const materials = [
    matMaterial,
    matMaterial2,
    matMaterial3,
    matMaterial4,
    matMaterial5,
    matMaterial6,
    matMaterial7,
    matMaterial8,
    matMaterial9,

new THREE.MeshStandardMaterial({ color: 0xff0000, flatShading: true, name: 0 }),
new THREE.MeshStandardMaterial({ color: 0x00ff00, flatShading: true, name: 1 }),
new THREE.MeshStandardMaterial({ color: 0x0000ff, flatShading: true, name: 2 }),
new THREE.MeshStandardMaterial({ color: 0x00ffff, flatShading: true, name: 3 }),
new THREE.MeshStandardMaterial({ color: 0xffff00, flatShading: true, name: 4 }),
new THREE.MeshStandardMaterial({ color: 0xff00ff, flatShading: true, name: 5 }),
new THREE.MeshStandardMaterial({ color: 0x99ff00, flatShading: true, name: 6 }),
new THREE.MeshStandardMaterial({ color: 0x0099ff, flatShading: true, name: 7 }),
new THREE.MeshStandardMaterial({ color: 0xff0099, flatShading: true, name: 8 }),
new THREE.MeshStandardMaterial({ color: 0x9900b0, flatShading: true, name: 9 })
];
