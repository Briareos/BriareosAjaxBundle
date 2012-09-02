<?php

namespace Briareos\AjaxBundle\Javascript;

class JavascriptSettings
{
    private $name;

    private $settings = array();

    public function __construct($name, $settings)
    {
        $this->name = $name;
        $this->settings = $settings;
    }

    public function getName()
    {
        return $this->name;
    }

    public function getSettings()
    {
        return $this->settings;
    }
}