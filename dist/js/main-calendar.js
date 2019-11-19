$(function () {
    /* initialize the calendar
     -----------------------------------------------------------------*/
    //Date for the calendar events (dummy data)
    var date = new Date()
    var d    = date.getDate(),
        m    = date.getMonth(),
        y    = date.getFullYear()

    var Calendar = FullCalendar.Calendar;
    var Draggable = FullCalendarInteraction.Draggable;

    var calendarEl = document.getElementById('calendar');

    var calendar = new Calendar(calendarEl, {
      locale: 'es',
      plugins: [ 'bootstrap', 'interaction', 'dayGrid', 'timeGrid' ],
      header    : {
        left  : 'prev,next today',
        center: 'title',
        right : 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      editable  : true,
      droppable : true // this allows things to be dropped onto the calendar !!!
      ,dateClick: function(info) {
          getMatters();
        console.log(info);
      }
      , eventClick: function(info) {
        alert('Event: ' + info.event.title);
        console.log(info.event);
      }
    });

    calendar.render();
    // $('#calendar').fullCalendar()
    var myEvent = {
        id:100,
        title:"Calculo Diferencial",
        allDay: true,
        start: new Date(),
        end: new Date()
      };
      calendar.addEvent( myEvent );
  })


  function getMatters(){
    $.ajax({
        url: urlWs+"TutorialController.php?action=1",
        data:JSON.stringify( {
          "idUser" : sessionStorage.getItem('ID')
        }),
        type: "POST",
        dataType: "json",
    }).done(function( data, textStatus, jqXHR ) {
         if ( data.status !==200 ) {
           Swal.fire(
              'Lo sentimos!',
              data.message,
              'warning'
            );
         }else{
           $('#modalTutoria').modal('show');
           console.log(data.data);
           $("#tutorial-matter").html('');
           data.data.forEach(function(item) {
             $("#tutorial-matter").append('<option value="'+item.id_matter+'">'+item.name_matter+'</option>');
          });
         }
     }).fail(function( jqXHR, textStatus, errorThrown ) {
         if ( console && console.log ) {
             console.log( "La solicitud a fallado: " +  textStatus);
         }
    });
  }
