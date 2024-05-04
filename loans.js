
let outputMonthsTotal = 0;
let outputInterestAddedTotal = 0;
let outputTotalPaid = 0;

let outputObj = {};

let inputLoanAmount = 10000;
let inputMonthContribution = 1000;
let inputMonthExtraInput = 500;
let inputYearExtra = 2000;

let yCoordinates = [];
let xCoordinates = [];


let inputInterestRate = 5;


function calculateValues() {

    let tmp_loan = inputLoanAmount;
    let tmp_interest = parseFloat(inputInterestRate / 100);

    yCoordinates.push(tmp_loan);
    xCoordinates.push(0);

    const limit = 150;
    let counter = 0;

    
    while (tmp_loan > 0) {

        if (counter > limit) {
            break;
        }
        counter++;

        // Add 1 to output mpnths
        outputMonthsTotal += 1;

        console.log("New interest added : " + parseFloat((tmp_loan * tmp_interest) / 12))
        console.log("Current month : " + outputMonthsTotal);
        console.log("Loan left : " + tmp_loan);
        console.log("Interest rate : " + tmp_interest)
        

        // Add monthly interest to total interest
        outputInterestAddedTotal += parseFloat((tmp_loan * tmp_interest) / 12);
        
        // Add monthly interest to current loan
        tmp_loan += parseFloat((tmp_loan * tmp_interest) / 12);
        
        // remove the monthly contributions
        tmp_loan -= parseInt(inputMonthContribution + inputMonthExtraInput);

        let extra = 0;
        // every 12 months, remove the yearly extra
        if (outputMonthsTotal % 12 == 0) {
            // No point adding this value on top if loan amount is alread paid
            if (tmp_loan > 0) {
                tmp_loan -= parseInt(inputYearExtra);
                extra = parseInt(inputYearExtra);
            }
        } 

        // This will look weird at the end of the graph,
        // however, you will pay less on the last month so it is correct
        if (tmp_loan < 0) {
            tmp_loan = 0;
        }

        // add a point for the chart data
        yCoordinates.push(tmp_loan);

        xCoordinates.push(counter);

        outputObj[outputMonthsTotal] = {
            "LoanValueRemaining" : tmp_loan,
            "MonthInterestAdded" : parseFloat((tmp_loan * tmp_interest) / 12),
            "TotalInterest" : outputInterestAddedTotal,
            "MonthPaid" :  parseInt(inputMonthContribution) + parseInt(inputMonthExtraInput) + extra,
        }
    }

    outputTotalPaid = parseFloat(inputLoanAmount) + parseFloat(outputInterestAddedTotal); 


    console.log(outputObj);

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
    };

    // Plot the chart
    Plotly.newPlot('myPlot', [trace], layout);
}



function addTableValues() {
    const inTable = document.getElementById("SummaryTableIn");
    const outTable = document.getElementById("SummaryTableOut");

    inTable.innerHTML = "";
    outTable.innerHTML = "";

    /** INPUT **/

    inTable.innerHTML = "";
    outTable.innerHTML = "";

    /** INPUT **/

    // Create an empty <tr> element and add it to the 1st position of the table:
    var row = inTable.insertRow(0);

    // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);

    // Add some text to the new cells:
    cell1.innerHTML = "Loan amount";
    cell2.innerHTML = "$" + inputLoanAmount;
    cell2.innerHTML = "$" + inputLoanAmount;

    row = inTable.insertRow(1);
    row = inTable.insertRow(1);
    cell1 = row.insertCell(0);
    cell2 = row.insertCell(1);
    cell1.innerHTML = "Interest Rate";
    cell2.innerHTML = inputInterestRate + "%";
    cell2.innerHTML = inputInterestRate + "%";

    row = inTable.insertRow(2);
    row = inTable.insertRow(2);
    cell1 = row.insertCell(0);
    cell2 = row.insertCell(1);
    cell1.innerHTML = "Monthly contribution";
    cell2.innerHTML = "$" + inputMonthContribution;

    row = inTable.insertRow(3);
    row = inTable.insertRow(3);
    cell1 = row.insertCell(0);
    cell2 = row.insertCell(1);
    cell1.innerHTML = "Additional monthly contribution";
    cell2.innerHTML = "$" + inputMonthExtraInput;

    row = inTable.insertRow(4);
    row = inTable.insertRow(4);
    cell1 = row.insertCell(0);
    cell2 = row.insertCell(1);
    cell1.innerHTML = "Yearly additional contribution";
    cell2.innerHTML = "$" + inputYearExtra;

    /** OUTPUT **/
    // Create an empty <tr> element and add it to the 1st position of the table:
    row = outTable.insertRow(0);

    // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
    cell1 = row.insertCell(0);
    cell2 = row.insertCell(1);

    // Add some text to the new cells:
    cell1.innerHTML = "Total Months";
    cell2.innerHTML = outputMonthsTotal;

    row = outTable.insertRow(1);
    cell1 = row.insertCell(0);
    cell2 = row.insertCell(1);
    cell1.innerHTML = "Total Interest Added";
    cell2.innerHTML = "$" + outputInterestAddedTotal;

    row = outTable.insertRow(2);
    cell1 = row.insertCell(0);
    cell2 = row.insertCell(1);
    cell1.innerHTML = "Total Paid";
    cell2.innerHTML = "$" + outputTotalPaid;

        
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

    addTableValues();

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
        if (this.value == "") {
            this.value = 0;
        }
        inputInterestRate = parseFloat(this.value);
        calculateAndRender();
    });
    loanInput.addEventListener('input', function() {
        if (this.value == "") {
            this.value = 0;
        }
        inputLoanAmount = parseInt(this.value);
        calculateAndRender();
    });
    monthlyInput.addEventListener('input', function() {
        if (this.value == "") {
            this.value = 0;
        }
        inputMonthContribution = parseInt(this.value);
        calculateAndRender();
    });
    monthlyExtraInput.addEventListener('input', function() {
        if (this.value == "") {
            this.value = 0;
        }
        inputMonthExtraInput = parseInt(this.value);
        calculateAndRender();
    });
    yearlyExtraInput.addEventListener('input', function() {
        if (this.value == "") {
            this.value = 0;
        }
        inputYearExtra = parseInt(this.value);
        calculateAndRender();
    });

    calculateAndRender();

}

main();