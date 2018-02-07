function initMap() {
	
	var laboratoriaLima = {lat: -12.1191427, lng: -77.0349046};


	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 3,// acercamiento del mapa
		center: laboratoriaLima //ubicacion en la que se centrra el mapa
	});

	var markadorLaboratoria = new google.maps.Marker ({
		position: laboratoriaLima,//indica el lugar donde se pondra el marcador
		map: map //se indica el mapa en el que aparecera el marcador
	});	
	

function buscar() {
	if(navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(funcionExito, functionError);
	}
}

var latitud, longitud;
var funcionExito = function(posicion) {

	latitud = posicion.coords.latitude;//obtengo la latitud
	longitud = posicion.coords.longitude;//obtengo la longitud

	var miUbicacion = new google.maps.Marker ({
		position: {lat:latitud, lng:longitud},
		map: map
	});
		map.setZoom(18);
		map.setCenter({lat:latitud, lng:longitud});// asignmos un nuevo centro del mapa
}

var functionError = function(error) {
	alert("Tenemos un problema con encontrar tu ubicación");
}

document.getElementById('encuentrame').addEventListener('click',buscar);

//añadiendo autocompletado
var inputPartida = document.getElementById('punto-partida');
var inputDestino = document.getElementById('punto-destino');

new google.maps.places.Autocomplete(inputPartida);//por medio de la clase "autocomplete" indicamos que ese input va a tener la funcionalidad.
new google.maps.places.Autocomplete(inputDestino);

	//trazar ruta
	var directionsService = new google.maps.DirectionsService;
	var directionsDisplay = new google.maps.DirectionsRenderer;

	var calculateAndDisplayRoute = function(directionsService, directionsDisplay) {
		directionsService.route({
			origin: inputPartida.value,// directiosService.route()=nos devolvera un directionsRequest, elcual sera un objeto literal
			destination: inputDestino.value,//idem
			travelMode: 'DRIVING'//idem
		}, function(response, status) {
			if (status === 'OK') {
				directionsDisplay.setDirections(response);//
			} else {
				window.alert("No entramos una ruta.");
			}	
		});
	}

	directionsDisplay.setMap(map);

	var trazarRuta = function() {
		calculateAndDisplayRoute(directionsService, directionsDisplay);
	};

	document.getElementById('trazar-ruta').addEventListener('click', trazarRuta);



}