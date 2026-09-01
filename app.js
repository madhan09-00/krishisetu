/**
 * KrishiSetu - SIH26033 Web Prototype Engine
 * Direct Farm-to-Fork Disintermediation Platform
 */

// Global State
let currentRole = 'farmer';
let currentLanguage = 'en';
let currentCrop = 'tomato';
let isRecording = false;
let recognition = null;
let marginChart = null;
let leafletMap = null;

// Multilingual Translations Dictionary
const translations = {
    en: {
        farmer_welcome: "Namaste Ramesh Ji! Sell directly, zero middleman commission.",
        farmer_sub: "Get +35% higher realization with AI Quality Certification & Shared Cluster Logistics.",
        voice_title: "🎙️ AI Multilingual Voice Assistant (Bhashini AI)",
        voice_desc: "Speak in Hindi, Marathi, Telugu, Tamil or English to instantly list produce.",
        voice_try: "Click Mic & Say: \"I have harvested 500 kg Grade A Tomatoes in Nashik\"",
        vision_title: "📷 Edge AI Crop Quality Grading (Computer Vision)",
        price_title: "📊 Dynamic Fair-Price Corridor",
        logistics_title: "🚚 Micro-Hub Freight Pooling",
        buyer_welcome: "Farm Fresh Produce Direct from Verified FPOs",
        ministry_title: "National Agricultural Disintermediation & Price Spread Intelligence"
    },
    hi: {
        farmer_welcome: "नमस्ते रमेश जी! सीधे बेचें, बिना किसी बिचौलिये और आढ़ती कमीशन के।",
        farmer_sub: "AI गुणवत्ता प्रमाणन और सामूहिक परिवहन से 35% अधिक आय प्राप्त करें।",
        voice_title: "🎙️ बहुभाषी वॉइस AI सहायक (भाषिणी AI)",
        voice_desc: "अपनी भाषा में बोलकर तुरंत अपनी फसल का विवरण दर्ज करें।",
        voice_try: "माइक दबाकर बोलें: \"मैंने नासिक में 500 किलो ताजा टमाटर तोड़ा है\"",
        vision_title: "📷 एज AI फसल गुणवत्ता मूल्यांकन (कंप्यूटर विजन)",
        price_title: "📊 सटीक एवं न्यायसंगत मूल्य गलियारा",
        logistics_title: "🚚 साझा ग्रामीण माल ढुलाई (Micro-Hub)",
        buyer_welcome: "सत्यापित किसान समूहों (FPO) से सीधे ताजी सब्जियां और फल",
        ministry_title: "राष्ट्रीय कृषि मूल्य अंतर एवं प्रत्यक्ष आपूर्ति निगरानी डैशबोर्ड"
    },
    mr: {
        farmer_welcome: "नमस्कार रमेश जी! थेट विक्री करा, कोणतीही दलाली किंवा कमिशन नाही.",
        farmer_sub: "AI गुणवत्ता प्रमाणपत्र आणि सामायिक वाहतुकीने 35% जास्त नफा मिळवा.",
        voice_title: "🎙️ बहुभाषिक व्हॉईस AI सहाय्यक (भाषिणी AI)",
        voice_desc: "मराठीत बोलून आपली शेतमालाची नोंदणी तात्काळ पूर्ण करा.",
        voice_try: "माइकवर क्लिक करा आणि बोला: \"माझ्याकडे 400 किलो कांदा तयार आहे\"",
        vision_title: "📷 Edge AI पीक गुणवत्ता तपासणी (संगणक दृष्टी)",
        price_title: "📊 रास्त दर निर्धारण इंजिन",
        logistics_title: "🚚 सामायिक वाहतूक व संकलन केंद्र",
        buyer_welcome: "थेट शेतातून ताजा भाजीपाला व फळे खरेदी करा",
        ministry_title: "राष्ट्रीय शेतीमालाची थेट पुरवठा व किंमत नियंत्रण प्रणाली"
    },
    te: {
        farmer_welcome: "నమస్కారం రమేష్ గారు! దళారులు లేకుండా నేరుగా విక్రయించండి.",
        farmer_sub: "AI క్వాలిటీ సర్టిఫికేషన్ మరియు షేర్డ్ లాజిస్టిక్స్ తో 35% ఎక్కువ లాభం పొందండి.",
        voice_title: "🎙️ వాయిస్ AI అసిస్టెంట్ (భాషిణి AI)",
        voice_desc: "తెలుగులో మాట్లాడి మీ పంటను సులభంగా నమోదు చేయండి.",
        voice_try: "మైక్ క్లిక్ చేయండి: \"నా దగ్గర 500 కిలోల తాజా టమోటాలు ఉన్నాయి\"",
        vision_title: "📷 AI పంట నాణ్యత తనిఖీ",
        price_title: "📊 సరసమైన ధరల కారిడార్",
        logistics_title: "🚚 షేర్డ్ రూరల్ లాజిస్టిక్స్",
        buyer_welcome: "రైతుల నుండి నేరుగా తాజా ఉత్పత్తులు",
        ministry_title: "జాతీయ వ్యవసాయ ధరల పర్యవేక్షణ వేదిక"
    },
    ta: {
        farmer_welcome: "வணக்கம் ரமேஷ் அவர்களே! இடைத்தரகர்கள் இல்லாமல் நேரடியாக விற்கவும்.",
        farmer_sub: "AI தரச் சான்றிதழ் மற்றும் பகிர்ந்த போக்குவரத்து மூலம் 35% கூடுதல் லாபம் பெறுங்கள்.",
        voice_title: "🎙️ குரல் AI உதவியாளர் (பாஷினி AI)",
        voice_desc: "தமிழில் பேசி உங்கள் விளைச்சலை உடனடியாக பட்டியலிடுங்கள்.",
        voice_try: "மைக் அழுத்தவும்: \"என்னிடம் 500 கிலோ தக்காளி உள்ளது\"",
        vision_title: "📷 AI பயிர் தர மதிப்பீடு",
        price_title: "📊 நியாயமான விலை நிர்ணயம்",
        logistics_title: "🚚 கிராமப்புற பகிர்வு போக்குவரத்து",
        buyer_welcome: "விவசாயிகளிடமிருந்து நேரடியாக புதிய விளைபொருட்கள்",
        ministry_title: "தேசிய விவசாய விலை கண்காணிப்பு தளம்"
    }
};

// Sample Produce Lots for Buyer Portal
const buyerProduceList = [
    {
        id: "LOT-901",
        name: "Fresh Hybrid Tomatoes",
        farmer: "Ramesh Patil",
        fpo: "Sahyadri Farmers Producer Co., Nashik",
        qty: "500 kg batch",
        grade: "GRADE A+",
        freshness: "96.4%",
        harvested: "4 hrs ago",
        price: 28,
        mandiPrice: 14.5,
        retailPrice: 45,
        image: "🍅",
        color: "bg-red-500/10 border-red-200 text-red-700"
    },
    {
        id: "LOT-902",
        name: "Premium Red Onions (Export)",
        farmer: "Suresh More",
        fpo: "Lasalgaon Agro FPO, Maharashtra",
        qty: "800 kg batch",
        grade: "GRADE A",
        freshness: "94.8%",
        harvested: "10 hrs ago",
        price: 32,
        mandiPrice: 19.0,
        retailPrice: 50,
        image: "🧅",
        color: "bg-purple-500/10 border-purple-200 text-purple-700"
    },
    {
        id: "LOT-903",
        name: "Royal Delicious Himachal Apples",
        farmer: "Deepak Sharma",
        fpo: "Kinnaur Orchard Federation, HP",
        qty: "350 kg crates",
        grade: "GRADE A+",
        freshness: "98.2%",
        harvested: "18 hrs ago",
        price: 110,
        mandiPrice: 65.0,
        retailPrice: 180,
        image: "🍎",
        color: "bg-rose-500/10 border-rose-200 text-rose-700"
    },
    {
        id: "LOT-904",
        name: "Jyoti Potatoes (Peeled Clean)",
        farmer: "Ganesh Jadhav",
        fpo: "Satara Agri Union, Maharashtra",
        qty: "1,200 kg batch",
        grade: "GRADE B+",
        freshness: "92.0%",
        harvested: "1 day ago",
        price: 22,
        mandiPrice: 12.0,
        retailPrice: 38,
        image: "🥔",
        color: "bg-amber-500/10 border-amber-200 text-amber-800"
    },
    {
        id: "LOT-905",
        name: "Organic Green Cauliflower",
        farmer: "Anand Verma",
        fpo: "Pune Organic Collective",
        qty: "400 kg crates",
        grade: "GRADE A+",
        freshness: "97.5%",
        harvested: "6 hrs ago",
        price: 35,
        mandiPrice: 18.0,
        retailPrice: 60,
        image: "🥦",
        color: "bg-emerald-500/10 border-emerald-200 text-emerald-800"
    },
    {
        id: "LOT-906",
        name: "Crisp Green Capsicum",
        farmer: "Pooja Deshmukh",
        fpo: "Baramati Polyhouse Cluster",
        qty: "300 kg crates",
        grade: "GRADE A",
        freshness: "95.1%",
        harvested: "5 hrs ago",
        price: 45,
        mandiPrice: 24.0,
        retailPrice: 75,
        image: "🫑",
        color: "bg-green-500/10 border-green-200 text-green-800"
    }
];

// Agmarknet State-wise Live Tracker Data
const stateMandiData = [
    { crop: "Tomato (Hybrid)", cluster: "Nashik, Maharashtra", mandi: "₹14.50", krishi: "₹28.00", retail: "₹45.00", gain: "+93%", status: "Active Cluster" },
    { crop: "Onion (Red)", cluster: "Lasalgaon, Maharashtra", mandi: "₹19.00", krishi: "₹32.00", retail: "₹50.00", gain: "+68%", status: "Active Cluster" },
    { crop: "Potato (Jyoti)", cluster: "Agra, Uttar Pradesh", mandi: "₹11.80", krishi: "₹21.50", retail: "₹36.00", gain: "+82%", status: "Pooling 85%" },
    { crop: "Apple (Royal)", cluster: "Kinnaur, Himachal Pradesh", mandi: "₹65.00", krishi: "₹110.00", retail: "₹180.00", gain: "+69%", status: "Dispatched" },
    { crop: "Green Chilli", cluster: "Guntur, Andhra Pradesh", mandi: "₹38.00", krishi: "₹62.00", retail: "₹95.00", gain: "+63%", status: "Active Cluster" },
    { crop: "Basmati Paddy", cluster: "Karnal, Haryana", mandi: "₹34.00", krishi: "₹48.00", retail: "₹78.00", gain: "+41%", status: "Direct FPO" }
];

// Initialize on Window Load
document.addEventListener("DOMContentLoaded", () => {
    lucide.createIcons();
    initSpeechRecognition();
    drawCropCanvas('tomato');
    renderBuyerProduce();
    renderMandiTable();
    initMarginChart();
});

// Role Switcher
function switchRole(role) {
    currentRole = role;
    
    // Update Desktop Tabs
    document.querySelectorAll('.role-tab').forEach(tab => tab.classList.remove('active'));
    const activeTab = document.getElementById(`tab-${role}`);
    if (activeTab) activeTab.classList.add('active');

    // Update Mobile Tabs
    document.querySelectorAll('.mobile-role-tab').forEach(tab => tab.classList.remove('active-mobile', 'text-slate-900'));
    const activeMob = document.getElementById(`mob-${role}`);
    if (activeMob) activeMob.classList.add('active-mobile');

    // Toggle Role Sections
    document.getElementById('role-section-farmer').classList.add('hidden');
    document.getElementById('role-section-buyer').classList.add('hidden');
    document.getElementById('role-section-ministry').classList.add('hidden');
    
    document.getElementById(`role-section-${role}`).classList.remove('hidden');

    // Update Identity Badge
    const badge = document.getElementById('user-badge');
    if (role === 'farmer') {
        badge.innerText = "Ramesh Patil (Nashik FPO)";
    } else if (role === 'buyer') {
        badge.innerText = "Gokuldham Society / Bulk Buyer";
    } else {
        badge.innerText = "Director (Price Surveillance), MoCA";
        setTimeout(initMapIfNeeded, 200);
        if (marginChart) marginChart.resize();
    }

    lucide.createIcons();
}

// Multilingual Translation Handler
function changeLanguage(lang) {
    currentLanguage = lang;
    const texts = translations[lang] || translations.en;

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (texts[key]) {
            el.innerText = texts[key];
        }
    });

    showToast(`Language switched to ${lang.toUpperCase()}`);
}

// Web Speech API / Voice Assistant Handler
function initSpeechRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
        recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;

        recognition.onstart = () => {
            isRecording = true;
            document.getElementById('voice-status').innerText = "🔴 Listening...";
            document.getElementById('voice-status').className = "text-[11px] text-red-600 font-bold animate-pulse";
            document.getElementById('mic-btn').classList.add('ring-4', 'ring-red-400');
        };

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            processVoiceInput(transcript);
        };

        recognition.onerror = (event) => {
            console.warn("Speech recognition error:", event.error);
            stopVoiceRecording();
        };

        recognition.onend = () => {
            stopVoiceRecording();
        };
    }
}

function toggleVoiceRecording() {
    if (!recognition) {
        // Fallback simulation if browser speech recognition is blocked or unsupported
        simulateVoiceInput('hi', 'मैंने नासिक में 500 किलो ताजा टमाटर तोड़ा है');
        return;
    }

    if (isRecording) {
        recognition.stop();
    } else {
        const langMap = { en: 'en-IN', hi: 'hi-IN', mr: 'mr-IN', te: 'te-IN', ta: 'ta-IN' };
        recognition.lang = langMap[currentLanguage] || 'hi-IN';
        try {
            recognition.start();
        } catch (e) {
            simulateVoiceInput('hi', 'मैंने नासिक में 500 किलो ताजा टमाटर तोड़ा है');
        }
    }
}

function stopVoiceRecording() {
    isRecording = false;
    document.getElementById('voice-status').innerText = "Idle";
    document.getElementById('voice-status').className = "text-[11px] text-slate-500 font-medium";
    document.getElementById('mic-btn').classList.remove('ring-4', 'ring-red-400');
}

function simulateVoiceInput(lang, sampleText) {
    const transcriptEl = document.getElementById('voice-transcript');
    transcriptEl.innerHTML = `<span class="text-slate-900 font-semibold">"${sampleText}"</span>`;
    
    showToast("Processing Voice Note via Bhashini AI...");

    // Voice Synthesis response
    speakFeedback("आपकी फसल का विवरण सफलतापूर्वक समझ लिया गया है।");

    processVoiceInput(sampleText);
}

function processVoiceInput(text) {
    const transcriptEl = document.getElementById('voice-transcript');
    transcriptEl.innerHTML = `<span class="text-slate-900 font-semibold">"${text}"</span>`;

    // Smart Entity Extraction Mock
    if (text.includes('कांदा') || text.includes('प्याज') || text.includes('onion')) {
        document.getElementById('form-crop').value = "Red Onion (Pyaaz)";
        document.getElementById('form-qty').value = "400";
        document.getElementById('form-price').value = "₹32 / kg";
        runVisionScan('onion');
    } else {
        document.getElementById('form-crop').value = "Tomato (Tamatar)";
        document.getElementById('form-qty').value = "500";
        document.getElementById('form-price').value = "₹28 / kg";
        runVisionScan('tomato');
    }

    showToast("✅ Produce details auto-filled from voice!");
}

function speakFeedback(text) {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'hi-IN';
        utterance.rate = 1.0;
        window.speechSynthesis.speak(utterance);
    }
}

// Edge AI Computer Vision Simulation & Canvas Rendering
function runVisionScan(cropType) {
    currentCrop = cropType;

    // Update Button States
    document.querySelectorAll('.crop-select-btn').forEach(btn => btn.classList.remove('active-crop'));
    const btn = document.getElementById(`btn-${cropType}`);
    if (btn) btn.classList.add('active-crop');

    // Trigger Laser Scan Effect
    const laser = document.getElementById('scanLaser');
    laser.classList.remove('hidden');

    drawCropCanvas(cropType);

    // Update Quality Metrics
    if (cropType === 'tomato') {
        updateQualityMetrics('GRADE A+', 'Certified Premium Export', '96.4%', 96, '< 1.8%', 5, '94.0%', 94, '₹14.50', '₹28.00', '₹45.00');
    } else if (cropType === 'onion') {
        updateQualityMetrics('GRADE A', 'Standard Grade 1 (Lasalgaon)', '94.8%', 94, '< 2.5%', 8, '91.5%', 91, '₹19.00', '₹32.00', '₹50.00');
    } else if (cropType === 'apple') {
        updateQualityMetrics('GRADE A+', 'Himachal Royal Delicious', '98.2%', 98, '< 0.5%', 2, '97.0%', 97, '₹65.00', '₹110.00', '₹180.00');
    }

    showToast(`AI Scanner: Analyzed ${cropType.toUpperCase()} lot with 99.2% confidence`);
}

function updateQualityMetrics(grade, title, freshTxt, freshVal, defTxt, defVal, sizeTxt, sizeVal, pMandi, pKrishi, pRetail) {
    document.getElementById('grade-badge').innerText = grade;
    document.getElementById('grade-title').innerText = title;
    
    document.getElementById('metric-freshness').innerText = freshTxt;
    document.getElementById('bar-freshness').style.width = `${freshVal}%`;

    document.getElementById('metric-defect').innerText = defTxt;
    document.getElementById('bar-defect').style.width = `${defVal}%`;

    document.getElementById('metric-size').innerText = sizeTxt;
    document.getElementById('bar-size').style.width = `${sizeVal}%`;

    document.getElementById('price-mandi').innerText = `${pMandi} / kg`;
    document.getElementById('price-krishi').innerText = `${pKrishi} / kg`;
    document.getElementById('price-retail').innerText = `${pRetail} / kg`;
}

function drawCropCanvas(cropType) {
    const canvas = document.getElementById('visionCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;

    ctx.clearRect(0, 0, w, h);

    // Background Gradient (Simulating Crate / Surface)
    const bgGrad = ctx.createLinearGradient(0, 0, w, h);
    bgGrad.addColorStop(0, '#1e293b');
    bgGrad.addColorStop(1, '#0f172a');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, w, h);

    // Draw Synthetic Produce & AI Bounding Boxes
    const items = [
        { x: 90, y: 80, r: 42, color: cropType === 'tomato' ? '#ef4444' : (cropType === 'onion' ? '#a855f7' : '#dc2626'), label: `${cropType.toUpperCase()} #1: 98% (Grade A)` },
        { x: 210, y: 110, r: 48, color: cropType === 'tomato' ? '#dc2626' : (cropType === 'onion' ? '#9333ea' : '#b91c1c'), label: `${cropType.toUpperCase()} #2: 97% (Grade A)` },
        { x: 310, y: 75, r: 40, color: cropType === 'tomato' ? '#f87171' : (cropType === 'onion' ? '#c084fc' : '#ef4444'), label: `${cropType.toUpperCase()} #3: 95% (Ripe)` }
    ];

    items.forEach(item => {
        // Draw Crop Circle
        ctx.beginPath();
        const radGrad = ctx.createRadialGradient(item.x - 10, item.y - 10, 5, item.x, item.y, item.r);
        radGrad.addColorStop(0, '#ffffff');
        radGrad.addColorStop(0.3, item.color);
        radGrad.addColorStop(1, '#000000');
        ctx.fillStyle = radGrad;
        ctx.arc(item.x, item.y, item.r, 0, Math.PI * 2);
        ctx.fill();

        // Draw Stem / Detail
        ctx.fillStyle = '#22c55e';
        ctx.beginPath();
        ctx.arc(item.x, item.y - item.r + 5, 6, 0, Math.PI * 2);
        ctx.fill();

        // Draw YOLO AI Bounding Box
        const bx = item.x - item.r - 8;
        const by = item.y - item.r - 8;
        const bw = (item.r * 2) + 16;
        const bh = (item.r * 2) + 16;

        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 2]);
        ctx.strokeRect(bx, by, bw, bh);
        ctx.setLineDash([]);

        // Label Tag
        ctx.fillStyle = 'rgba(16, 185, 129, 0.9)';
        ctx.fillRect(bx, by - 16, 130, 15);
        ctx.fillStyle = '#ffffff';
        ctx.font = '10px monospace';
        ctx.fillText(item.label, bx + 4, by - 4);
    });
}

function publishCertifiedListing() {
    showToast("🎉 Lot certified & published directly to 40+ Consumer Housing Societies!");
    setTimeout(() => {
        switchRole('buyer');
    }, 1200);
}

// Buyer Produce Cards Renderer
function renderBuyerProduce() {
    const grid = document.getElementById('buyer-produce-grid');
    if (!grid) return;

    grid.innerHTML = buyerProduceList.map(item => `
        <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition flex flex-col justify-between">
            <div class="p-5 space-y-3">
                <div class="flex justify-between items-start">
                    <div class="w-12 h-12 rounded-2xl ${item.color} flex items-center justify-center text-2xl shadow-inner">
                        ${item.image}
                    </div>
                    <div class="text-right">
                        <span class="bg-emerald-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded shadow-sm">${item.grade}</span>
                        <div class="text-[11px] text-emerald-700 font-bold mt-1">● ${item.freshness} Freshness</div>
                    </div>
                </div>

                <div>
                    <h3 class="font-extrabold text-slate-800 text-base">${item.name}</h3>
                    <div class="text-xs text-slate-500 font-medium">🧑‍🌾 ${item.farmer} • <span class="text-slate-600">${item.fpo}</span></div>
                </div>

                <div class="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-xs">
                    <div>
                        <span class="text-slate-400">Direct Farm Price:</span>
                        <div class="text-lg font-black text-emerald-700">₹${item.price} <span class="text-xs font-normal text-slate-500">/ kg</span></div>
                    </div>
                    <div class="text-right">
                        <span class="text-slate-400">Supermarket Price:</span>
                        <div class="text-sm font-semibold text-slate-400 line-through">₹${item.retailPrice} / kg</div>
                        <span class="text-[10px] text-emerald-600 font-bold">Save ₹${item.retailPrice - item.price}/kg</span>
                    </div>
                </div>
            </div>

            <div class="p-4 bg-slate-50 border-t border-slate-100 flex gap-2">
                <button onclick="openEscrowModal()" class="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 rounded-xl text-xs shadow-sm transition flex items-center justify-center gap-1.5">
                    <i data-lucide="shield-check" class="w-3.5 h-3.5"></i> Order via Escrow
                </button>
                <button onclick="showToast('Added to society group pool!')" class="px-3 bg-white border border-slate-200 hover:bg-slate-100 rounded-xl text-slate-700 text-xs font-bold">
                    + Pool
                </button>
            </div>
        </div>
    `).join('');

    lucide.createIcons();
}

// Mandi Price Table Renderer
function renderMandiTable() {
    const tbody = document.getElementById('mandi-table-body');
    if (!tbody) return;

    tbody.innerHTML = stateMandiData.map(row => `
        <tr class="hover:bg-slate-50 transition">
            <td class="py-3 px-4 font-bold text-slate-800">${row.crop}</td>
            <td class="py-3 px-4 text-slate-600">${row.cluster}</td>
            <td class="py-3 px-4 font-semibold text-red-700">${row.mandi}</td>
            <td class="py-3 px-4 font-extrabold text-emerald-700">${row.krishi}</td>
            <td class="py-3 px-4 font-semibold text-slate-600 line-through">${row.retail}</td>
            <td class="py-3 px-4 text-center"><span class="bg-emerald-100 text-emerald-900 font-bold px-2 py-0.5 rounded text-[11px]">${row.gain}</span></td>
            <td class="py-3 px-4 text-center"><span class="bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded text-[10px] font-semibold">${row.status}</span></td>
        </tr>
    `).join('');
}

// Ministry Chart.js Margin Comparison Chart
function initMarginChart() {
    const ctx = document.getElementById('marginComparisonChart');
    if (!ctx) return;

    marginChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Traditional 5-Tier Intermediary Model', 'KrishiSetu Direct Disintermediated Model'],
            datasets: [
                {
                    label: 'Farmer Realization %',
                    data: [28.5, 68.4],
                    backgroundColor: '#16a34a'
                },
                {
                    label: 'Logistics & Micro-Hub %',
                    data: [14.0, 7.6],
                    backgroundColor: '#3b82f6'
                },
                {
                    label: 'Post-Harvest Spoilage & Waste %',
                    data: [18.5, 4.0],
                    backgroundColor: '#f59e0b'
                },
                {
                    label: 'Middlemen Commission & Markups %',
                    data: [39.0, 0.0],
                    backgroundColor: '#ef4444'
                },
                {
                    label: 'Consumer Price Savings %',
                    data: [0.0, 20.0],
                    backgroundColor: '#10b981'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: { stacked: true },
                y: {
                    stacked: true,
                    max: 100,
                    ticks: {
                        callback: val => val + '%'
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: { boxWidth: 12, font: { size: 11 } }
                },
                tooltip: {
                    callbacks: {
                        label: ctx => `${ctx.dataset.label}: ${ctx.raw}%`
                    }
                }
            }
        }
    });
}

// Leaflet Map Initialization for Supply Chain Corridors
function initMapIfNeeded() {
    if (leafletMap || !document.getElementById('map')) return;

    // Center on Maharashtra corridor (Nashik -> Pune -> Mumbai)
    leafletMap = L.map('map').setView([19.4, 73.5], 8);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap'
    }).addTo(leafletMap);

    // Nodes: Nashik Cluster, Lasalgaon, Mumbai Consumer Hub
    const nashik = [19.9975, 73.7898];
    const lasalgaon = [20.1472, 74.2255];
    const mumbai = [19.0760, 72.8777];
    const pune = [18.5204, 73.8567];

    // Markers
    L.circleMarker(nashik, { color: '#16a34a', radius: 8, fillOpacity: 0.9 })
        .bindPopup('<b>Nashik Farm Micro-Hub #4</b><br>Active Yield: 2,450 kg Pooled')
        .addTo(leafletMap);

    L.circleMarker(lasalgaon, { color: '#9333ea', radius: 7, fillOpacity: 0.9 })
        .bindPopup('<b>Lasalgaon Onion Cluster</b><br>Active Yield: 3,800 kg Pooled')
        .addTo(leafletMap);

    L.circleMarker(mumbai, { color: '#2563eb', radius: 10, fillOpacity: 0.9 })
        .bindPopup('<b>Mumbai Urban Consumer Hub</b><br>Gokuldham Society & 14 Retailers')
        .addTo(leafletMap);

    // Direct Transit Route Lines
    L.polyline([nashik, mumbai], { color: '#16a34a', weight: 4, opacity: 0.8, dashArray: '6, 6' }).addTo(leafletMap);
    L.polyline([lasalgaon, mumbai], { color: '#9333ea', weight: 3, opacity: 0.8, dashArray: '6, 6' }).addTo(leafletMap);
}

// Farmer Authentication & Login Modal Handlers
function openFarmerLoginModal() {
    const modal = document.getElementById('farmer-login-modal');
    if (modal) modal.classList.remove('hidden');
}

function closeFarmerLoginModal() {
    const modal = document.getElementById('farmer-login-modal');
    if (modal) modal.classList.add('hidden');
}

function switchLoginTab(tab) {
    // Tab Button Styling
    ['otp', 'voice', 'aadhaar'].forEach(t => {
        const btn = document.getElementById(`login-tab-${t}`);
        const form = document.getElementById(`login-form-${t}`);
        if (btn && form) {
            if (t === tab) {
                btn.className = "flex-1 py-1.5 rounded-lg bg-white text-emerald-700 shadow-sm flex items-center justify-center gap-1 font-bold transition";
                form.classList.remove('hidden');
            } else {
                btn.className = "flex-1 py-1.5 rounded-lg hover:text-slate-900 flex items-center justify-center gap-1 transition text-slate-600";
                form.classList.add('hidden');
            }
        }
    });
}

function fetchAgriStackLandRecord() {
    const khasra = document.getElementById('land-khasra-input').value || "142/A";
    const state = document.getElementById('land-state-select').value;
    const dist = document.getElementById('land-district-input').value;
    const recordCard = document.getElementById('fetched-land-record');

    showToast(`Querying State Land Registry API for Khasra #${khasra}...`);

    recordCard.innerHTML = `
        <div class="flex items-center justify-center py-3 text-amber-400 space-x-2 animate-pulse">
            <span>⏳ Querying AgriStack & Bhulekh DPI Gateway...</span>
        </div>
    `;

    setTimeout(() => {
        if (khasra === "142/A" || khasra.includes("142")) {
            recordCard.innerHTML = `
                <div class="flex justify-between items-center border-b border-slate-800 pb-1.5">
                    <span class="text-emerald-400 font-bold flex items-center gap-1">
                        <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> AGRISTACK API: RECORD VERIFIED
                    </span>
                    <span class="text-[10px] text-slate-400">7/12 Utteara #${khasra}</span>
                </div>
                <div class="grid grid-cols-2 gap-x-2 gap-y-1 text-[11px]">
                    <div><span class="text-slate-400">Title Owner:</span> <strong class="text-white">Ramesh Patil</strong></div>
                    <div><span class="text-slate-400">Land Area:</span> <strong class="text-emerald-300">3.50 Acres</strong></div>
                    <div><span class="text-slate-400">Crop (e-Pik):</span> <strong class="text-white">Tomato (Hybrid)</strong></div>
                    <div><span class="text-slate-400">Geo-Polygon:</span> <strong class="text-emerald-300">19.997° N, 73.789° E</strong></div>
                </div>
            `;
            showToast("✅ Land Record & Active Crop Sowing verified!");
        } else {
            recordCard.innerHTML = `
                <div class="flex justify-between items-center border-b border-slate-800 pb-1.5">
                    <span class="text-emerald-400 font-bold flex items-center gap-1">
                        <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> AGRISTACK API: RECORD VERIFIED
                    </span>
                    <span class="text-[10px] text-slate-400">Khasra #${khasra} (${dist})</span>
                </div>
                <div class="grid grid-cols-2 gap-x-2 gap-y-1 text-[11px]">
                    <div><span class="text-slate-400">Title Owner:</span> <strong class="text-white">Suresh More</strong></div>
                    <div><span class="text-slate-400">Land Area:</span> <strong class="text-emerald-300">4.20 Acres</strong></div>
                    <div><span class="text-slate-400">Crop (e-Pik):</span> <strong class="text-white">Red Onion (Lasalgaon)</strong></div>
                    <div><span class="text-slate-400">Geo-Polygon:</span> <strong class="text-emerald-300">20.147° N, 74.225° E</strong></div>
                </div>
            `;
            showToast("✅ Land Record & Active Crop Sowing verified!");
        }
    }, 600);
}

function submitFarmerLogin(name, phone, cluster) {
    closeFarmerLoginModal();
    
    // Update Profile Badge
    const badge = document.getElementById('user-badge');
    if (badge) badge.innerText = name;
    
    const profileBadge = document.getElementById('user-profile-badge');
    if (profileBadge) profileBadge.classList.remove('hidden');

    const loginNavBtn = document.getElementById('login-nav-btn');
    if (loginNavBtn) {
        document.getElementById('login-btn-text').innerText = "Switch Farmer";
    }

    // Switch view to farmer role
    switchRole('farmer');

    // Voice & Toast feedback
    speakFeedback(`स्वागत है ${name.split(' ')[0]} जी! आपका किसान सेतु खाता सफलतापूर्वक सक्रिय हो गया है।`);
    showToast(`✅ Welcome, ${name}! PM-KISAN Verified.`);
}

function handleFarmerLogout() {
    const badge = document.getElementById('user-badge');
    if (badge) badge.innerText = "Guest (Not Logged In)";

    const profileBadge = document.getElementById('user-profile-badge');
    if (profileBadge) profileBadge.classList.add('hidden');

    const loginNavBtn = document.getElementById('login-nav-btn');
    if (loginNavBtn) {
        document.getElementById('login-btn-text').innerText = "Farmer Login";
    }

    showToast("ℹ️ Logged out. Tap Farmer Login to sign in.");
    openFarmerLoginModal();
}

function simulateVoiceBiometricAuth() {
    showToast("🎙️ Listening to voiceprint... Analyzing acoustics via Bhashini AI");
    
    setTimeout(() => {
        submitFarmerLogin('Ramesh Patil (Nashik FPO)', '9823014567', 'Nashik Cluster #4');
    }, 1400);
}

// Anti-Fraud & Middleman Intrusion Detection Handlers
function openFraudModal() {
    const modal = document.getElementById('fraud-shield-modal');
    if (modal) {
        modal.classList.remove('hidden');
        simulateFraudCheck('trader');
    }
}

function closeFraudModal() {
    const modal = document.getElementById('fraud-shield-modal');
    if (modal) modal.classList.add('hidden');
}

function simulateFraudCheck(type) {
    const traderBtn = document.getElementById('sim-btn-trader');
    const genuineBtn = document.getElementById('sim-btn-genuine');
    const stepsContainer = document.getElementById('fraud-pipeline-steps');
    const verdictCard = document.getElementById('fraud-verdict-card');
    const statusBadge = document.getElementById('pipeline-status-badge');

    if (type === 'trader') {
        traderBtn.className = "p-3 bg-red-50 border-2 border-red-500 rounded-2xl text-left transition space-y-1";
        genuineBtn.className = "p-3 bg-slate-50 border border-slate-200 rounded-2xl text-left transition space-y-1 hover:border-emerald-300";
        statusBadge.className = "bg-red-500/20 text-red-400 text-[10px] px-2 py-0.5 rounded";
        statusBadge.innerText = "🚨 MIDDLEMAN ATTACK DETECTED";

        stepsContainer.innerHTML = `
            <div class="text-amber-400 flex items-center gap-1.5 animate-pulse">
                <span>[CHECK 1/5]</span> AgriStack / Bhulekh Land Record: Khasra #9042... <span class="text-red-400 font-bold">⚠️ MISMATCH (Commercial Mandi Warehouse, Zero Farmland)</span>
            </div>
            <div class="text-slate-300 flex items-center gap-1.5">
                <span>[CHECK 2/5]</span> EXIF GPS Geo-Fencing: Lat 19.076, Lon 72.877... <span class="text-red-400 font-bold">❌ FAILED (Device at Vashi APMC Mandi, 165 km from registered farm)</span>
            </div>
            <div class="text-slate-300 flex items-center gap-1.5">
                <span>[CHECK 3/5]</span> Acreage vs Yield AI Anomaly: 40,000 kg declared on 0.5 Acre... <span class="text-red-400 font-bold">❌ ANOMALY (+450% Biological Cap)</span>
            </div>
            <div class="text-slate-300 flex items-center gap-1.5">
                <span>[CHECK 4/5]</span> PFMS Direct DBT Bank Audit: Third-party commercial current account... <span class="text-red-400 font-bold">❌ BLOCKED</span>
            </div>
        `;

        verdictCard.className = "p-4 rounded-2xl border border-red-300 bg-red-50 text-red-950 flex items-start gap-3";
        verdictCard.innerHTML = `
            <div class="w-8 h-8 rounded-xl bg-red-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                <i data-lucide="shield-x" class="w-5 h-5"></i>
            </div>
            <div class="space-y-1">
                <h4 class="font-extrabold text-sm text-red-900">🚨 Access Denied: Commercial Intermediary Detected</h4>
                <p class="text-xs text-red-800">KrishiSetu blocked this listing from entering the system. The rogue trader cannot disguise bulk mandi hoards as farmer produce.</p>
            </div>
        `;
    } else {
        genuineBtn.className = "p-3 bg-emerald-50 border-2 border-emerald-500 rounded-2xl text-left transition space-y-1";
        traderBtn.className = "p-3 bg-slate-50 border border-slate-200 rounded-2xl text-left transition space-y-1 hover:border-red-300";
        statusBadge.className = "bg-emerald-500/20 text-emerald-400 text-[10px] px-2 py-0.5 rounded";
        statusBadge.innerText = "✅ 100% GENUINE FARMER VERIFIED";

        stepsContainer.innerHTML = `
            <div class="text-emerald-400 flex items-center gap-1.5">
                <span>[CHECK 1/5]</span> AgriStack / Bhulekh Land Record: Khasra #142/A (Nashik)... <span class="text-emerald-300 font-bold">✅ MATCHED (Ramesh Patil, 3.5 Acres)</span>
            </div>
            <div class="text-emerald-400 flex items-center gap-1.5">
                <span>[CHECK 2/5]</span> EXIF GPS Geo-Fencing: Lat 19.997, Lon 73.789... <span class="text-emerald-300 font-bold">✅ MATCHED (Inside registered farm perimeter)</span>
            </div>
            <div class="text-emerald-400 flex items-center gap-1.5">
                <span>[CHECK 3/5]</span> Sowing Registry & Yield AI: 500 kg Tomato on 3.5 Acres... <span class="text-emerald-300 font-bold">✅ VALID (Standard Harvest Curve)</span>
            </div>
            <div class="text-emerald-400 flex items-center gap-1.5">
                <span>[CHECK 4/5]</span> PFMS Direct DBT Bank Audit: PM-KISAN Linked SBI Account... <span class="text-emerald-300 font-bold">✅ SECURED</span>
            </div>
        `;

        verdictCard.className = "p-4 rounded-2xl border border-emerald-300 bg-emerald-50 text-emerald-950 flex items-start gap-3";
        verdictCard.innerHTML = `
            <div class="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                <i data-lucide="shield-check" class="w-5 h-5"></i>
            </div>
            <div class="space-y-1">
                <h4 class="font-extrabold text-sm text-emerald-900">🌟 Verified Smallholder Farmer</h4>
                <p class="text-xs text-emerald-800">All 5 security tiers passed. Ramesh Patil is authorized to sell directly to consumer housing societies and bulk institutional buyers with 0% middleman deduction.</p>
            </div>
        `;
    }

    lucide.createIcons();
}

// Modal Handlers
function openJudgeModal() {
    document.getElementById('judge-modal').classList.remove('hidden');
}
function closeJudgeModal() {
    document.getElementById('judge-modal').classList.add('hidden');
}

function openEscrowModal() {
    document.getElementById('escrow-modal').classList.remove('hidden');
}
function closeEscrowModal() {
    document.getElementById('escrow-modal').classList.add('hidden');
}

function confirmEscrowPayment() {
    closeEscrowModal();
    showToast("🔒 ₹15,250 locked into Escrow. Order confirmed! Driver assigned.");
}

// Toast Helper
function showToast(msg) {
    const toast = document.getElementById('toast');
    const msgEl = document.getElementById('toast-msg');
    if (!toast || !msgEl) return;

    msgEl.innerText = msg;
    toast.classList.add('toast-visible');

    setTimeout(() => {
        toast.classList.remove('toast-visible');
    }, 3200);
}
