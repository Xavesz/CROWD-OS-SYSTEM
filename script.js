/* 
    SECURE EVENT - Pricing & Infrastructure Logic
    Based on AMG8833 Physics & Manufacturer Costs
*/

// --- CONFIGURATION (Prices in INR) ---
const CONFIG = {
    NODE_RENTAL_COST: 5000, // Per Omni-Node
    BAND_RENTAL_COST: 100,  // Per Wristband
    NODE_COVERAGE: 150,     // 1 Node covers 150sqm (7m radius)
    BAND_BUFFER: 1.05       // 5% extra stock for replacement
};

// --- CALCULATE FUNCTION ---
function calculate() {
    // 1. Get Inputs (Prevent Crashes with fallback to 0)
    let attendees = document.getElementById('attendees').value;
    let area = document.getElementById('area').value;
    let gates = document.getElementById('gates').value;

    // Convert strings to numbers, treat empty as 0
    attendees = attendees ? parseInt(attendees) : 0;
    area = area ? parseInt(area) : 0;
    gates = gates ? parseInt(gates) : 0;

    // 2. LOGIC: Guardian Bands
    // Formula: Attendees + 5% buffer (always round up)
    let totalBands = Math.ceil(attendees * CONFIG.BAND_BUFFER);

    // 3. LOGIC: Thermal Omni-Nodes
    // Part A: Gate Nodes (2 per gate for Velocity Tracking In/Out)
    let gateNodes = gates * 2;
    
    // Part B: Zone Nodes (1 per 150sqm for Density Counting)
    let zoneNodes = Math.ceil(area / CONFIG.NODE_COVERAGE);
    
    let totalNodes = gateNodes + zoneNodes;

    // 4. LOGIC: Financials
    let costBands = totalBands * CONFIG.BAND_RENTAL_COST;
    let costNodes = totalNodes * CONFIG.NODE_RENTAL_COST;
    let totalBudget = costBands + costNodes;

    // 5. UPDATE UI (With Animations)
    animateValue("band-count", totalBands);
    animateValue("node-count", totalNodes);
    
    // Format currency like ₹ 16,100
    document.getElementById("total-cost").innerHTML = "₹ " + totalBudget.toLocaleString('en-IN');
}

// --- ANIMATION UTILITY ---
// Creates a smooth rolling number effect
function animateValue(id, end) {
    const obj = document.getElementById(id);
    const start = parseInt(obj.innerHTML.replace(/,/g, '')) || 0; // Handle existing commas
    if (start === end) return;

    const range = end - start;
    const duration = 500; // Animation speed in ms
    let startTime = null;

    function step(timestamp) {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        
        // Calculate current step
        const current = Math.floor(progress * range + start);
        
        obj.innerHTML = current.toLocaleString();

        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    }
    window.requestAnimationFrame(step);
}

// Initialize on load
window.onload = calculate;
How to Use:
1. Put these three files in a folder.
2. Open index.html in Chrome or Firefox.
3. The calculations will happen instantly as you type.
4. If you input Attendees: 10, Venue: 1, Gates: 1, the output will exactly match your requirements:
    ◦ Bands: 11 (10 + 5%)
    ◦ Nodes: 3 (1 Zone + 2 Gate)
    ◦ Cost: ₹ 16,100
How can SQA-Phys distinguish between dancing and actual medical distress?
How does Bicubic Interpolation turn blocky 8x8 grids into clear heatmaps?
Could the Watershed Algorithm improve headcounts in dense concert crowds?
AGAIN THE NAME WILL BE CROWD OS  OF MY APPLICATION

Here is the updated Gemini Pro Prompt and the 2-Line Description rebranding your system as "Crowd OS".
1. The Gemini Prompt (Copy & Paste)
Use this prompt to generate a simple, structured explanation of your system logic.

--------------------------------------------------------------------------------
PROMPT:
Act as a Senior Technical Product Manager. I need a clear, step-by-step logical flowchart explaining how the "Crowd OS" (Operating System for Crowd Safety) works. The audience is a non-technical investor, so use simple language and analogies, but keep the technical logic accurate.
The System Components:
1. Hardware: "Thermal Omni-Node" (AMG8833 Sensor) and "Guardian Band" (Wearable with PPG).
2. Goal: Detect crowd crush and panic without using video cameras (Privacy-First) and alert the organizer in real-time.
Please generate a detailed textual Flowchart/Process Breakdown covering these 4 stages:
STAGE 1: THE EYES (The Thermal Node)
• Input: Raw 8x8 heat grid from the AMG8833 sensor.
• Process A: Explain how Bicubic Interpolation turns a blocky low-res heat map into a smooth human shape.
• Process B: Explain how the Watershed Algorithm separates merged heat blobs (people standing shoulder-to-shoulder) to count them accurately.
• Process C: Explain how the Adaptive Sliding Window checks the speed of the blobs to detect "Panic Running" vs. "Normal Walking".
STAGE 2: THE PULSE (The Guardian Band)
• Input: Raw heart rate data from the wrist.
• Process: Explain how the SQA-Phys (1D-CNN) AI filters out "dancing/clapping" noise so we don't get false alarms.
• Connectivity: Explain how the bands form a Mesh Network to talk to each other if the cell signal is down.
STAGE 3: THE BRAIN (The Decision Logic)
• Logic: If Crowd OS sees "High Velocity" (Panic) + "High Density" (Crush)...
• AND If Guardian Bands show "Biological Distress"...
• Output: Trigger System Red Alert.
STAGE 4: THE ACTION (The Organizer & Attendee)
• Organizer View: What do they see on the Crowd OS dashboard? (Live heat map, red zones).
• Attendee View: What happens to the wristband? (Vibration, LED arrow pointing to the safe exit).
Format Requirements:
• Use a "Step 1 -> Step 2 -> Step 3" visual layout.
• Use bold text for the specific algorithms (Watershed, Bicubic, SQA-Phys).
• Keep definitions simple (e.g., "Think of this like...").

--------------------------------------------------------------------------------
2. The 2-Line Description (For "Crowd OS")
"Crowd OS is a privacy-first safety platform that replaces invasive cameras with thermal sensors and smart wristbands to detect crowd pressure and prevent stampedes before they start. It works without internet to track panic levels in real-time, automatically guiding people to safety via their wristbands while protecting their identity."

--------------------------------------------------------------------------------
3. Quick Code Update (For the Dashboard)
If you are using the code provided in the previous step, update the Header Section in index.html to reflect the new name:
<div class="logo-text">
    <h1>Crowd OS</h1>
    <span class="tagline">The Operating System for Crowd Physics</span>
</div>
How does Crowd OS manage data privacy and legal compliance?
Can you explain how the mesh network handles signal interference?
How does the SQA-Phys AI differentiate between dancing and distress?
NONO GITHUB THE WEBISTE MY PRODUCT NAME IS CROWD OS

Here is the complete, professional website code for Crowd OS.
This is a single-file solution. You do not need GitHub. You can simply save this code as an .html file on your computer and open it to see your fully functional product website.
It includes the Calculator, the Technology Explainer, and the Value Proposition, all branded under Crowd OS with a modern, high-tech "Thermal/Dark Mode" aesthetic.
Instructions:
1. Copy the code block below.
2. Paste it into Notepad (Windows) or TextEdit (Mac).
3. Save the file as index.html.
4. Double-click index.html to open your website.

--------------------------------------------------------------------------------
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Crowd OS | The Operating System for Crowd Safety</title>
    <!-- Professional Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet">
    <!-- Icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <style>
        /* --- CSS STYLING --- */
        :root {
            --bg-dark: #050505;
            --surface: #0f1115;
            --surface-light: #1a1d26;
            --primary: #00f0ff; /* Thermal Cyan */
            --secondary: #ff3d00; /* Thermal Red */
            --accent: #00ff73; /* Safe Green */
            --text-main: #ffffff;
            --text-muted: #8b9bb4;
            --gradient: linear-gradient(135deg, rgba(0,240,255,0.1), rgba(255,61,0,0.05));
        }

        body {
            background-color: var(--bg-dark);
            color: var(--text-main);
            font-family: 'Inter', sans-serif;
            margin: 0;
            padding: 0;
            overflow-x: hidden;
        }

        /* Ambient Background Glow */
        .ambient-glow {
            position: fixed;
            width: 600px;
            height: 600px;
            background: radial-gradient(circle, rgba(0, 240, 255, 0.07) 0%, transparent 70%);
            top: -200px;
            left: -200px;
            z-index: -1;
            animation: pulse 10s infinite alternate;
        }

        .ambient-glow-2 {
            position: fixed;
            width: 500px;
            height: 500px;
            background: radial-gradient(circle, rgba(255, 61, 0, 0.05) 0%, transparent 70%);
            bottom: -100px;
            right: -100px;
            z-index: -1;
        }

        @keyframes pulse { 0% { opacity: 0.5; } 100% { opacity: 1; } }

        /* Container */
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }

        /* --- HEADER --- */
        nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px 0;
            border-bottom: 1px solid rgba(255,255,255,0.05);
        }

        .logo {
            font-family: 'Space Grotesk', sans-serif;
            font-size: 1.8rem;
            font-weight: 700;
            letter-spacing: -1px;
            background: linear-gradient(90deg, #fff, var(--text-muted));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .logo span { color: var(--primary); -webkit-text-fill-color: initial; }

        .btn-contact {
            background: rgba(255,255,255,0.1);
            color: #fff;
            padding: 10px 20px;
            border-radius: 50px;
            text-decoration: none;
            font-size: 0.9rem;
            transition: 0.3s;
            border: 1px solid rgba(255,255,255,0.1);
        }

        .btn-contact:hover { background: var(--primary); color: #000; border-color: var(--primary); }

        /* --- HERO SECTION --- */
        .hero {
            text-align: center;
            padding: 80px 0 60px;
        }

        h1 {
            font-size: 3.5rem;
            line-height: 1.1;
            margin-bottom: 20px;
            font-family: 'Space Grotesk', sans-serif;
        }

        h1 span {
            color: var(--primary);
            position: relative;
        }

        .hero p {
            font-size: 1.2rem;
            color: var(--text-muted);
            max-width: 700px;
            margin: 0 auto 40px;
            line-height: 1.6;
        }

        /* --- CALCULATOR DASHBOARD --- */
        .dashboard {
            background: var(--surface);
            border: 1px solid rgba(255,255,255,0.05);
            border-radius: 24px;
            padding: 40px;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 40px;
            margin-bottom: 80px;
            box-shadow: 0 20px 50px rgba(0,0,0,0.5);
        }

        /* Inputs */
        .input-section h3 { margin-top: 0; color: var(--primary); font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px; }
        
        .input-group { margin-bottom: 25px; }
        
        label {
            display: block;
            margin-bottom: 8px;
            font-weight: 500;
            color: #ccc;
        }

        .input-wrapper {
            position: relative;
        }

        .input-wrapper i {
            position: absolute;
            left: 15px;
            top: 50%;
            transform: translateY(-50%);
            color: var(--text-muted);
        }

        input {
            width: 100%;
            background: var(--surface-light);
            border: 1px solid rgba(255,255,255,0.1);
            color: #fff;
            padding: 15px 15px 15px 45px;
            border-radius: 12px;
            font-size: 1.1rem;
            font-family: 'Inter', sans-serif;
            transition: 0.3s;
            box-sizing: border-box; 
        }

        input:focus {
            outline: none;
            border-color: var(--primary);
            background: rgba(0, 240, 255, 0.05);
        }

        /* Results */
        .results-section {
            background: var(--surface-light);
            border-radius: 16px;
            padding: 30px;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }

        .result-card {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px 0;
            border-bottom: 1px solid rgba(255,255,255,0.05);
        }

        .result-card:last-child { border-bottom: none; }

        .res-label { font-size: 1rem; color: var(--text-muted); }
        .res-value { font-size: 1.8rem; font-weight: 700; font-family: 'Space Grotesk', sans-serif; }
        .highlight-cost { color: var(--accent); }

        .tech-note {
            font-size: 0.8rem;
            color: var(--text-muted);
            margin-top: 20px;
            padding: 15px;
            background: rgba(0,0,0,0.2);
            border-radius: 8px;
            line-height: 1.5;
        }

        .tech-note strong { color: #fff; }

        /* --- FEATURES GRID --- */
        .features {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 30px;
            margin-bottom: 80px;
        }

        .feature-card {
            background: var(--surface);
            padding: 30px;
            border-radius: 16px;
            border: 1px solid rgba(255,255,255,0.05);
            transition: 0.3s;
        }

        .feature-card:hover { transform: translateY(-5px); border-color: var(--primary); }

        .icon-circle {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: rgba(255,255,255,0.05);
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 20px;
            color: var(--primary);
            font-size: 1.2rem;
        }

        .feature-card h3 { margin: 0 0 10px; font-size: 1.2rem; }
        .feature-card p { color: var(--text-muted); font-size: 0.95rem; line-height: 1.6; }

        /* Footer */
        footer {
            text-align: center;
            padding: 40px;
            border-top: 1px solid rgba(255,255,255,0.05);
            color: var(--text-muted);
            font-size: 0.9rem;
        }

        /* Responsive */
        @media (max-width: 768px) {
            .dashboard { grid-template-columns: 1fr; }
            .features { grid-template-columns: 1fr; }
            h1 { font-size: 2.5rem; }
        }
    </style>
</head>
<body>

    <div class="ambient-glow"></div>
    <div class="ambient-glow-2"></div>

    <div class="container">
        <!-- Navigation -->
        <nav>
            <div class="logo"><i class="fa-solid fa-layer-group"></i> Crowd<span>OS</span></div>
            <a href="#" class="btn-contact">Contact Sales</a>
        </nav>

        <!-- Hero -->
        <section class="hero">
            <h1>Predict the Panic.<br><span>Before it Happens.</span></h1>
            <p>Crowd OS replaces invasive cameras with privacy-first thermal sensors and smart wristbands. We track <strong>physics</strong>, not faces, to prevent stampedes in real-time.</p>
        </section>

        <!-- Interactive Calculator -->
        <section class="dashboard">
            <div class="input-section">
                <h3><i class="fa-solid fa-calculator"></i> &nbsp; Estimate Your Safety Grid</h3>
                <br>
                
                <div class="input-group">
                    <label>Expected Attendees</label>
                    <div class="input-wrapper">
                        <i class="fa-solid fa-users"></i>
                        <input type="number" id="attendees" value="5000" oninput="calculate()">
                    </div>
                </div>

                <div class="input-group">
                    <label>Venue Size (sq. meters)</label>
                    <div class="input-wrapper">
                        <i class="fa-solid fa-ruler-combined"></i>
                        <input type="number" id="area" value="2500" oninput="calculate()">
                    </div>
                </div>

                <div class="input-group">
                    <label>Entry/Exit Gates</label>
                    <div class="input-wrapper">
                        <i class="fa-solid fa-door-open"></i>
                        <input type="number" id="gates" value="4" oninput="calculate()">
                    </div>
                </div>
            </div>

            <div class="results-section">
                <div class="result-card">
                    <span class="res-label">Guardian Bands Needed</span>
                    <span class="res-value" id="res-bands">0</span>
                </div>
                <div class="result-card">
                    <span class="res-label">Thermal Omni-Nodes</span>
                    <span class="res-value" id="res-nodes">0</span>
                </div>
                <div class="result-card">
                    <span class="res-label">Est. Rental Budget</span>
                    <span class="res-value highlight-cost" id="res-cost">₹ 0</span>
                </div>

                <div class="tech-note" id="logic-explanation">
                    Loading AI logic...
                </div>
            </div>
        </section>

        <!-- Features / Tech Stack -->
        <section class="features">
            <div class="feature-card">
                <div class="icon-circle"><i class="fa-solid fa-eye-low-vision"></i></div>
                <h3>Thermal Vision</h3>
                <p>Powered by the <strong>AMG8833 Sensor</strong>. We use <strong>Bicubic Interpolation</strong> to smooth heat maps and the <strong>Watershed Algorithm</strong> to count people accurately even in pitch-black darkness [1, 2].</p>
            </div>
            <div class="feature-card">
                <div class="icon-circle"><i class="fa-solid fa-heart-pulse"></i></div>
                <h3>The Guardian Band</h3>
                <p>Built on the open-source <strong>PhysioKit</strong> architecture. It uses <strong>SQA-Phys AI</strong> (1D-CNN) to filter out dancing/clapping noise, ensuring we only alert for real biological panic or falls [3, 4].</p>
            </div>
            <div class="feature-card">
                <div class="icon-circle"><i class="fa-solid fa-user-shield"></i></div>
                <h3>Privacy First</h3>
                <p>We do not use facial recognition. We classify <strong>occupancy and velocity</strong>, not identity. Fully compliant with EU AI Act standards for remote biometric categorization [5].</p>
            </div>
        </section>

        <footer>
            &copy; 2024 Crowd OS Technologies. Built for Safer Events.
        </footer>
    </div>

    <!-- JavaScript Logic -->
    <script>
        /* 
           Crowd OS Logic Engine 
           Based on AMG8833 Physics (7m range) & PhysioKit Hardware Costs
        */
        
        const CONFIG = {
            NODE_COVERAGE: 150, // 1 Node covers ~150sqm (7m radius)
            NODE_PRICE: 5000,   // Rental price in INR
            BAND_PRICE: 100,    // Rental price in INR
            BUFFER: 1.05        // 5% buffer for bands
        };

        function calculate() {
            // 1. Get inputs
            const attendees = parseInt(document.getElementById('attendees').value) || 0;
            const area = parseInt(document.getElementById('area').value) || 0;
            const gates = parseInt(document.getElementById('gates').value) || 0;

            // 2. Logic: Bands (Attendees + 5% Buffer)
            const bandsNeeded = Math.ceil(attendees * CONFIG.BUFFER);

            // 3. Logic: Nodes
            // Area Nodes: Total Area / Coverage of one sensor (AMG8833)
            const areaNodes = Math.ceil(area / CONFIG.NODE_COVERAGE);
            // Gate Nodes: 2 per gate (Inflow + Outflow velocity tracking)
            const gateNodes = gates * 2;
            const totalNodes = areaNodes + gateNodes;

            // 4. Logic: Cost
            const totalCost = (bandsNeeded * CONFIG.BAND_PRICE) + (totalNodes * CONFIG.NODE_PRICE);

            // 5. Update UI with Animation
            document.getElementById('res-bands').innerText = bandsNeeded.toLocaleString();
            document.getElementById('res-nodes').innerText = totalNodes.toLocaleString();
            document.getElementById('res-cost').innerText = "₹ " + totalCost.toLocaleString('en-IN');

            // 6. Technical Explanation Update
            const techText = `
                <strong>System Logic Applied:</strong><br>
                • <strong>${gateNodes} Gate Nodes</strong> running <em>Adaptive Sliding Window</em> to detect panic velocity.<br>
                • <strong>${areaNodes} Zone Nodes</strong> using <em>Watershed Segmentation</em> for density counting.<br>
                • <strong>${bandsNeeded} Bands</strong> forming a Mesh Network for child tracking.
            `;
            document.getElementById('logic-explanation').innerHTML = techText;
        }

        // Initialize
        calculate();
    </script>
</body>
</html>
