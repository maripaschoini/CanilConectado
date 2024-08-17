document.addEventListener('DOMContentLoaded', async function () {
  const especieSelect = document.getElementById('especie');
  const racaSelect = document.getElementById('raca');
  const generoSelect = document.getElementById('genero');
  const porteSelect = document.getElementById('porte');
  const estadoSelect = document.getElementById('estado');
  const idadeSelect = document.getElementById('idade');

  // Função para buscar e carregar os filtros
  async function loadFilters() {
    try {
      const response = await fetch('http://localhost:3000/animals/search');
      const filters = await response.json();

      filters.especies.forEach((especie) => {
        const option = document.createElement('option');
        option.value = especie;
        option.textContent = especie;
        especieSelect.appendChild(option);
      });

      filters.racas.forEach((raca) => {
        const option = document.createElement('option');
        option.value = raca;
        option.textContent = raca;
        racaSelect.appendChild(option);
      });

      filters.generos.forEach((genero) => {
        const option = document.createElement('option');
        option.value = genero;
        option.textContent = genero;
        generoSelect.appendChild(option);
      });

      filters.portes.forEach((porte) => {
        const option = document.createElement('option');
        option.value = porte;
        option.textContent = porte;
        porteSelect.appendChild(option);
      });

      filters.estados.forEach((estado) => {
        const option = document.createElement('option');
        option.value = estado;
        option.textContent = estado;
        estadoSelect.appendChild(option);
      });

      filters.idades.forEach((idade) => {
        const option = document.createElement('option');
        option.value = idade;
        option.textContent = `${idade} anos`;
        idadeSelect.appendChild(option);
      });
    } catch (error) {
      console.error('Erro ao carregar filtros:', error);
    }
  }

  // Função para buscar animais com base nos filtros
  async function searchAnimals() {
    const especie = especieSelect.value;
    const raca = racaSelect.value;
    const genero = generoSelect.value;
    const porte = porteSelect.value;
    const estado = estadoSelect.value;
    const idade = idadeSelect.value;

    const queryParams = new URLSearchParams({
      especie,
      raca,
      genero,
      porte,
      estado,
      idade,
    });

    try {
      const response = await fetch(
        `http://localhost:3000/animals/search?${queryParams}`,
      );
      const animals = await response.json();

      const animalList = document.getElementById('animal-list');
      animalList.innerHTML = ''; // Limpa a lista antes de adicionar novos resultados

      animals.forEach((animal) => {
        const animalDiv = document.createElement('div');
        animalDiv.classList.add('animal');

        animalDiv.innerHTML = `
            <img src="${animal.imageUrl}" alt="${animal.name}">
            <h2>${animal.name}</h2>
            <p><strong>Raça:</strong> ${animal.breed}</p>
            <p><strong>Idade:</strong> ${animal.age} anos</p>
            <p><strong>Localização:</strong> ${animal.city}</p>
            <p><strong>Descrição:</strong> ${animal.information}</p>
          `;

        animalList.appendChild(animalDiv);
      });
    } catch (error) {
      console.error('Erro ao buscar animais:', error);
    }
  }

  // Carregar filtros ao carregar a página
  loadFilters();

  // Adicionar event listener para filtrar quando o usuário mudar algum filtro
  const filters = [
    especieSelect,
    racaSelect,
    generoSelect,
    porteSelect,
    estadoSelect,
    idadeSelect,
  ];
  filters.forEach((filter) => {
    filter.addEventListener('change', searchAnimals);
  });

  // Carregar animais inicialmente sem filtros
  searchAnimals();
});
