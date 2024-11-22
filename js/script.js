//LOGIN
function fazerLogin() {
  const matricula = document.getElementById("matricula").value;
  const senha = document.getElementById("senha").value;

  fetch("http://localhost:3000/pessoas/")
    .then((response) => response.json())
    .then((data) => {
      const pessoa = data.find(
        (p) => p.matricula === matricula && p.senha == senha
      );

      if (pessoa && senha < 20) {
        alert("Login efetuado. Você é um administrador.");
        sessionStorage.setItem("matriculaLogada", matricula);
        window.location.href = "./indexAdm.html";
      } else if (pessoa) {
        alert("Login efetuado. Você é um aluno.");
        sessionStorage.setItem("matriculaLogada", matricula);
        window.location.href = "./index.html";
      } else {
        alert("Matricula ou Senha Incorretos.");
      }
    });
}
function sair() {
  sessionStorage.removeItem("matriculaLogada"); // Remove a matrícula ao sair
  window.location.href = "login.html"; // Redireciona para a página de login
}
//REDEFINIR SENHA
function redefineSenha() {
  const matriculaDigitada = document.getElementById("matriculaDig").value;
  const novaSen = document.getElementById("novaSenha").value;
  const confNovaSen = document.getElementById("confNovaSenha").value;

  console.log(matriculaDigitada);
  console.log(novaSen);

  if (novaSen === "" || confNovaSen === "") {
    alert("Insira a nova senha.");
    return;
  }

  if (novaSen !== confNovaSen) {
    alert("As senhas devem ser iguais.");
    return;
  }

  // Fetch to get the list of people
  fetch("http://localhost:3000/pessoas/")
    .then((response) => response.json())
    .then((data) => {
      // Find the person with the given matricula
      const pessoa = data.find((p) => p.matricula === matriculaDigitada);

      if (!pessoa) {
        alert("Digite a matricula corretamente.");
        return;
      }

      // Update the password
      fetch(`http://localhost:3000/pessoas/${pessoa.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          senha: novaSen
        }),
      })
        .then((response) => {
          if (response.ok) {
            alert("Senha redefinida com sucesso.");
          } else {
            alert("Erro ao redefinir a senha.");
          }
        })
        .catch((error) => {
          console.error('Erro:', error);
          alert("Erro ao redefinir a senha.");
        });
    })
    .catch((error) => {
      console.error('Erro:', error);
      alert("Erro ao buscar os dados.");
    });
}


//***************************************************************************** */

// POST
document.getElementById("formCadastro").addEventListener("submit", function (event) {
  // Previne a submissão padrão do formulário
  event.preventDefault();

  const titulo = document.getElementById("titulo").value;
  const sinopse = document.getElementById("sinopse").value;
  const categoria = document.getElementById("categoria").value;
  const idioma = document.getElementById("idioma").value;
  const faixaEtaria = document.getElementById("faixaEtaria").value;
  const nPaginas = document.getElementById("nPaginas").value;
  const imagem = document.getElementById("imagem").value;

  const estoque = document.getElementsByName('disponibilidade');
  let disponibilidade;

  if (estoque[0].checked) {
    disponibilidade = estoque[0].value;
  } else if (estoque[1].checked) {
    disponibilidade = estoque[1].value;
  }

  console.log(titulo);
  console.log(sinopse);
  console.log(categoria);
  console.log(idioma);
  console.log(faixaEtaria);
  console.log(nPaginas);
  console.log(imagem);
  console.log(disponibilidade);

  // Para envio dos dados para o servidor
  fetch("http://localhost:3000/cadastrarLivros", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      titulo: titulo,
      sinopse: sinopse,
      categoria: categoria,
      idioma: idioma,
      faixaEtaria: faixaEtaria,
      nPaginas: nPaginas,
      imagem: imagem,
      estoque: disponibilidade,
    }),
  }).then((response) => response.json());
});


// GET - READ
function buscarTitulo() {
  const titulo = document.getElementById("titulo_digitado").value;

  if (titulo === "") {
    alert("Por favor, digite um título.");
    return; // Interrompe a execução da função se o título estiver vazio
  }

  fetch(
    `http://localhost:3000/cadastrarLivros?titulo=${encodeURIComponent(
      titulo
    )}`,
    {
      method: "GET",
    }
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      // Se a busca retornar múltiplos livros, você pode precisar ajustar o código para lidar com isso
      if (data && data.length > 0) {
        // Limpar o resultado atual
        let resultadoHTML = "";

        data.forEach((livro) => {
          resultadoHTML +=
            "<strong> Titulo: </strong> <input class='input' type='text' value='" +
            livro.titulo +
            "' id='titulo2'><br><br>" +
            "<strong> Sinopse: </strong> <input type='text' value='" +
            livro.sinopse +
            "' id='sinopse2'> <br><br>" +
            "<strong> Categoria: </strong> <input type='text' value='" +
            livro.categoria +
            "' id='categoria2'> <br><br>" +
            "<strong> Idioma: </strong> <input type='text' value='" +
            livro.idioma +
            "' id='idioma2'> <br><br>" +
            "<strong> Faixa Etária: </strong> <input type='text' value='" +
            livro.faixaEtaria +
            "' id='faixaEtaria2'> <br><br>" +
            "<strong> Nº de Páginas: </strong> <input type='text' value='" +
            livro.nPaginas +
            "' id='nPaginas2'> <br>" +

            "<strong> Imagem: </strong> <input type='text' value='" +
            livro.imagem +
            "' id='imagem2'> <br>" +

            "<strong style='margin-left: 20px;'> Estoque: </strong> <br>" +

            "<label style='margin-right: 20px;'><input type='radio' name='disponibilidade' value='Disponível' " +
            (livro.estoque === 'Disponível' ? 'checked' : '') +
            " required>Disponível </label>" +
            "<label><input type='radio' name='disponibilidade' value='Esgotado' " +
            (livro.estoque === 'Esgotado' ? 'checked' : '') +
            " required>Esgotado </label> <br><br>" +

            "<strong> ID: </strong> <input readonly type='text' value='" +
            livro.id +
            "' id='id'> <br><br>" +
            "<input type='text' value='' id='id_digitado' placeholder='Confirme o ID para atualizar/deletar'>"
        });

        document.getElementById("resultado").innerHTML = resultadoHTML;
      }
      else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Nenhum livro encontrado com esse título.",
        });
        document.getElementById("resultado").innerHTML = "";
      }
    })
    .catch((error) => {
      console.error("Erro ao buscar título:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Erro ao buscar livro, tente novamente.",
      });
      document.getElementById("resultado").innerHTML = "";
    });
}

function dadosLivro() {
  fetch(`http://localhost:3000/cadastrarLivros/`, {})
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      // Limite de itens a serem exibidos
      const limite = 10;
      const dadosLimitados = data.slice(0, limite);

      document.getElementById("resultadoLivros").innerHTML = "<tr>" +
        "<th>ID</th>" +
        "<th>Titulo</th>" +
        "<th>Categoria</th>" +
        "<th>Idioma</th>" +
        "<th>Status</th>" +
        "</tr>";

      for (let i = 0; i < dadosLimitados.length; i++) {
        let titulo = dadosLimitados[i].titulo;

        // Quebrar o título se tiver mais de 28 caracteres
        if (titulo.length > 28) {
          const ultimoEspaco = titulo.lastIndexOf(' ', 18);
          if (ultimoEspaco !== -1) {
            titulo = titulo.slice(0, ultimoEspaco) + '<br>' + titulo.slice(ultimoEspaco + 1);
          }
        }

        document.getElementById("resultadoLivros").innerHTML +=
          "<tr>" +
          "<td>" +
          dadosLimitados[i].id +
          "</td>" +
          "<td>" +
          titulo +
          "</td>" +
          "<td>" +
          dadosLimitados[i].categoria +
          "</td>" +
          "<td>" +
          dadosLimitados[i].idioma +
          "</td>" +
          "<td>" +
          "<strong>" + dadosLimitados[i].estoque + "</strong>" +
          "</td>" +
          "</tr>";
      }
    })
    .catch((error) => console.error('Erro ao buscar dados:', error));
}


//UPDATE
function atualizarDados() {
  const id = document.getElementById("id_digitado").value;
  const titulo = document.getElementById("titulo2").value;
  const sinopse = document.getElementById("sinopse2").value;
  const categoria = document.getElementById("categoria2").value;
  const idioma = document.getElementById("idioma2").value;
  const faixaEtaria = document.getElementById("faixaEtaria2").value;
  const nPaginas = document.getElementById("nPaginas2").value;
  const imagem = document.getElementById("imagem2").value;
  const estoque = document.getElementsByName("disponibilidade");

  let disponibilidade;

  if (estoque[0].checked) {
    disponibilidade = estoque[0].value;
  } else if (estoque[1].checked) {
    disponibilidade = estoque[1].value;
  }

  if (id === "") {
    alert("Confirme o ID para atualizar.")
    return;
  }

  // Alert
  Swal.fire({
    title: "Deseja salvar as alterações?",
    showDenyButton: true,
    showCancelButton: false,
    confirmButtonText: "Salvar",
    denyButtonText: `Não Salvar`,
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire("Salvo!", "", "success");

      // Solicitação de busca para atualizar os dados
      fetch(`http://localhost:3000/cadastrarLivros/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          titulo: titulo,
          sinopse: sinopse,
          categoria: categoria,
          idioma: idioma,
          faixaEtaria: faixaEtaria,
          nPaginas: nPaginas,
          imagem: imagem,
          estoque: disponibilidade,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Data updated successfully:", data);
        })
        .catch((error) => {
          console.error("Error updating data:", error);
        });
    } else if (result.isDenied) {
      Swal.fire("As alterações não foram salvas.", "", "info");
    }
  });
}

//DELETE
function deletarDados() {
  const id = document.getElementById("id_digitado").value;

  if (id === "") {
    alert("Confirme o ID para deletar.")
    return;
  }

  Swal.fire({
    title: "Tem certeza?",
    text: "Você não poderá reverter isso!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Deletar!",
  }).then((result) => {
    if (result.isConfirmed) {
      // Perform the delete operation
      fetch(`http://localhost:3000/cadastrarLivros/${id}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Failed to delete");
          }
        })
        .then((data) => {
          Swal.fire({
            title: "Deletado!",
            text: "Your file has been deleted.",
            icon: "success",
          });
          console.log("Data deleted successfully:", data);
        })
        .catch((error) => {
          Swal.fire({
            title: "Erro!",
            text: "Ocorreu um problema ao excluir.",
            icon: "error",
          });
          console.error("Error deleting data:", error);
        });
    }
  });
}


//ALUNOS******************************************************************************

// POST
function cadastroAluno() {
  const nome = document.getElementById("nomeAluno").value;
  const idade = document.getElementById("idadeAluno").value;
  const unidSenai = document.getElementById("unidade").value;
  const curso = document.getElementById("option1").value;
  const turma = document.getElementById("turma").value;
  const email = document.getElementById("emailAluno").value;
  const nMatricula = document.getElementById("matriculaAluno").value;

  if (nMatricula === "") {
    alert("Preencha todos os campos")
    return;
  }

  console.log(unidSenai);

  // Para envio dos dados para o servidor
  fetch("http://localhost:3000/cadastrarAlunos", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nome: nome,
      idade: idade,
      unidSenai: unidSenai,
      curso: curso,
      turma: turma,
      email: email,
      nMatricula: nMatricula,
    }),
  }).then((response) => response.json());

}

//GET
function buscarAlunos() {
  const matricula = document.getElementById("matricula_digitada").value;

  if (matricula === "") {
    alert("Por favor, digite a matricula.");
    return; // Interrompe a execução da função se o título estiver vazio
  }

  fetch(
    `http://localhost:3000/cadastrarAlunos?nMatricula=${encodeURIComponent(
      matricula
    )}`,
    {
      method: "GET",
    }
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      // Se a busca retornar múltiplos livros, você pode precisar ajustar o código para lidar com isso
      if (data && data.length > 0) {
        // Limpar o resultado atual
        let resultadoHTML = "";

        data.forEach((aluno) => {
          resultadoHTML +=

            "<strong> Nome: </strong> <input class='input' type='text' value='" +
            aluno.nome +
            "' id='nomeAluno2'><br>" +
            "<strong> Idade: </strong> <input type='text' value='" +
            aluno.idade +
            "' id='idadeAluno2'> <br>" +
            "<strong> Unidade Senai: </strong> <input type='text' value='" +
            aluno.unidSenai +
            "' id='unidade2'> <br>" +
            "<strong> Curso: </strong> <input type='text' value='" +
            aluno.curso +
            "' id='option12'> <br>" +
            "<strong> Turma: </strong> <input type='text' value='" +
            aluno.turma +
            "' id='turma2'> <br>" +
            "<strong> E-mail: </strong> <input type='text' value='" +
            aluno.email +
            "' id='emailAluno2'> <br>" +
            "<strong> ID: </strong> <input readonly type='text' value='" +
            aluno.id +
            "' id='id2'> <br>" +
            "<input type='text' value='' id='id_digitado' placeholder='Confime o ID para atualizar/deletar'>";
        });

        document.getElementById("resultado").innerHTML = resultadoHTML;
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Nenhum livro encontrado com esse título.",
        });
        document.getElementById("resultado").innerHTML = "";
      }
    })
    .catch((error) => {
      console.error("Erro ao buscar título:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Erro ao buscar livro, tente novamente.",
      });
      document.getElementById("resultado").innerHTML = "";
    });
}

// PUT
function atualizarAlunos() {
  const id = document.getElementById("id_digitado").value;
  const nome = document.getElementById("nomeAluno2").value;
  const idade = document.getElementById("idadeAluno2").value;
  const unidSenai = document.getElementById("unidade2").value;
  const curso = document.getElementById("option12").value;
  const turma = document.getElementById("turma2").value;
  const email = document.getElementById("emailAluno2").value;

  if (id === "") {
    alert("Confirme o ID para atualizar.");
    return;
  }

  // Alert
  Swal.fire({
    title: "Deseja salvar as alterações?",
    showDenyButton: true,
    showCancelButton: false,
    confirmButtonText: "Salvar",
    denyButtonText: `Não Salvar`,
  }).then((result) => {
    if (result.isConfirmed) {
      // Solicitação de busca para atualizar os dados
      fetch(`http://localhost:3000/cadastrarAlunos/${id}`, {  // Incluindo o ID na URL
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: nome,
          idade: idade,
          unidSenai: unidSenai,
          curso: curso,
          turma: turma,
          email: email,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Erro na atualização');
          }
          return response.json();
        })
        .then((data) => {
          Swal.fire("Salvo!", "As alterações foram salvas com sucesso.", "success");
          console.log("Data updated successfully:", data);
        })
        .catch((error) => {
          Swal.fire("Erro!", "Não foi possível salvar as alterações.", "error");
          console.error("Error updating data:", error);
        });
    } else if (result.isDenied) {
      Swal.fire("As alterações não foram salvas.", "", "info");
    }
  });
}

//DELETE
function deletarAlunos() {
  const id = document.getElementById("id_digitado").value;

  if (id === "") {
    alert("Confirme o ID para deletar.")
    return;
  }

  Swal.fire({
    title: "Tem certeza?",
    text: "Você não poderá reverter isso!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Deletar!",
  }).then((result) => {
    if (result.isConfirmed) {
      // Perform the delete operation
      fetch(`http://localhost:3000/cadastrarAlunos/${id}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Failed to delete");
          }
        })
        .then((data) => {
          Swal.fire({
            title: "Deletado!",
            text: "Livro deletado!",
            icon: "success",
          });
          console.log("Livro deletado!", data);
        })
        .catch((error) => {
          Swal.fire({
            title: "Erro!",
            text: "Ocorreu um problema ao excluir.",
            icon: "error",
          });
          console.error("Error deleting data:", error);
        });
    }
  });
}
//RESERVAS***************************************************************************************
function reservas() {
  const titulo = document.getElementById("tituloLivro").value;
  const nMatricula = document.getElementById("matriculaAluno").value;
  const dataEmprestimo = document.getElementById("dataEmprestimo").value;

  if (nMatricula === "" || dataEmprestimo === "" || titulo === "") {
    alert("Preencha todos os campos")
    return;
  } else {
    alert("Enviado com sucesso")
  }


  // Para envio dos dados para o servidor
  fetch("http://localhost:3000/reservas", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      titulo: titulo,
      nMatricula: nMatricula,
      dataEmprestimo: dataEmprestimo
    }),
  }).then((response) => response.json());

}


function buscarDados() {
  fetch(`http://localhost:3000/reservas/`, {})
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      // Limite de itens a serem exibidos
      const limite = 10;
      const dadosLimitados = data.slice(0, limite);

      document.getElementById("resultadoReservas").innerHTML = "<tr>" +
        "<th>ID</th>" +
        "<th>Titulo</th>" +
        "<th>nMatricula</th>" +
        "<th>dataEmprestimo</th>" +
        "</tr>";

      for (let i = 0; i < dadosLimitados.length; i++) {
        document.getElementById("resultadoReservas").innerHTML +=
          "<tr>" +
          "<td>" +
          dadosLimitados[i].id +
          "</td>" +
          "<td>" +
          dadosLimitados[i].titulo +
          "</td>" +
          "<td>" +
          dadosLimitados[i].nMatricula +
          "</td>" +
          "<td>" +
          dadosLimitados[i].dataEmprestimo +
          "</td>" +
          "</tr>";
      }
    })
    .catch((error) => console.error('Erro ao buscar dados:', error));
}


//Meus livros
function meusLivros() {
  const matriculaLogada = sessionStorage.getItem("matriculaLogada");

  fetch("http://localhost:3000/reservas/")
    .then((response) => response.json())
    .then((data) => {
      // Filtra as reservas que pertencem à matrícula logada
      const reservasUsuario = data.filter((reserva) => reserva.nMatricula === matriculaLogada);

      // Limite de itens a serem exibidos
      const limite = 10;
      const dadosLimitados = reservasUsuario.slice(0, limite);

      // Cabeçalho da tabela
      document.getElementById("resultadoMeusLivros").innerHTML = `
        <tr>
          <th>Título</th>
          <th>Nº Matrícula</th>
          <th>Data Empréstimo</th>
          <th>Data Devolução</th>
        </tr>`;

      // Adiciona as linhas da tabela com os dados filtrados
      dadosLimitados.forEach((reserva) => {
        // Calcula a data de devolução (30 dias após a data de empréstimo)
        const dataEmprestimo = new Date(reserva.dataEmprestimo);
        const dataDevolucao = new Date(dataEmprestimo);
        dataDevolucao.setDate(dataDevolucao.getDate() + 30);

        // Formata a data de devolução como 'DD/MM/YYYY'
        const dia = String(dataDevolucao.getDate()).padStart(2, '0');
        const mes = String(dataDevolucao.getMonth() + 1).padStart(2, '0'); // Janeiro é 0
        const ano = dataDevolucao.getFullYear();
        const dataDevolucaoFormatada = `${dia}/${mes}/${ano}`;

        document.getElementById("resultadoMeusLivros").innerHTML += `
          <tr>
            <td>${reserva.titulo}</td>
            <td>${reserva.nMatricula}</td>
            <td>${reserva.dataEmprestimo}</td>
            <td>${dataDevolucaoFormatada}</td>
          </tr>`;
      });
    })
    .catch((error) => console.error("Erro ao carregar reservas:", error));
}
