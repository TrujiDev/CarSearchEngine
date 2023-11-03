const result = document.querySelector('#result');

document.addEventListener('DOMContentLoaded', () => {
    showCars();
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