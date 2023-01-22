
let mensagens = [];
let nome;
login();

function login() {
    nome = prompt("Qual o seu nome?");
    const obj = {
        name: nome
    };

    const promiseNome = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', obj);
    promiseNome.then(deuCerto);
    promiseNome.catch(deuErrado);

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


function deuErrado(resposta) {
    const statusError = resposta.response.status;
    if (statusError === 400) {
        alert("Nome de usuário em uso. Por favor, escolher outro");
        login();
    }
    window.location.reload();
}

function deuCerto(resposta) {
    const status = resposta.status;
    const usuario = { name: nome };
    if (status === 200) {
        conexao(usuario);
        obterMensagens();
    }
}

function obterMensagens() {
    const promise = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    promise.then(chegada);
    promise.catch(falha);
    setTimeout((obterMensagens), 3000);

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
        if (mensagens[i].type === "message") {
            let template = `<li class="mensagemNormal" data-test="message">
            <span style="color:#AAAAAA">(${mensagens[i].time})</span>&nbsp<span style="font-weight:700">${mensagens[i].from}</span>&nbsppara&nbsp<span style="font-weight:700">${mensagens[i].to}</span>: ${mensagens[i].text} </li>`;
            listaMensagens.innerHTML = listaMensagens.innerHTML + template;
            listaMensagens.lastChild.scrollIntoView();
        }
        else if (mensagens[i].type === "private_message" && mensagens[i].to === nome) {
            let template = `<li class="mensagemPrivada" data-test="message">
            <span style="color:#AAAAAA">(${mensagens[i].time})</span>&nbsp<span style="font-weight:700">${mensagens[i].from}</span>&nbspreservadamente&nbsppara&nbsp<span style="font-weight:700">${mensagens[i].to}</span>: ${mensagens[i].text}</li>`;
            listaMensagens.innerHTML = listaMensagens.innerHTML + template;
            listaMensagens.lastChild.scrollIntoView();
        }
        else if (mensagens[i].type === "status") {
            let template = `<li class="mensagemStatus" data-test="message">
            <span style="color:#AAAAAA">(${mensagens[i].time})</span>&nbsp<span style="font-weight:700">${mensagens[i].from}</span>&nbsp${mensagens[i].text} </li>`;
            listaMensagens.innerHTML = listaMensagens.innerHTML + template;
            listaMensagens.lastChild.scrollIntoView();
        }
    }
}

function enviarMensagem() {
    let mensagem = document.querySelector('input');
    let obj2 = {
        from: nome,
        to: "Todos",
        text: mensagem.value,
        type: "message",
    }
    const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", obj2);
    promise.then(mensagemEnviada);
    promise.catch(mensagemNaoEnviada);
    mensagem.value = '';
}

function mensagemEnviada(resposta) {
    console.log("Mensagem Enviada com sucesso")
    obterMensagens();
}

function mensagemNaoEnviada(resposta) {
    console.log("Houve falha no envio")
    window.location.reload();
}