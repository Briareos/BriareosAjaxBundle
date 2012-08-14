<?php

namespace Briareos\AjaxBundle\Ajax\Command;

use Briareos\AjaxBundle\Ajax\Command\AjaxCommandInterface;

class State implements AjaxCommandInterface
{
    private $state;

    public function __construct($state)
    {
        $this->state = $state;
    }

    public function getName()
    {
        return 'state';
    }

    public function getArguments()
    {
        return array(
            'state' => $this->state,
        );
    }

}