// CONFIGURARE CONEXIUNE SUPABASE
const SB_URL = "https://uuhbdleietpibjjdkmea.supabase.co"; 
const SB_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV1aGJkbGVpZXRwaWJqamRrbWVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUyMTUxMjIsImV4cCI6MjA5MDc5MTEyMn0._8dVAyPb0nfB5b7JgWcI1i6PKaSh7h2uX9FGoJ_Es70"; 

// Inițializează clientul Supabase
const supabase = window.supabase.createClient(SB_URL, SB_KEY);

// 1. FUNCȚIA PENTRU AFIȘARE (CITIRE DATE)
async function afiseazaSantiere() {
    console.log("Se încarcă datele...");
    
    const { data, error } = await supabase
        .from('Santiere') // Verifică dacă tabelul tău se numește exact așa!
        .select('*')
        .order('id', { ascending: false });

    const listaDiv = document.getElementById('lista-santiere');
    
    if (error) {
        console.error("Eroare Supabase:", error);
        listaDiv.innerHTML = "<p style='color:red;'>Eroare la încărcare. Verifică setările RLS în Supabase!</p>";
        return;
    }

    if (data.length === 0) {
        listaDiv.innerHTML = "<p style='text-align:center;'>Baza de date este goală.</p>";
        return;
    }

    // Curățăm lista și adăugăm rândurile noi
    listaDiv.innerHTML = data.map(s => `
        <div class="card">
            <strong>${s.nume}</strong>
            <p>📍 Locație: ${s.locatie}</p>
            <p>💰 Buget: ${Number(s.buget).toLocaleString()} EUR</p>
        </div>
    `).join('');
}

// 2. FUNCȚIA PENTRU SALVARE (SCRIERE DATE)
async function salveazaDate() {
    const numeVal = document.getElementById('nume').value;
    const locatieVal = document.getElementById('locatie').value;
    const bugetVal = document.getElementById('buget').value;

    // Validare simplă
    if(!numeVal || !locatieVal || !bugetVal) {
        alert("Te rugăm să completezi toate câmpurile!");
        return;
    }

    // Trimitem datele către tabelul 'santiere'
    const { error } = await supabase
        .from('santiere')
        .insert([{ 
            nume: numeVal, 
            locatie: locatieVal, 
            buget: parseInt(bugetVal) 
        }]);

    if (error) {
        alert("Eroare la salvare: " + error.message);
        console.error(error);
    } else {
        alert("Șantierul a fost adăugat cu succes! 🏗️");
        // Resetăm formularul
        document.getElementById('nume').value = "";
        document.getElementById('locatie').value = "";
        document.getElementById('buget').value = "";
        // Reîmprospătăm lista automat
        afiseazaSantiere();
    }
}

// Apelăm funcția de afișare imediat ce se încarcă fișierul
afiseazaSantiere();
