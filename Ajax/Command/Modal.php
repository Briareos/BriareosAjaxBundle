<?php

namespace Briareos\AjaxBundle\Ajax\Command;

use Briareos\AjaxBundle\Ajax\CommandInterface;

class Modal implements CommandInterface
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