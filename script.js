/* 
    SecureEvent Calculator Logic
    Based on AMG8833 Sensor physics and Guardian Band manufacturing costs.
*/

// --- CONFIGURATION CONSTANTS (INR) ---
const CONFIG = {
    NODE_COVERAGE_SQM: 150, // 1 Node covers ~150sqm (7m radius)
    NODE_RENTAL_COST: 5000, // Cost per node per event
    BAND_RENTAL_COST: 100,  // Cost per band per attendee
    BAND_BUFFER: 1.05       // 5% buffer for loss/breakage
};

// --- DOM ELEMENTS ---
const inputs = {
    attendees: document.getElementById('attendees'),
    venueSize: document.getElementById('venue-size'),
    gates: document.getElementById('gates')
};

const outputs = {
    bands: document.getElementById('res-bands'),
    nodes: document.getElementById('res-nodes'),
    cost: document.getElementById('res-cost'),
    logic: document.getElementById('logic-list')
};

// --- MAIN CALCULATION FUNCTION ---
function calculateDeployment() {
    // 1. Get Values (with fallback to 0 to prevent crashes)
    const attendees = parseInt(inputs.attendees.value) || 0;
    const venueSize = parseInt(inputs.venueSize.value) || 0;
    const gates = parseInt(inputs.gates.value) || 0;

    // 2. Calculate Bands (Total + 5% Buffer)
    const totalBands = Math.ceil(attendees * CONFIG.BAND_BUFFER);

    // 3. Calculate Nodes
    // A. Open Area Nodes (Bicubic Interpolation requires density coverage)
    const openAreaNodes = Math.ceil(venueSize / CONFIG.NODE_COVERAGE_SQM);
    
    // B. Gate Nodes (2 per gate for Velocity Tracking - In/Out)
    const gateNodes = gates * 2;
    
    const totalNodes = openAreaNodes + gateNodes;

    // 4. Calculate Cost
    const costBands = totalBands * CONFIG.BAND_RENTAL_COST;
    const costNodes = totalNodes * CONFIG.NODE_RENTAL_COST;
    const totalCost = costBands + costNodes;

    // 5. Update UI
    outputs.bands.innerText = totalBands.toLocaleString();
    outputs.nodes.innerText = totalNodes.toLocaleString();
    outputs.cost.innerText = "₹ " + totalCost.toLocaleString();

    // 6. Update Logic Explanation dynamically
    outputs.logic.innerHTML = `
        <li><strong>${gateNodes} Gate Nodes:</strong> Running <em>Adaptive Sliding Window</em> for panic velocity detection.</li>
        <li><strong>${openAreaNodes} Area Nodes:</strong> Using <em>Watershed Algorithm</em> for density crowd counting.</li>
        <li><strong>${totalBands} Bands:</strong> Creating Mesh Network (incl. ${totalBands - attendees} buffer units).</li>
    `;
}

// --- EVENT LISTENERS ---
// Recalculate instantly whenever user changes an input
Object.values(inputs).forEach(input => {
    input.addEventListener('input', calculateDeployment);
});

// Initial Run
calculateDeployment();

