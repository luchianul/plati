// 1. CONFIGURARE
const SB_URL = "https://uuhbdleietpibjjdkmea.supabase.co"; 
const SB_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV1aGJkbGVpZXRwaWJqamRrbWVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUyMTUxMjIsImV4cCI6MjA5MDc5MTEyMn0._8dVAyPb0nfB5b7JgWcI1i6PKaSh7h2uX9FGoJ_Es70"; 

const supabaseClient = window.supabase.createClient(SB_URL, SB_KEY);

// 2. FUNCȚIA DE AFIȘARE
async function afiseazaSantiere() {
    console.log("Încerc să citesc datele din tabelul 'Santiere'...");
    
    const { data, error } = await supabaseClient
        .from('Santiere') 
        .select('*')
        .order('id', { ascending: false });

    const listaDiv = document.getElementById('lista-santiere');
    
    if (error) {
        console.error("Eroare la citire:", error);
        listaDiv.innerHTML = "<p style='color:red;'>Eroare: " + error.message + "</p>";
        return;
    }

    console.log("Date primite de la Supabase:", data);

    if (!data || data.length === 0) {
        listaDiv.innerHTML = "<p>Baza de date e conectată, dar e goală. Adaugă ceva mai sus!</p>";
        return;
    }

    listaDiv.innerHTML = data.map(s => `
        <div class="card" style="border:1px solid #ccc; margin:10px; padding:10px; border-radius:8px;">
            <strong>ID: ${s.id} - ${s.nume}</strong><br>
            📍 Locație: ${s.locatie} | 💰 Buget: ${s.buget} EUR
        </div>
    `).join('');
}

// 3. FUNCȚIA DE SALVARE
async function salveazaDate() {
    const n = document.getElementById('nume').value;
    const l = document.getElementById('locatie').value;
    const b = document.getElementById('buget').value;

    if(!n || !l || !b) { 
        alert("Completează toate câmpurile!"); 
        return; 
    }

    console.log("Trimit spre salvare:", { nume: n, locatie: l, buget: b });

    const { data, error } = await supabaseClient
        .from('Santiere')
        .insert([{ 
            nume: n, 
            locatie: l, 
            buget: parseInt(b) 
        }]);

    if (error) {
        console.error("Eroare la INSERT:", error);
        alert("Eroare la salvare: " + error.message);
    } else {
        console.log("Salvare reușită!");
        alert("Succes! Șantierul a fost adăugat.");
        // Resetăm câmpurile
        document.getElementById('nume').value = "";
        document.getElementById('locatie').value = "";
        document.getElementById('buget').value = "";
        // Reîncărcăm lista
        afiseazaSantiere();
    }
}

// Pornim afișarea la încărcarea paginii
afiseazaSantiere();
