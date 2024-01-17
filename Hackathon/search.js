// var search_button = document.getElementById("search");

// search_button.addEventListener("click", function () {
// fetch('http://127.0.0.1:5000/app/student-search-name', {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ "Name": document.getElementById("search-name").value }),
// })

//     .then(response => response.json())
//     .then(data => {
//         // Create a table element
//         const table = document.createElement('table');

//         // Create table headers
//         const headers = Object.keys(data[0]);
//         const headerRow = document.createElement('tr');
//         headers.forEach(headerText => {
//             const header = document.createElement('th');
//             const textNode = document.createTextNode(headerText);
//             header.appendChild(textNode);
//             headerRow.appendChild(header);
//         });
//         table.appendChild(headerRow);

//         // Create table rows and cells
//         data.forEach(obj => {
//             const row = document.createElement('tr');
//             headers.forEach(header => {
//                 const cell = document.createElement('td');
//                 const textNode = document.createTextNode(obj[header]);
//                 cell.appendChild(textNode);
//                 row.appendChild(cell);
//             });
//             table.appendChild(row);
//         });

//         // Add table to the DOM
//         document.body.appendChild(table);

//     }
//     )
//     .catch((error) => {
//         console.error('Error:', error);
//     }
//     );

//     fetch('http://127.0.0.1:5000/app/faculty-search-name', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ "Name": document.getElementById("search-name").value }),
//     })

//         .then(response => response.json())
//         .then(data => {
//             // Create a table element
//             const table = document.createElement('table');

//             // Create table headers
//             const headers = Object.keys(data[0]);
//             const headerRow = document.createElement('tr');
//             headers.forEach(headerText => {
//                 const header = document.createElement('th');
//                 const textNode = document.createTextNode(headerText);
//                 header.appendChild(textNode);
//                 headerRow.appendChild(header);
//             }
//             );
//             table.appendChild(headerRow);

//             // Create table rows and cells
//             data.forEach(obj => {

//                 const row = document.createElement('tr');
//                 headers.forEach(header => {
//                     const cell = document.createElement('td');
//                     const textNode = document.createTextNode(obj[header]);
//                     cell.appendChild(textNode);
//                     row.appendChild(cell);
//                 });
//                 table.appendChild(row);
//             }
//             );

//             // Add table to the DOM
//             document.body.appendChild(table);

//         }
//         )
//         .catch((error) => {

//             console.error('Error:', error);
//         }
//         );

// });
// window.onload = function () {
//     fetch('http://127.0.0.1:5000/app/all-list')
//         .then(response => response.json())
//         .then(data => {

// const form = document.getElementById('search');

// form.addEventListener('submit', (event) => {
//     event.preventDefault();
//     const data = new FormData(form);
//     const value = Object.fromEntries(data.entries());
//     console.log(value);
//     fetch('http://127.0.0.1:5000/app/student-search-name', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ "Name": value["name"] }),
//     })

//         .then(response => response.json())
//         .then(data => {
//             console.log(data);
//             Display(data);

//         }
//         )
//         .catch((error) => {
//             console.error('Error:', error);
//         }
//         );

//     fetch('http://127.0.0.1:5000/app/faculty-search-name', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ "Name": value["name"] }),
//     })

//         .then(response => response.json())
//         .then(data => {
//             console.log(data);
//             Display(data);

//         }
//         )
//         .catch((error) => {

//             console.error('Error:', error);
//         }
//         );
// });

function Search() {
    const value=document.getElementById("search-name").value;
    console.log(value);
    fetch('http://127.0.0.1:5000/app/student-search-name', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "Name": value }),
    })

        .then(response => response.json())
        .then(data => {
            console.log(data);
            Display(data);

        }
        )
        .catch((error) => {
            console.error('Error:', error);
        }
        );

    fetch('http://127.0.0.1:5000/app/faculty-search-name', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "Name": value}),
    })

        .then(response => response.json())
        .then(data => {
            console.log(data);
            Display1(data);

        }
        )
        .catch((error) => {

            console.error('Error:', error);
        }
        );
}

function Display(data) {
    console.log(data);
    const resultList = document.getElementById('result-list');
    resultList.innerHTML = '';
    data.forEach((item) => {
        const li = document.createElement('li');
        let listItemContent = '';

        for (const [key, value] of Object.entries(item)) {
            const key1 = key.replace(/_/g, ' ');
            listItemContent += `<p>${key1}: ${value} </p>`;
        }

        li.innerHTML = listItemContent;
        resultList.appendChild(li);
    });

}

function Display1(data) {

    if (data.length == 0 && document.getElementById('result-list').innerHTML == '') {
        const resultList = document.getElementById('result-list');
        resultList.innerHTML = '';
        const li = document.createElement('li');
        li.innerHTML = "No Data Found";
        resultList.appendChild(li);
    }

    console.log(data);
    const resultList = document.getElementById('result-list');
    data.forEach((item) => {
        const li = document.createElement('li');
        let listItemContent = '';

        for (const [key, value] of Object.entries(item)) {
            const key1 = key.replace(/_/g, ' ');
            listItemContent += `<p>${key1}: ${value}</p>`;
        }

        li.innerHTML = listItemContent;
        resultList.appendChild(li);
    });

}