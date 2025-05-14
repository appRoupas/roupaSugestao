let chave = "cebcd482eda57fa9a6714c1c2ba91885";

function colocarNaTela(dados) {
    console.log(dados);
    document.querySelector(".cidade").innerHTML = "Tempo em " + dados.name;
    document.querySelector(".temp").innerHTML = Math.floor(dados.main.temp) + "°C";
    document.querySelector(".descricao").innerHTML = dados.weather[0].description;
    document.querySelector(".icone").src = "https://openweathermap.org/img/wn/" + dados.weather[0].icon + ".png";
    document.querySelector(".umidade").innerHTML = "Umidade: " + dados.main.humidity + "%";
}

async function buscarCidade(cidade) {
    let dados = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${chave}&lang=pt_br&units=metric`)
        .then(resposta => resposta.json());

    colocarNaTela(dados);
}

function cliqueiNoBotao() {
    let cidade = document.querySelector(".input-cidade").value;
    buscarCidade(cidade);
}

function enviarDados() {
    const nome = prompt("Digite seu nome:");
    if (!nome) {
        alert("Por favor, insira seu nome para continuar.");
        return;
    }

    const cidade = document.querySelector(".cidade").textContent.replace("Tempo em ", "");
    const descricaoClima = document.querySelector(".descricao").textContent.toLowerCase();

    let clima = "";

    if (descricaoClima.includes("sol")) {
        clima = "sol";
    } else if (descricaoClima.includes("chuva")) {
        clima = "chuva";
    } else if (descricaoClima.includes("nublado") || descricaoClima.includes("nuvens")) {
        clima = "nuvens";
    } else if (descricaoClima.includes("frio") || descricaoClima.includes("neve")) {
        clima = "frio";
    } else if (descricaoClima.includes("vento")) {
        clima = "vento";
    } else {
        clima = "indefinido";
    }

    window.location.href = `home.html?nome=${encodeURIComponent(nome)}&cidade=${encodeURIComponent(cidade)}&clima=${encodeURIComponent(clima)}`;
}

