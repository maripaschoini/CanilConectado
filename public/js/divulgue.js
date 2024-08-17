document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('cadastro');
  const idUser = localStorage.getItem('idUser'); // Recupera o idUser do localStorage
  const userInfo = JSON.parse(localStorage.getItem('userInfo')); // pega as informações do usuário

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const imageFile = formData.get('image');

    let base64Image = null;

    if (imageFile && imageFile.size > 0) {
      const reader = new FileReader();

      reader.onloadend = async function () {
        base64Image = reader.result.split(',')[1];

        // pega as informações, coloca variável e a partir dela, no backend, o animal será cadastrado
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
          const response = await fetch('http://localhost:3000/animals', { // cria o animal
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
          });

          if (!response.ok) {
            throw new Error('Erro ao cadastrar o animal');
          }

          const result = await response.json();
          window.location.href = `/index.html?userId=${idUser}`;
        } catch (error) {
          console.error('Erro:', error);
          alert('Erro ao cadastrar o animal.');
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
        const response = await fetch('http://localhost:3000/animals', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error('Erro ao cadastrar o animal');
        }

        const result = await response.json();
        window.location.href = `/index.html?userId=${idUser}`;
      } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao cadastrar o animal.');
      }
    }
  });
});
