$(document).ready(inicio);

function inicio(){

	llenarTablaPersonas();
	
	//======= boton Nuevo ===============
	$('#btnNuevo').on('click', function(){
			limpiar();
			$('#modalPersona').modal('show');
		
	});
	
	//======= boton guardar ===============
	$('#btnGuardar').on('click', function(){
		if( validaFormulario() == true ){
		
			if( $('#personaid').val() == '' ){
				guardar();
			}else{
				actualizar();
			}
			
			
		}
	});	
}


function guardar(){
	var parametros = {"nombre": $('#nombre').val() ,"paterno":$('#paterno').val(), "materno":$('#materno').val(),"telefono":$('#telefono').val()};
	
	$.ajax({
		url:"persona/save",
		type:"POST",
		dataType:"json",
		data: JSON.stringify(parametros),
  		contentType: "application/json; charset=utf-8",
		success:function(respuesta){
			console.log(respuesta);
			
			$('#modalPersona').modal('hide');
			
			limpiar();
			llenarTablaPersonas();
			
		},
		error:function(jqXHR, textStatus, errorThrown){
			console.log(textStatus);
			var mensaje = "No se pudo concretar la operación";
			$('#modal-error').html(mensaje);
			$('#modal-error').show();
		}
	});	
	    
}


function llenarTablaPersonas(){

	$("#tbodyPersonas").html("");
	
	$.ajax({
		url:"persona/findAll",
		type:"GET",
		dataType:"json",
		success:function(respuesta){
			
			var tr ="";
			$.each(respuesta, function(i,item){
				
				tr +="<tr>"  +
					  "<td>" + item.id 		 + "</td>"+
					  "<td>" + item.nombre 	 + "</td>"+
					  "<td>" + item.paterno  + "</td>"+
					  "<td>" + item.materno  + "</td>"+
					  "<td>" + item.telefono + "</td>"+
					  "<td> <button type='button' class='btn btn-secondary btnEditar' data-id='" + item.id + "'>Editar</button>	"+
					  "     <button type='button' class='btn btn-danger btnEliminar'    data-id='" + item.id + "'>Eliminar</button>	</td>"+
					"</tr>";
			});
			
			$("#tbodyPersonas").append(tr);
			acciones();
		}
	});
	
	
}

 
function actualizar(){
	var parametros = {  "nombre": $('#nombre').val() ,"paterno":$('#paterno').val(), "materno":$('#materno').val(),"telefono":$('#telefono').val()};
	
	$.ajax({
		url:"persona/update/"+$('#personaid').val(),
		type:"PUT",
		dataType:"json",
		data: JSON.stringify(parametros),
  		contentType: "application/json; charset=utf-8",
		success:function(respuesta){
			console.log(respuesta);
			
			$('#modalPersona').modal('hide');
			
			limpiar();
			llenarTablaPersonas();
			
		},
		error:function(jqXHR, textStatus, errorThrown){
			console.log(textStatus);
			var mensaje = "No se pudo concretar la operación";
			$('#modal-error').html(mensaje);
			$('#modal-error').show();
		}
	});	
	    
}

function acciones(){

	//======editar=============
	$.each($('.btnEditar'), function(i,item){
		$(this).click(function(){
			
			var id = $(this).data('id');
				$.ajax({
					url:"persona/findById/" + id,
					type:"GET",
					dataType:"json",
					success:function(respuesta){
						$('#personaid').val(respuesta.id);
						$('#nombre').val(respuesta.nombre);
						$('#paterno').val(respuesta.paterno);
						$('#materno').val(respuesta.materno);
						$('#telefono').val(respuesta.telefono);
						$('#modalPersona').modal('show');
					}
				});
			
		})
	});
	
	//======eliminar============
	$.each($('.btnEliminar'), function(i,item){
		$(this).click(function(){
			if(confirm('Se eliminará el registro')){
			
				var id = $(this).data('id');
				$.ajax({
					url:"persona/delete/" + id,
					type:"DELETE",
					dataType:"html",
					success:function(respuesta){
						llenarTablaPersonas();
						alert(respuesta);
					}
				});
				
			}
		})
	});
}

function validaFormulario(){	
	var mensaje="Los siguientes datos son obligatorios <br><br>";
	var esValido = true;
	
	if($('#nombre').val().length < 2 ){
		esValido = false;
		mensaje +="Nombre debe ser mayor a 2 caracteres<br>";
	}
	if($('#paterno').val().length < 2 ){
		esValido = false;
		mensaje +="Paterno debe ser mayor a 2 caracteres<br>";
	}
	if($('#materno').val().length < 2 ){
		esValido = false;
		mensaje +="Materno debe ser mayor a 2 caracteres<br>";
	}

	if($('#telefono').val().length < 10 ){
		esValido = false;
		mensaje +="Teléfono debe contener al menos 10 caracteres<br>";
	}

	if( esValido == false ){
		$('#modal-error').html(mensaje);
		$('#modal-error').show();	
	}
	return esValido;
}

function limpiar(){
	$('#personaid').val('');
	$('#nombre').val('');
	$('#paterno').val('');
	$('#materno').val('');
	$('#telefono').val('');
	
	$('#modal-error').html('');
	$('#modal-error').hide();	
}