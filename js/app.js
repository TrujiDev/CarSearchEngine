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
	dataSearch.doors = event.target.value;
});

transmission.addEventListener('change', event => {
	dataSearch.transmission = event.target.value;
});

color.addEventListener('change', event => {
	dataSearch.color = event.target.value;
});

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

function cleanHTML() {
	while (result.firstChild) {
		result.removeChild(result.firstChild);
	}
}

function fillSelect() {
	for (let i = maxDate; i >= minDate; i--) {
		const option = document.createElement('option');
		option.value = i;
		option.textContent = i;
		year.appendChild(option);
	}
}

function filterCar() {
	const result = cars
		.filter(filterBrand)
		.filter(filterYear)
		.filter(filterMinimumPrice)
		.filter(filterMaximumPrice);

	showCars(result);
}

function filterBrand(car) {
	const { brand } = dataSearch;

	if (brand) {
		return car.brand === brand;
	}
	return car;
}

function filterYear(car) {
	const { year } = dataSearch;

	if (year) {
		return car.year === year;
	}
	return car;
}

function filterMinimumPrice(car) {
	const { minimumPrice } = dataSearch;

	if (minimumPrice) {
		return car.price >= minimumPrice;
	}
	return car;
}

function filterMaximumPrice(car) {
	const { maximumPrice } = dataSearch;

	if (maximumPrice) {
		return car.price <= maximumPrice;
	}
	return car;
}
