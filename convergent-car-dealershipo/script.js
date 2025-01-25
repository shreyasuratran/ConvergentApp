// Fetch all cars from the API
async function fetchCars() {
    try {
        // Fetch cars sorted by price (low to high)
        const response = await fetch('https://dealership.naman.zip/cars/sort?direction=asc&key=price');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching car data:', error);
    }
}

// Fetch details of a specific car by ID
async function fetchCarDetails(carId) {
    try {
        const response = await fetch(`https://dealership.naman.zip/car/${carId}`);
        const car = await response.json();
        return car;
    } catch (error) {
        console.error('Error fetching car details:', error);
    }
}

// Display cars on the homepage
function displayCars(cars) {
    const carList = document.getElementById('car-list');
    carList.innerHTML = ''; // Clear previous content

    cars.forEach(car => {
        const carElement = document.createElement('div');
        carElement.className = 'car';
        carElement.innerHTML = `
            <h2>${car.make} ${car.model}</h2>
            <p>Price: $${car.price}</p>
            <p>Year: ${car.year}</p>
            <button onclick="viewCarDetails(${car.id})">View Details</button>
        `;
        carList.appendChild(carElement);
    });
}

// Redirect to the details page with the car ID
function viewCarDetails(carId) {
    window.location.href = `details.html?carId=${carId}`;
}

// Fetch and display cars when the homepage loads
document.addEventListener('DOMContentLoaded', async () => {
    const cars = await fetchCars();
    if (cars) {
        displayCars(cars);
    }
});

// Fetch and display car details when the details page loads
document.addEventListener('DOMContentLoaded', async () => {
    // Check if we're on the details page
    if (window.location.pathname.includes('details.html')) {
        const urlParams = new URLSearchParams(window.location.search);
        const carId = urlParams.get('carId');

        if (carId) {
            const car = await fetchCarDetails(carId);
            if (car) {
                displayCarDetails(car);
            }
        }
    }
});

// Display car details on the details page
function displayCarDetails(car) {
    const carDetails = document.getElementById('car-details');
    carDetails.innerHTML = `
        <h2>${car.make} ${car.model}</h2>
        <p>Price: $${car.price}</p>
        <p>Year: ${car.year}</p>
        <p>Color: ${car.color}</p>
        <p>Condition: ${car.condition}</p>
        <p>Fuel Type: ${car.fuel_type}</p>
        <p>Transmission: ${car.transmission}</p>
        <p>VIN: ${car.vin}</p>
        <p>Description: ${car.description}</p>
    `;
}