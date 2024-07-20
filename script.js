function checkBorpa() {
    const blockchain = document.getElementById('blockchain').value;
    const address = document.getElementById('address').value.trim().toLowerCase(); // Convert address to lowercase
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
        case 'ethereum':
            csvFile = 'data/eth_holders_2024-07-03_01-45-18.csv';
            break;
    }

    console.log(`Fetching CSV file: ${csvFile}`);
    
    fetch(csvFile)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            const resultDiv = document.getElementById('result');
            let found = false;

            if (blockchain === 'solana') {
                // Handle Solana CSV
                const lines = data.split('\n');
                for (let i = 1; i < lines.length; i++) {
                    const [wallet, , amount] = lines[i].split(';');
                    if (wallet.toLowerCase() === address) { // Convert wallet to lowercase
                        found = true;
                        const borpaAmount = parseFloat(amount) / 10**6; // Adjust for Solana
                        resultDiv.innerHTML = `Address: ${address} holds ${borpaAmount.toFixed(6)} Borpa.`;
                        break;
                    }
                }
            } else {
                // Handle other CSVs
                const lines = data.split('\n');
                const header = lines[0].split(',');
                const addressIndex = header.indexOf('address');
                const balanceIndex = header.indexOf('balance');
                
                if (addressIndex === -1 || balanceIndex === -1) {
                    throw new Error('Invalid CSV format');
                }
                
                for (let i = 1; i < lines.length; i++) {
                    const columns = lines[i].split(',');
                    if (columns[addressIndex] && columns[addressIndex].toLowerCase() === address) { // Convert address to lowercase
                        found = true;
                        const borpaAmount = parseFloat(columns[balanceIndex]) / (10 ** 18); // Adjust for other blockchains
                        resultDiv.innerHTML = `Address: ${address} \nholds:\n ${borpaAmount.toFixed(2)} Borpa`;
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
            document.getElementById('result').innerHTML = 'An error occurred while fetching the data.';
        });
}
const tweets = [
    {
        text: "🌟 Hey BORPA Community! 🌟 Our beloved $BORPA is ready to conquer the crypto universe! 🚀 With the spirit of adventure and innovation, we are unstoppable. Join the revolution and let's make history together! 🌕🐸 #JustBorpa #BullishForBorpa $Borpa",
        image: "borpa1.jpg"
    },
    {
        text: "Ready for the next meme generation? Join $BORPA now! 🐸💰 #JustBorpa #MemeCoin #Crypto",
        image: "borpa2.jpg"
    }
    // Ajoutez de nouveaux tweets ici
];

function loadTweets() {
    const container = document.getElementById('tweets-container');
    tweets.forEach(tweet => {
        const tweetElement = document.createElement('div');
        tweetElement.className = 'tweet';
        tweetElement.innerHTML = `
            <p>${tweet.text}</p>
            <img src="${tweet.image}" alt="Borpa Image">
        `;
        container.appendChild(tweetElement);
    });
}
