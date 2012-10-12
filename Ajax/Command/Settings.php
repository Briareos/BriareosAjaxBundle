<?php

namespace Briareos\AjaxBundle\Ajax\Command;

use Briareos\AjaxBundle\Ajax\CommandInterface;

class Settings implements CommandInterface
{
    private $name;

    private $settings;

    public function __construct($name, array $settings)
    {
        $this->name = $name;
        $this->settings = $settings;
    }

    public function getName()
    {
        return 'settings';
    }

    public function getArguments()
    {
        return array(
            'name' => $this->name,
            'settings' => $this->settings,
        );
    }
}
