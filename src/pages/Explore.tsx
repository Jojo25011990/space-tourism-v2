import { seoDescriptions } from "../seo/seoDescriptions";
import useSeo from "../seo/useSeo";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import * as THREE from "three";
import Message from "../components/Message";

const Explore = () => {
	const canvasExploreRef = useRef<HTMLCanvasElement>(null);

	const navigateHome = useNavigate();

	// *** SEO - Description ***
	useSeo({
		title: `Explore | Space Tourism V2`,
		description: seoDescriptions.explorePage,
	});
	// *** End of SEO - Description ***

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
			canvas: canvasExploreRef.current!,
			antialias: true,
		});
		renderer.setSize(aspectRatio.width, aspectRatio.height);
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		renderer.render(scene, camera);
		// *** End of Scene | Camera | Renderer ***

		//  *** Stars ***
		const exploreStars = function () {
			const exploreStarsCount = 7000;

			const exploreStarsGeometry = new THREE.BufferGeometry();
			const exploreStarsMaterial = new THREE.PointsMaterial({
				color: 0xffffff,
				size: 0.006,
				depthWrite: false,
			});

			const exploreStarsPosition = new Float32Array(
				exploreStarsCount * 3,
			);

			for (let i = 0; i < exploreStarsCount * 3; i++) {
				exploreStarsPosition[i] = (Math.random() - 0.5) * 20;
			}

			exploreStarsGeometry.setAttribute(
				"position",
				new THREE.BufferAttribute(exploreStarsPosition, 3),
			);

			const exploreStarsPoints = new THREE.Points(
				exploreStarsGeometry,
				exploreStarsMaterial,
			);
			exploreStarsPoints.renderOrder = 0;
			exploreStarsPoints.position.z = 5;

			return exploreStarsPoints;
		};

		const starsPoints = exploreStars();
		scene.add(starsPoints);
		//  *** End of Stars ***

		// *** Explore Heading ***
		const exploreHeading = function () {
			const canvasHeading = document.createElement("canvas");
			const ctx = canvasHeading.getContext("2d")!;

			canvasHeading.width = 1000;
			canvasHeading.height = 250;

			let canvasHeadingFontSize = 120;

			// *** Responsive Design | Initial State Only ***
			const responsiveDesignHeading = function () {
				if (window.innerWidth < 700) {
					canvasHeading.width = 650;
					canvasHeading.height = 200;
					canvasHeadingFontSize = 80;
				} else if (window.innerWidth < 1000) {
					canvasHeading.width = 700;
					canvasHeading.height = 200;
					canvasHeadingFontSize = 100;
				}
			};

			responsiveDesignHeading();
			// *** End of Responsive Design | Initiate State Only ***

			ctx.clearRect(0, 0, canvasHeading.width, canvasHeading.height);

			ctx.fillStyle = "white";
			ctx.font = "bold 120px Arial";
			ctx.font = `bold ${canvasHeadingFontSize}px Arial`;
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";
			ctx.fillText(
				"EXPLORE",
				canvasHeading.width / 2,
				canvasHeading.height / 2,
			);

			const canvasHeadingImageData = ctx.getImageData(
				0,
				0,
				canvasHeading.width,
				canvasHeading.height,
			);

			const particleStartPositions: number[] = [];
			const particleTargetPositions: number[] = [];

			for (let y = 0; y < canvasHeading.height; y += 5) {
				for (let x = 0; x < canvasHeading.width; x += 5) {
					const headingIndex = (y * canvasHeading.width + x) * 4;

					if (canvasHeadingImageData.data[headingIndex + 3] > 128) {
						particleTargetPositions.push(
							(x - canvasHeading.width / 2) * 0.01,
							-(y - canvasHeading.height / 2) * 0.01,
							0,
						);

						particleStartPositions.push(
							(Math.random() - 0.5) * 20,
							(Math.random() - 0.5) * 20,
							(Math.random() - 0.5) * 20,
						);
					}
				}
			}

			const canvasHeadingGeometry = new THREE.BufferGeometry();
			const canvasHeadingMaterial = new THREE.PointsMaterial({
				color: 0xffffff,
				size: 0.04,
				transparent: true,
				opacity: 1,
			});

			canvasHeadingGeometry.setAttribute(
				"position",
				new THREE.Float32BufferAttribute(particleStartPositions, 3),
			);

			const canvasHeadingParticles = new THREE.Points(
				canvasHeadingGeometry,
				canvasHeadingMaterial,
			);

			scene.add(canvasHeadingParticles);

			const canvasHeadingPosition = canvasHeadingGeometry.attributes
				.position.array as Float32Array;

			for (let i = 0; i < canvasHeadingPosition.length; i += 3) {
				const startPositionX = canvasHeadingPosition[i];
				const startPositionY = canvasHeadingPosition[i + 1];
				const startPositionZ = canvasHeadingPosition[i + 2];

				const targetPositionX = particleTargetPositions[i];
				const targetPositionY = particleTargetPositions[i + 1];
				const targetPositionZ = particleTargetPositions[i + 2];

				gsap.to(
					{ animationProgress: 0 },
					{
						animationProgress: 1,

						duration: 1.5,
						delay: Math.random() * 0.5,
						ease: "power3.out",

						onUpdate() {
							const particleAnimationProgress =
								this.targets()[0].animationProgress;

							// *** Position X ***
							canvasHeadingPosition[i] =
								startPositionX +
								(targetPositionX - startPositionX) *
									particleAnimationProgress;
							// *** End of Position X ***

							// *** Position Y ***
							canvasHeadingPosition[i + 1] =
								startPositionY +
								(targetPositionY - startPositionY) *
									particleAnimationProgress;
							// *** End of Position Y ***

							// *** Position Z ***
							canvasHeadingPosition[i + 2] =
								startPositionZ +
								(targetPositionZ - startPositionZ) *
									particleAnimationProgress;
							// *** End of Position Z ***

							canvasHeadingGeometry.attributes.position.needsUpdate = true;
						},
					},
				);
			}

			// *** Disperse Heading ***
			const disperseCanvasHeading = () => {
				for (let i = 0; i < canvasHeadingPosition.length; i += 3) {
					const startPositionX = canvasHeadingPosition[i];
					const startPositionY = canvasHeadingPosition[i + 1];
					const startPositionZ = canvasHeadingPosition[i + 2];

					const disperseTargetX =
						startPositionX + (Math.random() - 0.5) * 20;

					const disperseTargetY =
						startPositionY + (Math.random() - 0.5) * 20;

					const disperseTargetZ =
						startPositionZ + (Math.random() - 0.5) * 20;

					gsap.to(
						{ animationProgress: 0 },
						{
							animationProgress: 1,
							duration: 3,
							ease: "power3.out",

							onUpdate() {
								const particleAnimationProgress =
									this.targets()[0].animationProgress;

								// *** Position X ***
								canvasHeadingPosition[i] =
									startPositionX +
									(disperseTargetX - startPositionX) *
										particleAnimationProgress;
								// *** End of Position X ***

								// *** Position Y ***
								canvasHeadingPosition[i + 1] =
									startPositionY +
									(disperseTargetY - startPositionY) *
										particleAnimationProgress;
								// *** End of Position Y ***

								// *** Position Z ***
								canvasHeadingPosition[i + 2] =
									startPositionZ +
									(disperseTargetZ - startPositionZ) *
										particleAnimationProgress;
								// *** End of Position Z ***

								canvasHeadingGeometry.attributes.position.needsUpdate = true;
							},
						},
					);
				}

				gsap.to(canvasHeadingMaterial, {
					opacity: 0,
					duration: 2,
					ease: "power2.out",

					onComplete() {
						scene.remove(canvasHeadingParticles);
					},
				});
			};
			// *** End of Disperse Heading ***

			// *** DisperseHeadingDelay - 5,5 seconds ***
			const disperseHeadingDelay = 5500;

			setTimeout(() => {
				disperseCanvasHeading();
			}, disperseHeadingDelay);
			// *** DisperseHeadingDelay - 5,5 seconds ***
		};
		exploreHeading();
		// *** End of Explore Heading ***

		// *** Earth Sphere ***
		let earthMesh: THREE.Mesh;
		const exploreEarth = function () {
			const earthTextureLoader = new THREE.TextureLoader();
			const earthTexture = earthTextureLoader.load(
				"assets//earth/earth.jpg",
			);
			const earthGeometry = new THREE.SphereGeometry(1.5, 64, 64);
			const earthMaterial = new THREE.MeshStandardMaterial({
				map: earthTexture,
			});

			earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
			earthMesh.renderOrder = 5;
			earthMesh.position.z = -10;

			scene.add(earthMesh);

			const light = new THREE.PointLight(0xffffff, 50);
			light.position.set(4, 4, 5);
			scene.add(light);

			// *** Progress Animation ***
			let progress = 0;

			const interval = setInterval(() => {
				progress += 0.004;

				earthMesh.position.z = -5 + progress * 5;

				if (window.innerWidth < 600)
					earthMesh.position.z = -3.5 + progress * 3;

				if (progress >= 1) clearInterval(interval);
			}, 16);
			// *** End of Progress Animation ***

			// *** Responsive Design - Config ***
			const earthResponsiveMobile = window.innerWidth < 650;

			const earthResponsiveDeviceTime = earthResponsiveMobile ? 28 : 33;
			// *** End of Responsive Design - Config ***

			// *** Timeline Animation ***
			const earthTimelineInitDelay = 7;

			const earthTimeline = gsap.timeline().delay(earthTimelineInitDelay);

			earthTimeline
				.to(light.position, {
					duration: 0.7,

					x: 0,
					y: 0,
					z: 0,
				})
				.to(
					earthMesh.position,
					{
						duration: 1,

						z: -4,
					},
					"-=0.1",
				)
				.to(camera.position, {
					delay: earthResponsiveDeviceTime,
					duration: 0.9,
					z: -3,
					ease: "power3.Out",
				})
				.add(() => {
					navigateHome("/home");
				}, "-=.46");
			// *** End of Timeline Animation ***
		};

		exploreEarth();
		// *** End of Earth Sphere ***

		// *** Animate Function - Loop ***
		let rafID: number;
		const animate = function () {
			rafID = window.requestAnimationFrame(animate);

			starsPoints.rotation.y += 0.0002;

			if (earthMesh) earthMesh.rotation.y += 0.004;

			renderer.render(scene, camera);
		};

		animate();

		return () => {
			cancelAnimationFrame(rafID);
			renderer.dispose();
			scene.clear();
		};
		// *** End of Animate Function - Loop ***
	}, [navigateHome]);

	return (
		<section className="explore-page">
			<canvas
				className="explore-page-canvas"
				ref={canvasExploreRef}
			></canvas>

			<Message
				text="In a moment, we return home."
				className="explore-page-description-exit"
			/>
			<div className="explore-page-content">
				<div className="explore-page-content-wrapper">
					<Message
						className="explore-page-description"
						text={
							<span>
								Six quick facts about our home planet.,
								<br />
								Rotational velocity at equator: ~1670 km/h.
								<br />
								Atmospheric boundary exceeds 100 km altitude.
								<br />
								Low Earth orbit begins near 160 km above
								surface.
								<br />
								Orbital period of ISS: 92 minutes.
								<br />
								Escape velocity threshold: 11.2 km/s.
								<br />
								Hydrosphere covers over 70% of planetary
								surface.
							</span>
						}
					/>
				</div>
			</div>
		</section>
	);
};

export default Explore;
