const form = document.getElementById('autorizacao-form');
const mesagem = document.getElementById('mensagem');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nomeDesbravador = document.getElementById('nome-desbravador').value;
    const dataNascimento = document.getElementById('data-nascimento').value;
    const contatoEmergencia = document.getElementById('contato-emergencia').value;
    const condicoesMedicas = document.getElementById('condicoes-medicas').value;
    const medicamentos = document.getElementById('medicamentos').value;
    const assinatura = document.getElementById('assinatura').value;

    // Enviar os dados para o servidor ou armazená-los localmente
    // Por exemplo, usando AJAX ou fetch API
    fetch('/enviar-autorizacao', {
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
        mensagem.textContent = 'Erro ao enviar autorização';
    });

});