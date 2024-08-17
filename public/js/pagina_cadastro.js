// Obtém o formulário e define um evento de submit
document
  .getElementById('cadastro')
  .addEventListener('submit', async function (event) {
    event.preventDefault(); // Evita o comportamento padrão do formulário

    // Coleta os dados do formulário
    const formData = new FormData(this);

    // Verifica se as senhas correspondem
    if (
      document.getElementById('senhaCadastro').value !==
      document.getElementById('confirmarSenha').value
    ) {
      alert('As senhas não coincidem.');
      return;
    }

    // Cria um objeto com os dados do formulário
    const data = {
      name: formData.get('nome'),
      cpf: formData.get('CPF'),
      cnpj: formData.get('CNPJ'),
      phone: formData.get('telefone'),
      socialMedia: formData.get('redesocial'),
      email: formData.get('emailCadastro'),
      password: formData.get('senhaCadastro'),
    };

    try {
      // Envia a requisição POST para a API
      const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      // Verifica se a resposta foi bem-sucedida
      if (!response.ok) {
        throw new Error('Erro na requisição');
      }

      // Exibe uma mensagem de sucesso ou redireciona o usuário
      alert('Cadastro realizado com sucesso!');
      window.location.href = 'pagina_login.html'; // Redireciona para a página de login
    } catch (error) {
      // Exibe uma mensagem de erro
      alert('Ocorreu um erro: ' + error.message);
    }
  });
