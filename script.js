const entrada = document.querySelector(".tela-de-entrada")
let nome = entrada.querySelector("input").value;

function login() {
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
        login();
    }
    else {
        alert("Erro de Conexão");
        login();
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

function obtermensagens() {
    const promise = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    promise.then(chegada);
    promise.catch(falha);
    setTimeout((obtermensagens), 3000);

}

function chegada(resposta) {
    console.log('mensagens chegaram');
    console.log(resposta);
    mensagens = resposta.data;
    exibirMensagens();
}
function falha(resposta) {
    console.log('deu ruim');
    console.log(resposta);
}

function exibirMensagens() {
    const listaMensagens = document.querySelector('.mensagens');
    listaMensagens.innerHTML = '';
    for (let i = 0; i < mensagens.length; i++) {
        if (mensagens[cont].type === 'message') {
            let template = `
        <li class="mensagemNormal" data-test="message">
            <span style="color:#AAAAAA">(${mensagens[cont].time})</span>&nbsp<span style="font-weight:700">${mensagens[cont].from}</span>&nbsppara&nbsp<span style="font-weight:700">${mensagens[cont].to}</span>: ${mensagens[cont].text}
        </li>`;
            listaMensagens.innerHTML = listaMensagens.innerHTML + template;
            listaMensagens.lastChild.scrollIntoView();
        }
        else if (mensagens[cont].type === 'private_message' && mensagens[cont].to === usuarioInicial) {
            let template = `
        <li class="mensagemPrivada" data-test="message">
            <span style="color:#AAAAAA">(${mensagens[cont].time})</span>&nbsp<span style="font-weight:700">${mensagens[cont].from}</span>&nbspreservadamente&nbsppara&nbsp<span style="font-weight:700">${mensagens[cont].to}</span>: ${mensagens[cont].text}
        </li>`;
            listaMensagens.innerHTML = listaMensagens.innerHTML + template;
            listaMensagens.lastChild.scrollIntoView();
        }
        else if (mensagens[cont].type === 'status') {
            let template = `
        <li class="mensagemStatus" data-test="message">
            <span style="color:#AAAAAA">(${mensagens[cont].time})</span>&nbsp<span style="font-weight:700">${mensagens[cont].from}</span>&nbsp${mensagens[cont].text}
        </li>`;
            listaMensagens.innerHTML = listaMensagens.innerHTML + template;
            listaMensagens.lastChild.scrollIntoView();
        }
    }
}


