"use strict";
const LOCATION = document.location.href;
const table = document.querySelector('#table');
getStatistics();
function getStatistics() {
    const options = {
        method: 'POST',
        body: '',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };
    fetch(`/statistics`, options)
        .then(response => response.json())
        .then(response => {
        if (response) {
            prepareStatistics(response);
        }
        else {
            console.log('statistics error');
        }
    })
        .catch(err => {
        console.log('statistics error', err);
    });
}
function prepareStatistics(statistics) {
    if (statistics.length > 0) {
        console.log('stats', statistics);
    }
}
new gridjs.Grid({
    columns: ["Name", "Email", "Phone Number", "test"],
    data: [
        ["John", "john@example.com", "(353) 01 222 3333", 3],
        ["Mark", "mark@gmail.com", "(01) 22 888 4444", 3],
        ["Eoin", "eoin@gmail.com", "0097 22 654 00033", 4],
        ["Sarah", "sarahcdd@gmail.com", "+322 876 1233", 5],
        ["Afshin", "afshin@mail.com", "(353) 22 87 8356", 7]
    ]
}).render(document.querySelector("#wrapper"));
