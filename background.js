setInterval( () => {
    fetch('http://localhost:3030/get-data')
      .then(response => response.json())
      .then(data => {
        console.log('Data received:', data);
        // Process the data as needed
      })
      .catch(error => console.error('Error fetching data:', error));
}, 1000)
