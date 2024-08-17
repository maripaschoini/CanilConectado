document.addEventListener('DOMContentLoaded', () => {
  const idUser = Number(localStorage.getItem('idUser'));
  const showInfoButton = document.getElementById('show-info');
  const showInterestsButton = document.getElementById('show-interests');

  showInfoButton.addEventListener('click', () => {
    if (!idUser) {
      console.error('Usuário não está logado.');
      return;
    }

    // Animais cadastrados pelo usuário
    fetch(`http://localhost:3000/users/${idUser}/animals`)
      .then((response) => {
        console.log('Resposta da API:', response);
        if (!response.ok) {
          throw new Error('Erro ao buscar os animais');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Tipo de data:', typeof data);
        console.log('Dados recebidos:', data);

        const animals = data.animal; // Acessa o array de animais

        if (Array.isArray(animals)) {
          document.getElementById('user-info').style.display = 'block';
          document.getElementById('user-interests').style.display = 'none';

          const userInfo = document.getElementById('user-info');
          userInfo.innerHTML = '<h2>Animais Cadastrados</h2>';

          if (animals.length === 0) {
            userInfo.innerHTML += '<p>Nenhum animal cadastrado encontrado.</p>';
          } else {
            animals.forEach((animal) => {
              const animalItem = document.createElement('div');
              animalItem.className = 'animal-item';
             

              animalItem.innerHTML = `
              <img src="http://localhost:3000/animals/image/${animal.id}" alt="${animal.name}">
              <h3>${animal.name}</h3>
              <p>Espécie: ${animal.species}</p>
              <p>Raça: ${animal.breed}</p>
               <button class="edit-animal" data-id="${animal.id}">Editar</button>
            `;

              userInfo.appendChild(animalItem);
            });
          }
        } else {
          console.error('A resposta da API não é um array:', animals);
        }
      })
      .catch((error) => {
        console.error('Erro ao buscar animais cadastrados:', error);
      });
  });


  // botão de edição
  document.addEventListener('click', (event) => {
    if (event.target.classList.contains('edit-animal')) {
      const animalIdstr = event.target.dataset.id;
      animalId = Number(animalIdstr);
      window.location.href = `/editar_animal.html?animalId=${animalId}`;
    }
  });
 

  showInterestsButton.addEventListener('click', () => {
    if (!idUser) {
      console.error('Usuário não está logado.');
      return;
    }

    fetch(`http://localhost:3000/interests/user/${idUser}`) // Interesses do usuário
      .then((response) => response.json())
      .then((data) => {
        document.getElementById('user-info').style.display = 'none';
        document.getElementById('user-interests').style.display = 'block';

        const interestsList = document.getElementById('interests-list');
        interestsList.innerHTML = ''; // Limpar a lista existente

        data.forEach((interest) => {
          fetch(`http://localhost:3000/animals/${interest.idAnimal}`)
            .then((response) => response.json())
            .then((animal) => {
              const animalItem = document.createElement('div');
              animalItem.className = 'animal-item';

              animalItem.dataset.animalId = animal.id;
              animalItem.dataset.userId = idUser;

              animalItem.innerHTML = `
                <img src="http://localhost:3000/animals/image/${animal.id}" alt="${animal.name}">
                <h3>${animal.name}</h3>
                <p>Espécie: ${animal.species}</p>
                <p>Raça: ${animal.breed}</p>
              `;

              interestsList.appendChild(animalItem);
            })
            .catch((error) =>
              console.error('Erro ao buscar detalhes do animal:', error),
            );
        });
      });
  });
});
