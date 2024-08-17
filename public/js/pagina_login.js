document
  .getElementById('login')
  .addEventListener('submit', async function (event) {
    event.preventDefault(); // Evita o envio padrão do formulário

    const email = document.getElementById('email').value;
    const password = document.getElementById('senha').value;

    try {
      const response = await fetch('http://localhost:3000/users/login', {
        // rota pra login
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Login bem-sucedido, resposta:', data); // Log da resposta

        // pegar id do usuário
        if (data.idUser) {
          localStorage.setItem('idUser', data.idUser);
          // pegar o resto das informações do user
          const userResponse = await fetch(
            `http://localhost:3000/users/${data.idUser}`,
          );
          if (userResponse.ok) {
            const userData = await userResponse.json();
            // Armazena todas as informações necessárias no localStorage
            localStorage.setItem('userInfo', JSON.stringify(userData));
            window.location.href = '/index.html';
          } else {
            console.error('Erro ao buscar informações do usuário.');
            alert('Erro ao buscar informações do usuário.');
          }

          window.location.href = '/index.html?userId=${idUser}';
        } else {
          console.error('ID do usuário não encontrado na resposta:', data);
          alert('Erro ao fazer login: ID do usuário não encontrado.');
        }
      } else {
        const errorData = await response.json();
        console.error('Erro na resposta do servidor:', errorData);
        alert(errorData.message || 'Erro ao fazer login');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      alert(
        'Ocorreu um erro ao tentar fazer login. Tente novamente mais tarde.',
      );
    }
  });
