
let outputMonthsTotal = 0;
let outputInterestAddedTotal = 0;
let outputTotalPaid = 0;

let inputLoanAmount = 10000;
let inputMonthContribution = 1000;
let inputMonthExtraInput = 500;
let inputYearExtra = 2000;

let yCoordinates = [];
let xCoordinates = [];

let inputInterestRate = 5;


function calculateValues() {

    let tmp_loan = inputLoanAmount;

    yCoordinates.push(tmp_loan);

    const limit = 150;
    let counter = 0;

    
    while (tmp_loan > 0) {

        if (counter > limit) {
            break;
        }
        counter++;

        // Add 1 to output mpnths
        outputMonthsTotal += 1;
        // Add monthly interest to total interest
        outputInterestAddedTotal += parseInt((tmp_loan * (inputInterestRate / 100)) / 12);
        
        
        // Add monthly interest to current loan
        tmp_loan += parseInt((tmp_loan * (inputInterestRate / 100)) / 12);
        
        
        // remove the monthly contributions
        tmp_loan -= parseInt(inputMonthContribution + inputMonthExtraInput);

        
        // every 12 months, remove the yearly extra
        if (outputMonthsTotal % 12 == 0) {
            tmp_loan -= inputYearExtra;
        } 

        outputTotalPaid += parseInt(inputMonthContribution + inputMonthExtraInput + ((tmp_loan * inputInterestRate) / 12));

        // Set the value to 0
        if (tmp_loan < 0) {
            tmp_loan = 0;
        }
        // add a point for the chart data
        yCoordinates.push(tmp_loan);

        xCoordinates.push(counter);
    }

    // calculate final y-cordinate
    xCoordinates.push(counter + 0.2);


}

function renderChartv2() {     

    // Define custom tick values for x-axis
    let tickVals = [];
    let tickText = [];
    let increment = Math.ceil(xCoordinates.length / 15);
    if (increment === 0){
        increment = 1;
    }
    for (let i = 0; i < 150; i += increment) {
        tickVals.push(parseInt(i));
        tickText.push(i.toString()); 
    }

    // Create data trace
    const trace = {
      x: xCoordinates,
      y: yCoordinates,
      mode: 'lines',
      type: 'scatter'
    };

    // Create layout
    const layout = {
      xaxis: {
        tickvals: tickVals,
        ticktext: tickText,
        title: 'Months'
      },
      yaxis: {
        title: 'Loan left'
      },
      title: 'Plotly Line Chart Example'
    };

    // Plot the chart
    Plotly.newPlot('myPlot', [trace], layout);
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

   
    yCoordinates = [];
    xCoordinates = [];
    outputMonthsTotal = 0;
    outputInterestAddedTotal = 0;
    outputTotalPaid = 0;
    // Clear the existing plot
    Plotly.purge('myPlot');

    calculateValues();
    console.log( inputLoanAmount, inputMonthContribution, inputMonthExtraInput, inputYearExtra);
    renderChartv2();

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
        inputInterestRate = parseFloat(this.value);
        calculateAndRender();
    });
    loanInput.addEventListener('input', function() {
        inputLoanAmount = parseInt(this.value);
        calculateAndRender();
    });
    monthlyInput.addEventListener('input', function() {
        inputMonthContribution = parseInt(this.value);
        calculateAndRender();
    });
    monthlyExtraInput.addEventListener('input', function() {
        inputMonthExtraInput = parseInt(this.value);
        calculateAndRender();
    });
    yearlyExtraInput.addEventListener('input', function() {
        inputYearExtra = parseInt(this.value);
        calculateAndRender();
    });

    calculateAndRender();

}

main();