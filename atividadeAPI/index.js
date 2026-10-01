fetch('http://localhost:3000/jogos')
    .then(res => res.json())
    .then(data => {
        const ul = document.getElementById("lista");
        
        data.forEach(user => {
            const li = document.createElement("li");

            li.innerHTML = `
                <div class="info-jogo">
                    <span class="span_titulo">${user.titulo}</span>
                    <span class="span_genero">${user.genero}</span>
                    <span class="span_nota">Nota ${user.nota}</span>
                </div>
                <div class="acoes">
                    <button class="btn-status">Quero jogar</button>
                    <button class="btn-editar">EDITAR</button>
                    <button class="btn-excluir">EXCLUIR</button>
                </div>
            `;

            const excluir = li.querySelector('.btn-excluir');
            excluir.addEventListener('click', () => {
                fetch(`http://localhost:3000/jogos/${user.id}`, {
                    method: "DELETE"
                })
                .then(() => {
                    li.remove();
                })
                .catch(err => console.error("Erro ao excluir:", err));
            });

            const btnEditar = li.querySelector('.btn-editar');
            btnEditar.addEventListener('click', () => {
                document.getElementById('titulo').value = user.titulo;
                document.getElementById('genero').value = user.genero;
                document.getElementById('nota').value = user.nota;
                
                document.getElementById('form-jogo').dataset.idEdicao = user.id;
            });

            ul.appendChild(li);
        });
    })
    .catch(err => console.error("erro ao buscar usuario", err));





    
const form = document.getElementById('form-jogo');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const idParaEditar = form.dataset.idEdicao;
    const jogoAtualizado = {
        titulo: document.getElementById('titulo').value,
        genero: document.getElementById('genero').value,
        nota: document.getElementById('nota').value
    };

    if (idParaEditar) {
        
        fetch(`http://localhost:3000/jogos/${idParaEditar}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jogoAtualizado)
        })
        .then(res => res.json())
        .then(() => {
            delete form.dataset.idEdicao;
            location.reload(); 
        });
    } else {
     
        fetch('http://localhost:3000/jogos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jogoAtualizado)
        })
        .then(res => res.json())
        .then(() => {
            location.reload();
        });
    }
});