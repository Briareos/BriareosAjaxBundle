$(function () {
    "use strict";

    var $context = $('body');
    var History = window.History;
    var undefined;
    History.programmatic = false;

    var AjaxLoader = function ($context, $element) {
        this.$context = $context;
        this.$element = $element;
    };
    AjaxLoader.prototype.start = function () {
        this.$element.fadeIn();
    };

    AjaxLoader.prototype.stop = function () {
        this.$element.fadeOut();
    };

    $context.getPjaxContainers = function () {
        var pjaxContainers = [];
        this.find('[data-pjax-container]').each(function () {
            pjaxContainers.push($(this).data('pjax-container'));
        });
        return pjaxContainers;
    };

    $context.ajaxSend(function (event, xhr, settings) {
        if (settings.context instanceof $ && settings.context.length) {
            $(':input', settings.context).prop('disabled', true);
            $('[type="submit"]', settings.context).button('loading');

            if (settings.context instanceof $ && settings.context.data('loader') !== undefined) {
                settings.context.loader = new AjaxLoader(settings.context, $(settings.context.data('loader')));
                settings.context.loader.start();
            }
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
            $modal = $('<div class="modal hide modal-error fade in"></div>');
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
        }, 300);
        setTimeout(function () {
            $iframe.css({
                width:$modalBody.width(),
                height:$modalBody.height(),
                border:'none'
            });
        }, 300);
    });

    $context.ajaxComplete(function (event, xhr, settings) {
        if (settings.context instanceof $ && settings.context.loader instanceof $) {
            settings.context.loader.stop();
        }
    });

    History.Adapter.bind(window, 'statechange', function () {
        var State = History.getState();
        if (History.programmatic === false) {
            $.ajax({
                url:State.url,
                context:'history',
                data:{
                    _pjax:$context.getPjaxContainers()
                }
            });
        } else {
            History.programmatic = false;
        }
    });

    $context.on('click', 'a[data-ajax]', function (event) {
        var $link = $(this);
        $.ajax({
            url:$link.attr('href'),
            context:$link,
            data:{
                _pjax:$context.getPjaxContainers(),
                _modal:($link.data('modal') !== undefined) ? 1 : 0
            }
        });
        return false;
    });

    $context.on('submit', 'form[data-ajax]', function (event) {
        var $form = $(this);
        $('.form-messages', $form).slideUp(function () {
            $(this).remove();
        });
        $form.ajaxSubmit({
            context:$form,
            data:{
                _pjax:$context.getPjaxContainers(),
                _modal:($form.data('modal') !== undefined) ? 1 : 0
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
        $(':input.error:first', $form).focus();
    };

    Ajax.command.modal = function (settings) {
        var $modal = $('div.modal.modal-ajax');
        if (!$modal.length) {
            $modal = $('<div class="modal hide modal-ajax fade in" role="dialog" tabindex="-1" aria-hidden="true"></div>');
        } else {
            $modal.html('');
        }
        $modal.html(settings.body);
        $modal.modal('show');
    };

    Ajax.command.page = function (settings, ajaxSettings) {
        var $container = $context.find('[data-pjax-container="' + settings.segment + '"]');
        $container.html(settings.body);
        if ($context.scrollTop() > $container.offset().top) {
            $context.animate({scrollTop:$container.offset().top - 55});
        }
        if (ajaxSettings.context !== 'history' && settings.url) {
            History.programmatic = true;
            History.pushState({body:settings.body, programmatic:true}, settings.title, settings.url);
        }
    };

    Ajax.command.settings = function (settings) {
        window.setSettings(settings.name, settings.settings, $context);
    };

    window.setSettings = function (name, settings, $settingsContext) {
        $settingsContext.trigger('settings.' + name, [settings]);
    };
});