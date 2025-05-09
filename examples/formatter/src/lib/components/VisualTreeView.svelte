<script lang="ts">
	import { onMount } from 'svelte';
	import Konva from 'konva';
	import type { TreeNodeData } from '$lib/types';

	// TODO Use TreeNodeData
	const { node } = $props<{ node: any }>();

	let container: HTMLDivElement;
	let stage: Konva.Stage;
	let layer: Konva.Layer;
	let treeGroup: Konva.Group;

	const config = {
		nodeWidth: 120,
		nodeHeight: 40,
		horizontalSpacing: 80,
		verticalSpacing: 60,
		nodeFill: 'var(--node-fill)',
		nodeStroke: 'var(--node-stroke)',
		textColor: 'var(--text-color)',
		lineColor: 'var(--line-color)',
		lineWidth: 1,
		fontSize: 12,
		padding: 20,
		initialScale: 1,
		minScale: 0.3,
		maxScale: 3,
		scaleBy: 1.1
	};

	function initStage() {
		if (!container) return;

		if (stage) {
			stage.destroy();
		}

		stage = new Konva.Stage({
			container: container,
			width: container.offsetWidth,
			height: 600,
			draggable: false
		});

		layer = new Konva.Layer();
		stage.add(layer);

		treeGroup = new Konva.Group({
			draggable: true,
			x: stage.width() / 2,
			y: 50
		});
		layer.add(treeGroup);

		addZoomListeners();
	}

	function addZoomListeners() {
		stage.on('wheel', (e) => {
			e.evt.preventDefault();

			const oldScale = treeGroup.scaleX();

			const pointer = stage.getPointerPosition();
			if (!pointer) return;

			const mousePointTo = {
				x: (pointer.x - treeGroup.x()) / oldScale,
				y: (pointer.y - treeGroup.y()) / oldScale
			};

			let direction = e.evt.deltaY > 0 ? -1 : 1;
			let newScale = direction > 0 ? oldScale * config.scaleBy : oldScale / config.scaleBy;

			newScale = Math.max(config.minScale, Math.min(newScale, config.maxScale));

			// Animate the scale change for smoother zooming
			const tween = new Konva.Tween({
				node: treeGroup,
				duration: 0.1,
				easing: Konva.Easings.EaseOut,
				scaleX: newScale,
				scaleY: newScale,
				onUpdate: () => {
					const currentScale = treeGroup.scaleX();
					const newPos = {
						x: pointer.x - mousePointTo.x * currentScale,
						y: pointer.y - mousePointTo.y * currentScale
					};
					treeGroup.position(newPos);
					layer.batchDraw();
				}
			});
			tween.play();
		});

		stage.on('dblclick', () => {
			resetView(true);
		});

		// Add touch support for pinch zoom
		let lastDist = 0;
		let startScale = 1;

		stage.on('touchmove', (e) => {
			e.evt.preventDefault();
			const touch1 = e.evt.touches[0];
			const touch2 = e.evt.touches[1];

			if (touch1 && touch2) {
				if (lastDist === 0) {
					lastDist = getDistance(touch1, touch2);
					startScale = treeGroup.scaleX();
					return;
				}

				const dist = getDistance(touch1, touch2);
				const scale = startScale * (dist / lastDist);

				const newScale = Math.max(config.minScale, Math.min(scale, config.maxScale));
				treeGroup.scale({ x: newScale, y: newScale });
				layer.batchDraw();
			}
		});

		stage.on('touchend', () => {
			lastDist = 0;
		});
	}

	function getDistance(p1: Touch, p2: Touch) {
		return Math.sqrt(Math.pow(p2.clientX - p1.clientX, 2) + Math.pow(p2.clientY - p1.clientY, 2));
	}

	function resetView(animate = false) {
		if (animate) {
			const tween = new Konva.Tween({
				node: treeGroup,
				duration: 0.3,
				easing: Konva.Easings.EaseInOut,
				scaleX: config.initialScale,
				scaleY: config.initialScale,
				x: stage.width() / 2,
				y: 50,
				onFinish: () => layer.batchDraw()
			});
			tween.play();
		} else {
			treeGroup.scale({ x: config.initialScale, y: config.initialScale });
			treeGroup.position({
				x: stage.width() / 2,
				y: 50
			});
			layer.batchDraw();
		}
	}

	function calculateTreeLayout(
		node: any,
		depth = 0,
		index = 0,
		positions: Record<string, any> = {},
		parentId: string | null = null
	) {
		if (!node) return { positions, width: 0, height: 0 };

		const id = Math.random().toString(36).substring(2, 9);

		const children = getVisualChildren(node);

		let totalChildrenWidth = 0;
		let maxChildDepth = 0;

		const childPositions: Record<string, any> = {};
		const childrenInfo: Array<{ id: string; width: number }> = [];

		children.forEach((child, i) => {
			const result = calculateTreeLayout(child, depth + 1, i, positions, id);
			Object.assign(childPositions, result.positions);
			childrenInfo.push({
				id: Object.keys(result.positions).pop() || '',
				width: result.width
			});
			totalChildrenWidth += result.width;
			maxChildDepth = Math.max(maxChildDepth, result.height);
		});

		const nodeWidth = Math.max(config.nodeWidth, totalChildrenWidth);

		let x = 0;
		if (children.length > 0) {
			const firstChildX = childPositions[childrenInfo[0].id].x;
			const lastChildX = childPositions[childrenInfo[childrenInfo.length - 1].id].x;
			x = firstChildX + (lastChildX - firstChildX) / 2;
		} else {
			x = index * (config.nodeWidth + config.horizontalSpacing);
		}

		positions[id] = {
			x,
			y: depth * (config.nodeHeight + config.verticalSpacing),
			node,
			parentId
		};

		Object.assign(positions, childPositions);

		return {
			positions,
			width: nodeWidth,
			height: maxChildDepth + 1
		};
	}

	function getVisualChildren(node: any) {
		const children: any[] = [];

		if (node.children && Array.isArray(node.children)) {
			node.children.forEach((child: any) => {
				if (child && typeof child === 'object') {
					children.push(child);
				}
			});
		}

		for (const [key, value] of Object.entries(node)) {
			if (key === 'children') continue;

			if (typeof value === 'object' && value !== null) {
				if (Array.isArray(value)) {
					if (value.length > 0) {
						children.push({
							kind: `${key} (${value.length})`,
							children: value.filter((item) => item && typeof item === 'object')
						});
					}
				} else if (Object.keys(value).length > 0) {
					children.push({
						kind: key,
						...value
					});
				}
			}
		}

		return children;
	}

	function getNodeText(node: any) {
		if (node.kind === 'expression') {
			return `${node.nodeType}`;
		}
		return node.kind;
	}

	function drawTree() {
		if (!node || !treeGroup) return;

		treeGroup.destroyChildren();

		const { positions } = calculateTreeLayout(node);

		let minX = Infinity;
		let maxX = -Infinity;
		let minY = Infinity;
		let maxY = -Infinity;

		Object.values(positions).forEach((pos) => {
			minX = Math.min(minX, pos.x);
			maxX = Math.max(maxX, pos.x);
			minY = Math.min(minY, pos.y);
			maxY = Math.max(maxY, pos.y);
		});

		const treeWidth = maxX - minX + config.nodeWidth;
		const offsetX = -treeWidth / 2 - minX;

		Object.entries(positions).forEach(([id, pos]) => {
			if (pos.parentId && positions[pos.parentId]) {
				const parent = positions[pos.parentId];

				const line = new Konva.Line({
					points: [
						parent.x + offsetX + config.nodeWidth / 2,
						parent.y + config.nodeHeight,
						pos.x + offsetX + config.nodeWidth / 2,
						pos.y
					],
					stroke: config.lineColor,
					strokeWidth: config.lineWidth
				});

				treeGroup.add(line);
			}
		});

		Object.entries(positions).forEach(([id, pos]) => {
			const group = new Konva.Group({
				x: pos.x + offsetX,
				y: pos.y
			});

			const rect = new Konva.Rect({
				width: config.nodeWidth,
				height: config.nodeHeight,
				fill: config.nodeFill,
				stroke: config.nodeStroke,
				cornerRadius: 5
			});

			const text = new Konva.Text({
				text: getNodeText(pos.node),
				fontSize: config.fontSize,
				fontFamily: 'Arial',
				fill: config.textColor,
				width: config.nodeWidth,
				padding: config.padding / 2,
				align: 'center'
			});

			text.y((config.nodeHeight - text.height()) / 2);

			group.add(rect);
			group.add(text);
			treeGroup.add(group);
		});

		layer.draw();
	}

	function handleResize() {
		if (stage) {
			stage.width(container.offsetWidth);
			layer.draw();
		}
	}

	onMount(() => {
		initStage();
		drawTree();

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
			if (stage) {
				stage.destroy();
			}
		};
	});

	$effect(() => {
		if (stage && node) {
			drawTree();
		}
	});
</script>

<div class="visual-tree-container">
	<div class="controls">
		<button class="button is-small is-light" onclick={() => resetView(true)}>
			<span class="icon"><i class="fas fa-sync-alt"></i></span>
			<span>Reset View</span>
		</button>
		<div class="instructions">
			<small>
				<span class="instruction-item"><i class="fas fa-hand-paper"></i> Drag to move</span>
				<span class="instruction-item"><i class="fas fa-mouse-pointer"></i> Scroll to zoom</span>
				<span class="instruction-item"><i class="fas fa-mouse"></i> Double-click to reset</span>
			</small>
		</div>
	</div>
	<div class="canvas-container" bind:this={container}></div>
</div>

<style>
	.visual-tree-container {
		width: 100%;
		height: 600px;
		background-color: var(--card-bg);
		border: var(--border-width) solid var(--border-color);
		border-radius: var(--border-radius-md);
		overflow: hidden;
		position: relative;
		box-shadow: var(--shadow-sm);
		transition:
			background-color var(--transition-normal),
			border-color var(--transition-normal),
			box-shadow var(--transition-normal),
			transform var(--transition-normal);
		animation: scale-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
	}

	.visual-tree-container:hover {
		box-shadow: var(--shadow-md);
		transform: translateY(-2px);
		border-color: rgba(var(--primary), 0.3);
	}

	.canvas-container {
		width: 100%;
		height: 100%;
	}

	.controls {
		position: absolute;
		top: var(--space-3);
		left: var(--space-3);
		z-index: var(--z-index-dropdown);
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
		animation: fade-in 0.5s ease-out forwards;
		transition:
			transform var(--transition-normal),
			opacity var(--transition-normal);
	}

	.visual-tree-container:hover .controls {
		transform: translateY(-2px);
	}

	.instructions {
		background-color: var(--card-bg);
		padding: var(--space-2);
		border-radius: var(--border-radius-sm);
		border: var(--border-width) solid var(--border-color);
		color: var(--text-color);
		opacity: 0.7;
		transition: all var(--transition-normal);
		box-shadow: var(--shadow-sm);
		backdrop-filter: blur(4px);
	}

	.instructions:hover {
		opacity: 1;
		border-color: rgba(var(--primary), 0.3);
		box-shadow: var(--shadow-md);
		transform: translateY(-1px);
	}

	@media (max-width: 768px) {
		.visual-tree-container {
			height: 500px;
		}

		.instructions small {
			display: flex;
			flex-direction: column;
			gap: 4px;
		}

		.instruction-item {
			display: flex;
			align-items: center;
			gap: 6px;
		}

		.instruction-item i {
			width: 16px;
		}
	}

	@media (max-width: 480px) {
		.visual-tree-container {
			height: 400px;
		}

		.controls {
			top: var(--space-2);
			left: var(--space-2);
		}
	}

	.instruction-item {
		display: inline-flex;
		align-items: center;
		gap: 4px;
		margin-right: 8px;
	}

	.instruction-item i {
		opacity: 0.7;
	}
</style>
