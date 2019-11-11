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
        $('#modalTutoria').modal('show');
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