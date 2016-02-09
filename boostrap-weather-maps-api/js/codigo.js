//http://api.wunderground.com/api/4110dc2910ac0abd/conditions/forecast/lang:SP/q/Spain/Bilbao.json
function Ciudad(nombre,lat,lon){
	'use strict';
	this.nombre = nombre||'';
	this.lat = lat||'';
	this.lon = lon||'';
}
function PrevisionMeterologica(weather,temperatura,fecha,icono){
	this.weather = weather;
	this.fecha = fecha;
	this.temperatura = temperatura;
	this.icono = icono;
}
function Temperatura(max,min){
	this.max = max;
	this.min = min;
}
var ciudad;
var previsiones = [];
$.noConflict();
jQuery(document).ready(function($){

//	urlspain = "http://api.wunderground.com/api/4110dc2910ac0abd/geolookup/conditions/forecast/q/Spain.json";
// urllocation ="http://api.wunderground.com/api/4110dc2910ac0abd/geolookup/q/autoip.json";
	$.ajax({
		url :"http://api.wunderground.com/api/4110dc2910ac0abd/geolookup/conditions/forecast/q/Spain/Bilbao.json",
		dataType : "jsonp",
		success : function(parsed_json){
			var infoCiudad = parsed_json.current_observation.display_location;

			ciudad = new Ciudad(infoCiudad.city,infoCiudad.latitude,infoCiudad.longitude);

			var meteo = parsed_json.forecast.simpleforecast.forecastday;

			for(var i = 0; i < meteo.length; i++){
				var met = meteo[i];
				var fecha = met.date.day;
				var temp_min = met.low.celsius;
				var temp_max = met.high.celsius;
				var temp = new Temperatura(temp_max,temp_min);
				var weather = met.conditions;
				var icono = met.icon_url;
				var prevision = new PrevisionMeterologica(weather,temp,"Dia "+fecha,icono);
				previsiones.push(prevision);
			}
			mostrarPrevision();

		},
		error: function(){
			alert("no funciona");
		}
	});
	function mostrarPrevision(){
		var txtHTML ="";
		$("#n_ciudad").text(ciudad.nombre);

		for(var i = 0; i < previsiones.length; i++){
			txtHTML+="<div class='col-xs-3'>";
			txtHTML+="<div class='text-center'>"+previsiones[i].fecha+"</div>";
			txtHTML+="<div><img src='"+previsiones[i].icono+"' alt='prevision'></div>";
			txtHTML+="<div>"+previsiones[i].weather+"</div>";
			txtHTML+="<div>"+previsiones[i].temperatura.min+ "   "
			+previsiones[i].temperatura.max+"</div>";

			txtHTML+="</div>";
		}

		$("#meteo_info .row").append(txtHTML);
	}
});
