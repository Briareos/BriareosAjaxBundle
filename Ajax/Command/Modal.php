<?php

namespace Briareos\AjaxBundle\Ajax\Command;

use Briareos\AjaxBundle\Ajax\Command\AjaxCommandInterface;

class Modal implements AjaxCommandInterface
{
    private $body;

    public function __construct($body)
    {
        $this->body = $body;
    }

    public function getName()
    {
        return 'modal';
    }

    public function getArguments()
    {
        return array(
            'body' => $this->body,
        );
    }
}