function checkBorpa() {
    const blockchain = document.getElementById('blockchain').value;
    const address = document.getElementById('address').value.trim();
    let csvFile = '';

    switch (blockchain) {
        case 'solana':
            csvFile = 'data/snapshot_solana.csv';
            break;
        case 'arbitrum':
            csvFile = 'data/arb_holders_2024-07-03_01-45-18.csv';
            break;
        case 'bsc':
            csvFile = 'data/bsc_holders_2024-07-03_01-45-18.csv';
            break;
        case 'base':
            csvFile = 'data/base_holders_2024-07-03_01-45-18.csv';
            break;
    }

    fetch(csvFile)
        .then(response => response.text())
        .then(data => {
            const resultDiv = document.getElementById('result');
            let found = false;

            if (blockchain === 'solana') {
                // Handle Solana CSV
                const lines = data.split('\n');
                for (let i = 1; i < lines.length; i++) {
                    const [wallet, , amount] = lines[i].split(';');
                    if (wallet === address) {
                        found = true;
                        resultDiv.innerHTML = `Address: ${address} holds ${parseFloat(amount).toFixed(2)} Borpa.`;
                        break;
                    }
                }
            } else {
                // Handle other CSVs
                const lines = data.split('\n');
                const header = lines[0].split(',');
                const addressIndex = header.indexOf('address');
                const balanceIndex = header.indexOf('balance');
                
                for (let i = 1; i < lines.length; i++) {
                    const columns = lines[i].split(',');
                    if (columns[addressIndex] === address) {
                        found = true;
                        resultDiv.innerHTML = `Address: ${address} holds ${(parseFloat(columns[balanceIndex]) / (10 ** 18)).toFixed(2)} Borpa.`;
                        break;
                    }
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
