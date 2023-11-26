// Fetch requests
// setInterval( () => {
//     fetch('http://localhost:3030/get-data')
//       .then(response => response.json())
//       .then(data => {
//         console.log('Data received:', data);
//         // Process the data as needed
//       })
//       .catch(error => console.error('Error fetching data:', error));
// }, 1000)

// Web Socket
const socket = new WebSocket('ws://localhost:4040');

socket.addEventListener('open', (event) => {
    socket.send('Connection opened');
});

socket.addEventListener('message', (event) => {
    console.log('Message from server ', event.data);
});

socket.addEventListener('error', (event) => {
    // if errors, should handle reconnection here
    console.log('Error: ', event);
});