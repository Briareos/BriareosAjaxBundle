<?php

namespace Briareos\AjaxBundle\EventListener;

use Briareos\AjaxBundle\Javascript\JavascriptSettingsInjectorContainer;
use Briareos\AjaxBundle\Javascript\JavascriptSettingsContainer;
use Symfony\Component\HttpKernel\HttpKernelInterface;
use Symfony\Component\HttpKernel\Event\GetResponseEvent;
use Symfony\Component\HttpKernel\Event\FilterResponseEvent;
use Briareos\AjaxBundle\Ajax;

class JavascriptSettingsInjectorListener
{
    private $javascriptSettingsInjectorContainer;

    private $javascriptSettingsContainer;

    public function __construct(JavascriptSettingsContainer $javascriptSettingsContainer, JavascriptSettingsInjectorContainer $javascriptSettingsInjectorContainer)
    {
        $this->javascriptSettingsContainer = $javascriptSettingsContainer;
        $this->javascriptSettingsInjectorContainer = $javascriptSettingsInjectorContainer;
    }

    public function onKernelRequest(GetResponseEvent $event)
    {
        foreach ($this->javascriptSettingsInjectorContainer->getJavascriptSettingsInjectors() as $javascriptSettingsInjector) {
            $javascriptSettingsInjector->onRequest($event, $this->javascriptSettingsContainer);
        }
    }

    public function onKernelResponse(FilterResponseEvent $event)
    {
        $response = $event->getResponse();
        if ($response instanceof Ajax\Response) {
            foreach ($this->javascriptSettingsContainer->getJavascriptSettings() as $javascriptSettings) {
                $commandContainer = $response->getContent();
                $commandContainer->add(new Ajax\Command\Settings($javascriptSettings->getName(), $javascriptSettings->getSettings()));
            }
        }
    }
}