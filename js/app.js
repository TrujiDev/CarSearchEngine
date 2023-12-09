const year = document.querySelector('#year');
const brand = document.querySelector('#brand');
const minimumPrice = document.querySelector('#minimum');
const maximumPrice = document.querySelector('#maximum');
const doors = document.querySelector('#doors');
const transmission = document.querySelector('#transmission');
const color = document.querySelector('#color');
const result = document.querySelector('#result');

const maxDate = new Date().getFullYear();
const minDate = maxDate - 10;

/**
 * Object representing the search criteria for car search.
 * @type {Object}
 * @property {string} brand - The brand of the car.
 * @property {string} year - The year of the car.
 * @property {string} minimumPrice - The minimum price of the car.
 * @property {string} maximumPrice - The maximum price of the car.
 * @property {string} doors - The number of doors of the car.
 * @property {string} transmission - The transmission type of the car.
 * @property {string} color - The color of the car.
 */
const dataSearch = {
	brand: '',
	year: '',
	minimumPrice: '',
	maximumPrice: '',
	doors: '',
	transmission: '',
	color: '',
};

document.addEventListener('DOMContentLoaded', () => {
	showCars(cars);
	fillSelect();
});

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

/**
 * Displays a list of cars on the webpage.
 * 
 * @param {Array} cars - An array of car objects.
 * @returns {void}
 */
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

/**
 * Removes all child elements from the 'result' element.
 */
function cleanHTML() {
	while (result.firstChild) {
		result.removeChild(result.firstChild);
	}
}

/**
 * Fills the select element with options for selecting a year.
 */
function fillSelect() {
	for (let i = maxDate; i >= minDate; i--) {
		const option = document.createElement('option');
		option.value = i;
		option.textContent = i;
		year.appendChild(option);
	}
}

/**
 * Filters the cars based on various criteria and displays the filtered results.
 */
function filterCar() {
	const result = cars
		.filter(filterBrand)
		.filter(filterYear)
		.filter(filterMinimumPrice)
		.filter(filterMaximumPrice)
		.filter(filterDoors)
		.filter(filterTransmission)
		.filter(filterColor);

	if (result.length) {
		showCars(result);
	} else {
		noResult();
	}
}

/**
 * Displays a message indicating no search results.
 */
function noResult() {
	cleanHTML();

	const noResult = document.createElement('DIV');
	noResult.classList.add('alert', 'error');
	noResult.textContent = 'No results, try with other search terms';
	result.appendChild(noResult);
}

/**
 * Filters the car based on the brand.
 * @param {Object} car - The car object to be filtered.
 * @returns {Object} - The filtered car object.
 */
function filterBrand(car) {
	const { brand } = dataSearch;

	if (brand) {
		return car.brand === brand;
	}
	return car;
}

/**
 * Filters the car based on the specified year.
 * @param {Object} car - The car object to be filtered.
 * @returns {Object} - The filtered car object.
 */
function filterYear(car) {
	const { year } = dataSearch;

	if (year) {
		return car.year === year;
	}
	return car;
}

/**
 * Filters cars based on the minimum price.
 * @param {Object} car - The car object to be filtered.
 * @returns {boolean|Object} - Returns true if the car's price is greater than or equal to the minimum price, otherwise returns the car object itself.
 */
function filterMinimumPrice(car) {
	const { minimumPrice } = dataSearch;

	if (minimumPrice) {
		return car.price >= minimumPrice;
	}
	return car;
}

/**
 * Filters the cars based on the maximum price.
 * @param {Object} car - The car object to be filtered.
 * @returns {boolean|Object} - Returns true if the car price is less than or equal to the maximum price, otherwise returns the car object itself.
 */
function filterMaximumPrice(car) {
	const { maximumPrice } = dataSearch;

	if (maximumPrice) {
		return car.price <= maximumPrice;
	}
	return car;
}

/**
 * Filters cars based on the number of doors.
 * @param {Object} car - The car object to be filtered.
 * @returns {boolean|Object} - Returns true if the car has the specified number of doors, otherwise returns the car object itself.
 */
function filterDoors(car) {
	const { doors } = dataSearch;

	if (doors) {
		return car.doors === doors;
	}
	return car;
}

/**
 * Filters the car based on the transmission type.
 * @param {Object} car - The car object to be filtered.
 * @returns {Object} - The filtered car object.
 */
function filterTransmission(car) {
	const { transmission } = dataSearch;

	if (transmission) {
		return car.transmission === transmission;
	}
	return car;
}

/**
 * Filters the car based on the specified color.
 * @param {object} car - The car object to be filtered.
 * @returns {boolean|object} - Returns the filtered car object if the color matches, otherwise returns the original car object.
 */
function filterColor(car) {
	const { color } = dataSearch;

	if (color) {
		return car.color === color;
	}
	return car;
}
