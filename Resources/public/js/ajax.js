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
        var pjaxContainers = [];
        $context.find('[data-pjax-container]').each(function () {
            pjaxContainers.push($(this).data('pjax-container'));
        });
        if (History.programmatic === false) {
            $.ajax({
                url:State.url,
                context:'history',
                data:{
                    _pjax:pjaxContainers
                }
            });
        }
    });

    $context.on('click', 'a[data-ajax]', function (event) {
        var $link = $(this);
        var pjaxContainers = [];
        $context.find('[data-pjax-container]').each(function () {
            pjaxContainers.push($(this).data('pjax-container'));
        });
        $.ajax({
            url:$link.attr('href'),
            context:$link,
            data:{
                _pjax:pjaxContainers
            }
        });
        return false;
    });

    $context.on('submit', 'form[data-ajax]', function (event) {
        var $form = $(this);
        var pjaxContainers = [];
        $context.find('[data-pjax-container]').each(function () {
            pjaxContainers.push($(this).data('pjax-container'));
        });
        $form.ajaxSubmit({
            context:$form,
            data:{
                _pjax:pjaxContainers
            }
        });
        return false;
    });

    var Ajax = {};
    Ajax.command = {};

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
        $('.flash-messages', $context).slideUp(function () {
            $(this).remove();
        });
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
        var $pjaxContent = $(settings.body);
        $context.find('[data-pjax-container="' + settings.segment + '"]').html($pjaxContent);
        if ($context.scrollTop() > $pjaxContent.offset().top) {
            $context.animate({scrollTop:$pjaxContent.offset().top - 10});
        }
        if (ajaxSettings.context !== 'history') {
            History.programmatic = true;
            History.pushState({body:settings.body}, settings.title, settings.url);
            History.programmatic = false;
        }
    };
});