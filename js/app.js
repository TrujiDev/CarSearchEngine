// Selecting HTML elements
const year = document.querySelector('#year');
const brand = document.querySelector('#brand');
const minimumPrice = document.querySelector('#minimum');
const maximumPrice = document.querySelector('#maximum');
const doors = document.querySelector('#doors');
const transmission = document.querySelector('#transmission');
const color = document.querySelector('#color');
const result = document.querySelector('#result');

// Setting date range for the year select
const maxDate = new Date().getFullYear();
const minDate = maxDate - 10;

// Object to store search criteria
const dataSearch = {
	brand: '',
	year: '',
	minimumPrice: '',
	maximumPrice: '',
	doors: '',
	transmission: '',
	color: '',
};

// Event listener for DOMContentLoaded to initialize the page
document.addEventListener('DOMContentLoaded', () => {
	showCars(cars);
	fillSelect();
});

// Event listeners for each filter option
brand.addEventListener('change', event => {
	dataSearch.brand = event.target.value;
	filterCar();
});

year.addEventListener('change', event => {
	dataSearch.year = parseInt(event.target.value);
	filterCar();
});

minimumPrice.addEventListener('change', event => {
	dataSearch.minimumPrice = event.target.value;
	filterCar();
});

maximumPrice.addEventListener('change', event => {
	dataSearch.maximumPrice = event.target.value;
	filterCar();
});

doors.addEventListener('change', event => {
	dataSearch.doors = parseInt(event.target.value);
	filterCar();
});

transmission.addEventListener('change', event => {
	dataSearch.transmission = event.target.value;
	filterCar();
});

color.addEventListener('change', event => {
	dataSearch.color = event.target.value;
	console.log(dataSearch);
	filterCar();
});

// Function to display cars in the result section
function showCars(cars) {
	cleanHTML();

	cars.forEach(car => {
		const { brand, model, year, price, doors, color, transmission } = car;
		const carHTML = document.createElement('P');

		carHTML.textContent = `
            ${brand} - ${model} - ${year} - $${price} - ${doors} Doors - Color: ${color} - Transmission: ${transmission} 
        `;

		result.appendChild(carHTML);
	});
}

// Function to remove all child elements from the result section
function cleanHTML() {
	while (result.firstChild) {
		result.removeChild(result.firstChild);
	}
}

// Function to fill the year select with options
function fillSelect() {
	for (let i = maxDate; i >= minDate; i--) {
		const option = document.createElement('option');
		option.value = i;
		option.textContent = i;
		year.appendChild(option);
	}
}

// Function to apply filters and display results
function filterCar() {
    // Apply successive filters to the list of cars based on search criteria

    const result = cars
        .filter(filterBrand)           // Filter by brand
        .filter(filterYear)            // Filter by year
        .filter(filterMinimumPrice)    // Filter by minimum price
        .filter(filterMaximumPrice)    // Filter by maximum price
        .filter(filterDoors)           // Filter by number of doors
        .filter(filterTransmission)    // Filter by transmission type
        .filter(filterColor);          // Filter by color

    // If there are filtered results, display them; otherwise, show a no-result message
    if (result.length) {
        showCars(result);  // Display filtered cars
    } else {
        noResult();        // Display a message indicating no results
    }
}


// Function to display a message when there are no results
function noResult() {
	cleanHTML();

	const noResult = document.createElement('DIV');
	noResult.classList.add('alert', 'error');
	noResult.textContent = 'No results, try with other search terms';
	result.appendChild(noResult);
}

// Functions to filter cars based on search criteria

// Function to filter by brand
function filterBrand(car) {
    const { brand } = dataSearch;

    if (brand) {
        return car.brand === brand;
    }
    return car;
}

// Function to filter by year
function filterYear(car) {
    const { year } = dataSearch;

    if (year) {
        return car.year === year;
    }
    return car;
}

// Function to filter by minimum price
function filterMinimumPrice(car) {
    const { minimumPrice } = dataSearch;

    // If a minimum price is defined,
    // compare it with the price of the car
    if (minimumPrice) {
        return car.price >= minimumPrice;
    }
    return car;
}

// Function to filter by maximum price
function filterMaximumPrice(car) {
    const { maximumPrice } = dataSearch;

    // If a maximum price is defined,
    // compare it with the price of the car
    if (maximumPrice) {
        return car.price <= maximumPrice;
    }
    return car;
}

// Function to filter by number of doors
function filterDoors(car) {
    const { doors } = dataSearch;

    if (doors) {
        return car.doors === doors;
    }
    return car;
}

// Function to filter by transmission type
function filterTransmission(car) {
    const { transmission } = dataSearch;

    if (transmission) {
        return car.transmission === transmission;
    }
    return car;
}

// Function to filter by color
function filterColor(car) {
    const { color } = dataSearch;

    if (color) {
        return car.color === color;
    }
    return car;
}

