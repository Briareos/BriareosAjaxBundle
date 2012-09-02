<?php

namespace Briareos\AjaxBundle\Ajax\Command;

use Briareos\AjaxBundle\Ajax\CommandInterface;

class Settings implements CommandInterface
{
    private $event;

    private $settings;

    public function __construct($event, array $settings)
    {
        $this->event = $event;
        $this->settings = $settings;
    }

    public function getName()
    {
        return 'settings';
    }

    public function getArguments()
    {
        return array(
            'event' => $this->event,
            'settings' => $this->settings,
        );
    }
}
