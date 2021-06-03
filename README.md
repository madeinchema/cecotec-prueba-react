
# Prueba de React para Cecotec

## Inicializar el proyecto
#### Inicializa React app, json-server y GraphQL:
`npm run start & npm run server & npm run graphql`

## Tech Stack
* React
* TypeScript
* Redux - Redux Thunk
* GraphQL CRUD: Apollo Client - Apollo Server
* REST CRUD: json-server - faker.js
* AUTH: json-server
* SCSS
* Jest (Tests Unitarios)
* React-Testing-Library (Tests de Integración)
* ESLint - Prettier

## **Autenticación**
* NO hace falta crear una cuenta en la página de login.
* El formulario registra los datos introducidos del usuario en ./server/db.json bajo la clave "login_post".
* Obtiene el auth token desde ./server/db.json bajo la clave "login_get.token"
* Utiliza los datos del usuario disponible en ./server/db.json bajo la clave "user".
* Guarda el token y los datos del usuario en localStorage.
* Todo esto se ejecuta a través de un redux thunks que manejan los datos de localStorage.

## Componentes
### Common
* **AuthGuard**
	* Recibe _isLoggedIn, className, redirectPath_ props.
	* Muestra un texto para los casos de _loggedIn_ y _loggedOut_.
	* Maneja una redirección hacia _redirectPath_ a través de un timer en un useEffect.
* **Button**
	* Recibe _children, className, variant, onClick, type_ props.
	* Se le aplican ciertos estilos en SASS para el estado por defecto.
	* Se le añade la variante "primary".
* **ButtonGroup**
	* Recibe _dataSource_ prop; un array de objetos que extienden ButtonProps para añadirle un id y onClick.
	* Se le añaden estilos y un elemento visual separador.
* **Card**
	* Recibe _children, className, buttonGroupDataSource_ props.
	* Renderiza un componente de tarjeta, sus _children_ en el _container_ de la misma, y un _ButtonGroup_.
* **ModalConfirm**
	* Recibe _title, children, onClose, confirmBtnConfig, cancelBtnConfig_ props.
	* Renderiza un modal, con su título y botón de cerrar en el header, sus _children_ en el _container_, y un _ButtonGroup_.

### Layout
* **Header**
	* Renderiza el logo y la navegación.
	* Utiliza flex para hacerlo responsive.
	* Utiliza un archivo de constantes _headerNavItems_ para los enlaces internos de la navegación.
	* Utiliza Redux para detectar si el usuario está autenticado.
	* Si el usuario está autenticado, renderiza un elemento para _Cerrar sesión_ y el _avatar_ del usuario.
* **Layout**
	* Renderiza sus _children_ y le añade el _Header_ y estilos por encima.
	* Se utiliza para envolver los componentes de tipo _Página_ en el componente _App_.
* **Portal**
	* Recibe _id, children_ props.
	* Maneja el comportamiento de un _React Portal_.
	* Se utiliza para manejar los modales de la aplicación.

## Páginas
* **Login**
	* Maneja el _logIn_ mediante el _logInCurrentUser(formData)_ redux-thunk.
	* Utiliza _AuthGuard_ para redirigir al usuario a la página de clientes cuando éste ya está autenticado.
* **Clientes**
	* Implementa el CRUD de clientes utilizando _Redux + Thunks_ y _json-server_.
	* Muestra el título de la página y un _Button_ para "Añadir cliente", que utiliza un _Portal_ para mostrar el _AddClientModal_.
	* Muestra un _grid_ de componentes _ClientCard_.
	* **ClientForm**
		* Recibe como prop, un objeto _config_ con _onChange, fields (obj: ClientData)_.
		* Se utiliza tanto en _AddClientModal_ como en _ClientCard_
	* **AddClientModal**
		* Recibe _onClose_ prop, para manejar el cierre del modal.
		* Renderiza un _ModalConfirm_, al cual se le pasa un archivo de configuración para manejar los botones.
		* Como _children_ del _ModalConfirm_ pasamos el componente de _ClientForm_.
		* Utiliza _useClientData_ hook para obtener y manejar los datos y acciones del formulario.
	* **ClientCard**
		* El componente _ClientCard_ recibe los datos del usuario y los renderiza como en un _Card_.
		* Se le pasa un objeto de configuración al _Card_ para los _Button_'s del _ButtonGroup_.
		* Se utilizan _Portal's_ para mostrar los modales al hacer clock en los _Button's_ de "Eliminar" y "Editar".
		* "Eliminar": Renderiza un _ModalConfirm_, cuya configuración despacha el _removeClient(id)_ redux think.
		* Editar": Renderiza el componente _EditClientModal_
	* **EditClientModal**
		* Recibe _clientId, onClose_ props.
		* Renderiza un _ClientForm_ con su archivo de configuración que conecta con el _editClient_ redux-thunk.
		* Utiliza _useClientData_ hook para obtener y manejar los datos y acciones del formulario.
	* **useClientData (hook)**
		* Maneja los datos y acciones del formulario.
		* Utiliza _**clientFormReducer**_ para manejar los valores y la validación del formulario.
* **Productos**
	* Utiliza la misma estructura que Clientes, con ligeras variaciones y con respecto al _ProductForm_ y los estilos de _ProductCard_.
	* Implementa el CRUD de productos utilizando _GraphQL_ con _Apollo Server y Apollo Client_.

## Otros detalles
