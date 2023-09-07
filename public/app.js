document.getElementById('searchForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const query = document.getElementById('query').value;
    const searchResults = document.getElementById('searchResults');
    searchResults.innerHTML = '<p>Loading...</p>';
    const response = await fetch(`/search?query=${encodeURIComponent(query)}`);
    const data = await response.json();
    displaySearchResults(data);
});

function displaySearchResults(results) {
    const searchResults = document.getElementById('searchResults');
    let html = '';
    if (results.length === 0) {
        html = '<p>No results found.</p>';
    } else {
        html = '<table><tr><th>Sl. No</th><th>Attorney Name</th><th>Attorney Number</th><th>Document No</th><th>Priority</th><th>Field</th><th>Published</th><th>CPC/USCL</th><th>Definition of CPC/USCL</th><th>Title</th></tr>';
        let serialNumber = 1; // Initialize serial number
        results.forEach((result) => {
            html += `<tr><td>${serialNumber}</td><td>${result.attorney_name}</td><td>${result.attorney_number}</td><td>${result.documentNumber}</td><td>${result.priority}</td><td>${result.field}</td><td>${result.published}</td><td>${result.cpc_uscl}</td><td>${result.definition_of_cpc_uscl}</td><td>${result.title}</td></tr>`;
            serialNumber++; // Increment the serial number for the next row
        });
        html += '</table>';
    }
    searchResults.innerHTML = html;
}

