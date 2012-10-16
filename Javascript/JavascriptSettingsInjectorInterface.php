<?php

namespace Briareos\AjaxBundle\Javascript;

use Briareos\AjaxBundle\Javascript\JavascriptSettingsContainer;
use Symfony\Component\HttpKernel\Event\FilterResponseEvent;
use Symfony\Component\HttpKernel\Event\GetResponseEvent;

interface JavascriptSettingsInjectorInterface
{
    public function onRequest(GetResponseEvent $event, JavascriptSettingsContainer $settingsContainer);

    public function onResponse(FilterResponseEvent $event, JavascriptSettingsContainer $settingsContainer);
}