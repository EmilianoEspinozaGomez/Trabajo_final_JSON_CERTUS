/* Variables globales */
let arrayCatalogo = new Array();
let numPage;

/* Detectar parámetros URL*/
let parametrosURL = new URLSearchParams(location.search);

/* Comprobar página */
if(parseIt(parametrosURL.get("page"))==1 || parametrosURL.get("page") == null){
	numPage = 1;
} else {
	numPage = parseIt(parametrosURL.get("page"));
}
console.log("Estamos en la página: "+ numPage);


/* solicitar datos al servidor */
fetch("productos.json").then(respuesta => respuesta.json()).then(objeto => {
	arrayCatalogo = objeto;
	cargarCatalogo(numPage);
})

/* Definir cargar catálogo */
function cargarCatalogo(pagina) {
	/* Referencia de catalogo */
	let filaCatalogo = document.querySelector("#catalogo");

	/* crear elementos */
	let inicio = (pagina-1)*8;
	let final;
	let tmpfinal = pagina*8-1;

	if (arrayCatalogo.length < tmpfinal){
		final = arrayCatalogo.length;
	} else {
		final = tmpfinal;
	}
	for (let index = inicio; index <= final; index++) {
		/* proceso precios */
		let precio = arrayCatalogo[index].price;
		let oferta = arrayCatalogo[index].offer * 100;
		let precioFinal = precio - precio * oferta/100;
		let nuevoElemento = document.createElement("article");
		nuevoElemento.setAttribute("class",'class="col-xs-12 col-sm-6 col-md-4 col-xl-3"')
		nuevoElemento.ineerHTML = `
		<picture>
			<img class="img-fluid" src="image/productos/${arrayCatalogo[index].image}" alt="${arrayCatalogo[index].name}">
		</picture>
		<h4>${arrayCatalogo[index].name}</h4>
		<p>
			<span class="precioOriginal">S/ ${precio}</span>
			<span class="precioDescuento">- ${oferta}%</span>
			<br><span class="precioFinal">S ${precioFinal}</span>
		</p>
		<button onclick="addCarrito(event)" class="btn btn-light"><i class="bi bi-plus-square"></i>Agregar al carrito</button>
		`;
		
		/* Añadir el nuevo elemento al catálogo */
		filaCatalogo.append(nuevoElemento);
	}
}