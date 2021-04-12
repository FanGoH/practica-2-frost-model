import * as THREE from "https://threejsfundamentals.org/threejs/resources/threejs/r125/build/three.module.js";
import { OrbitControls } from "https://threejsfundamentals.org/threejs/resources/threejs/r125/examples/jsm/controls/OrbitControls.js";
import { OBJLoader } from "https://threejsfundamentals.org/threejs/resources/threejs/r125/examples/jsm/loaders/OBJLoader.js";
import { MTLLoader } from "https://threejsfundamentals.org/threejs/resources/threejs/r125/examples/jsm/loaders/MTLLoader.js";

const JACKFROSTPATH = "../frosto/";

const renderer = new THREE.WebGLRenderer({ canvas });

const FOV = 45;
const ASPECT = 2;
const NEAR = 0.1;
const FAR = 100;

let FROSTMODEL;

const camera = new THREE.PerspectiveCamera(FOV, ASPECT, NEAR, FAR);
camera.position.set(0, 0, 5);

const controls = new OrbitControls(camera, canvas);
controls.target.set(0, 0, 0);
controls.update();

const scene = new THREE.Scene();
scene.background = new THREE.Color("black");

{
	const skyColor = 0xb1e1ff;
	const ground = 0xf5fffe;
	const intensity = 1;

	const light = new THREE.HemisphereLight(skyColor, ground, intensity);

	scene.add(light);
}

{
	const COLOR = 0x888888;
	const intsnity = 0.2;
	const light = new THREE.DirectionalLight(COLOR, intsnity);
	light.position.set(0, 10, 0);
	light.target.position.set(-5, 0, 0);

	scene.add(light);
	scene.add(light.target);
}

function resizeRendererToDisplaySize(renderer) {
	const canvas = renderer.domElement;
	const width = canvas.clientWidth;
	const height = canvas.clientHeight;
	const needResize = canvas.width !== width || canvas.height !== height;
	if (needResize) {
		renderer.setSize(width, height, false);
	}
	return needResize;
}

function render() {
	if (resizeRendererToDisplaySize(renderer)) {
		const canvas = renderer.domElement;
		camera.aspect = canvas.clientWidth / canvas.clientHeight;
		camera.updateProjectionMatrix();
	}
	renderer.render(scene, camera);
	requestAnimationFrame(render);
}

requestAnimationFrame(render);

const loadModel = async () => {
	var oloader = new OBJLoader();
	const mtlLoad = new MTLLoader();

	const materials = await mtlLoad.loadAsync(`${JACKFROSTPATH}/frost.mtl`);
	materials.preload();

	oloader.setMaterials(materials);

	FROSTMODEL = await oloader.loadAsync(`${JACKFROSTPATH}/frost.obj`);

	scene.add(FROSTMODEL);
};

loadModel().then(() => {
	scaleDiv.addEventListener("change", () => {
		FROSTMODEL.scale.set(
			xScaleSlide.value,
			yScaleSlide.value,
			zScaleSlide.value
		);
		xScaleValue.textContent = xScaleSlide.value;
		yScaleValue.textContent = yScaleSlide.value;
		zScaleValue.textContent = zScaleSlide.value;
	});

	translateDiv.addEventListener("change", () => {
		FROSTMODEL.position.set(
			xTranslateSlide.value,
			yTranslateSlide.value,
			zTranslateSlide.value
		);
		xTranslateValue.textContent = xTranslateSlide.value;
		yTranslateValue.textContent = yTranslateSlide.value;
		zTranslateValue.textContent = zTranslateSlide.value;
	});

	rotationDiv.addEventListener("change", () => {
		FROSTMODEL.rotation.set(
			xRotationSlide.value,
			yRotationSlide.value,
			zRotationSlide.value
		);
		xRotationValue.textContent = xRotationSlide.value;
		yRotationValue.textContent = yRotationSlide.value;
		zRotationValue.textContent = zRotationSlide.value;
	});
});
