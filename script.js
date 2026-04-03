// CONFIGURARE SUPABASE (Asigură-te că datele sunt corecte)
const SUPABASE_URL = "https://uuhbdleietpibjjdkmea.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV1aGJkbGVpZXRwaWJqamRrbWVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUyMTUxMjIsImV4cCI6MjA5MDc5MTEyMn0._8dVAyPb0nfB5b7JgWcI1i6PKaSh7h2uX9FGoJ_Es70";
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// --- 1. CITIRE DATE (Afișare în listă) ---
async function citesteDate() {
    const { data, error } = await supabaseClient
        .from('Planificare')
        .select('*')
        .order('id', { ascending: false });

    if (error) {
        console.error("Eroare la citire:", error);
        return [];
    }
    return data;
}

// --- 2. ADĂUGARE ȘANTIER (Logica ta originală din Code.gs) ---
async function adaugaInSupabase(d) {
    // Calcule ore și bani
    var tarif = Number(d.tarif), incasatTotal = Number(d.incasat);
    var t1 = d.oraI.split(':'), t2 = d.oraE.split(':');
    var orePeZi = (Number(t2[0]) + Number(t2[1])/60) - (Number(t1[0]) + Number(t1[1])/60);
    if (orePeZi < 0) orePeZi += 24;

    var d1 = new Date(d.start), d2 = new Date(d.final);
    var nrZile = Math.round(Math.abs((d2 - d1) / (24*60*60*1000))) + 1;
    
    var incasatPeZi = incasatTotal / nrZile;
    var totalBaniPeZi = orePeZi * tarif;
    var restPeZi = totalBaniPeZi - incasatPeZi;

    let rânduriNoi = [];
    var dataCurenta = new Date(d1);

    // Generăm câte un rând pentru fiecare zi (exact ca în Google Sheets)
    for (var i = 0; i < nrZile; i++) {
        var statusCalculat = restPeZi <= 0 ? "PLATIT" : "Rest: " + restPeZi.toFixed(2);
        
        rânduriNoi.push({
            "Client": d.client,
            "Adresă": d.adresa,
            "Data Start": dataCurenta.toISOString().split('T')[0],
            "Data Final": dataCurenta.toISOString().split('T')[0],
            "Ora Intrare": d.oraI,
            "Ora Ieșire": d.oraE,
            "Sumă Încasată": incasatPeZi.toFixed(2),
            "Tarif/Oră": tarif,
            "Total de Plată": totalBaniPeZi.toFixed(2),
            "Rest de Plată": restPeZi.toFixed(2),
            "Status": statusCalculat,
            "Total H": orePeZi.toFixed(2),
            "Mesaj": d.mesaj,
            "Arhivă": "ACTIV"
        });
        dataCurenta.setDate(dataCurenta.getDate() + 1);
    }

    const { error } = await supabaseClient.from('Planificare').insert(rânduriNoi);
    
    if (error) {
        console.error("Eroare Supabase:", error);
        alert("Eroare: " + error.message);
    } else {
        alert("Planificare salvată cu succes!");
        location.reload();
    }
}

// --- 3. ARHIVARE (Update coloana Arhivă) ---
async function arhiveazaRand(id) {
    const { error } = await supabaseClient
        .from('Planificare')
        .update({ "Arhivă": "ARHIVAT" })
        .eq('id', id);

    if (error) alert("Eroare la arhivare");
    else location.reload();
}

// --- 4. ȘTERGERE (Delete rând) ---
async function stergeRand(id) {
    if (!confirm("Sigur ștergi acest rând?")) return;
    const { error } = await supabaseClient
        .from('Planificare')
        .delete()
        .eq('id', id);

    if (error) alert("Eroare la ștergere");
    else location.reload();
}
