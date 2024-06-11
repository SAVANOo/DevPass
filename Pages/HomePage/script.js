const accessToken = localStorage.getItem('token');
if (!accessToken) window.location.href = "../LoginPage/Index.html";

fetch(`${baseUrl}/comunidades`, {
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${accessToken}`
    }
})
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Falha ao acessar o recurso protegido. Por favor, faça login novamente.');
        }
    })
    .then(data => {
        // aqui vocês implementam lógica pra adicionar na tela, ou sei lá o que 
        console.log('Dados recebidos:', data);
    }).catch(error => {
        console.error('Erro na requisição:', error);
        window.location.href = "../LoginPage/Index.html";
    });
