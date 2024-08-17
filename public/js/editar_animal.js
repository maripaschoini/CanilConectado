document.addEventListener('DOMContentLoaded', async () => {
  const form = document.getElementById('editar');
  const idUser = localStorage.getItem('idUser'); // Recupera o idUser do localStorage
  console.log(idUser);
  const userInfo = JSON.parse(localStorage.getItem('userInfo')); // pega as informações do usuário
  const urlParams = new URLSearchParams(window.location.search); // pega os parâmetros enviados pela url
  const idAnimalStr = urlParams.get('animalId');
  const idAnimal = Number(idAnimalStr);
  console.log('Tipo de data:', typeof animalId);
   console.log(idAnimal);

  try {
    // Buscar as informações do animal pelo ID
    const response = await fetch(`http://localhost:3000/animals/${idAnimal}`);
    if (!response.ok) {
      throw new Error('Erro ao buscar informações do animal');
    }
    const animalData = await response.json();

    // Preencher os campos do formulário com as informações do animal
    form.nome.value = animalData.name || '';
    form.genero.value = animalData.gender || '';
    form.porte.value = animalData.size || '';
    form.idade.value = animalData.age || '';
    form.especie.value = animalData.species || '';
    form.raca.value = animalData.breed || '';
    form.info.value = animalData.information || '';
    form.cidade.value = animalData.city || '';
    form.estado.value = animalData.state || '';
    form.endereco.value = animalData.adress || '';
    form.bairro.value = animalData.neighborhood || '';
    form.numero.value = animalData.number || '';
  } catch (error) {
    console.error('Erro ao carregar informações do animal:', error);
    alert('Erro ao carregar informações do animal.');
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const imageFile = formData.get('image');

    let base64Image = null;

    if (imageFile && imageFile.size > 0) {
      const reader = new FileReader();

      reader.onloadend = async function () {
        base64Image = reader.result.split(',')[1];

        const payload = {
          name: formData.get('nome'),
          gender: formData.get('genero'),
          size: formData.get('porte'),
          age: Number(formData.get('idade')),
          species: formData.get('especie'),
          breed: formData.get('raca'),
          information: formData.get('info'),
          city: formData.get('cidade'),
          state: formData.get('estado'),
          adress: formData.get('endereco'),
          neighborhood: formData.get('bairro'),
          number: Number(formData.get('numero')),
          userId: Number(userInfo.idUser),
          image: base64Image,
        };

        try {
          const response = await fetch(
            `http://localhost:3000/animals/${idAnimal}`,
            {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(payload),
            },
          );

          if (!response.ok) {
            throw new Error('Erro ao editar o animal');
          }

          const result = await response.json();
          window.location.href = `/index.html?userId=${idUser}`;
        } catch (error) {
          console.error('Erro:', error);
          alert('Erro ao editar o animal.');
        }
      };

      reader.readAsDataURL(imageFile);
    } else {
      const payload = {
        name: formData.get('nome'),
        gender: formData.get('genero'),
        size: formData.get('porte'),
        age: Number(formData.get('idade')),
        species: formData.get('especie'),
        breed: formData.get('raca'),
        information: formData.get('info'),
        city: formData.get('cidade'),
        state: formData.get('estado'),
        adress: formData.get('endereco'),
        neighborhood: formData.get('bairro'),
        number: Number(formData.get('numero')),
        userId: Number(userInfo.idUser),
      };

      try {
        const response = await fetch(
          `http://localhost:3000/animals/${idAnimal}`,
          {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
          },
        );

        if (!response.ok) {
          throw new Error('Erro ao editar o animal');
        }

        const result = await response.json();
        window.location.href = `/index.html?userId=${idUser}`;
      } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao editar o animal.');
      }
    }
  });
});
