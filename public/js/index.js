document.addEventListener('DOMContentLoaded', async function () {
  const btnQueroDivulgar = document.getElementById('btn-queroDivulgar');
  const idUser = localStorage.getItem('idUser'); // pega o id do usuário logado
  console.log(idUser); // console pra verificar o usuário logado

  try {
    const response = await fetch('http://localhost:3000/animals'); // pega os animais cadastrados
    const animals = await response.json();

    const animalList = document.getElementById('animal-list');

    // mostra os animais 
    animals.forEach((animal) => {
      const animalItem = document.createElement('div');
      animalItem.classList.add('animal-item');

      animalItem.innerHTML = `
                <a href="animal_info.html?id=${animal.idAnimal}">
                    <img src="${animal.imageUrl}" alt="${animal.name}">
                    <h3>${animal.name}</h3>
                    <p>${animal.breed}</p>
                    <p>${animal.age} anos</p>
                    <p>${animal.city} - 
                    ${animal.state}</p>
                </a>
            `;

      animalList.appendChild(animalItem);
    });
  } catch (error) {
    console.error('Erro ao carregar a lista de animais:', error);
  }

  btnQueroDivulgar.addEventListener('click', function (event) {
    event.preventDefault(); // Evita o redirecionamento imediato
    console.log({ idUser });
    
    if (idUser) {
      // Redireciona para a página de divulgação com o ID do usuário
      window.location.href = `/divulgue.html?userId=${idUser}`;
    } else {
      // redireciona para a página de login
      window.location.href = `/pagina_login.html`;
    }
  });
});
