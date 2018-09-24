var matDiffuse = new THREE.TextureLoader().load( 'textures/metal1/Metal_Grill_001_COLOR.jpg' );
matDiffuse.repeat.set( .8, .5 );

var matDisplacement = new THREE.TextureLoader().load( 'textures/metal1/Metal_Grill_001_DISP.png' );
matDisplacement.repeat.set( .8, .5 );

var matNormal = new THREE.TextureLoader().load( 'textures/metal1/Metal_Grill_001_NORM.jpg' );
matNormal.repeat.set( .8, .5 );

var matRoughness = new THREE.TextureLoader().load( 'textures/metal1/Metal_Grill_001_ROUGH.jpg' );
matRoughness.repeat.set( .8, .5 );

var matOCC = new THREE.TextureLoader().load( 'textures/metal1/Metal_Grill_001_OCC.jpg' );
matOCC.repeat.set( .8, .5 );

var matMask = new THREE.TextureLoader().load( 'textures/metal1/Metal_Grill_001_MASK.jpg' );
matMask.repeat.set( .8, .5 );

var matMaterial = new THREE.MeshStandardMaterial( {color: 'red', map: matDiffuse } );
matMaterial.transparent = true;
// matMaterial.displacementMap = matDisplacement;
matMaterial.normalMap = matNormal;
matMaterial.roughnessMap = matRoughness;
matMaterial.aoMap = matOCC;

var matMaterial2 = new THREE.MeshStandardMaterial( {color: 'darkgreen', map: matDiffuse } );
matMaterial2.transparent = true;
// matMaterial.displacementMap = matDisplacement;
matMaterial2.normalMap = matNormal;
matMaterial2.roughnessMap = matRoughness;
matMaterial2.aoMap = matOCC;

var matMaterial3 = new THREE.MeshStandardMaterial( {color: 'blue', map: matDiffuse } );
matMaterial3.transparent = true;
// matMaterial.displacementMap = matDisplacement;
matMaterial3.normalMap = matNormal;
matMaterial3.roughnessMap = matRoughness;
matMaterial3.aoMap = matOCC;

var matMaterial4 = new THREE.MeshStandardMaterial( {color: 'darkorange', map: matDiffuse } );
matMaterial4.transparent = true;
// matMaterial.displacementMap = matDisplacement;
matMaterial4.normalMap = matNormal;
matMaterial4.roughnessMap = matRoughness;
matMaterial4.aoMap = matOCC;

var matMaterial5 = new THREE.MeshStandardMaterial( {color: 'yellow', map: matDiffuse } );
matMaterial5.transparent = true;
// matMaterial.displacementMap = matDisplacement;
matMaterial5.normalMap = matNormal;
matMaterial5.roughnessMap = matRoughness;
matMaterial5.aoMap = matOCC;

var matMaterial6 = new THREE.MeshStandardMaterial( {color: 'aqua', map: matDiffuse } );
matMaterial6.transparent = true;
// matMaterial.displacementMap = matDisplacement;
matMaterial6.normalMap = matNormal;
matMaterial6.roughnessMap = matRoughness;
matMaterial6.aoMap = matOCC;

var matMaterial7 = new THREE.MeshStandardMaterial( {color: 'lime', map: matDiffuse } );
matMaterial7.transparent = true;
// matMaterial.displacementMap = matDisplacement;
matMaterial7.normalMap = matNormal;
matMaterial7.roughnessMap = matRoughness;
matMaterial7.aoMap = matOCC;

var matMaterial8 = new THREE.MeshStandardMaterial( {color: 'silver', map: matDiffuse } );
matMaterial8.transparent = true;
// matMaterial.displacementMap = matDisplacement;
matMaterial8.normalMap = matNormal;
matMaterial8.roughnessMap = matRoughness;
matMaterial8.aoMap = matOCC;

var matMaterial9 = new THREE.MeshStandardMaterial( {color: 'magenta', map: matDiffuse } );
matMaterial9.transparent = true;
// matMaterial.displacementMap = matDisplacement;
matMaterial9.normalMap = matNormal;
matMaterial9.roughnessMap = matRoughness;
matMaterial9.aoMap = matOCC;



