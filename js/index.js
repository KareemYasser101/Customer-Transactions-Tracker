let customersData = {
    "customers": [
        {
            "id": 1,
            "name": "Ahmed Ali"
        },
        {
            "id": 2,
            "name": "Aya Elsayed"
        },
        {
            "id": 3,
            "name": "Mina Adel"
        },
        {
            "id": 4,
            "name": "Sarah Reda"
        },
        {
            "id": 5,
            "name": "Mohamed Sayed"
        }
        ],
    "transactions": [
        {
            "id": 1,
            "customer_id": 1,
            "date": "2022-01-01",
            "amount": 1000
        },
        {
            "id": 2,
            "customer_id": 1,
            "date": "2022-01-02",
            "amount": 2000
        },
        {
            "id": 3,
            "customer_id": 2,
            "date": "2022-01-01",
            "amount": 550
        },
        {
            "id": 4,
            "customer_id": 3,
            "date": "2022-01-01",
            "amount": 500
        },
        {
            "id": 5,
            "customer_id": 2,
            "date": "2022-01-02",
            "amount": 1300
        },
        {
            "id": 6,
            "customer_id": 4,
            "date": "2022-01-01",
            "amount": 750
        },
        {
            "id": 7,
            "customer_id": 3,
            "date": "2022-01-02",
            "amount": 1250
        },
        {
            "id": 8,
            "customer_id": 5,
            "date": "2022-01-01",
            "amount": 2500
        },
        {
            "id": 9,
            "customer_id": 5,
            "date": "2022-01-02",
            "amount": 875
        }
    ]
}
localStorage.setItem("customersData", JSON.stringify(customersData))
customersData = JSON.parse(localStorage.getItem("customersData"));
let customerTable = $("#customer-table");
let tableBody = $("#customer-table tbody");

let Data = ``;
for (let i = 0; i < customersData.customers.length; i++) {
    Data += `<tr class="tableRow">
    <td id="${customersData.customers[i].id}">${customersData.customers[i].name}</td>
    </tr>`
}
tableBody.html(Data);


$("#searchInput").keyup(function (e) { 
    Data = ``;
    for (let i = 0; i < customersData.customers.length; i++) {
        if(customersData.customers[i].name.toLowerCase().includes(searchInput.value.toLowerCase()) ||
            searchInput.value.includes(null)){
            Data += `<tr class="tableRow">
            <td id="${customersData.customers[i].id}">${customersData.customers[i].name}</td>
            </tr>`
        }
        
    }
    tableBody.html(Data);
});

let transactionDiv = $(".transaction-data");
let transactionBody = $("#transaction-table tbody");
let customerDates = [];
let customerTransactions = [];
let transactionGraph = $(".transaction-graph");
let myChart = document.getElementById("myChart").getContext('2d');
let chart;



// Use event delegation to handle clicks on dynamically added .tableRow elements
tableBody.on("click", ".tableRow", function (e) { 
    console.log("hi");
    customerTable.addClass("d-none");
    transactionDiv.removeClass("d-none");
    transactionGraph.removeClass("d-none");

    let id = $(e.target).attr("id");
    for (let i = 0; i < customersData.customers.length; i++) {
       if(customersData.customers[i].id == id){
            $("#person-name").html(customersData.customers[i].name);
            break;
       }
    }
    // display transactions
    let dates = [];
    let Transactions = [];
    let Data = ``;
    for (let i = 0; i < customersData.transactions.length; i++) {
        if(customersData.transactions[i].customer_id == id){
            dates.push(customersData.transactions[i].date);
            Transactions.push(customersData.transactions[i].amount);
            Data += `<tr>
            <td>${customersData.transactions[i].date}</td>
            <td>${customersData.transactions[i].amount}</td>
            </tr>`;
        }
        customerDates = dates;
        customerTransactions = Transactions;
    }
    transactionBody.html(Data);

    // chart
    if (chart) {
        chart.destroy();
    }
    chart = new Chart(myChart, {
        type: 'line',
        data: {
            labels: customerDates,
            datasets: [{
                label: 'Transaction amount',
                data: customerTransactions,
                backgroundColor: '#40E8D9',
                hoverBorderWidth: 2,
                hoverBorderColor: 'black'
            }]
        },
        options: {}
    })
});

$("#backBtn").click(() => {
    customerTable.removeClass("d-none");
    transactionDiv.addClass("d-none");
    transactionGraph.addClass("d-none");
})

// ==========================Chart==================================
