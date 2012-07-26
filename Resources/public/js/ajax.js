$(document).ready(function () {
    "use strict";

    var $context = $('body');

    $context.ajaxSend(function (event, xhr, settings) {

    });

    $context.ajaxSuccess(function (event, xhr, settings, data) {
        if (typeof data.form !== 'undefined') {
            var formSelector = '#' + data.form.id;
            $(formSelector).replaceWith(data.form.body);
            var $form = $(formSelector);
        }
        if (typeof data.dialog !== 'undefined') {
            var $dialog = $('<div class="modal fade hide"></div>').html(data.dialog.body);
        }
    });

    $context.ajaxError(function (event, xhr, settings, error) {
        var $modal = $('<div class="modal fade hide"></div>');
        var $modalHeader = $('<div class="modal-header"></div>')
            .append('<button type="button" class="close" data-dismiss="modal">×</button>')
            .append($('<h3></h3>').text(error))
            .append($('<span class="small"></span>').text(xhr.status + ' ' + xhr.statusText))
            .appendTo($modal);
        var $modalBody = $('<div class="modal-body"></div>')
            .appendTo($modal);
        $modal.modal('show');

        var $iframe = $('<iframe></iframe>');
        $iframe.appendTo($modalBody).contents().find('body').html(xhr.responseText);
        $iframe.css({
            width:$modalBody.width(),
            height:$modalBody.height(),
            border:0
        });
    });

    $context.ajaxComplete(function (event, xhr, settings) {

    });

    $context.on('click', 'a[data-ajax]', function (event) {
        var $link = $(this);
        $.ajax({
            url:$link.attr('href')
        });
        return false;
    });

    $context.on('submit', 'form[data-ajax]', function (event) {
        var $form = $(this);
        $form.ajaxSubmit({
        });
        return false;
    });

});