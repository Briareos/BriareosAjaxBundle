<?php

namespace Briareos\AjaxBundle\EventListener;

use Briareos\AjaxBundle\Javascript\JavascriptSettingsContainer;
use Symfony\Component\HttpKernel\Event\FilterResponseEvent;
use Briareos\AjaxBundle\Ajax;

class JavascriptSettingsListener
{
    private $javascriptSettings;

    public function __construct(JavascriptSettingsContainer $javascriptSettings)
    {
        $this->javascriptSettings = $javascriptSettings;
    }

    public function onKernelResponse(FilterResponseEvent $event)
    {
        $response = $event->getResponse();
        if ($response instanceof Ajax\Response) {
            /** @var $response Ajax\Response */
            /** @var $javascriptSettings \Briareos\AjaxBundle\Javascript\JavascriptSettings */
            foreach ($this->javascriptSettings->getJavascriptSettings() as $javascriptSettings) {
                $commandContainer = $response->getContent();
                $commandContainer->add(new Ajax\Command\Settings($javascriptSettings->getName(), $javascriptSettings->getSettings()));
            }
        }
    }
}