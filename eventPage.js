async function getTokenInfo() {
    const tokenAddress = document.getElementById("token-address").value;
    const apiUrl = `https://api.ethplorer.io/getTokenInfo/${tokenAddress}?apiKey=EK-nL2NR-J15w553-JN3wj`;

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

        // Determine the status of holders
        const greenCircle = document.createElement('div');

        // set the CSS properties for the circle
        greenCircle.style.width = '50px';
        greenCircle.style.height = '50px';
        greenCircle.style.borderRadius = '50%';
        greenCircle.style.backgroundColor = 'green';
        greenCircle.style.margin = 'auto';

        // set the holdersStatus variable based on the number of holders
        if (data.holdersCount < 300) {
            holdersStatus = "Low";
            greenCircle.style.backgroundColor = 'red'; // make the circle red if the holders count is less than 10
        } else if (data.holdersCount < 500) {
            holdersStatus = "Medium";
            greenCircle.style.backgroundColor = 'yellow'; // make the circle yellow if the holders count is between 10 and 50
        } else {
            holdersStatus = "Very good";
        }

        // append the circle to the result element
        result.prepend(greenCircle);
        const holdersStatusElem = document.getElementById("holders-status");
        holdersStatusElem.innerHTML = `<p>Token Status: ${holdersStatus}</p>`;
    } catch (error) {
        console.log(error);
    }
}

document.getElementById('myButton').addEventListener("click", getTokenInfo);