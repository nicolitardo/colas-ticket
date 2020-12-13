// Comando para establecer la conexión
var socket = io();

var searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}

var escritorio = searchParams.get('escritorio');
var label = $('small');

console.log(escritorio);

$('h1').text('Escritorio ' + escritorio);

$('button').on('click', function() {

    socket.emit('atenderTicket', { escritorio: escritorio }, function(resp) {
        if (resp.msg === 'No hay tickets') {
            label.text(resp.msg);
            alert(resp.msg);
            return;
        }
        label.text('Ticket ' + resp.numero);
    });

});

socket.on('connect', function() {
    console.log('Conectado al servidor');
});


// escuchar
socket.on('disconnect', function() {
    console.log('Desconectados del servidor');
});