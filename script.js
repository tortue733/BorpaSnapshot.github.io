function checkBorpa() {
    const blockchain = document.getElementById('blockchain').value;
    const address = document.getElementById('address').value.trim();
    let csvFile = '';

    switch (blockchain) {
        case 'solana':
            csvFile = 'snapshot_solana.csv';
            break;
        case 'arbitrum':
            csvFile = 'arb_holders_2024-07-03_01-45-18.csv';
            break;
        case 'bsc':
            csvFile = 'bsc_holders_2024-07-03_01-45-18.csv';
            break;
        case 'base':
            csvFile = 'base_holders_2024-07-03_01-45-18.csv';
            break;
    }

    fetch(csvFile)
        .then(response => response.text())
        .then(data => {
            const lines = data.split('\n');
            const header = lines[0].split(',');

            let addressIndex = header.indexOf('address');
            let borpaIndex = header.indexOf('borpa');
            
            if (blockchain === 'solana') {
                addressIndex = 0; // Assuming address is in the first column for Solana CSV
                borpaIndex = 1; // Assuming borpa is in the second column for Solana CSV
            }

            const resultDiv = document.getElementById('result');
            let found = false;

            for (let i = 1; i < lines.length; i++) {
                const columns = lines[i].split(',');

                if (columns[addressIndex] === address) {
                    found = true;
                    resultDiv.innerHTML = `Address: ${address} holds ${parseFloat(columns[borpaIndex]).toFixed(2)} Borpa.`;
                    break;
                }
            }

            if (!found) {
                resultDiv.innerHTML = 'Address not found.';
            }
        })
        .catch(error => {
            console.error('Error fetching the CSV file:', error);
            document.getElementById('result').innerHTML = 'An error occurred while checking the address.';
        });
}
