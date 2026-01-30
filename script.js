/* 
    CROWD OS - CORE LOGIC ENGINE
    --------------------------------------
    Calculates hardware requirements based on:
    1. AMG8833 Sensor physics (7m range, ~150sqm coverage)
    2. Crowd Density Algorithms (Watershed, Bicubic Interpolation)
    3. Rental Business Model (SaaS)
*/

// Configuration Constants (Pricing in INR)
const SPECS = {
    BAND_PRICE: 100,       // Rental per band
    NODE_PRICE: 5000,      // Rental per Thermal Omni-Node
    NODE_COVERAGE: 150,    // 1 Node covers 150 sq meters (7m radius)
    BAND_BUFFER: 1.05      // 5% extra stock for replacement
};

// Main Calculation Function
function calculateLogic() {
    // 1. Safe Input Retrieval (Defaults to 0 if empty)
    const attendees = parseInt(document.getElementById('attendees').value) || 0;
    const area = parseInt(document.getElementById('area').value) || 0;
    const gates = parseInt(document.getElementById('gates').value) || 0;

    // 2. Hardware Algorithm
    
    // BANDS: Total + 5% Buffer for loss/malfunction
    const totalBands = Math.ceil(attendees * SPECS.BAND_BUFFER);

    // NODES: 
    // A. Open Zones: Needs overlapping coverage for 'Bicubic Interpolation' smoothing
    const areaNodes = Math.ceil(area / SPECS.NODE_COVERAGE);
    
    // B. Choke Points (Gates): 2 Nodes per gate (In/Out) for 'Adaptive Sliding Window' velocity tracking
    const gateNodes = gates * 2;
    
    const totalNodes = areaNodes + gateNodes;

    // 3. Financial Algorithm
    const totalCost = (totalBands * SPECS.BAND_PRICE) + (totalNodes * SPECS.NODE_PRICE);

    // 4. Update UI Elements
    document.getElementById('res-bands').innerText = totalBands.toLocaleString();
    document.getElementById('res-nodes').innerText = totalNodes.toLocaleString();
    document.getElementById('res-cost').innerText = "₹ " + totalCost.toLocaleString('en-IN');

    // 5. Generate Technical Readout (The "Smart" part of the pitch)
    updateTechReadout(attendees, areaNodes, gateNodes);
}

function updateTechReadout(attendees, areaNodes, gateNodes) {
    const techBox = document.getElementById('tech-readout');
    
    if(attendees === 0) {
        techBox.innerHTML = "System Standby. Awaiting Event Parameters...";
        return;
    }

    techBox.innerHTML = `
        > Initializing Crowd Physics Engine...<br>
        > <strong>${gateNodes} Gate Nodes</strong> configured with <span class="tech-highlight">Adaptive Sliding Window</span> to detect panic velocity.<br>
        > <strong>${areaNodes} Zone Nodes</strong> utilizing <span class="tech-highlight">Bicubic Interpolation</span> and <span class="tech-highlight">Watershed Segmentation</span> for density counting.<br>
        > <strong>Mesh Network</strong> active for child tracking on ${attendees.toLocaleString()} bands using <span class="tech-highlight">SQA-Phys</span> noise filtering.
    `;
}

// Initialize on load
window.onload = calculateLogic;
