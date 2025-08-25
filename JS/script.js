let produtos = null;
let pesquisar = null;

function initializeComponents()
{
    produtos = document.getElementById("produtos");
    pesq = document.getElementById("pesquisar");
}

function alertaGenerico(){
    alert("Comprou!!!");
}

async function pesquisarComida()
{
    const total_max_per_finder = 5;
    let text = pesq.value;

    //Dando aquela limpada basica nos produtos para pesquisar
    produtos.innerHTML = "";
    try
    {
        //console.log("Texto Pesquisado: "+text);
        const dd = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s="+text);
        const comida = await dd.json();

        if(comida.meals.length > total_max_per_finder)
        {
            produtos.append(nao);
            console.log("Não conseguiu achar!")
            return;
        }

        console.log("Achou!");
        console.log(comida);

        construirContainer(comida);
    }
    catch(erro)
    {
        console.error("Erro ao buscar API:", erro);
        let nao = document.createElement("p");
        nao.textContent = "Não encontramos itens com nome passado...";

        produtos.append(nao);
    }
}

function construirContainer(comida)
{
    for(let i = 0; i < comida.meals.length; i++)
    {
        let div = document.createElement("div");

        let img = document.createElement("img");
        img.src = comida.meals[i].strMealThumb;


        let h4 = document.createElement("h4");
        h4.textContent = comida.meals[i].strMeal;

        let p = document.createElement("p");
        p.textContent = "R$ " + (Math.random() * 25).toFixed(2);

        let button = document.createElement("button");
        button.textContent = "Comprar";
        button.type = "button";
        button.onclick = alertaGenerico;

        div.append(img);
        div.append(h4);
        div.append(p);
        div.append(button);

        produtos.append(div);
    }
}