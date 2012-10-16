<?php

namespace Briareos\AjaxBundle\Javascript;

use Briareos\AjaxBundle\Javascript\JavascriptSettingsInjectorInterface;

class JavascriptSettingsInjectorContainer
{
    private $javascriptSettingsInjectors = array();

    public function addJavascriptSettingsInjector(JavascriptSettingsInjectorInterface $javascriptSettingsInjector)
    {
        $this->javascriptSettingsInjectors[] = $javascriptSettingsInjector;
    }

    /**
     * @return JavascriptSettings[]
     */
    public function getJavascriptSettingsInjectors()
    {
        return $this->javascriptSettingsInjectors;
    }
}