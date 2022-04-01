buttonAdd.addEventListener("click", function (e) { e.preventDefault(); addRow(); update(); setDefaults(); });
let myChart;

update();

function getTotalIncomeMonthly() { return +tableItems.rows[tableItems.rows.length - 3].cells[2].innerText; }
function getTotalExpenditureMonthly() { return +tableItems.rows[tableItems.rows.length - 2].cells[2].innerText; }
function getSurplusMonthly() { return +tableItems.rows[tableItems.rows.length - 1].cells[2].innerText; }

function update() {
    getTotals();
    createChart();
    boxAdd.style.height = boxChart.offsetHeight + "px";
}

function createChart() {
    const labels = [
        'expenditure',
        'surplus',
        'income'
    ];

    const data = {
        labels: labels,
        datasets: [{
            label: 'dataset',
            backgroundColor: ['cyan', 'hotpink', 'lime'],
            borderColor: 'black',
            data: [getTotalExpenditureMonthly(), getSurplusMonthly(), 0],
        }, {
            label: 'dataset2',
            backgroundColor: ['lime'],
            borderColor: 'black',
            data: [0, 0, getTotalIncomeMonthly()],
        }]
    };

    const config = {
        type: 'doughnut',
        data: data,
        options: {
            responsive: true,
            plugins: {
                    legend: {
                        display: false
                    },
            }
        }
    };
    if (myChart) { myChart.destroy(); noDataPlaceholder.style.display = "none"; } else { noDataPlaceholder.style.display = "block";}
    myChart = new Chart(document.getElementById('myChart'), config);
}

function getTotals() {
    let sumIncomeMonthly = 0;
    let sumExpenditureMonthly = 0;
    for (let i = 1; i < tableItems.rows.length - 3; i++) {
        if (tableItems.rows[i].cells[1].innerText == "income") {
            sumIncomeMonthly += +tableItems.rows[i].cells[2].innerText;
        } else {
            sumExpenditureMonthly += +tableItems.rows[i].cells[2].innerText;
        }
    }
    let surplusMonthly = +(sumIncomeMonthly - sumExpenditureMonthly);
    if (surplusMonthly < 0) surplusMonthly = 0;
    let surplusYearly = surplusMonthly * 12;
    tableItems.rows[tableItems.rows.length - 3].cells[2].innerText = sumIncomeMonthly.toFixed(2);
    tableItems.rows[tableItems.rows.length - 3].cells[3].innerText = (sumIncomeMonthly * 12).toFixed(2);
    tableItems.rows[tableItems.rows.length - 2].cells[2].innerText = sumExpenditureMonthly.toFixed(2);
    tableItems.rows[tableItems.rows.length - 2].cells[3].innerText = (sumExpenditureMonthly * 12).toFixed(2);
    tableItems.rows[tableItems.rows.length - 1].cells[2].innerText = surplusMonthly.toFixed(2);
    tableItems.rows[tableItems.rows.length - 1].cells[3].innerText = surplusYearly.toFixed(2);
}

function addRow() {
    let row = tableItems.insertRow(1);
    let valueYear, valueMonth, valueType, valueAmount;
    textAmount.value == "" ? valueAmount = 100 : valueAmount = textAmount.value;
    if (radioFrequencyMonthly.checked) {
        valueYear = valueAmount * 12;
        valueMonth = valueAmount;
    } else {
        valueYear = valueAmount;
        valueMonth = (valueAmount / 12).toFixed(2);
    }
    radioTypeIncome.checked ? valueType = "income" : valueType = "expenditure";
    row.insertCell(0).innerHTML = textName.value;
    row.insertCell(1).innerHTML = valueType;
    row.insertCell(2).innerHTML = valueMonth;
    row.insertCell(3).innerHTML = valueYear;
}

function setDefaults() {
    textName.value = "";
    textAmount.value = "";
    radioTypeExpenditure.checked = true;
    radioFrequencyMonthly.checked = true;
    //buttonAdd.disabled = true;
}