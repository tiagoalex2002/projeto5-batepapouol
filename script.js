const entrada = document.querySelector(".tela-de-entrada")

function login() {
    nome = entrada.querySelector("input").value;
    const obj = {
        name: nome
    };

    const promiseNome = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', obj);
    promiseNome.then(sucesso);
    promiseNome.catch(error);

}

function conexao(user) {
    const connectstatus = axios.post('https://mock-api.driven.com.br/api/v6/uol/status', user);
    connectstatus.then(estavel);
    connectstatus.catch(instavel);
    intervalo(user);

}

function intervalo(user) {
    setTimeout((conexao), 3000, user);
}

function estavel(resposta) {
    console.log('conexao estavel');
    console.log(resposta);
}
function instavel(resposta) {
    console.log('conexao instavel');
    console.log(resposta);
}


function error(resposta) {
    const statusError = resposta.response.status;
    if (statusError == 400) {
        alert("Nome de usuário em uso. Por favor, escolher outro");
    }
    else {
        alert("Erro de Conexão");
    }
    window.location.reload;
}

function succeso(resposta) {
    const status = resposta.status;
    if (status == 200) {
        conexao(obj);
        obtermensagens();
    }
}