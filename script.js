/* SECURE EVENT - Pricing & Infrastructure Logic
    Optimized for Speed & Crash-Proofing
*/

// --- CONFIGURATION (Prices in INR) ---
const CONFIG = {
    NODE_RENTAL_COST: 5000, // Per Omni-Node
    BAND_RENTAL_COST: 100,  // Per Wristband
    NODE_COVERAGE: 150,     // 1 Node covers 150sqm (7m radius)
    BAND_BUFFER: 1.05       // 5% extra stock for replacement
};

// Global object to store active animation frames (prevents lagging)
let activeAnimations = {};

// --- MAIN CALCULATE FUNCTION ---
function calculate() {
    // 1. Get Inputs safely (Converts text/empty to 0 instantly)
    // We use Number() instead of parseInt to safely handle empty strings
    let attendees = Number(document.getElementById('attendees').value) || 0;
    let area = Number(document.getElementById('area').value) || 0;
    let gates = Number(document.getElementById('gates').value) || 0;

    // Prevent negative numbers
    attendees = Math.max(0, attendees);
    area = Math.max(0, area);
    gates = Math.max(0, gates);

    // 2. LOGIC: Guardian Bands
    // Formula: Attendees + 5% buffer (always round up)
    let totalBands = Math.ceil(attendees * CONFIG.BAND_BUFFER);

    // 3. LOGIC: Thermal Omni-Nodes
    // Part A: Gate Nodes (2 per gate for Velocity Tracking In/Out)
    let gateNodes = gates * 2;
    
    // Part B: Zone Nodes (1 per 150sqm for Density Counting)
    // If area is 0, we need 0 zone nodes (Math.ceil of 0 is 0)
    let zoneNodes = Math.ceil(area / CONFIG.NODE_COVERAGE);
    
    let totalNodes = gateNodes + zoneNodes;

    // 4. LOGIC: Financials
    let costBands = totalBands * CONFIG.BAND_RENTAL_COST;
    let costNodes = totalNodes * CONFIG.NODE_RENTAL_COST;
    let totalBudget = costBands + costNodes;

    // 5. UPDATE UI
    // Run smooth animations for the counters
    animateValue("band-count", totalBands);
    animateValue("node-count", totalNodes);
    
    // Direct update for cost (Strings are harder to animate smoothly with symbols)
    const budgetElement = document.getElementById("total-cost");
    budgetElement.innerHTML = "₹ " + totalBudget.toLocaleString('en-IN');
}

// --- SMOOTH ANIMATION ENGINE ---
function animateValue(id, endValue) {
    const obj = document.getElementById(id);
    if (!obj) return;

    // STOP previous animation if user is typing fast (Fixes the "Jitter/Lag")
    if (activeAnimations[id]) {
        cancelAnimationFrame(activeAnimations[id]);
    }

    // Get current number (Strip commas to do math)
    // Default to 0 if text is invalid
    let startValue = parseInt(obj.innerHTML.replace(/,/g, '')) || 0;
    
    // If numbers are same, do nothing
    if (startValue === endValue) return;

    const duration = 400; // Animation speed in ms (0.4 seconds)
    const startTime = performance.now();

    function step(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Calculate current step
        const current = Math.floor(startValue + (endValue - startValue) * progress);
        
        obj.innerHTML = current.toLocaleString('en-IN');

        if (progress < 1) {
            // Keep animating
            activeAnimations[id] = requestAnimationFrame(step);
        } else {
            // Finish exactly on the number
            obj.innerHTML = endValue.toLocaleString('en-IN');
            delete activeAnimations[id];
        }
    }
    
    // Start the frame
    activeAnimations[id] = requestAnimationFrame(step);
}

// --- INITIALIZE ---
// Run once on load to set initial state (e.g. 11 bands / 3 nodes)
window.onload = function() {
    calculate();
};
