<?php

namespace Briareos\AjaxBundle\Javascript;

use Briareos\AjaxBundle\Javascript\JavascriptSettings;

class JavascriptSettingsContainer
{
    private $javascriptSettings = array();

    public function addJavascriptSettings(JavascriptSettings $javascriptSettings)
    {
        $this->javascriptSettings[] = $javascriptSettings;
    }

    /**
     * {@inheritdoc}
     */
    public function getJavascriptSettings()
    {
        return $this->javascriptSettings;
    }
}