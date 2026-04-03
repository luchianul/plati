// 1. CONFIGURARE (Pune datele tale aici)
const SB_URL = "https://uuhbdleietpibjjdkmea.supabase.co"; 
const SB_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV1aGJkbGVpZXRwaWJqamRrbWVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUyMTUxMjIsImV4cCI6MjA5MDc5MTEyMn0._8dVAyPb0nfB5b7JgWcI1i6PKaSh7h2uX9FGoJ_Es70"; 

// 2. INITIALIZARE (Folosim un nume care să nu se repete)
const supabaseClient = window.supabase.createClient(SB_URL, SB_KEY);

// 3. FUNCTIA DE AFISARE
async function afiseazaSantiere() {
    // Atenție: Folosim 'Santiere' cu S mare așa cum ai zis că e în DB
    const { data, error } = await supabaseClient
        .from('Santiere') 
        .select('*')
        .order('id', { ascending: false });

    const listaDiv = document.getElementById('lista-santiere');
    
    if (error) {
        console.error("Eroare:", error);
        listaDiv.innerHTML = "<p style='color:red;'>Eroare: " + error.message + "</p>";
        return;
    }

    if (!data || data.length === 0) {
        listaDiv.innerHTML = "<p>Momentan nu sunt șantiere în listă.</p>";
        return;
    }

    listaDiv.innerHTML = data.map(s => `
        <div class="card">
            <strong>${s.nume || s.Nume}</strong><br>
            📍 ${s.locatie || s.Locatie} | 💰 ${s.buget || s.Buget} EUR
        </div>
    `).join('');
}

// 4. FUNCTIA DE SALVARE
async function salveazaDate() {
    const n = document.getElementById('nume').value;
    const l = document.getElementById('locatie').value;
    const b = document.getElementById('buget').value;

    if(!n || !l || !b) { alert("Completează tot!"); return; }

    // Trimitem datele (Verifică dacă în DB coloanele sunt cu Nume sau nume)
    const { error } = await supabaseClient
        .from('Santiere')
        .insert([{ nume: n, locatie: l, buget: parseInt(b) }]);

    if (error) {
        alert("Eroare la salvare: " + error.message);
    } else {
        alert("Salvat cu succes! 🏗️");
        document.getElementById('nume').value = "";
        document.getElementById('locatie').value = "";
        document.getElementById('buget').value = "";
        afiseazaSantiere();
    }
}

// Pornim afișarea
afiseazaSantiere();
