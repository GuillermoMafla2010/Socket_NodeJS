var socket = io();

var params=new URLSearchParams(window.location.search)

if(!params.has('nombre') || !params.has('sala')){
    window.location='index.html'
    throw new Error('El nombre es necesario')
}

var usuario={
    nombre:params.get('nombre'),
    sala:params.get('sala')
}

socket.on('connect', function() {
    socket.emit('entrarChat',usuario,function(resp){
        console.log('Usuarios conectados',resp)
    })
});

socket.on('crearMensaje',function(mensaje){
    console.log('Servidor',mensaje)
})

// escuchar

socket.on('listaPersona',function(personas){
    console.log(personas)
})

//mensjaes privados

socket.on('mensajePrivado',function(mensaje){
    console.log('Mensaje Privado' , mensaje)
}
)

// Enviar información
socket.emit('enviarMensaje', {
    usuario: 'Fernando',
    mensaje: 'Hola Mundo'
}, function(resp) {
    console.log('respuesta server: ', resp);
});

// Escuchar información
socket.on('enviarMensaje', function(mensaje) {

    console.log('Servidor:', mensaje);

});