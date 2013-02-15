$(function () {
    "use strict";

    var $context = $('body');
    var $document = $(document);
    var History = window.History;
    var undefined;


    History.programmatic = false;

    /**
     * Freeze the element height (as minimum height). Used to prevent
     * unnecessary upwards scrolling when doing DOM manipulations.
     */
    $.fn.freezeHeight = function () {
        $(this).unfreezeHeight();
        $('<div id="freeze-height"></div>').css({
            position: 'absolute',
            top: '0px',
            left: '0px',
            width: '1px',
            height: $(this).height()
        }).appendTo(this);
    };

    /**
     * Unfreeze the element height.
     */
    $.fn.unfreezeHeight = function () {
        $('> #freeze-height', this).remove();
    };

    /**
     * Ajax loader.
     *
     * @param $element  jQuery object, the loader.
     * @param effect    Loader effect. Can be one of 'fade', 'slide', 'none' (default).
     * @param type      Loader type. Can be one of 'overlay', 'toggle' (default).
     * @constructor
     */
    var AjaxLoader = function ($element, effect, type) {
        this.$element = $element;
        this.effect = effect;
        this.type = type;
        this.$overlay = undefined;
    };

    /**
     * Start the loader.
     * If loader type is 'overlay', it creates an element with the class of "ajax-overlay-loader" over the element.
     * If loader type is 'toggle', it toggles the element's visibility.
     */
    AjaxLoader.prototype.start = function () {
        if (this.type === 'overlay') {
            this.$overlay = this.createOverlay();
            this.$overlay.css(this.getOverlayPosition());
            this.$element.append(this.$overlay);

            if (this.effect === 'slide') {
                this.$overlay.slideDown();
            } else if (this.effect === 'fade') {
                this.$overlay.fadeIn();
            } else {
                this.$overlay.show();
            }
        } else {
            if (this.effect === 'slide') {
                this.$element.slideDown();
            } else if (this.effect === 'fade') {
                this.$element.fadeIn();
            } else {
                this.$element.show();
            }
        }
    };

    /**
     * Creates an overlay for the selected element.
     */
    AjaxLoader.prototype.createOverlay = function () {
        return $('<div class="ajax-overlay-loader"/>');
    };

    AjaxLoader.prototype.getOverlayPosition = function () {
        var position = this.$element.offset();
        position.width = this.$element.width();
        position.height = this.$element.height();
        return position;
    };

    /**
     * Stops the loader. Hides it, and, if the loader is an overlay, removes it.
     */
    AjaxLoader.prototype.stop = function () {
        if (this.type === 'overlay') {
            if (this.effect === 'slide') {
                this.$overlay.slideUp(function () {
                    $(this).remove();
                });
            } else if (this.effect === 'fade') {
                this.$overlay.fadeOut(function () {
                    $(this).remove();
                });
            } else {
                this.$overlay.hide();
                this.$overlay.remove();

            }
        } else {
            if (this.effect === 'slide') {
                this.$element.slideUp();
            } else if (this.effect === 'fade') {
                this.$element.fadeOut();
            } else {
                this.$element.fadeOut();
            }
        }
    };

    AjaxLoader.prototype.bar = function (options) {
        if (options.width) {
            $('div.bar', this.$element).animate({'width': options.width});
        }
    };

    $.fn.getPjaxContainers = function () {
        var pjaxContainers = [];
        $(this).find('*[data-pjax-container]').each(function () {
            pjaxContainers.push($(this).data('pjax-container'));
        });
        return pjaxContainers;
    };

    $.fn.ajaxLoader = function (command, commandArguments) {
        if ($(this).data('AjaxLoader') === undefined) {
            var ajaxLoader = false;
            if ($(this).data('loader') !== undefined) {
                var loader = $($(this).data('loader'));
                var effect = $(this).data('loader-effect');
                var type = $(this).data('loader-type');
                ajaxLoader = new AjaxLoader(loader, effect, type);
            }
            $(this).data('AjaxLoader', ajaxLoader);
        }
        if ($(this).data('AjaxLoader') === false) {
            return;
        }
        $(this).data('AjaxLoader')[command](commandArguments);
    };

    $document.ajaxSend(function (event, xhr, settings) {
        if (settings.context instanceof $ && settings.context.length) {
            if (settings.context.prop('tagName') === 'FORM') {
                $(':submit', settings.context).button('loading');
            }

            settings.context.ajaxLoader('start');
        }
    });

    $document.ajaxSuccess(function (event, xhr, settings, data) {
        if ($.isPlainObject(data) && $.isArray(data.commands)) {
            for (var i = 0; i < data.commands.length; i++) {
                var command = data.commands[i];
                Ajax.command[command.name](command['arguments'], settings);
            }
        }
    });

    $document.ajaxError(function (event, xhr, settings, error) {
        if (xhr.readyState === 0) {
            // Browser was refreshed during an ajax request.
            return;
        }
        // Reuse our modal window.
        var $modal = $('div.modal.modal-error');
        if (!$modal.length) {
            $modal = $('<div class="modal modal-overflow container hide modal-error fade in"></div>');
        } else {
            $modal.html('');
        }

        var $modalHeader = $('<div class="modal-header"></div>')
            .append('<button type="button" class="close" data-dismiss="modal">×</button>')
            .append($('<h3></h3>').text(xhr.status + ' ' + error))
            .append($('<span></span>').text(settings.type + ' ' + settings.url));
        $modalHeader.appendTo($modal);
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
                width: $iframe.contents().width(),
                height: $iframe.contents().height(),
                border: 'none'
            });
        }, 300);
    });

    $document.ajaxComplete(function (event, xhr, settings) {
        if (settings.context instanceof $) {
            if (settings.context.prop('tagName') === 'FORM') {
                $(':submit', settings.context).button('reset');
            }

            settings.context.ajaxLoader('stop');
        }
    });

    History.Adapter.bind(window, 'statechange', function () {
        var State = History.getState();
        if (History.programmatic === false) {
            $.ajax({
                url: State.url,
                context: 'history',
                data: {
                    _pjax: $context.getPjaxContainers().join(',')
                }
            });
        } else {
            History.programmatic = false;
        }
    });

    $context.on('click', 'a[data-ajax]', function () {
        var $link = $(this);
        $.ajax({
            url: $link.attr('href'),
            context: $link,
            data: {
                _pjax: $context.getPjaxContainers().join(','),
                _modal: ($link.data('modal') !== undefined) ? 1 : 0
            }
        });
        return false;
    });

    $context.on('submit', 'form[data-ajax]', function () {
        var $form = $(this);
        $('.form-messages', $form).slideUp(function () {
            $(this).remove();
        });
        $form.ajaxSubmit({
            context: $form,
            data: {
                _pjax: $context.getPjaxContainers().join(','),
                _modal: ($form.data('modal') !== undefined) ? 1 : 0
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
        var $form = $($.parseHTML(settings.body));
        $('.flash-messages', $context).slideUp(function () {
            $(this).remove();
        });
        var formId = $form.attr('id');
        $('#' + formId, $context).replaceWith($form);
        $(':input.error:first', $form).focus();
    };

    Ajax.command.modal = function (settings) {
        var $newModal = $($.parseHTML(settings.body));
        var modalId = $newModal.attr('id');
        if (!modalId) {
            modalId = 'modal-default';
            $newModal.attr('id', modalId);
        }
        var $oldModal = $('div.modal#' + modalId + ':visible', $context);
        if ($oldModal.length) {
            $oldModal.modal('hide');
        }
        $newModal.modal('show');
    };

    Ajax.command.page = function (settings, ajaxSettings) {
        var $container = $context.find('[data-pjax-container="' + settings.segment + '"]');
        $context.freezeHeight();
        $container.html(settings.body);
        $container.attachEventListeners();
        $context.unfreezeHeight();
        if ($context.scrollTop() > $container.offset().top) {
            $context.animate({scrollTop: $container.offset().top - 55});
        }
        if (ajaxSettings.context !== 'history' && settings.url) {
            History.programmatic = true;
            History.pushState({body: settings.body, programmatic: true}, settings.title, settings.url);
        }
    };

    Ajax.command.settings = function (settings) {
        window.setSettings(settings.name, settings.settings, $context);
    };

    Ajax.command.html = function (settings) {
        if (settings.replace) {
            $(settings.selector).replaceWith(settings.html);
        } else {
            $(settings.selector).html(settings.html);
        }
    };

    $.fn.attachEventListeners = function () {
        // This should be overridden.
    };

    window.setSettings = function (name, settings, $settingsContext) {
        $settingsContext.trigger('settings.' + name, [settings]);
    };
})
;