fetch('http://127.0.0.1:5000/app/student-list')
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    }
    )
    .catch((error) => {
        console.error('Error:', error);
    }
    );
    