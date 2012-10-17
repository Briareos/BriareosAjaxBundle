<?php

namespace Briareos\AjaxBundle\Javascript;

use Briareos\AjaxBundle\Javascript\JavascriptSettingsInjectorInterface;

class JavascriptSettingsInjectorContainer
{
    private $javascriptSettingsInjectors = array();

    public function addJavascriptSettingsInjector(JavascriptSettingsInjectorInterface $javascriptSettingsInjector, $priority = 0)
    {
        $this->javascriptSettingsInjectors[$priority][] = $javascriptSettingsInjector;
    }

    /**
     * @return JavascriptSettings[]
     */
    public function getJavascriptSettingsInjectors()
    {
        $sorted = array();
        ksort($this->javascriptSettingsInjectors);
        foreach (array_reverse($this->javascriptSettingsInjectors) as $javascriptSettingsInjectors) {
            foreach ($javascriptSettingsInjectors as $javascriptSettingsInjector) {
                $sorted[] = $javascriptSettingsInjector;
            }
        }
        return $sorted;
    }
}