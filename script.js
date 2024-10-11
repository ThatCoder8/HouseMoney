let bet = null;
let votes = [];

function createBet() {
    const statement = document.getElementById('betStatement').value;
    const amount = parseFloat(document.getElementById('betAmount').value);
    bet = { statement, amount };
    displayBet();
}

function displayBet() {
    const betsDiv = document.getElementById('bets');
    betsDiv.innerHTML = `
        <h3>${bet.statement}</h3>
        <p>Amount: ${bet.amount}</p>
        <input type="text" id="initials" placeholder="Your Initials" maxlength="2">
        <button onclick="vote(true)">Yes</button>
        <button onclick="vote(false)">No</button>
        <h4>Votes:</h4>
        <ul id="votesList"></ul>
        <button onclick="resolveBet(true)">Ravens Win</button>
        <button onclick="resolveBet(false)">Ravens Lose</button>
    `;
}

function vote(isYes) {
    const initials = document.getElementById('initials').value.toUpperCase();
    if (initials.length !== 2) {
        alert("Please enter your initials (2 characters)");
        return;
    }
    votes.push({ initials, vote: isYes });
    updateVoteDisplay();
}

function updateVoteDisplay() {
    const votesList = document.getElementById('votesList');
    votesList.innerHTML = votes.map(v => `<li>${v.initials}: ${v.vote ? 'Yes' : 'No'}</li>`).join('');
}

function resolveBet(ravensWin) {
    const winners = votes.filter(v => v.vote === ravensWin);
    const losers = votes.filter(v => v.vote !== ravensWin);
    const winAmount = bet.amount * losers.length / winners.length;

    let results = winners.map(w => `${w.initials}: +${winAmount.toFixed(2)}`);
    losers.forEach(l => {
        results.push(`${l.initials}: Owes ${winners.map(w => `${w.initials} ${bet.amount.toFixed(2)}`).join(' and ')}`);
    });

    document.getElementById('output').innerHTML = results.join('<br>');
}
function showOutput(message) {
    const output = document.getElementById('output');
    output.textContent += message + '\n\n';
}

function displayAllBets() {
    console.log(JSON.stringify(bets, null, 2));
    showOutput("Current bets: " + JSON.stringify(bets, null, 2));
}