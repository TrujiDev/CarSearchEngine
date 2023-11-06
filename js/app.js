const result = document.querySelector('#result');
const year = document.querySelector('#year');

const maxDate = new Date().getFullYear();
const minDate = maxDate - 10;

document.addEventListener('DOMContentLoaded', () => {
    showCars();
    fillSelect();
});

function showCars() {
    cars.forEach(car => {
        const { brand, model, year, price, doors, color, transmission } = car;
        const carHTML = document.createElement('P');

        carHTML.textContent = `
            ${brand} - ${model} - ${year} - $${price} - ${doors} Doors - Color: ${color} - Transmission: ${transmission} 
        `;

        result.appendChild(carHTML);
    });    
}

function fillSelect() {
    for (let i = maxDate; i >= minDate; i--) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        year.appendChild(option);
    }
}