const API_BASE_URL = 'http://localhost:8080/api';

class ApiService {
    async getAllHumanBeings(page = 0, size = 10, sortBy = '', sortDir = '', filterBy = '', filterValue = '') {
        let url = `${API_BASE_URL}/human-beings?page=${page}&size=${size}`;
        if (sortBy) {
            url += `&sortBy=${sortBy}&sortDir=${sortDir}`;
        }
        if (filterBy && filterValue) {
            url += `&filterBy=${encodeURIComponent(filterBy)}&filterValue=${encodeURIComponent(filterValue)}`;
        }
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch human beings');
        return await response.json();
    }

    async getHumanBeingById(id) {
        const response = await fetch(`${API_BASE_URL}/human-beings/${id}`);
        if (!response.ok) throw new Error('Failed to fetch human being');
        return await response.json();
    }

    async createHumanBeing(data) {
        const response = await fetch(`${API_BASE_URL}/human-beings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            const error = await response.json();
            throw error;
        }
        return await response.json();
    }

    async updateHumanBeing(id, data) {
        const response = await fetch(`${API_BASE_URL}/human-beings/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            const error = await response.json();
            throw error;
        }
        return await response.json();
    }

    async deleteHumanBeing(id, replacementId = null) {
        let url = `${API_BASE_URL}/human-beings/${id}`;
        if (replacementId) {
            url += `?replacementId=${replacementId}`;
        }
        const response = await fetch(url, {
            method: 'DELETE'
        });
        if (!response.ok) throw new Error('Failed to delete human being');
    }

    async getAllCars() {
        const response = await fetch(`${API_BASE_URL}/human-beings/cars`);
        if (!response.ok) throw new Error('Failed to fetch cars');
        return await response.json();
    }

    async getAllCoordinates() {
        const response = await fetch(`${API_BASE_URL}/human-beings/coordinates`);
        if (!response.ok) throw new Error('Failed to fetch coordinates');
        return await response.json();
    }

    async deleteOneByWeaponType(weaponType) {
        const response = await fetch(`${API_BASE_URL}/human-beings/special/delete-by-weapon-type?weaponType=${weaponType}`, {
            method: 'POST'
        });
        if (!response.ok) {
            const error = await response.json();
            throw error;
        }
        return await response.json();
    }

    async getAverageImpactSpeed() {
        const response = await fetch(`${API_BASE_URL}/human-beings/special/average-impact-speed`);
        if (!response.ok) throw new Error('Failed to get average impact speed');
        return await response.json();
    }

    async findByNameContaining(substring) {
        const response = await fetch(`${API_BASE_URL}/human-beings/special/search-by-name?substring=${encodeURIComponent(substring)}`);
        if (!response.ok) throw new Error('Failed to search by name');
        return await response.json();
    }

    async setAllHeroesMoodToSadness() {
        const response = await fetch(`${API_BASE_URL}/human-beings/special/set-heroes-mood-sadness`, {
            method: 'POST'
        });
        if (!response.ok) throw new Error('Failed to set mood');
        return await response.json();
    }

    async setAllHeroesWithoutCarToRedLadaKalina() {
        const response = await fetch(`${API_BASE_URL}/human-beings/special/set-heroes-without-car-to-lada`, {
            method: 'POST'
        });
        if (!response.ok) throw new Error('Failed to set car');
        return await response.json();
    }
}

const apiService = new ApiService();