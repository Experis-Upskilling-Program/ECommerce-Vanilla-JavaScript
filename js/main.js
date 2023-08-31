/** Definir los elementos del DOM que voy atacar */
const $dataList = document.querySelector( '[data-product-list]' );
console.log( $dataList );

/** Dibuja en el DOM */
const showData = () => {
    const allProducts = loadData();

    const $ulEl = document.createElement( 'ul' );
    $ulEl.setAttribute( 'class', 'product-list' );

    allProducts.forEach( product => {
        const $liEl = document.createElement( 'li' );
        $liEl.setAttribute( 'class', 'product-item' );
        $liEl.textContent = product.name;
        $ulEl.appendChild( $liEl );
    });

    console.log( $ulEl );
    console.log( allProducts );

    $dataList.appendChild( $ulEl );
}

/** Obtiene los datos del localStorage */
const loadData = () => JSON.parse( localStorage.getItem( 'products' ) ) || []; 

const init = () => {
    showData();
}

init();