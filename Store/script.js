let produtos;

window.onload = function(){
    var storedUser = localStorage.getItem("user");
    var user = JSON.parse(storedUser);
    
    document.getElementById("user").textContent = user.name;
    document.getElementById("perfil").textContent = user.entryDate;
    document.getElementById("idPerfil").textContent = user.id;
}

document.addEventListener("DOMContentLoaded", function() {
    fetch("../Dados/store.json")
    .then((response) => response.json())
    .then((data) => {
        produtos = data;
        const produtosContainer = document.getElementById("produtos-container");

        produtos.forEach((produto, index) => {
            const card = document.createElement("div");
            card.className = "card";
            card.style.width = "20rem";
            card.style.marginRight = "10px";
            card.style.padding = "10px";

            const imagem = document.createElement("img");
            imagem.src = produto.imagem;
            imagem.className = "card-img-top";
            imagem.style.border = "4px solid rgb(250, 146, 10)";
            imagem.style.borderRadius = "10px";

            const cardBody = document.createElement("div");
            cardBody.className = "card-body";
    
            const cardTitle = document.createElement("h5");
            cardTitle.className = "card-title";
            cardTitle.textContent = produto.descricao;
            cardTitle.style.textAlign = "center"
    
            const cardText = document.createElement("p");
            cardText.className = "card-text";
            cardText.textContent = "Preço: R$" + produto.preco.toFixed(2);
            cardText.style.textAlign = "center"

            const btnAdicionarAoCarrinho = document.createElement("a");
            btnAdicionarAoCarrinho.href = "#";
            btnAdicionarAoCarrinho.className =
              "btn btn-primary btn-adicionar-ao-carrinho";
            btnAdicionarAoCarrinho.textContent = "Adicionar ao Carrinho";
            btnAdicionarAoCarrinho.setAttribute("data-indice", index);
            btnAdicionarAoCarrinho.style.display = "flex";
            btnAdicionarAoCarrinho.style.alignItems = "center";
            btnAdicionarAoCarrinho.style.justifyContent = "center";


            cardBody.appendChild(cardTitle);
            cardBody.appendChild(cardText);
            cardBody.appendChild(btnAdicionarAoCarrinho);
    
            card.appendChild(imagem);
            card.appendChild(cardBody);
    
            produtosContainer.appendChild(card);
        })
    })
    .catch((error) => console.error("Erro ao carregar o arquivo JSON", error));

$("#produtos-container").on(
    "click",
    ".btn-adicionar-ao-carrinho",
    function () {
      const indexDoProduto = $(this).data("indice");
      const produtoSelecionado = produtos[indexDoProduto];
      let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
      carrinho.push(produtoSelecionado);
      localStorage.setItem("carrinho", JSON.stringify(carrinho));
      alert("Produto adicionado ao carrinho!");
    }
  );
})