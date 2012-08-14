$(function () {
    "use strict";

    var $context = $('body');
    var History = window.History;
    History.programmatic = false;

    $context.ajaxSend(function (event, xhr, settings) {
        if (typeof settings.context !== 'undefined' && settings.context.length) {
            $('[type="submit"]', settings.context).button('loading');
        }
    });

    $context.ajaxSuccess(function (event, xhr, settings, data) {
        if ($.isPlainObject(data) && $.isArray(data.commands)) {
            for (var i = 0; i < data.commands.length; i++) {
                var command = data.commands[i];
                Ajax.command[command.name](command['arguments'], settings);
            }
            Ajax.ready();
        }
    });

    $context.ajaxError(function (event, xhr, settings, error) {
        if (xhr.readyState === 0) {
            // Browser was refreshed during an ajax request.
            return;
        }
        var $modal = $('div.modal.modal-error');
        if (!$modal.length) {
            $modal = $('<div class="modal modal-error fade hide"></div>');
        } else {
            $modal.html('');
        }

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

    History.Adapter.bind(window, 'statechange', function () {
        var State = History.getState();
        if (History.programmatic === false) {
            $.ajax({
                url:State.url,
                context:'history'
            });
        }
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

    var AjaxReady = {};

    var Ajax = {};
    Ajax.command = {};

    Ajax.ready = function () {
        var i;
        for (i in AjaxReady) {
            if ($.isFunction(AjaxReady[i])) {
                AjaxReady[i]();
            }
        }
    };

    Ajax.command.location = function (settings) {
        if (settings.url) {
            if (settings.replace) {
                window.document.location.replace(settings.url);
            } else {
                window.document.location.href = settings.url;
            }
        } else {
            window.document.location.reload();
        }
    };

    Ajax.command.form = function (settings) {
        var $form = $(settings.body);
        var formId = $form.attr('id');
        $('#' + formId, $context).replaceWith($form);
    };

    Ajax.command.modal = function (settings) {
        var $modal = $('div.modal.modal-ajax');
        if (!$modal.length) {
            $modal = $('<div class="modal modal-ajax fade hide"></div>');
        } else {
            $modal.html('');
        }
        $modal.html(settings.body);
        $modal.modal('show');
    };

    Ajax.command.page = function (settings, ajaxSettings) {
        window.document.title = settings.title;
        $context.find('#' + settings.segment).html(settings.body);
        if (ajaxSettings.context instanceof $) {
            if (ajaxSettings.context.prop('tagName') === 'A') {
                History.programmatic = true;
                History.pushState(null, null, ajaxSettings.context.attr('href'));
                History.programmatic = false;
            } else if (typeof ajaxSettings.context.get(0).form !== 'undefined') {
                History.programmatic = true;
                History.pushState(null, null, $(ajaxSettings.context.get(0).form).attr('action'));
                History.programmatic = false;
            }
        }
    };

    Ajax.command.state = function (settings, ajaxSettings) {
    };

    window.AjaxReady = AjaxReady;
});