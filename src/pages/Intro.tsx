import * as THREE from "three";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { seoDescriptions } from "../seo/seoDescriptions";
import useSeo from "../seo/useSeo";
import Message from "../components/Message";
import Title from "../components/Title";
import Star from "/assets/star.png";

const IntroThreejsSection = () => {
	const introPageRef = useRef<HTMLElement>(null);

	const canvasRef = useRef<HTMLCanvasElement>(null);

	const navigateHome = useNavigate();

	// *** SEO - Description ***
	useSeo({
		title: `Intro | Space Tourism V2`,
		description: seoDescriptions.introPage,
	});
	// *** End of SEO - Description ***

	// *** Automatically Redirect to Home page ***
	useEffect(() => {
		const timeoutDelay = 29850;

		const timeoutID = setTimeout(() => {
			navigateHome("/home");
		}, timeoutDelay);

		return () => clearTimeout(timeoutID);
	}, [navigateHome]);
	// *** End of Automatically Redirect to Home page ***

	// *** 3D Scene - Star Wars Style ***
	useEffect(() => {
		// *** Scene | Camera | Renderer ***
		const scene = new THREE.Scene();

		const aspectRatio = {
			width: window.innerWidth,
			height: window.innerHeight,
		};

		const camera = new THREE.PerspectiveCamera(
			60,
			aspectRatio.width / aspectRatio.height,
			1,
			1000,
		);
		camera.position.z = 5;

		const renderer = new THREE.WebGLRenderer({
			canvas: canvasRef.current!,
			antialias: true,
		});
		renderer.setSize(aspectRatio.width, aspectRatio.height);
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		renderer.render(scene, camera);
		// *** End of Scene | Camera | Renderer ***

		// *** Create Stars, Geometry, Material, Mesh ***
		const stars = [];
		const starsCount = 10000;

		const starGeometry = new THREE.BufferGeometry();

		const starTexture = new THREE.TextureLoader().load(Star);
		const starMaterial = new THREE.PointsMaterial({
			map: starTexture,
			color: "grey",
			size: 0.7,
		});

		for (let i = 0; i < starsCount; i++) {
			const star = new THREE.Vector3(
				Math.random() * 500 - 300,
				Math.random() * 500 - 300,
				Math.random() * 500 - 300,
			);

			stars.push(star);
		}
		starGeometry.setFromPoints(stars);

		const starMesh = new THREE.Points(starGeometry, starMaterial);
		scene.add(starMesh);
		// *** End of Create Stars, Geometry, Material, Mesh ***

		// *** Resize - Event Listener ***
		const resizeFunction = () => {
			aspectRatio.width = window.innerWidth;
			aspectRatio.height = window.innerHeight;

			camera.aspect = aspectRatio.width / aspectRatio.height;
			camera.updateProjectionMatrix();

			renderer.setSize(aspectRatio.width, aspectRatio.height);
			renderer.render(scene, camera);
		};

		window.addEventListener("resize", resizeFunction);
		// *** End of Resize - Event Listener ***

		// *** Animate Function | Clock ***
		const clock = new THREE.Clock();

		let rafID: number;
		const animate = function () {
			const elapsed = clock.getElapsedTime();

			const resetPositionZ = 50;
			let speed = 0.5;

			const positions = starGeometry.attributes.position.array;

			if (elapsed > 29) speed = 5;

			for (let i = 0; i < stars.length; i++) {
				positions[i * 3 + 2] -= speed;

				if (positions[i * 3 + 2] < -250) {
					positions[i * 3 + 0] = Math.random() * 500 - 300;
					positions[i * 3 + 1] = Math.random() * 500 - 300;
					positions[i * 3 + 2] = resetPositionZ;
				}
			}
			starGeometry.attributes.position.needsUpdate = true;

			renderer.render(scene, camera);

			rafID = window.requestAnimationFrame(animate);
		};
		animate();
		// *** End of Animate Function | Clock ***

		// *** Cleanup | Performance ***
		gsap.to(introPageRef.current, { display: "none" }).delay(31);

		return () => {
			cancelAnimationFrame(rafID);
			renderer.dispose();
			scene.clear();

			window.removeEventListener("resize", resizeFunction);
		};
		// *** End of Cleanup | Performance ***
	}, []);
	// *** End of 3D Scene - Star Wars Style ***

	return (
		<section className="intro-page" ref={introPageRef}>
			<canvas className="intro-page-canvas" ref={canvasRef}></canvas>

			<div className="intro-content">
				<Title
					text="Space Tourism V2"
					className="intro-content-title"
				/>

				<div className="intro-content-wrapper">
					<Message
						className="intro-content-description"
						text={
							<span>
								Multi-page experience
								<br />
								Built with React + Vite
								<br />
								TypeScript Sass
								<br />
								Three.js GSAP
								<br />
								CSS Art Animations Effects
								<br />
								Reworked & Expanded
								<br />
								4 → 7 Pages
								<br />
								Pages: Intro - Home - Crew - Destinations -
								Technology - Explore - Error
								<br />
								Author
								<br />
								Web.anim.and.effects
							</span>
						}
					/>
				</div>
			</div>
		</section>
	);
};

export default IntroThreejsSection;
