const enterButton = document.getElementById("enterButton");

function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
        document.body.removeChild(toast);
    }, 3000);
}

enterButton.addEventListener("click", async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!email || !password) {
        showToast('Por favor, preencha ambos os campos.');
        return;
    }

    try {
        const response = await fetch(`${baseUrl}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Login successful:', data);
            localStorage.setItem('token', data.access_token);
            window.location.href = "../HomePage/Index.html";
        } else {
            showToast('Falha no login. Verifique suas credenciais.');
        }
    } catch (error) {
        console.error('Error during login:', error);
        showToast('Ocorreu um erro durante o login. Tente novamente mais tarde.');
    }
});
