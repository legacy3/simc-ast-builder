<script>
  import { onMount, afterUpdate } from 'svelte';
  import Konva from 'konva';
  
  export let ast;
  
  let container;
  let stage;
  let layer;
  let treeGroup; // Group containing the entire tree for dragging
  
  // Configuration for the tree visualization
  const config = {
    nodeWidth: 120,
    nodeHeight: 40,
    horizontalSpacing: 80,
    verticalSpacing: 60,
    nodeFill: '#f0f8ff',
    nodeStroke: '#0d6efd',
    textColor: '#333',
    lineColor: '#999',
    lineWidth: 1,
    fontSize: 12,
    padding: 20,
    initialScale: 1,
    minScale: 0.3,
    maxScale: 3,
    scaleBy: 1.1
  };
  
  // Initialize the Konva stage
  function initStage() {
    if (!container) return;
    
    // Clear any existing stage
    if (stage) {
      stage.destroy();
    }
    
    // Create new stage
    stage = new Konva.Stage({
      container: container,
      width: container.offsetWidth,
      height: 600,
      draggable: false // The stage itself is not draggable, but the tree group will be
    });
    
    // Create layer for drawing
    layer = new Konva.Layer();
    stage.add(layer);
    
    // Create a group for the entire tree (this will be draggable)
    treeGroup = new Konva.Group({
      draggable: true,
      x: stage.width() / 2,
      y: 50
    });
    layer.add(treeGroup);
    
    // Add zoom functionality
    addZoomListeners();
  }
  
  // Add zoom functionality with mouse wheel
  function addZoomListeners() {
    stage.on('wheel', (e) => {
      e.evt.preventDefault();
      
      const oldScale = treeGroup.scaleX();
      
      // Get pointer position relative to the stage
      const pointer = stage.getPointerPosition();
      
      // Get pointer position relative to the group
      const mousePointTo = {
        x: (pointer.x - treeGroup.x()) / oldScale,
        y: (pointer.y - treeGroup.y()) / oldScale
      };
      
      // Calculate new scale
      let direction = e.evt.deltaY > 0 ? -1 : 1;
      let newScale = direction > 0 
        ? oldScale * config.scaleBy 
        : oldScale / config.scaleBy;
      
      // Limit scale
      newScale = Math.max(config.minScale, Math.min(newScale, config.maxScale));
      
      // Set new scale
      treeGroup.scale({ x: newScale, y: newScale });
      
      // Calculate new position to keep the point under the mouse
      const newPos = {
        x: pointer.x - mousePointTo.x * newScale,
        y: pointer.y - mousePointTo.y * newScale
      };
      
      // Set new position
      treeGroup.position(newPos);
      layer.batchDraw();
    });
    
    // Add double-click to reset view
    stage.on('dblclick', () => {
      resetView();
    });
  }
  
  // Reset view to center and original scale
  function resetView() {
    treeGroup.scale({ x: config.initialScale, y: config.initialScale });
    treeGroup.position({
      x: stage.width() / 2,
      y: 50
    });
    layer.batchDraw();
  }
  
  // Calculate positions for each node in the tree
  function calculateTreeLayout(node, depth = 0, index = 0, positions = {}, parentId = null) {
    if (!node) return { positions, width: 0, height: 0 };
    
    const id = Math.random().toString(36).substring(2, 9);
    
    // Get children to visualize
    const children = getVisualChildren(node);
    
    // Calculate width based on children
    let totalChildrenWidth = 0;
    let maxChildDepth = 0;
    
    const childPositions = {};
    const childrenInfo = [];
    
    children.forEach((child, i) => {
      const result = calculateTreeLayout(child, depth + 1, i, positions, id);
      Object.assign(childPositions, result.positions);
      childrenInfo.push({
        id: Object.keys(result.positions).pop(),
        width: result.width
      });
      totalChildrenWidth += result.width;
      maxChildDepth = Math.max(maxChildDepth, result.height);
    });
    
    // Calculate node width (either based on children or minimum width)
    const nodeWidth = Math.max(config.nodeWidth, totalChildrenWidth);
    
    // Calculate x position (centered over children)
    let x = 0;
    if (children.length > 0) {
      // Position based on children's positions
      const firstChildX = childPositions[childrenInfo[0].id].x;
      const lastChildX = childPositions[childrenInfo[childrenInfo.length - 1].id].x;
      x = firstChildX + (lastChildX - firstChildX) / 2;
    } else {
      // Position based on index and minimum width
      x = index * (config.nodeWidth + config.horizontalSpacing);
    }
    
    // Store position
    positions[id] = {
      x,
      y: depth * (config.nodeHeight + config.verticalSpacing),
      node,
      parentId
    };
    
    // Merge child positions
    Object.assign(positions, childPositions);
    
    return {
      positions,
      width: nodeWidth,
      height: maxChildDepth + 1
    };
  }
  
  // Get children to visualize
  function getVisualChildren(node) {
    const children = [];
    
    // Handle explicit children array
    if (node.children && Array.isArray(node.children)) {
      node.children.forEach(child => {
        if (child && typeof child === 'object') {
          children.push(child);
        }
      });
    }
    
    // Handle nested objects as children
    for (const [key, value] of Object.entries(node)) {
      if (key === 'children') continue;
      
      if (typeof value === 'object' && value !== null) {
        if (Array.isArray(value)) {
          if (value.length > 0) {
            children.push({
              kind: `${key} (${value.length})`,
              children: value.filter(item => item && typeof item === 'object')
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
  
  // Get node display text
  function getNodeText(node) {
    if (node.kind === 'expression') {
      return `${node.nodeType}`;
    }
    return node.kind;
  }
  
  // Draw the tree
  function drawTree() {
    if (!ast || !treeGroup) return;
    
    // Clear the tree group
    treeGroup.destroyChildren();
    
    // Calculate layout
    const { positions } = calculateTreeLayout(ast);
    
    // Find min/max coordinates to center the tree
    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;
    
    Object.values(positions).forEach(pos => {
      minX = Math.min(minX, pos.x);
      maxX = Math.max(maxX, pos.x);
      minY = Math.min(minY, pos.y);
      maxY = Math.max(maxY, pos.y);
    });
    
    // Calculate offset to center the tree horizontally
    const treeWidth = maxX - minX + config.nodeWidth;
    const offsetX = -treeWidth / 2 - minX;
    
    // Draw connections first (so they appear behind nodes)
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
    
    // Draw nodes
    Object.entries(positions).forEach(([id, pos]) => {
      const group = new Konva.Group({
        x: pos.x + offsetX,
        y: pos.y
      });
      
      // Node rectangle
      const rect = new Konva.Rect({
        width: config.nodeWidth,
        height: config.nodeHeight,
        fill: config.nodeFill,
        stroke: config.nodeStroke,
        cornerRadius: 5
      });
      
      // Node text
      const text = new Konva.Text({
        text: getNodeText(pos.node),
        fontSize: config.fontSize,
        fontFamily: 'Arial',
        fill: config.textColor,
        width: config.nodeWidth,
        padding: config.padding / 2,
        align: 'center'
      });
      
      // Center text vertically
      text.y((config.nodeHeight - text.height()) / 2);
      
      group.add(rect);
      group.add(text);
      treeGroup.add(group);
    });
    
    layer.draw();
  }
  
  // Handle window resize
  function handleResize() {
    if (stage) {
      stage.width(container.offsetWidth);
      layer.draw();
    }
  }
  
  onMount(() => {
    initStage();
    drawTree();
    
    // Add resize listener
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (stage) {
        stage.destroy();
      }
    };
  });
  
  afterUpdate(() => {
    if (stage) {
      drawTree();
    }
  });
</script>

<div class="visual-tree-container">
  <div class="controls">
    <button class="btn btn-sm btn-outline-secondary" on:click={resetView}>
      Reset View
    </button>
    <div class="instructions">
      <small>Drag to move • Scroll to zoom • Double-click to reset</small>
    </div>
  </div>
  <div class="canvas-container" bind:this={container}></div>
</div>

<style>
  .visual-tree-container {
    width: 100%;
    height: 600px;
    background-color: white;
    border: 1px solid #dee2e6;
    border-radius: 0.25rem;
    overflow: hidden;
    position: relative;
  }
  
  .canvas-container {
    width: 100%;
    height: 100%;
  }
  
  .controls {
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: 10;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  
  .instructions {
    background-color: rgba(255, 255, 255, 0.8);
    padding: 5px;
    border-radius: 3px;
  }
</style>