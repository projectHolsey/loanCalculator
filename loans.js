
let outputMonthsTotal = 0;
let outputInterestAddedTotal = 0;

let inputLoanAmount = 10000;
let inputMonthContribution = 1000;
let inputMonthExtraInput = 500;
let inputYearExtra = 2000;

let inputInterestRate = 5;


function calculateValues() {


}
    
function renderChart() {

}

function addTableValues() {
    const inTable = document.getElementById("SummaryTableIn");
    const outTable = document.getElementById("SummaryTableOut");

    for (let i = 0; i < 5; i++) {

    }
}


function calculateAndRender() {

}


function main() {

    // JavaScript to update the slider value dynamically
    const interestRateInput = document.getElementById('interestRateInput');
    const loanInput = document.getElementById('loanInput');
    const monthlyInput = document.getElementById('monthlyInput');
    const monthlyExtraInput = document.getElementById('monthlyExtraInput');
    const yearlyExtraInput = document.getElementById('yearlyExtraInput');

    inputLoanAmount = 10000;
    inputMonthContribution = 1000;
    inputMonthExtraInput = 500;
    inputYearExtra = 2000;
    
    interestRateInput.addEventListener('input', function() {
        inputInterestRate = this.value;
        calculateAndRender();
    });
    loanInput.addEventListener('input', function() {
        inputLoanAmount = this.value;
        calculateAndRender();
    });
    monthlyInput.addEventListener('input', function() {
        inputMonthContribution = this.value;
        calculateAndRender();
    });
    monthlyExtraInput.addEventListener('input', function() {
        inputMonthExtraInput = this.value;
        calculateAndRender();
    });
    yearlyExtraInput.addEventListener('input', function() {
        inputYearExtra = this.value;
        calculateAndRender();
    });

    calculateAndRender();

}

main();