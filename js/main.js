const LS_KEY_PRODUCTS = 'products';

/** Definir los elementos del DOM que voy atacar */
const 
    $formProduct = document.querySelector( '[data-form-product]' ),
    $dataList = document.querySelector( '[data-product-list]' );

console.log( $formProduct );

function editProduct( productId ) {
    console.log( 'Editando ando el ID:', productId );
}

function deleteProduct( productId ) {
    console.log( 'Borrando ando el ID:', productId );
}


/** Dibuja en el DOM */
function showData () {
    const allProducts = loadData();         // Obtenemos los datos del LocalStorage

    if( allProducts.length == 0 ) {
        const $pEl = document.createElement( 'p' );

        $pEl.setAttribute( 'class', 'no-products' );
        $pEl.textContent = 'No hay productos registrados';

        return $dataList.appendChild( $pEl );
    }

    $dataList.innerHTML = '';               // Limpiamos listado de productos en el DOM

    // Creando las etiquetas necesarias para crear una tabla
    const 
        $tableEl = document.createElement( 'table' ),
        $theadEl = document.createElement( 'thead' ),
        $tbodyEl = document.createElement( 'tbody' ),
        $trEl = document.createElement( 'tr' );

    $tableEl.setAttribute( 'cellspacing', '1' );
    $tableEl.setAttribute( 'cellpadding', '1' );
    $tableEl.setAttribute( 'border', '1' );

    // Define los titulos de cada columna por defecto
    const titles = [ 'Nombre', 'Precio', 'Categoria', 'Cantidad', 'Acciones' ];

    // Iteramos y creamos los encabezados de la tabla para cada una de las columnas
    titles.forEach( title => {
        const $thEl = document.createElement( 'th' );
        $thEl.textContent = title;
        $trEl.appendChild( $thEl );
    });

    $theadEl.appendChild( $trEl );

    // Iteramos los datos obtenidos para crear una fila dentro de la tabla por cada objecto
    allProducts.forEach( product => {
        const 
            $trEl = document.createElement( 'tr' ),
            $btnEdit = document.createElement( 'button' ),
            $btnDelete = document.createElement( 'button' );


        $trEl.setAttribute( 'class', 'product-item' );
        
        // Iterar las propiedades de cada uno de los objectos (product) registrados en el LocalStorate
        for ( const [ key, value ] of Object.entries( product ) ) {
            const $tdEl = document.createElement( 'td' );

            $tdEl.setAttribute( 'class', `${ key.toLocaleLowerCase() }` );

            if( key != 'id' ) 
                $tdEl.textContent = value;                      // Aqui agrega el dato de cada propiedad a cada columna
            else {
                $btnEdit.textContent = 'Edit';
                $btnDelete.textContent = 'Delete';

                // Pasa los datos al boton editar con el metodo de DataSet
                $btnEdit.setAttribute( 'data-edit', `${ product.id }` );     // Esto funciona
                $btnEdit.addEventListener( 'click', ( event ) => {
                    // console.log( event.target.dataset.edit );                // Tambien obtiene el 'productId'
                    editProduct( event.target.dataset.edit );
                });
                
                // Pasa los datos al boton eliminar directamente sin el DataSet
                $btnDelete.addEventListener( 'click', () => {
                    deleteProduct( product.id );
                });

                $tdEl.appendChild( $btnEdit );
                $tdEl.appendChild( $btnDelete );
            } 


            $trEl.appendChild( $tdEl );
        }

        //$trEl.textContent = product.name;
        $tbodyEl.appendChild( $trEl );              // Agrega el elemento de la fila la cuerpo de la tabla
    });

    // Agrega el encabezado y el cuerpo de la tabla a la tabla
    $tableEl.appendChild( $theadEl );
    $tableEl.appendChild( $tbodyEl );

    // console.log( $tableEl );
    // console.log( allProducts );

    $dataList.appendChild( $tableEl );      // Agregamos la tabla al DOM
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
        category: document.querySelector( '[data-input-category]' ).value,
        id: Date.now()
    }

    createProduct( product );
});


const init = () => {
    showData();
}

init();