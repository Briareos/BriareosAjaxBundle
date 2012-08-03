<?php

namespace Briareos\AjaxBundle\Ajax\Command;

use Briareos\AjaxBundle\Ajax\Command\AjaxCommandInterface;

class AjaxCommandState implements AjaxCommandInterface
{
    private $state;

    public function __construct(array $state)
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