function search() {
    const query = document.getElementById('search').value.trim();
    const results = document.getElementById('results');

    if (query === "") {
        results.innerHTML = "Per favore, inserisci una domanda.";
    } else {
        results.innerHTML = `Hai cercato: <strong>${query}</strong><br>Funzionalità avanzate in arrivo!`;
    }
}
