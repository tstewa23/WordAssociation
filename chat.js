const socket = io("https://my-express-api-tstewa23.onrender.com"); // Change to your API URL

const form = document.getElementById('dataForm');
const responseMessage = document.getElementById('responseMessage');

async function fetchData() {
    try {
        const response = await fetch('https://my-express-api-tstewa23.onrender.com/data'); // Fetch data from API
        const data = await response.json();

        const tableBody = document.getElementById('dataTable');
        tableBody.innerHTML = ''; // Clear existing table content

        data.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${item.name}</td><td>${item.actor}</td><td>${item.connection}</td>`;
            tableBody.appendChild(row);
        });

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

fetchData();

socket.on("newEntry", () => {
    fetchData();
});

socket.on("newDelete", () => {
    fetchData();
});

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const actor = document.getElementById('actor').value;
    const connection = document.getElementById('connection').value;

    document.getElementById('actor').value = '';
    document.getElementById('connection').value = '';

    try {
        const response = await fetch('https://my-express-api-tstewa23.onrender.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, actor, connection })
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

