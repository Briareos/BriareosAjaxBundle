$(document).ready(function () {
    "use strict";

    var $context = $('body');

    $context.ajaxSend(function (event, xhr, settings) {
    });

    $context.ajaxSuccess(function (event, xhr, settings, data) {
        if (!data) {
            return;
        }
        if (typeof data.form !== 'undefined') {
            var formSelector = '#' + data.form.id;
            $(formSelector).replaceWith(data.form.body);
            var $form = $(formSelector);
        }
        if (typeof data.modal !== 'undefined') {
            var $modal = $('div.modal:visible');
            if (!$modal.length) {
                $modal = $('<div class="modal fade hide"></div>');
            }
            $modal.html(data.modal.body);
            $modal.modal('show');
        }
        if (typeof data.location !== 'undefined') {
            if (data.location.url) {
                if (data.location.replace) {
                    window.document.location.replace(data.location.url);
                } else {
                    window.document.location.href = data.location.url;
                }
            } else {
                window.document.location.reload();
            }
        }
        if (typeof data.page !== 'undefined') {
            window.document.title = data.page.title;
            $context.find('div#body:first').html(data.page.body);
        }
        if (typeof data.state !== 'undefined') {
            $.bbq.pushState(data.state);
        }
    });

    $context.ajaxError(function (event, xhr, settings, error) {
        if (xhr.readyState === 0) {
            // Browser was refreshed during an ajax request.
            return;
        }
        var $modal = $('<div class="modal fade hide"></div>');
        var $modalHeader = $('<div class="modal-header"></div>')
            .append('<button type="button" class="close" data-dismiss="modal">×</button>')
            .append($('<h3></h3>').text(xhr.status + ' ' + error))
            .append($('<span></span>').text(settings.type + ' ' + settings.url))
            .appendTo($modal);
        var $modalBody = $('<div class="modal-body"></div>')
            .appendTo($modal);
        $modal.modal('show');

        var $iframe = $('<iframe/>');
        $iframe.appendTo($modalBody);
        setTimeout(function () {
            $iframe.contents().find('body').html(xhr.responseText);
        }, 1);
        setTimeout(function () {
            $iframe.css({
                width:$modalBody.width(),
                height:$modalBody.height(),
                border:'none'
            });
        }, 1);
    });

    $context.ajaxComplete(function (event, xhr, settings) {

    });

    $context.on('click', 'a[data-ajax]', function (event) {
        var $link = $(this);
        $.ajax({
            url:$link.attr('href'),
            context:$link
        });
        return false;
    });

    $context.on('submit', 'form[data-ajax]', function (event) {
        var $form = $(this);
        $form.ajaxSubmit({
            context:$form
        });
        return false;
    });

});