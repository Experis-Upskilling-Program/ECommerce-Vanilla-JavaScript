const LS_KEY_PRODUCTS = 'products';

/** Definir los elementos del DOM que voy atacar */
const 
    $formProduct = document.querySelector( '[data-form-product]' ),
    $dataList = document.querySelector( '[data-product-list]' );

console.log( $formProduct );

/** Dibuja en el DOM */
const showData = () => {
    const allProducts = loadData();

    $dataList.innerHTML = '';

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

/** Crear Producto */
const createProduct = ( newProduct ) => {
    const allProducts = loadData();

    setData( [ newProduct, ...allProducts ] );
    showData();
    $formProduct.reset();
}

/** Actualice los datos del localStorage */
const setData = ( item ) =>
    localStorage.setItem( LS_KEY_PRODUCTS, JSON.stringify( item ) ); 

/** Obtiene los datos del localStorage */
const loadData = () => JSON.parse( localStorage.getItem( LS_KEY_PRODUCTS ) ) || []; 

/** Eventos */
$formProduct.addEventListener( 'submit', ( event ) => {
    event.preventDefault();

    const product = {
        name: document.querySelector( '[data-input-name]' ).value,
        price: Number( document.querySelector( '[data-input-price]' ).value ),
        quantity: Number( document.querySelector( '[data-input-quantity]' ).value ),
        category: document.querySelector( '[data-input-category]' ).value
    }

    createProduct( product );
});


const init = () => {
    showData();
}

init();