fetch('http://127.0.0.1:5000/app/faculty-list')
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        // Create a table element
        const table = document.createElement('table');

        // Create table headers
        const headers = Object.keys(data[0]);
        const headerRow = document.createElement('tr');
        headers.forEach(headerText => {
            const header = document.createElement('th');
            const textNode = document.createTextNode(headerText);
            header.appendChild(textNode);
            headerRow.appendChild(header);
        });
        table.appendChild(headerRow);

        // Create table rows and cells
        data.forEach(obj => {
            const row = document.createElement('tr');
            headers.forEach(header => {
                const cell = document.createElement('td');
                const textNode = document.createTextNode(obj[header]);
                cell.appendChild(textNode);
                row.appendChild(cell);
            });
            table.appendChild(row);
        });

        // Add table to the DOM
        document.body.appendChild(table);


    }
    )
    .catch((error) => {
        console.error('Error:', error);
    }
    );
