let editingId = null;

async function openCreateModal() {
    editingId = null;
    document.getElementById('modal-title').textContent = 'Create Object';
    document.getElementById('human-being-form').reset();
    document.getElementById('form-id').value = '';
    document.getElementById('form-has-toothpick').value = 'false';
    clearErrors();

    const modal = document.getElementById('modal');
    modal.style.display = 'block';
}

async function editHumanBeing(id) {
    editingId = id;
    document.getElementById('modal-title').textContent = 'Edit Object';
    clearErrors();

    try {
        const hb = await apiService.getHumanBeingById(id);

        document.getElementById('form-id').value = hb.id;
        document.getElementById('form-name').value = hb.name;
        document.getElementById('form-x').value = hb.coordinates.x;
        document.getElementById('form-y').value = hb.coordinates.y;
        document.getElementById('form-real-hero').value = hb.realHero;
        document.getElementById('form-has-toothpick').value = hb.hasToothpick === null ? '' : hb.hasToothpick;
        document.getElementById('form-car-name').value = hb.car.name || '';
        document.getElementById('form-mood').value = hb.mood;
        document.getElementById('form-impact-speed').value = hb.impactSpeed;
        document.getElementById('form-minutes-waiting').value = hb.minutesOfWaiting;
        document.getElementById('form-weapon-type').value = hb.weaponType || '';

        const modal = document.getElementById('modal');
        modal.style.display = 'block';
    } catch (error) {
        alert('Ошибка загрузки объекта: ' + error.message);
    }
}


function clearErrors() {
    document.querySelectorAll('.error').forEach(el => el.textContent = '');
}

function showError(field, message) {
    const errorEl = document.getElementById(`error-${field}`);
    if (errorEl) {
        errorEl.textContent = message;
    }
}

async function handleFormSubmit(e) {
    e.preventDefault();
    clearErrors();

    const carName = document.getElementById('form-car-name').value.trim();

    let carId = null;
    try {
        if (carName) {
            const cars = await apiService.getAllCars();
            const existingCar = cars.find(c => c.name && c.name === carName);
            if (existingCar) {
                carId = existingCar.id;
            } else {
                const response = await fetch('http://localhost:8080/api/cars', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({name: carName})
                });
                if (response.ok) {
                    const newCar = await response.json();
                    carId = newCar.id;
                } else {
                    throw new Error('Failed to create car');
                }
            }
        } else {
            const response = await fetch('http://localhost:8080/api/cars', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({name: null})
            });
            if (response.ok) {
                const newCar = await response.json();
                carId = newCar.id;
            } else {
                throw new Error('Failed to create car');
            }
        }
    } catch (error) {
        showError('car-name', 'Failed to create or find car: ' + error.message);
        return;
    }

    const formData = {
        name: document.getElementById('form-name').value,
        coordinates: {
            x: parseInt(document.getElementById('form-x').value),
            y: parseFloat(document.getElementById('form-y').value)
        },
        realHero: document.getElementById('form-real-hero').value === 'true',
        hasToothpick: document.getElementById('form-has-toothpick').value === ''
            ? null
            : document.getElementById('form-has-toothpick').value === 'true',
        car: {
            id: carId
        },
        mood: document.getElementById('form-mood').value,
        impactSpeed: parseFloat(document.getElementById('form-impact-speed').value),
        minutesOfWaiting: parseFloat(document.getElementById('form-minutes-waiting').value),
        weaponType: document.getElementById('form-weapon-type').value === ''
            ? null
            : document.getElementById('form-weapon-type').value
    };

    clearErrors();
    let hasErrors = false;

    if (formData.coordinates.x > 112) {
        showError('x', 'X coordinate cannot exceed 112');
        hasErrors = true;
    }

    if (formData.coordinates.y <= -926) {
        showError('y', 'Y coordinate must be greater than -926');
        hasErrors = true;
    }

    if (formData.impactSpeed > 345) {
        showError('impact-speed', 'Impact speed cannot exceed 345');
        hasErrors = true;
    }

    if (hasErrors) {
        return;
    }

    try {
        if (editingId) {
            await apiService.updateHumanBeing(editingId, formData);
        } else {
            await apiService.createHumanBeing(formData);
        }

        document.getElementById('modal').style.display = 'none';

        if (!editingId) {
            localStorage.setItem('currentPage', '0');
            if (typeof window !== 'undefined') {
                window.currentPage = 0;
            }
        }

        if (window.loadTable) {
            window.loadTable();
        } else if (typeof loadTable === 'function') {
            loadTable();
        } else {
            setTimeout(() => window.location.reload(), 100);
        }
    } catch (error) {
        if (error.error) {
            clearErrors();
            Object.keys(error.error).forEach(key => {
                showError(key.replace(/([A-Z])/g, '-$1').toLowerCase(), error.error[key]);
            });
        } else {
            console.error('Error:', error);
        }
    }
}

async function handleCarFormSubmit(e) {
    e.preventDefault();
    const carName = document.getElementById('car-name-input').value.trim();

    try {
        let carData = {name: carName};
        if (!carName) {
            const cars = await apiService.getAllCars();
            const carNumber = cars.length + 1;
            carData.name = `Car #${carNumber}`;
        }

        const response = await fetch('http://localhost:8080/api/cars', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(carData)
        });

        if (!response.ok) {
            throw new Error('Failed to create car');
        }

        const newCar = await response.json();

        await loadCars();
        document.getElementById('form-car').value = newCar.id;

        document.getElementById('car-modal').style.display = 'none';
        document.getElementById('car-form').reset();
    } catch (error) {
        console.error('Error creating car:', error);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('human-being-form').addEventListener('submit', handleFormSubmit);

    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.addEventListener('click', function () {
            this.closest('.modal').style.display = 'none';
        });
    });

    document.getElementById('cancel-btn').addEventListener('click', function () {
        document.getElementById('modal').style.display = 'none';
    });

    document.getElementById('close-view-btn').addEventListener('click', function () {
        document.getElementById('view-modal').style.display = 'none';
    });

    window.addEventListener('click', function (event) {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    });
});

window.openCreateModal = openCreateModal;
window.editHumanBeing = editHumanBeing;