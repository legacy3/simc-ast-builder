<script>
  export let node;
  
  // Track if the node is expanded or collapsed
  let expanded = true;
  
  // Toggle expanded state
  function toggleExpanded() {
    expanded = !expanded;
  }
  
  // Get node properties excluding certain keys
  $: properties = getNodeProperties(node);
  
  // Get node type display
  $: nodeType = getNodeTypeDisplay(node);
  
  // Get children to display
  $: children = getChildren(node);
  
  // Helper function to get node properties
  function getNodeProperties(node) {
    const props = {};
    for (const [key, value] of Object.entries(node)) {
      if (['kind', 'nodeType', 'children'].includes(key)) continue;
      if (typeof value === 'object' && value !== null) continue;
      props[key] = value;
    }
    return props;
  }
  
  // Helper function to get node type display
  function getNodeTypeDisplay(node) {
    if (node.kind === 'expression') {
      return `${node.kind}: ${node.nodeType}`;
    }
    return node.kind;
  }
  
  // Helper function to get children
  function getChildren(node) {
    const result = [];
    
    // Handle explicit children array
    if (node.children && Array.isArray(node.children)) {
      node.children.forEach(child => {
        if (child && typeof child === 'object') {
          result.push(child);
        }
      });
    }
    
    // Handle nested objects as children
    for (const [key, value] of Object.entries(node)) {
      if (key === 'children') continue;
      
      if (typeof value === 'object' && value !== null) {
        if (Array.isArray(value)) {
          if (value.length > 0) {
            result.push({
              kind: `${key} (${value.length})`,
              children: value.map((item, index) => {
                if (item && typeof item === 'object') {
                  return item;
                } else if (item !== undefined) {
                  return {
                    kind: String(index),
                    value: item
                  };
                }
                return null;
              }).filter(Boolean)
            });
          }
        } else if (Object.keys(value).length > 0) {
          result.push({
            kind: key,
            ...value
          });
        }
      }
    }
    
    return result;
  }
  
  // Format value for display
  function formatValue(value) {
    if (value === null) return 'null';
    if (value === undefined) return 'undefined';
    if (typeof value === 'string') return `"${value}"`;
    return String(value);
  }
</script>

<div class="tree-node">
  <div class="tree-node-content">
    <div class="node-header">
      {#if children.length > 0}
        <button class="toggle-btn" on:click={toggleExpanded}>
          {expanded ? '▼' : '►'}
        </button>
      {/if}
      <span class="node-type">{nodeType}</span>
    </div>
    
    {#if Object.keys(properties).length > 0}
      <div class="node-properties">
        {#each Object.entries(properties) as [key, value]}
          <div class="node-property">
            <span class="property-key">{key}:</span> 
            <span class="property-value">{formatValue(value)}</span>
          </div>
        {/each}
      </div>
    {/if}
  </div>
  
  {#if expanded && children.length > 0}
    <div class="tree-node-children">
      {#each children as child}
        <svelte:self node={child} />
      {/each}
    </div>
  {/if}
</div>

<style>
  .tree-node {
    margin-bottom: 0.5rem;
  }

  .tree-node-content {
    padding: 0.5rem;
    border: 1px solid #dee2e6;
    border-radius: 0.25rem;
    background-color: white;
  }

  .node-header {
    display: flex;
    align-items: center;
  }

  .toggle-btn {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0 0.25rem 0 0;
    font-size: 0.75rem;
    color: #6c757d;
  }

  .tree-node-children {
    margin-left: 1.5rem;
    padding-left: 1rem;
    border-left: 2px solid #dee2e6;
  }

  .node-type {
    font-weight: bold;
    color: #0d6efd;
  }

  .node-properties {
    margin-top: 0.5rem;
    margin-left: 1rem;
  }

  .node-property {
    margin-bottom: 0.25rem;
  }

  .property-key {
    color: #6c757d;
  }

  .property-value {
    color: #198754;
  }
</style>