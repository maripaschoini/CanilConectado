document.addEventListener('DOMContentLoaded', async function () {
  const urlParams = new URLSearchParams(window.location.search); // pega os parâmetros enviados pela url
  const idAnimal = Number(urlParams.get('id')); // pega o id do animal selecionado
  const idUser = Number(localStorage.getItem('idUser')); // pega o id do usuário logado

  if (!idAnimal) {
    console.error('ID do animal não encontrado na URL');
    return;
  }

  try {
    const response = await fetch(`http://localhost:3000/animals/${idAnimal}`); // requisição pra pegar as info do animal selecionado
    const animal = await response.json();

    const animalDetails = document.getElementById('animal-details');
    const imageUrl = animal.image
      ? `http://localhost:3000/animals/image/${animal.image}`
      : '/img/default-animal.png';

      // mostrar as informações do animal
    animalDetails.innerHTML = `
            <img src="${imageUrl}" alt="${animal.name}"/>
            <h2>${animal.name}</h2>
            <p><strong>Raça:</strong> ${animal.breed}</p>
            <p><strong>Idade:</strong> ${animal.age} anos</p>
            <p><strong>Localização:</strong> ${animal.city}</p>
            <p><strong>Descrição:</strong> ${animal.information}</p>
        `;
  } catch (error) {
    console.error('Erro ao carregar os detalhes do animal:', error);
  }

  // Evento de clique no botão "Me Adote"
  const interesseButton = document.getElementById('interesse');
  interesseButton.addEventListener('click', async function () {
    if (!idUser) {
      console.error('Usuário não está logado.');
      return;
    }

    try {
        // criar um interesse (inserção de um interesse na tabela interests)
      const response = await fetch(`http://localhost:3000/interests/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: idUser, animalId: idAnimal }),
      });

      if (response.ok) {
        console.log('Interesse criado com sucesso.');
      } else {
        console.error('Erro ao criar interesse.');
      }
    } catch (error) {
      console.error('Erro ao criar interesse:', error);
    }
  });

  // Modal
  const contactModal = document.getElementById('contactModal');
  const contactInfo = document.getElementById('contact-info');
  const closeButton = document.querySelector('.close');

  interesseButton.addEventListener('click', async function () {
    try {
      const responseUser = await fetch(`http://localhost:3000/users/${idUser}`);
      const user = await responseUser.json();
        // exibir no modal as informações do usuário doador
      contactInfo.innerHTML = `
                <p><strong>Nome:</strong> ${user.name}</p>
                <p><strong>Telefone:</strong> ${user.phone}</p>
                <p><strong>Email:</strong> ${user.email}</p>
            `;

      contactModal.style.display = 'block';

      closeButton.addEventListener('click', function () {
        contactModal.style.display = 'none';
      });

      window.addEventListener('click', function (event) {
        if (event.target === contactModal) {
          contactModal.style.display = 'none';
        }
      });
    } catch (error) {
      console.error('Erro ao carregar as informações de contato:', error);
    }
  });
});
