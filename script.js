// ============================================================================
// FINWISE - PLATFORMĂ INTERACTIVĂ DE EDUCAȚIE FINANCIARĂ & SIMULATOR BUGET
// ============================================================================

// Baza de date inițială pentru demonstrație (salvată și sincronizată în localStorage)
const INITIAL_TRANSACTIONS = [
    { id: 1, desc: "Chirie garsonieră & întreținere", amount: 1400, category: "needs", date: "20 Octombrie" },
    { id: 2, desc: "Cumpărături supermarket & piață", amount: 450, category: "needs", date: "21 Octombrie" },
    { id: 3, desc: "Ieșire restaurant cu prietenii", amount: 160, category: "wants", date: "22 Octombrie" },
    { id: 4, desc: "Abonamente (Netflix & Spotify)", amount: 65, category: "wants", date: "22 Octombrie" },
    { id: 5, desc: "Depunere Fond de Urgență", amount: 500, category: "savings", date: "23 Octombrie" },
    { id: 6, desc: "Investiție ETF bursier (BVB / S&P)", amount: 300, category: "savings", date: "23 Octombrie" }
];

const INITIAL_GOALS = [
    { id: 101, title: "Laptop nou pentru facultate / lucru", target: 4500, current: 3100, icon: "💻" },
    { id: 102, title: "Fond de siguranță (Urgențe)", target: 12000, current: 6500, icon: "🛡️" },
    { id: 103, title: "Vacanță & experiență de vară", target: 2500, current: 1800, icon: "✈️" }
];

const LECTII_ACADEMIE = {
    1: {
        titlu: "Lecția 1: Active vs. Pasive și Inamicul Tăcut (Inflația)",
        continut: `
            <p>Unul dintre cele mai mari secrete ale oamenilor independenți financiar este înțelegerea simplă a diferenței dintre un <strong>Activ</strong> și un <strong>Pasiv</strong>:</p>
            <ul style="margin: 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
                <li><strong>Activul:</strong> Este orice bun sau plasament care îți <em>aduce bani în buzunar</em> în timp (ex: acțiuni, obligațiuni, dobânda unui depozit, o afacere, o proprietate închiriată).</li>
                <li><strong>Pasivul:</strong> Este orice bun care îți <em>scoate bani din buzunar</em> (ex: o mașină scumpă pe credit cu rate, combustibil, asigurări, cel mai nou telefon luat în 24 de rate).</li>
            </ul>
            <h4>Ce este inflația și de ce banii „la saltea” pierd valoare?</h4>
            <p>Dacă ai 1.000 RON astăzi și o rată a inflației de 7% pe an, peste 10 ani aceeași sumă va putea cumpăra doar aproximativ jumătate din bunurile de azi. Singura modalitate de a-ți proteja munca este <strong>investirea banilor cu un randament superior inflației</strong>.</p>
        `
    },
    2: {
        titlu: "Lecția 2: Capcana Datoriilor Toxice & Cum scapi de ele",
        continut: `
            <p>Nu toate datoriile sunt la fel. În educația financiară, le împărțim în două categorii:</p>
            <ul style="margin: 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
                <li><strong>Datorii productive:</strong> Un credit pentru o educație care îți crește venitul sau un credit ipotecar cumpătat.</li>
                <li><strong>Datorii toxice:</strong> Credite de consum pentru vacanțe, haine sau folosirea cardului de credit cu dobândă de 20-30% pe an.</li>
            </ul>
            <h4>Două metode dovedite pentru a scăpa de datorii:</h4>
            <ol style="margin: 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
                <li><strong>Metoda Bulgăre de Zăpadă (Snowball):</strong> Plătești mai întâi cea mai mică datorie ca valoare. Îți oferă un impuls psihologic uriaș când o elimini!</li>
                <li><strong>Metoda Avalanșă (Avalanche):</strong> Plătești prioritar datoria cu <em>cea mai mare dobândă</em>. Matematic, este cea mai eficientă metodă de economisire.</li>
            </ol>
        `
    },
    3: {
        titlu: "Lecția 3: Bursa de Valori, ETF-uri și Diversificarea",
        continut: `
            <p>Bursa nu este un cazinou sau o schemă rapidă de îmbogățire, ci un mecanism prin care devii coproprietar la cele mai mari companii din lume (Apple, Microsoft, OMV Petrom, Banca Transilvania etc.).</p>
            <h4>Ce este un ETF (Exchange Traded Fund)?</h4>
            <p>În loc să cumperi acțiuni la o singură companie (ceea ce implică un risc mare dacă acea companie dă faliment), un <strong>ETF</strong> cumpără automat sute sau mii de companii dintr-un singur click.</p>
            <ul style="margin: 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
                <li><strong>Exemplu S&P 500:</strong> Investești în primele 500 de mari corporații americane.</li>
                <li><strong>Strategia DCA (Dollar-Cost Averaging):</strong> În loc să ghicești când piața e sus sau jos, investești o sumă fixă în fiecare lună (ex: 200 RON). Pe termen lung (10-20 de ani), istoricul a demonstrat o creștere medie de 8-10% pe an!</li>
            </ul>
        `
    }
};

const QUIZ_QUESTIONS = [
    {
        intrebare: "Ce presupune Regula de Aur 50/30/20 a finanțelor personale?",
        optiuni: [
            "50% Economii, 30% Mâncare, 20% Distracție",
            "50% Nevoi vitale, 30% Dorințe & Stil de viață, 20% Economii & Investiții",
            "50% Haine, 30% Chirie, 20% Credite"
        ],
        corectIndex: 1,
        explicatie: "Corect! 50% merge către lucruri obligatorii (chirie, utilități, mâncare), 30% pentru confort și plăceri, iar minimum 20% pentru viitorul tău financiar."
    },
    {
        intrebare: "Ce reprezintă „Dobânda Compusă” în investiții?",
        optiuni: [
            "O taxă suplimentară pe care o plătești băncii la sfârșit de an",
            "Dobânda calculată doar peste suma depusă inițial",
            "Dobânda acumulată la dobândă (reinvestirea profitului care accelerează creșterea capitalului)"
        ],
        corectIndex: 2,
        explicatie: "Exact! Albert Einstein o numea a 8-a minune a lumii: profitul tău generează la rândul lui profit suplimentar în fiecare an."
    },
    {
        intrebare: "Unde este recomandat să păstrezi Fondul de Urgență (de 3-6 luni)?",
        optiuni: [
            "Într-un cont de economii separat sau titluri de stat pe termen scurt, fără risc și ușor accesibil",
            "În criptomonede volatile sau acțiuni riscante la bursă",
            "În numerar ascuns în casă, unde este mâncat de inflație"
        ],
        corectIndex: 0,
        explicatie: "Foarte bine! Fondul de urgență are rolul de asigurare de liniște, nu de profit speculativ. Trebuie să fie lichid și în deplină siguranță."
    },
    {
        intrebare: "Care este diferența esențială dintre un Activ și un Pasiv?",
        optiuni: [
            "Activele sunt doar bani lichizi, iar pasivele sunt cardurile de plastic",
            "Un activ îți aduce bani în buzunar, în timp ce un pasiv îți scoate bani din buzunar",
            "Nu există nicio diferență financiară reală"
        ],
        corectIndex: 1,
        explicatie: "Corect! Un apartament închiriat aduce chirie (activ), în timp ce o mașină luată cu rate mari scoate constant bani pentru întreținere (pasiv)."
    },
    {
        intrebare: "Ce înseamnă strategia DCA (Dollar-Cost Averaging) pe bursă?",
        optiuni: [
            "Să cumperi acțiuni doar când toți ceilalți se panichează",
            "Să împrumuți dolari de la bancă pentru a investi la curs valutar",
            "Să investești o sumă constantă lunar, indiferent dacă bursa crește sau scade, reducând riscul pe termen lung"
        ],
        corectIndex: 2,
        explicatie: "Excelent! Investind lunar o sumă constantă, cumperi mai multe unități când piața e jos și mai puține când e sus, obținând un preț mediu excelent."
    }
];

// Starea Aplicației
let appState = {
    monthlyIncome: 4000,
    transactions: [],
    goals: [],
    selectedGoalIdForContribution: null,
    quiz: {
        currentIndex: 0,
        score: 0,
        answered: false
    }
};

// ============================================================================
// INIȚIALIZARE & PERSISTENȚĂ
// ============================================================================
window.addEventListener("DOMContentLoaded", () => {
    incarcaDateFinWise();
    actualizeazaBuget();
    calculeazaDobandaCompusa();
    calculeazaFondSiguranta();
    randeazaObiective();
    randeazaQuizIntrebare();
});

function incarcaDateFinWise() {
    try {
        const savedIncome = localStorage.getItem("finwise_income");
        const savedTx = localStorage.getItem("finwise_tx");
        const savedGoals = localStorage.getItem("finwise_goals");

        appState.monthlyIncome = savedIncome ? Number(savedIncome) : 4000;
        appState.transactions = savedTx ? JSON.parse(savedTx) : JSON.parse(JSON.stringify(INITIAL_TRANSACTIONS));
        appState.goals = savedGoals ? JSON.parse(savedGoals) : JSON.parse(JSON.stringify(INITIAL_GOALS));

        document.getElementById("monthlyIncomeInput").value = appState.monthlyIncome;
    } catch (e) {
        appState.monthlyIncome = 4000;
        appState.transactions = JSON.parse(JSON.stringify(INITIAL_TRANSACTIONS));
        appState.goals = JSON.parse(JSON.stringify(INITIAL_GOALS));
    }
}

function salveazaDateFinWise() {
    try {
        localStorage.setItem("finwise_income", String(appState.monthlyIncome));
        localStorage.setItem("finwise_tx", JSON.stringify(appState.transactions));
        localStorage.setItem("finwise_goals", JSON.stringify(appState.goals));
    } catch (e) {}
}

function reseteazaToateDateleFinWise() {
    localStorage.removeItem("finwise_income");
    localStorage.removeItem("finwise_tx");
    localStorage.removeItem("finwise_goals");

    appState.monthlyIncome = 4000;
    appState.transactions = JSON.parse(JSON.stringify(INITIAL_TRANSACTIONS));
    appState.goals = JSON.parse(JSON.stringify(INITIAL_GOALS));
    appState.quiz.currentIndex = 0;
    appState.quiz.score = 0;
    appState.quiz.answered = false;

    document.getElementById("monthlyIncomeInput").value = 4000;
    actualizeazaBuget();
    calculeazaDobandaCompusa();
    calculeazaFondSiguranta();
    randeazaObiective();
    randeazaQuizIntrebare();

    document.getElementById("quizQuestionContainer").classList.remove("hidden");
    document.getElementById("quizResultContainer").classList.add("hidden");

    afiseazaToast("Datele demonstrației FinWise au fost resetate la valorile inițiale!");
}

// ============================================================================
// NAVIGARE SPA ÎNTRE SECȚIUNI
// ============================================================================
function schimbaSectiune(sectionId) {
    document.querySelectorAll(".spa-section").forEach(sec => sec.classList.remove("active"));
    document.querySelectorAll(".nav-item").forEach(btn => btn.classList.remove("active"));

    const targetSec = document.getElementById(`section-${sectionId}`);
    const targetNav = document.getElementById(`nav-${sectionId}`);

    if (targetSec) targetSec.classList.add("active");
    if (targetNav) targetNav.classList.add("active");

    window.scrollTo({ top: 0, behavior: "smooth" });
}

// ============================================================================
// 1. MOTORUL BUGETULUI & REGULA 50/30/20
// ============================================================================
function seteazaVenitPreset(suma) {
    document.getElementById("monthlyIncomeInput").value = suma;
    actualizeazaBuget();
    afiseazaToast(`Venitul lunar setat la ${suma.toLocaleString("ro-RO")} RON.`);
}

function formatRon(val) {
    return Math.round(val).toLocaleString("ro-RO") + " RON";
}

function actualizeazaBuget() {
    const rawIncome = Number(document.getElementById("monthlyIncomeInput").value);
    appState.monthlyIncome = rawIncome > 0 ? rawIncome : 4000;
    salveazaDateFinWise();

    const venit = appState.monthlyIncome;
    const limitNeeds = venit * 0.50;
    const limitWants = venit * 0.30;
    const limitSavings = venit * 0.20;

    document.getElementById("limitNeeds").textContent = formatRon(limitNeeds);
    document.getElementById("limitWants").textContent = formatRon(limitWants);
    document.getElementById("limitSavings").textContent = formatRon(limitSavings);

    // Calculăm cheltuielile efective pe categorii
    let spentNeeds = 0;
    let spentWants = 0;
    let spentSavings = 0;

    appState.transactions.forEach(tx => {
        if (tx.category === "needs") spentNeeds += Number(tx.amount);
        else if (tx.category === "wants") spentWants += Number(tx.amount);
        else if (tx.category === "savings") spentSavings += Number(tx.amount);
    });

    document.getElementById("spentNeeds").textContent = formatRon(spentNeeds);
    document.getElementById("spentWants").textContent = formatRon(spentWants);
    document.getElementById("spentSavings").textContent = formatRon(spentSavings);

    // Procente și bare de progres
    const pctNeeds = limitNeeds > 0 ? (spentNeeds / limitNeeds) * 100 : 0;
    const pctWants = limitWants > 0 ? (spentWants / limitWants) * 100 : 0;
    const pctSavings = limitSavings > 0 ? (spentSavings / limitSavings) * 100 : 0;

    actualizeazaBaraProgres("barNeeds", "statusNeeds", pctNeeds, "din cota de Nevoi utilizat", false);
    actualizeazaBaraProgres("barWants", "statusWants", pctWants, "din cota de Dorințe utilizat", false);
    actualizeazaBaraProgres("barSavings", "statusSavings", pctSavings, "din ținta de economisire atins", true);

    // Total cheltuieli de consum și bani rămași
    const totalSpent = spentNeeds + spentWants;
    const ramasi = venit - totalSpent - spentSavings;

    document.getElementById("totalSpentText").textContent = formatRon(totalSpent);
    const elRamasi = document.getElementById("remainingBudgetText");
    elRamasi.textContent = formatRon(ramasi);
    if (ramasi < 0) {
        elRamasi.className = "bal-val text-wants";
    } else {
        elRamasi.className = "bal-val text-emerald";
    }

    randeazaTranzactii();
    calculeazaScorSanatate(pctNeeds, pctWants, pctSavings, ramasi);
}

function actualizeazaBaraProgres(barId, statusId, pct, suffix, estePozitiv) {
    const bar = document.getElementById(barId);
    const status = document.getElementById(statusId);
    const clamped = Math.min(Math.max(pct, 0), 100);

    bar.style.width = clamped + "%";
    status.textContent = `${Math.round(pct)}% ${suffix}`;

    if (!estePozitiv) {
        if (pct > 100) {
            bar.style.backgroundColor = "#e11d48";
            status.style.color = "#e11d48";
            status.textContent = `⚠️ Depășit cu ${Math.round(pct - 100)}%!`;
        } else {
            status.style.color = "";
        }
    }
}

function randeazaTranzactii() {
    const container = document.getElementById("txListContainer");
    if (!container) return;

    if (appState.transactions.length === 0) {
        container.innerHTML = `<p class="text-muted" style="text-align:center; padding:1.5rem;">Nu ai nicio tranzacție adăugată încă. Adaugă una din stânga!</p>`;
        return;
    }

    container.innerHTML = appState.transactions.map(tx => {
        const dotClass = tx.category === "needs" ? "dot-needs" : (tx.category === "wants" ? "dot-wants" : "dot-savings");
        const categoryLabel = tx.category === "needs" ? "Nevoie (50%)" : (tx.category === "wants" ? "Dorință (30%)" : "Economie (20%)");
        return `
            <div class="tx-item">
                <div class="tx-item-left">
                    <span class="tx-cat-dot ${dotClass}" title="${categoryLabel}"></span>
                    <div>
                        <div class="tx-desc">${tx.desc}</div>
                        <div class="tx-date">${categoryLabel} • ${tx.date}</div>
                    </div>
                </div>
                <div class="tx-item-right">
                    <span class="tx-amount">${formatRon(tx.amount)}</span>
                    <button class="tx-delete-btn" onclick="stergeTranzactie(${tx.id})" title="Șterge tranzacția">✕</button>
                </div>
            </div>
        `;
    }).join("");
}

function adaugaTranzactie(event) {
    event.preventDefault();
    const desc = document.getElementById("txDesc").value.trim();
    const amount = Number(document.getElementById("txAmount").value);
    const category = document.getElementById("txCategory").value;

    if (!desc || amount <= 0) return;

    const dataAzi = new Date().toLocaleDateString("ro-RO", { day: "numeric", month: "long" });

    appState.transactions.unshift({
        id: Date.now(),
        desc,
        amount,
        category,
        date: dataAzi
    });

    salveazaDateFinWise();
    actualizeazaBuget();

    document.getElementById("txDesc").value = "";
    document.getElementById("txAmount").value = "";

    afiseazaToast(`Adăugat: „${desc}” — ${formatRon(amount)}`);
}

function completeazaTranzactieExemplu(desc, suma, cat) {
    document.getElementById("txDesc").value = desc;
    document.getElementById("txAmount").value = suma;
    document.getElementById("txCategory").value = cat;
}

function stergeTranzactie(id) {
    appState.transactions = appState.transactions.filter(t => t.id !== id);
    salveazaDateFinWise();
    actualizeazaBuget();
    afiseazaToast("Tranzacția a fost ștearsă din buget.");
}

function curataToateTranzactiile() {
    if (confirm("Sigur vrei să golești jurnalul de tranzacții simulate?")) {
        appState.transactions = [];
        salveazaDateFinWise();
        actualizeazaBuget();
        afiseazaToast("Jurnalul a fost golit.");
    }
}

// Calculul Scorului de Sănătate Financiară (0 - 100)
function calculeazaScorSanatate(pctNeeds, pctWants, pctSavings, ramasi) {
    let scor = 50;

    // Punctaj Nevoi (ideal <= 100% din cota alocată)
    if (pctNeeds <= 100) scor += 15;
    else scor -= 15;

    // Punctaj Dorințe (ideal <= 100% din cota alocată)
    if (pctWants <= 100) scor += 15;
    else scor -= 20;

    // Punctaj Economii (ideal >= 100% din ținta de 20%)
    if (pctSavings >= 100) scor += 20;
    else if (pctSavings >= 50) scor += 10;

    if (ramasi >= 0) scor += 10;
    else scor -= 15;

    // Bonus quiz completat
    if (appState.quiz.score > 0) scor += 5;

    scor = Math.min(Math.max(scor, 20), 100);

    const valEl = document.getElementById("headerScoreValue");
    const statusEl = document.getElementById("headerScoreStatus");

    valEl.textContent = scor;

    if (scor >= 80) {
        statusEl.textContent = "Excelent";
        statusEl.className = "score-status text-emerald";
    } else if (scor >= 60) {
        statusEl.textContent = "Bun / Echilibrat";
        statusEl.className = "score-status";
        statusEl.style.color = "#f59e0b";
    } else {
        statusEl.textContent = "Atenție la cheltuieli";
        statusEl.className = "score-status text-wants";
    }
}

// ============================================================================
// 2. SIMULATOR INVESTIȚII & DOBÂNDĂ COMPUSĂ
// ============================================================================
function seteazaRandament(procent) {
    document.getElementById("rangeAnnualRate").value = procent;
    calculeazaDobandaCompusa();
}

function calculeazaDobandaCompusa() {
    const P = Number(document.getElementById("rangeInitialDeposit").value);
    const PMT = Number(document.getElementById("rangeMonthlyDeposit").value);
    const annualRate = Number(document.getElementById("rangeAnnualRate").value);
    const years = Number(document.getElementById("rangeYears").value);

    document.getElementById("valInitialDeposit").textContent = formatRon(P);
    document.getElementById("valMonthlyDeposit").textContent = formatRon(PMT) + " / lună";
    document.getElementById("valAnnualRate").textContent = `${annualRate}% pe an`;
    document.getElementById("valYears").textContent = `${years} ${years === 1 ? "an" : "ani"}`;
    document.getElementById("resYearsSpan").textContent = years;

    const r = (annualRate / 100) / 12; // Rata lunară
    const n = years * 12; // Luni totale

    // Formula dobânzii compuse cu depuneri lunare:
    // FV = P * (1 + r)^n + PMT * [ ( (1 + r)^n - 1 ) / r ]
    let futureValue = 0;
    if (r > 0) {
        const factor = Math.pow(1 + r, n);
        futureValue = P * factor + PMT * ((factor - 1) / r);
    } else {
        futureValue = P + PMT * n;
    }

    const totalDeposited = P + (PMT * n);
    const totalInterest = Math.max(0, futureValue - totalDeposited);

    document.getElementById("resTotalWealth").textContent = formatRon(futureValue);
    document.getElementById("resTotalDeposited").textContent = formatRon(totalDeposited);
    document.getElementById("resTotalInterest").textContent = formatRon(totalInterest);

    // Comparație cu banii ținuți la saltea (fără randament)
    document.getElementById("resCashOnly").textContent = formatRon(totalDeposited);
    document.getElementById("resInvestedOnly").textContent = formatRon(futureValue);

    const procentExtra = totalDeposited > 0 ? Math.round((totalInterest / totalDeposited) * 100) : 0;
    document.getElementById("resMultiplier").textContent = `+${procentExtra}% profit generat`;

    // Tabel Milestones (Evoluție la 1 an, 3 ani, 5 ani, 10 ani, etc.)
    const milestoneSteps = [1, 3, 5, 10, 15, 20, 25, 30].filter(y => y <= years);
    if (!milestoneSteps.includes(years)) milestoneSteps.push(years);

    const tbody = document.getElementById("milestonesTableBody");
    tbody.innerHTML = milestoneSteps.map(y => {
        const ny = y * 12;
        const fy = P * Math.pow(1 + r, ny) + PMT * ((Math.pow(1 + r, ny) - 1) / r);
        const dep = P + (PMT * ny);
        const dob = Math.max(0, fy - dep);

        return `
            <tr>
                <td><strong>Anul ${y}</strong></td>
                <td>${formatRon(dep)}</td>
                <td class="text-emerald">+${formatRon(dob)}</td>
                <td><strong>${formatRon(fy)}</strong></td>
            </tr>
        `;
    }).join("");
}

// ============================================================================
// 3. FOND DE SIGURANȚĂ & TRACKER OBIECTIVE
// ============================================================================
function calculeazaFondSiguranta() {
    const essential = Number(document.getElementById("calcMonthlyEssential").value) || 2200;
    const radioVal = document.querySelector('input[name="safetyMonths"]:checked');
    const months = radioVal ? Number(radioVal.value) : 6;

    const targetFond = essential * months;
    document.getElementById("safetyTargetDisplay").textContent = formatRon(targetFond);
}

function randeazaObiective() {
    const container = document.getElementById("goalsContainer");
    if (!container) return;

    if (appState.goals.length === 0) {
        container.innerHTML = `<p class="text-muted" style="text-align:center; padding:1.5rem;">Nu ai niciun obiectiv setat. Apasă butonul «+ Obiectiv Nou»!</p>`;
        return;
    }

    container.innerHTML = appState.goals.map(g => {
        const pct = Math.min(Math.round((g.current / g.target) * 100), 100);
        const atins = g.current >= g.target;

        return `
            <div class="goal-card">
                <div class="goal-top">
                    <div class="goal-title-group">
                        <span class="goal-icon-badge">${g.icon}</span>
                        <div>
                            <h4>${g.title}</h4>
                            <span class="text-muted">${atins ? "🎉 Obiectiv atins cu succes!" : `Mai ai de strâns: ${formatRon(g.target - g.current)}`}</span>
                        </div>
                    </div>
                    <span class="slider-badge">${pct}%</span>
                </div>

                <div class="goal-bar-wrap">
                    <div class="goal-bar-fill" style="width: ${pct}%"></div>
                </div>

                <div class="goal-stat-row">
                    <span>Economisit: <strong>${formatRon(g.current)}</strong></span>
                    <span>Țintă: <strong>${formatRon(g.target)}</strong></span>
                </div>

                <div class="goal-actions">
                    <button class="btn btn-emerald btn-sm" onclick="deschideModalContributie(${g.id})">
                        + Alimentează
                    </button>
                    <button class="btn-clean-link" onclick="stergeObiectiv(${g.id})">
                        Șterge obiectiv
                    </button>
                </div>
            </div>
        `;
    }).join("");
}

function deschideModalObiectiv() {
    document.getElementById("modalAddGoal").classList.remove("hidden");
}

function salveazaObiectivNou(event) {
    event.preventDefault();
    const title = document.getElementById("goalTitle").value.trim();
    const target = Number(document.getElementById("goalTarget").value);
    const current = Number(document.getElementById("goalCurrent").value) || 0;
    const icon = document.getElementById("goalIcon").value;

    if (!title || target <= 0) return;

    appState.goals.push({
        id: Date.now(),
        title,
        target,
        current,
        icon
    });

    salveazaDateFinWise();
    randeazaObiective();
    inchideModal("modalAddGoal");
    afiseazaToast(`Obiectiv creat: „${title}”!`);

    document.getElementById("goalTitle").value = "";
    document.getElementById("goalTarget").value = "";
    document.getElementById("goalCurrent").value = "0";
}

function deschideModalContributie(goalId) {
    const goal = appState.goals.find(g => g.id === goalId);
    if (!goal) return;

    appState.selectedGoalIdForContribution = goalId;
    document.getElementById("contributeGoalInfo").textContent = `Alimentezi obiectivul: „${goal.title}” (economisit ${formatRon(goal.current)} din ${formatRon(goal.target)})`;
    document.getElementById("contributeAmount").value = "";
    document.getElementById("modalContributeGoal").classList.remove("hidden");
}

function finalizeazaContributie(event) {
    event.preventDefault();
    const suma = Number(document.getElementById("contributeAmount").value);
    const goal = appState.goals.find(g => g.id === appState.selectedGoalIdForContribution);

    if (!goal || suma <= 0) return;

    goal.current += suma;

    // Înregistrăm automat și în cheltuieli ca "Economie (20%)" pentru consecvență
    appState.transactions.unshift({
        id: Date.now(),
        desc: `Economisire către: ${goal.title}`,
        amount: suma,
        category: "savings",
        date: new Date().toLocaleDateString("ro-RO", { day: "numeric", month: "long" })
    });

    salveazaDateFinWise();
    randeazaObiective();
    actualizeazaBuget();
    inchideModal("modalContributeGoal");

    afiseazaToast(`Ai adăugat ${formatRon(suma)} către „${goal.title}”!`);
}

function stergeObiectiv(goalId) {
    if (confirm("Sigur dorești să elimini acest obiectiv?")) {
        appState.goals = appState.goals.filter(g => g.id !== goalId);
        salveazaDateFinWise();
        randeazaObiective();
        afiseazaToast("Obiectivul a fost șters.");
    }
}

// ============================================================================
// 4. ACADEMIA & QUIZ CU CERTIFICAT
// ============================================================================
function arataLectieModal(lectieId) {
    const l = LECTII_ACADEMIE[lectieId];
    if (!l) return;

    document.getElementById("lessonModalTitle").textContent = l.titlu;
    document.getElementById("lessonModalContent").innerHTML = l.continut;
    document.getElementById("modalLesson").classList.remove("hidden");
}

function randeazaQuizIntrebare() {
    const container = document.getElementById("quizQuestionContainer");
    const qIndex = appState.quiz.currentIndex;
    const total = QUIZ_QUESTIONS.length;

    document.getElementById("quizCurrentQ").textContent = qIndex + 1;
    document.getElementById("quizTotalQ").textContent = total;

    if (qIndex >= total) {
        arataRezultateQuiz();
        return;
    }

    const q = QUIZ_QUESTIONS[qIndex];
    appState.quiz.answered = false;

    container.innerHTML = `
        <h4 class="quiz-question-title">${q.intrebare}</h4>
        <div class="quiz-options-list">
            ${q.optiuni.map((opt, i) => `
                <button class="quiz-opt-btn" onclick="verificaRaspunsQuiz(${i}, this)">
                    ${opt}
                </button>
            `).join("")}
        </div>
        <div id="quizFeedbackBox" class="quiz-feedback-box hidden"></div>
        <div id="quizNextAction" class="hidden" style="text-align: right;">
            <button class="btn btn-emerald" onclick="treciLaUrmatoareaIntrebare()">
                ${qIndex + 1 === total ? "Vezi Rezultatul & Certificatul →" : "Următoarea Întrebare →"}
            </button>
        </div>
    `;
}

function verificaRaspunsQuiz(selectedIndex, btnElement) {
    if (appState.quiz.answered) return;
    appState.quiz.answered = true;

    const q = QUIZ_QUESTIONS[appState.quiz.currentIndex];
    const isCorrect = selectedIndex === q.corectIndex;
    const feedbackBox = document.getElementById("quizFeedbackBox");

    const allButtons = document.querySelectorAll(".quiz-opt-btn");
    allButtons.forEach((btn, idx) => {
        btn.disabled = true;
        if (idx === q.corectIndex) {
            btn.classList.add("correct");
        } else if (idx === selectedIndex && !isCorrect) {
            btn.classList.add("wrong");
        }
    });

    if (isCorrect) {
        appState.quiz.score++;
        feedbackBox.className = "quiz-feedback-box correct";
        feedbackBox.innerHTML = `<strong>Excelent!</strong> ${q.explicatie}`;
    } else {
        feedbackBox.className = "quiz-feedback-box wrong";
        feedbackBox.innerHTML = `<strong>Nu chiar.</strong> ${q.explicatie}`;
    }

    feedbackBox.classList.remove("hidden");
    document.getElementById("quizNextAction").classList.remove("hidden");
}

function treciLaUrmatoareaIntrebare() {
    appState.quiz.currentIndex++;
    randeazaQuizIntrebare();
}

function arataRezultateQuiz() {
    document.getElementById("quizQuestionContainer").classList.add("hidden");
    document.getElementById("quizResultContainer").classList.remove("hidden");

    const score = appState.quiz.score;
    const total = QUIZ_QUESTIONS.length;
    const pct = Math.round((score / total) * 100);

    document.getElementById("quizScoreText").textContent = `Scorul tău: ${score} din ${total} răspunsuri corecte (${pct}%)`;

    // Data curentă pentru diplomă
    const azi = new Date().toLocaleDateString("ro-RO", { day: "numeric", month: "long", year: "numeric" });
    document.getElementById("certIssueDate").textContent = azi;

    // Actualizăm și scorul de sănătate financiară
    actualizeazaBuget();
}

function reseteazaQuiz() {
    appState.quiz.currentIndex = 0;
    appState.quiz.score = 0;
    appState.quiz.answered = false;

    document.getElementById("quizQuestionContainer").classList.remove("hidden");
    document.getElementById("quizResultContainer").classList.add("hidden");
    randeazaQuizIntrebare();
}

function printeazaCertificat() {
    const nume = prompt("Introdu numele tău complet pentru personalizarea diplomei:", "Alexandru Popescu");
    if (nume && nume.trim()) {
        document.getElementById("certStudentName").textContent = nume.trim();
    }
    window.print();
}

// ============================================================================
// HELPERE MODALE & TOASTS
// ============================================================================
function inchideModal(modalId) {
    document.getElementById(modalId).classList.add("hidden");
}

function inchideModalLaExterior(event, modalId) {
    if (event.target.id === modalId) {
        inchideModal(modalId);
    }
}

function afiseazaToast(mesaj) {
    const container = document.getElementById("toast-container");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = "toast-item";
    toast.textContent = mesaj;
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transition = "opacity 0.25s";
        setTimeout(() => toast.remove(), 260);
    }, 3200);
}
