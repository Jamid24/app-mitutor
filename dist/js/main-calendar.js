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
        $('#form-tutorial')[0].reset();
        getMatters(info.dateStr);
        console.log(info.dateStr);
      }
      , eventClick: function(info) {
        alert('Event: ' + info.event.title);
        console.log(info.event);
      }
    });

    calendar.render();
    // $('#calendar').fullCalendar()

    $("#tutorial-city").change(function () {
      getOptionsSelect("#tutorial-sede", 2, this.value);
    });

    $("#tutorial-sede").change(function () {
      getOptionsSelect("#tutorial-ubication", 3, this.value);
    });

    $('#form-tutorial').on('submit', function (e) {
      e.preventDefault();
      alert('sss');
      createTutorial(calendar);
    });

/*
    var myEvent = {
        id:100,
        title:"Calculo Diferencial",
        allDay: true,
        start: new Date(),
        end: new Date()
      };
      calendar.addEvent( myEvent );*/
  })


  function getMatters(dateSelected){
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
           $('#tutorial-date').val(dateSelected);
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

  function getOptionsSelect(select, action, value){
    $.ajax({
        url: urlWs+"TutorialController.php?action="+action,
        data:JSON.stringify( {
          "datum" : value
        }),
        type: "POST",
        dataType: "json",
    }).done(function( data, textStatus, jqXHR ) {
         if ( data.status !==200 ) {
           console.log(data);
         }else{
           $(select).html('');
           data.data.forEach(function(item) {
             $(select).append('<option value="'+item.value_name+'">'+item.text_name+'</option>');
          });
         }
     }).fail(function( jqXHR, textStatus, errorThrown ) {
         if ( console && console.log ) {
             console.log( "La solicitud a fallado: " +  textStatus);
         }
    });
  }


  function createTutorial(calendar){
    $.ajax({
        url: urlWs+"TutorialController.php?action=4",
        data:JSON.stringify( {
          "idUser" : sessionStorage.getItem('ID'),
          "idMatter" : $('#tutorial-matter').val(),
          "idUbication" : $('#tutorial-ubication').val(),
          "dateTutorial" : $('#tutorial-date').val(),
          "hourTutorial" : $('#tutorial-hour').val(),
          "quota" : $('#tutorial-quota').val()
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
           Swal.fire(
              'Operación exitosa!',
              data.message,
              'success'
            );
            addEventCalendar(calendar, data.data.id_tutorial, $('#tutorial-matter :selected').text(), $('#tutorial-date').val(), $('#tutorial-date').val());
         }
         $('#modalTutoria').modal('hide');
     }).fail(function( jqXHR, textStatus, errorThrown ) {
         if ( console && console.log ) {
             console.log( "La solicitud a fallado: " +  textStatus);
         }
    });
  }

  function addEventCalendar(calendar, id, text, dateIni, dateFin){
    var myEvent = {
        id:id,
        title:text,
        allDay: true,
        start: dateIni,
        end: dateFin
      };
      calendar.addEvent( myEvent );
  }
