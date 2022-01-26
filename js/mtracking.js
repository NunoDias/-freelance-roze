"use strict";

$(function () {
    $(document).ready(function () {
        $(document).on('click', '.btnTracker', function () {
            var self = $(this);
            var eventId = self.attr('data-md-event-id');


            try{
                Tracking.startEvent(eventId, eventId, null, false, false);
            }
            catch(error){
                console.log(error);
            }
        });
    })
})