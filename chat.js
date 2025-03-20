const socket = io("https://my-express-api-tstewa23.onrender.com"); // Change to your API URL

const form = document.getElementById('dataForm');
const responseMessage = document.getElementById('responseMessage');

async function fetchData() {
    try {
        const response = await fetch('https://my-express-api-tstewa23.onrender.com/data'); // Fetch data from API
        const data = await response.json();

        console.log(data[0].name)

        // const tableBody = document.getElementById('dataTable');
        // tableBody.innerHTML = ''; // Clear existing table content

        // data.forEach(item => {
        //     const row = document.createElement('tr');
        //     row.innerHTML = `<td>${item.name}</td><td>${item.message}</td>`;
        //     tableBody.appendChild(row);
        // });

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

fetchData();

// socket.on("newEntry", () => {
//     console.log("New data received:");
// });


form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const message = document.getElementById('message').value;

    document.getElementById('name').value = '';
    document.getElementById('message').value = '';

    try {
        const response = await fetch('https://my-express-api-tstewa23.onrender.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, message })
        });

        const result = await response.json();

        responseMessage.textContent = result.message;
    }
    catch (error) {
        responseMessage.textContent = 'Error submitting data.';
    }
});

const button = document.getElementById("myButton")
let clickToggle = false
button.addEventListener("click", async () => {
    clickToggle ? button.innerText = "RESET" : button.innerText = "DELETE"
    clickToggle = !clickToggle

    try {
        const response = await fetch('https://my-express-api-tstewa23.onrender.com/delete', {
            method: 'DELETE',
        });

        const result = await response.json();

        responseMessage.textContent = result.message;
    }
    catch (error) {
        responseMessage.textContent = 'Error submitting data.';
    }

});

