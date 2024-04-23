
let outputMonthsTotal = 0;
let outputInterestAddedTotal = 0;
let outputTotalPaid = 0;

let inputLoanAmount = 10000;
let inputMonthContribution = 1000;
let inputMonthExtraInput = 500;
let inputYearExtra = 2000;

let chartData = [];

let inputInterestRate = 5;


function calculateValues() {

    let tmp_loan = inputLoanAmount;

    chartData.push(tmp_loan);

    while (tmp_loan > 0) {
        // Add 1 to output mpnths
        outputMonthsTotal += 1;
        // Add monthly interest to total interest
        outputInterestAddedTotal += (tmp_loan * inputInterestRate) / 12;
        // Add monthly interest to current loan
        tmp_loan += (tmp_loan * inputInterestRate) / 12;
        // remove the monthly contributions
        tmp_loan -= inputMonthContribution + inputMonthExtraInput;
        
        // every 12 months, remove the yearly extra
        if (outputMonthsTotal % 12 == 0) {
            tmp_loan -= inputYearExtra;
        } 

        outputTotalPaid += inputMonthContribution + inputMonthExtraInput + ((tmp_loan * inputInterestRate) / 12);

        // add a point for the chart data
        chartData.push(tmp_loan);
    }

}
    
function renderChart() {

    // Sample data for the chart
    // const labels = ['January', 'February', 'March', 'April', 'May', 'June'];
    const data = {
    //   labels: labels,
      datasets: [{
        label: 'Loan Payback',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: chartData,
        fill: true,
      }]
    };

    // Configuration options
    const config = {
      type: 'line',
      data: data,
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Line Chart Example'
          }
        },
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: 'Month'
            }
          },
          y: {
            display: true,
            title: {
              display: true,
              text: 'Value'
            }
          }
        }
      },
    };

    // Create the chart
    const myChart = new Chart(
      document.getElementById('myLineChart'),
      config
    );

}

function addTableValues() {
    const inTable = document.getElementById("SummaryTableIn");
    const outTable = document.getElementById("SummaryTableOut");

    
    // Create an empty <tr> element and add it to the 1st position of the table:
    var row = table.insertRow(0);

    // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);

    // Add some text to the new cells:
    cell1.innerHTML = "Loan amount";
    cell2.innerHTML = inputLoanAmount;

    row = table.insertRow(1);
    cell1 = row.insertCell(0);
    cell2 = row.insertCell(1);
    cell1.innerHTML = "Interest Rate";
    cell2.innerHTML = inputInterestRate;

    row = table.insertRow(2);
    cell1 = row.insertCell(0);
    cell2 = row.insertCell(1);
    cell1.innerHTML = "Monthly contribution";
    cell2.innerHTML = inputInterestRate;

    row = table.insertRow(3);
    cell1 = row.insertCell(0);
    cell2 = row.insertCell(1);
    cell1.innerHTML = "Additional monthly contribution";
    cell2.innerHTML = inputInterestRate;

    row = table.insertRow(4);
    cell1 = row.insertCell(0);
    cell2 = row.insertCell(1);
    cell1.innerHTML = "Yearly additional contribution";
    cell2.innerHTML = inputInterestRate;
        
    
}


function calculateAndRender() {

}


function main() {


    calculateValues();
    renderChart();

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