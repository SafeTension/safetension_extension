async function getTokenInfo() {
    const tokenAddress = document.getElementById("token-address").value;
    const apiUrl = `https://api.ethplorer.io/getTokenInfo/${tokenAddress}?apiKey=YOUR_TOKEN`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        const result = document.getElementById("result");
        result.innerHTML = `
        <div id="holders-status"></div>
        <p class="info_token"><span class="boldd">Token Name:</span> ${data.name}</p>
        <p class="info_token"><span class="boldd">Symbol:</span> ${data.symbol}</p>
        <p class="info_token"><span class="boldd">Total Supply:</span> ${data.totalSupply}</p>
        <p class="info_token"><span class="boldd">Decimals:</span> ${data.decimals}</p>
   
        <p class="info_token"><span class="boldd">Count Operations:</span> ${data.countOps}</p>
        <p class="info_token"><span class="boldd">Price:</span> ${data.price.rate} ${data.price.currency}</p>
        <p class="info_token"><span class="boldd">Market Cap:</span> ${data.marketCapUsd}</p>
        <p class="info_token"><span class="boldd">Transfers Count:</span> ${data.transfersCount}</p>
        <p class="info_token"><span class="boldd">Holders Count:</span> ${data.holdersCount}</p>`;

        const greenCircle = document.createElement('div');

        greenCircle.style.width = '50px';
        greenCircle.style.height = '50px';
        greenCircle.style.borderRadius = '50%';
        greenCircle.style.backgroundColor = 'green';
        greenCircle.style.margin = 'auto';


        if (data.holdersCount < 300) {
            holdersStatus = "Low";
            greenCircle.style.backgroundColor = 'red';
        } else if (data.holdersCount < 500) {
            holdersStatus = "Medium";
            greenCircle.style.backgroundColor = 'yellow';
        } else {
            holdersStatus = "Very good";
        }

        result.prepend(greenCircle);
        const holdersStatusElem = document.getElementById("holders-status");
        holdersStatusElem.innerHTML = `<p>Token Status: ${holdersStatus}</p>`;
    } catch (error) {
        console.log(error);
    }
}

document.getElementById('myButton').addEventListener("click", getTokenInfo);
