<?php

namespace Briareos\AjaxBundle\Twig\Extension;

use Briareos\AjaxBundle\Javascript\JavascriptSettingsContainer;

class JavascriptSettings extends \Twig_Extension
{
    private $javascriptSettingsContainer;

    public function __construct(JavascriptSettingsContainer $javascriptSettingsContainer)
    {
        $this->javascriptSettingsContainer = $javascriptSettingsContainer;
    }

    /**
     * {@inheritdoc}
     */
    function getName()
    {
        return 'javascript_settings';
    }

    public function getFunctions()
    {
        return array(
            'javascript_settings' => new \Twig_Function_Method($this, 'getJavascriptSettings'),
        );
    }

    public function getJavascriptSettings()
    {
        $settings = array();
        /** @var $javascriptSettings \Briareos\AjaxBundle\Javascript\JavascriptSettings */
        foreach ($this->javascriptSettingsContainer->getJavascriptSettings() as $javascriptSettings) {
            $settings[] = array(
                'name' => $javascriptSettings->getName(),
                'settings' => $javascriptSettings->getSettings(),
            );
        }
        return $settings;
    }
}