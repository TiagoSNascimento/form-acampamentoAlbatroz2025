const form = document.getElementById('autorizacao-form');
const mensagem = document.getElementById('mensagem');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nomeDesbravador = document.getElementById('nome-desbravador').value;
    const dataNascimento = document.getElementById('data-nascimento').value;
    const contatoEmergencia = document.getElementById('contato-emergencia').value;
    const condicoesMedicas = document.getElementById('condicoes-medicas').value;

    fetch('https://script.google.com/macros/s/AKfycbw4POK7z7vQgk5BDV3M__UZnStnzXsKptSpaIn7X-U8oc4QHxP2GEtqhL6jPBWZJbjp9A/exec', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nomeDesbravador,
            dataNascimento,
            contatoEmergencia,
            condicoesMedicas,
            medicamentos,
            assinatura
        })
    })
    .then((response) => response.json())
    .then((data) => {
        mensagem.textContent = 'Autorização enviada com sucesso!';
        form.reset();
    })
    .catch((error) => {
        console.error(error);
        mensagem.textContent = 'Erro ao enviar autorização';
    });
});
