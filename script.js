/* SECURE EVENT - Pricing Logic
   Separated for Cleanliness and Performance
*/

// --- CONFIGURATION ---
const CONFIG = {
    NODE_RENTAL_COST: 12000, // INR per unit
    BAND_RENTAL_COST: 1250,  // INR per unit
    NODE_COVERAGE: 150,      // 1 Node covers 150sqm
    BAND_BUFFER: 1.05        // 5% Extra stock
};

// --- MAIN FUNCTION ---
function calculatePlan() {
    // 1. Get Inputs safely (Convert empty inputs to 0)
    let attendees = Number(document.getElementById('attendees').value) || 0;
    let area = Number(document.getElementById('area').value) || 0;
    let gates = Number(document.getElementById('gates').value) || 0;

    // Prevent negative numbers (just in case)
    if (attendees < 0) attendees = 0;
    if (area < 0) area = 0;
    if (gates < 0) gates = 0;

    // 2. Logic: Bands
    let totalBands = Math.ceil(attendees * CONFIG.BAND_BUFFER);

    // 3. Logic: Nodes (Gates + Zones)
    let gateNodes = gates * 2;
    let zoneNodes = Math.ceil(area / CONFIG.NODE_COVERAGE);
    let totalNodes = gateNodes + zoneNodes;

    // 4. Logic: Cost
    let totalCost = (totalBands * CONFIG.BAND_RENTAL_COST) + (totalNodes * CONFIG.NODE_RENTAL_COST);

    // 5. Trigger Animations
    animateValue("band-count", totalBands);
    animateValue("node-count", totalNodes);
    
    // Update Cost (Direct Text update to handle Symbol easily)
    document.getElementById("total-cost").innerHTML = "₹ " + totalCost.toLocaleString('en-IN');
}

// --- ANIMATION UTILITY ---
function animateValue(id, endValue) {
    const obj = document.getElementById(id);
    // Get current value or default to 0
    const startValue = parseInt(obj.innerHTML.replace(/[^0-9]/g, '')) || 0;
    
    if (startValue === endValue) return;

    const duration = 500; // Animation takes 0.5 seconds
    const startTime = performance.now();

    function step(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Calculate step
        const current = Math.floor(startValue + (endValue - startValue) * progress);
        
        obj.innerHTML = current.toLocaleString('en-IN');

        if (progress < 1) {
            requestAnimationFrame(step);
        } else {
            obj.innerHTML = endValue.toLocaleString('en-IN'); // Ensure it ends exactly on the number
        }
    }
    
    requestAnimationFrame(step);
}
