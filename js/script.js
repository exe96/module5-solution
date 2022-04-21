$(function() { // Igual que document.addEventListener("DOMContentLoaded"...
    // Same as document.addEventListener("DOMContentLoaded"...

    // Igual que document.querySelector("#navbarToggle").addEventListener("blur",...
    // Same as document.querySelector("#navbarToggle").addEventListener("blur",...
    $("#navbarToggle").blur(function(event) {
        var screenWidth = window.innerWidth;
        if (screenWidth < 768) {
            $("#collapsable-nav").collapse('hide');
        }
    });
});

(function(global) {

    var dc = {};

    var homeHtmlUrl = "snippets/home-snippet.html";
    var allCategoriesUrl =
        "https://davids-restaurant.herokuapp.com/categories.json";
    var categoriesTitleHtml = "snippets/categories-title-snippet.html";
    var categoryHtml = "snippets/category-snippet.html";
    var menuItemsUrl =
        "https://davids-restaurant.herokuapp.com/menu_items.json?category=";
    var menuItemsTitleHtml = "snippets/menu-items-title.html";
    var menuItemHtml = "snippets/menu-item.html";
    // Función de conveniencia para insertar HTML interno para 'seleccionar'
    // Convenience function for inserting innerHTML for 'select'
    var insertHtml = function(selector, html) {
        var targetElem = document.querySelector(selector);
        targetElem.innerHTML = html;
    };
    // Mostrar icono de carga dentro del elemento identificado por 'selector'.
    // Show loading icon inside element identified by 'selector'.
    var showLoading = function(selector) {
        var html = "<div class='text-center'>";
        html += "<img src='images/ajax-loader.gif'></div>";
        insertHtml(selector, html);
    };
    // Devuelve el sustituto de '{{propName}}'
    // con propValue en la 'cadena' dada
    // Return substitute of '{{propName}}'
    // with propValue in given 'string'
    var insertProperty = function(string, propName, propValue) {
        var propToReplace = "{{" + propName + "}}";
        string = string
            .replace(new RegExp(propToReplace, "g"), propValue);
        return string;
    };

    // Elimina la clase 'activa' de inicio y cambia al botón Menú
    // Remove the class 'active' from home and switch to Menu button
    var switchMenuToActive = function() {
        // Eliminar 'activo' del botón de inicio
        // Remove 'active' from home button
        var classes = document.querySelector("#navHomeButton").className;
        classes = classes.replace(new RegExp("active", "g"), "");
        document.querySelector("#navHomeButton").className = classes;

        // Agregar 'activo' al botón de menú si aún no está allí
        // Add 'active' to menu button if not already there
        classes = document.querySelector("#navMenuButton").className;
        if (classes.indexOf("active") === -1) {
            classes += " active";
            document.querySelector("#navMenuButton").className = classes;
        }
    };
    // Al cargar la página (antes de las imágenes o CSS)
    // On page load (before images or CSS)
    document.addEventListener("DOMContentLoaded", function(event) {
        // TODO: PASO 0: Revisar el código de
        // *** De comienzo ***
        // ***    a   ***   
        // *** fin ***
        // abajo.
        // Cambiamos este código para recuperar todas las categorías del servidor en lugar de
        // simplemente solicitando un fragmento HTML de inicio. Ahora también tenemos otra función.
        // llamado buildAndShowHomeHTML que recibirá todas las categorías del servidor
        // y procesarlos: elija una categoría aleatoria, recupere el fragmento HTML de inicio, insértelo
        // categoría aleatoria en el fragmento HTML de inicio, y luego inserte ese fragmento en nuestro
        // página principal (index.html).
        // TODO: STEP 0: Look over the code from
        // *** start ***
        // to
        // *** finish ***
        // below.
        // We changed this code to retrieve all categories from the server instead of
        // simply requesting home HTML snippet. We now also have another function
        // called buildAndShowHomeHTML that will receive all the categories from the server
        // and process them: choose random category, retrieve home HTML snippet, insert that
        // random category into the home HTML snippet, and then insert that snippet into our
        // main page (index.html).
        //
        // TODO: PASO 1: Sustituir [...] a continuación con el *valor* de la función buildAndShowHomeHTML,
        // para que pueda llamarse cuando el servidor responda con los datos de las categorías.
        // TODO: STEP 1: Substitute [...] below with the *value* of the function buildAndShowHomeHTML,
        // so it can be called when server responds with the categories data.

        // *** comienzo ***
        // En la primera carga, muestra la vista de inicio
        // *** start ***
        // On first load, show home view
        showLoading("#main-content");
        $ajaxUtils.sendGetRequest(
            allCategoriesUrl, buildAndShowHomeHTML, // ***** <---- TODO: PASO 1: Sustituir [...] ****** 
            // ***** <---- TODO: STEP 1: Substitute [...] ******
            true); // Estableciendo explícitamente el indicador para obtener JSON del servidor procesado en un objeto literal 
        // Explicitly setting the flag to get JSON from server processed into an object literal
    });

    // *** terminar **
    // *** finish **


    // Construye HTML para la página de inicio basado en la matriz de categorías
    // devuelto desde el servidor.
    // Builds HTML for the home page based on categories array
    // returned from the server.
    function buildAndShowHomeHTML(categories) {
        // Cargar la página de fragmentos de inicio
        // Load home snippet page
        $ajaxUtils.sendGetRequest(
            homeHtmlUrl,
            function(homeHtml) {
                var chosenCategoryShortName = chooseRandomCategory(categories);
                // TODO: PASO 2: Aquí, llame a chooseRandomCategory, pasándole 'categorías' recuperadas
                // Preste atención a qué tipo de datos devuelve esa función en comparación con el nombre corto de categoría elegido
                // el nombre de la variable implica que espera.
                // var nombrecortocategoríaelegida = ....
                // TODO: STEP 2: Here, call chooseRandomCategory, passing it retrieved 'categories'
                // Pay attention to what type of data that function returns vs what the chosenCategoryShortName
                // variable's name implies it expects.
                // var chosenCategoryShortName = ....


                var finalHtml = homeHtml;
                var short_name = chosenCategoryShortName.short_name;

                html =
                    insertProperty(homeHtml, "randomCategoryShortName", short_name);
                finalHtml = html;



                insertHtml("#main-content", finalHtml);
                // TODO: PASO 3: Sustituya {{randomCategoryShortName}} en el fragmento html de inicio con el
                // categoría elegida del PASO 2. Use la función insertProperty existente para ese propósito.
                // Busque en este código un ejemplo de cómo usar la función insertProperty.
                // ¡ADVERTENCIA! Está insertando algo que tendrá que dar como resultado un Javascript válido
                // sintaxis porque la sustitución de {{randomCategoryShortName}} se convierte en un argumento
                // se pasa a la función $dc.loadMenuItems. Piensa en lo que necesita ese argumento.
                // para parecerse. Por ejemplo, una llamada válida se vería así:
                // $dc.loadMenuItems('L')
                // Sugerencia: debe rodear el nombre corto de la categoría elegida con algo antes de insertar
                // en el fragmento html de inicio.
                //
                // var homeHtmlToInsertIntoMainPage = ....
                // TODO: STEP 3: Substitute {{randomCategoryShortName}} in the home html snippet with the
                // chosen category from STEP 2. Use existing insertProperty function for that purpose.
                // Look through this code for an example of how to do use the insertProperty function.
                // WARNING! You are inserting something that will have to result in a valid Javascript
                // syntax because the substitution of {{randomCategoryShortName}} becomes an argument
                // being passed into the $dc.loadMenuItems function. Think about what that argument needs
                // to look like. For example, a valid call would look something like this:
                // $dc.loadMenuItems('L')
                // Hint: you need to surround the chosen category short name with something before inserting
                // it into the home html snippet.
                //
                // var homeHtmlToInsertIntoMainPage = ....

                // TODO: PASO 4: Inserte el HTML producido en el PASO 3 en la página principal
                // Use la función insertHtml existente para ese propósito. Mire este código para ver un ejemplo.
                // de como hacer eso.
                // ....
                // TODO: STEP 4: Insert the produced HTML in STEP 3 into the main page
                // Use the existing insertHtml function for that purpose. Look through this code for an example
                // of how to do that.
                // ....

            },
            false); // Falso aquí porque solo estamos obteniendo HTML normal del servidor, por lo que no es necesario procesar JSON. 
        // False here because we are getting just regular HTML from the server, so no need to process JSON.
    }


    // Dada la matriz de objetos de categoría, devuelve un objeto de categoría aleatorio.
    // Given array of category objects, returns a random category object.
    function chooseRandomCategory(categories) {
        // Elija un índice aleatorio en la matriz (desde 0 inclusive hasta la longitud de la matriz (exclusivamente))
        // Choose a random index into the array (from 0 inclusively until array length (exclusively))
        var randomArrayIndex = Math.floor(Math.random() * categories.length);
        // devuelve el objeto de categoría con ese randomArrayIndex
        // return category object with that randomArrayIndex
        return categories[randomArrayIndex];
    }

    // Cargar la vista de categorías del menú
    // Load the menu categories view
    dc.loadMenuCategories = function() {
        showLoading("#main-content");
        $ajaxUtils.sendGetRequest(
            allCategoriesUrl,
            buildAndShowCategoriesHTML);
    };

    // Cargar la vista de elementos del menú
    // 'categoryShort' es un nombre corto para una categoría
    // Load the menu items view
    // 'categoryShort' is a short_name for a category
    dc.loadMenuItems = function(categoryShort) {
        showLoading("#main-content");
        $ajaxUtils.sendGetRequest(
            menuItemsUrl + categoryShort,
            buildAndShowMenuItemsHTML);
    };
    // Construye HTML para la página de categorías basado en los datos
    // desde el servidor

    // Builds HTML for the categories page based on the data
    // from the server
    function buildAndShowCategoriesHTML(categories) {
        // Cargar fragmento de título de la página de categorías
        // Load title snippet of categories page
        $ajaxUtils.sendGetRequest(
            categoriesTitleHtml,
            function(categoriesTitleHtml) {
                // Recuperar fragmento de una sola categoría
                // Retrieve single category snippet
                $ajaxUtils.sendGetRequest(
                    categoryHtml,
                    function(categoryHtml) {

                        // Cambia la clase CSS activa al botón de menú
                        // Switch CSS class active to menu button
                        switchMenuToActive();

                        var categoriesViewHtml =
                            buildCategoriesViewHtml(categories,
                                categoriesTitleHtml,
                                categoryHtml);
                        insertHtml("#main-content", categoriesViewHtml);
                    },
                    false);
            },
            false);
    }

    // Usando categorías de datos y fragmentos html
    // construir categorías ver HTML para ser insertado en la página
    // Using categories data and snippets html
    // build categories view HTML to be inserted into page
    function buildCategoriesViewHtml(categories,
        categoriesTitleHtml,
        categoryHtml) {

        var finalHtml = categoriesTitleHtml;
        finalHtml += "<section class='row'>";
        // Bucle sobre las categorías
        // Loop over categories
        for (var i = 0; i < categories.length; i++) {
            // Insertar valores de categoría
            // Insert category values
            var html = categoryHtml;
            var name = "" + categories[i].name;
            var short_name = categories[i].short_name;
            html =
                insertProperty(html, "name", name);
            html =
                insertProperty(html,
                    "short_name",
                    short_name);
            finalHtml += html;
        }

        finalHtml += "</section>";
        return finalHtml;
    }


    // Construye HTML para la página de categoría única basada en los datos
    // desde el servidor
    // Builds HTML for the single category page based on the data
    // from the server
    function buildAndShowMenuItemsHTML(categoryMenuItems) {
        // Cargar fragmento de título de la página de elementos del menú
        // Load title snippet of menu items page
        $ajaxUtils.sendGetRequest(
            menuItemsTitleHtml,
            function(menuItemsTitleHtml) {
                // Recuperar fragmento de elemento de menú único
                // Retrieve single menu item snippet
                $ajaxUtils.sendGetRequest(
                    menuItemHtml,
                    function(menuItemHtml) {
                        // Cambia la clase CSS activa al botón de menú
                        // Switch CSS class active to menu button
                        switchMenuToActive();

                        var menuItemsViewHtml =
                            buildMenuItemsViewHtml(categoryMenuItems,
                                menuItemsTitleHtml,
                                menuItemHtml);
                        insertHtml("#main-content", menuItemsViewHtml);
                    },
                    false);
            },
            false);
    }
    // Usar categorías y elementos de menú datos y fragmentos html
    // crear elementos de menú ver HTML para insertar en la página
    // Using category and menu items data and snippets html
    // build menu items view HTML to be inserted into page
    function buildMenuItemsViewHtml(categoryMenuItems,
        menuItemsTitleHtml,
        menuItemHtml) {

        menuItemsTitleHtml =
            insertProperty(menuItemsTitleHtml,
                "name",
                categoryMenuItems.category.name);
        menuItemsTitleHtml =
            insertProperty(menuItemsTitleHtml,
                "special_instructions",
                categoryMenuItems.category.special_instructions);

        var finalHtml = menuItemsTitleHtml;
        finalHtml += "<section class='row'>";
        // Bucle sobre los elementos del menú
        // Loop over menu items
        var menuItems = categoryMenuItems.menu_items;
        var catShortName = categoryMenuItems.category.short_name;
        for (var i = 0; i < menuItems.length; i++) {

            // Insertar valores de elementos de menú  
            // Insert menu item values
            var html = menuItemHtml;
            html =
                insertProperty(html, "short_name", menuItems[i].short_name);
            html =
                insertProperty(html,
                    "catShortName",
                    catShortName);
            html =
                insertItemPrice(html,
                    "price_small",
                    menuItems[i].price_small);
            html =
                insertItemPortionName(html,
                    "small_portion_name",
                    menuItems[i].small_portion_name);
            html =
                insertItemPrice(html,
                    "price_large",
                    menuItems[i].price_large);
            html =
                insertItemPortionName(html,
                    "large_portion_name",
                    menuItems[i].large_portion_name);
            html =
                insertProperty(html,
                    "name",
                    menuItems[i].name);
            html =
                insertProperty(html,
                    "description",
                    menuItems[i].description);
            // Agregar clearfix después de cada segundo elemento del menú
            // Add clearfix after every second menu item
            if (i % 2 !== 0) {
                html +=
                    "<div class='clearfix visible-lg-block visible-md-block'></div>";
            }

            finalHtml += html;
        }

        finalHtml += "</section>";
        return finalHtml;
    }

    // Agrega precio con '$' si el precio existe
    // Appends price with '$' if price exists
    function insertItemPrice(html,
        pricePropName,
        priceValue) {
        // Si no se especifica, reemplaza con una cadena vacía
        // If not specified, replace with empty string
        if (!priceValue) {
            return insertProperty(html, pricePropName, "");
        }

        priceValue = "$" + priceValue.toFixed(2);
        html = insertProperty(html, pricePropName, priceValue);
        return html;
    }

    // Agrega el nombre de la porción entre paréntesis si existe
    // Appends portion name in parens if it exists
    function insertItemPortionName(html,
        portionPropName,
        portionValue) {
        // Si no se especifica, devuelve la cadena original                               
        // If not specified, return original string
        if (!portionValue) {
            return insertProperty(html, portionPropName, "");
        }

        portionValue = "(" + portionValue + ")";
        html = insertProperty(html, portionPropName, portionValue);
        return html;
    }


    global.$dc = dc;

})(window);