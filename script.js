document.getElementById('autorizacaoForm').addEventListener('submit', async function(e) {
  e.preventDefault();

  const formData = {
    nomeDesbravador: document.getElementById('nomeDesbravador').value,
    idade: document.getElementById('idade').value,
    nomeResponsavel: document.getElementById('nomeResponsavel').value,
    telefoneResponsavel: document.getElementById('telefoneResponsavel').value,
    autorizacao: document.getElementById('autorizacao').checked
  };

  // Enviar para backend futuramente
  const res = await fetch('/enviar', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  });

  const result = await res.json();

  if (res.ok) {
    document.getElementById('mensagem').textContent = 'Autorização enviada com sucesso!';
    document.getElementById('autorizacaoForm').reset();
  } else {
    document.getElementById('mensagem').textContent = 'Erro ao enviar a autorização.';
    document.getElementById('mensagem').style.color = 'red';
  }
});