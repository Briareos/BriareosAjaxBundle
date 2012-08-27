<?php

namespace Briareos\AjaxBundle\Ajax\Command;

use Briareos\AjaxBundle\Ajax\CommandInterface;

class Form implements CommandInterface
{
    private $id;

    private $body;

    public function __construct($body)
    {
        $this->body = $body;
    }

    public function getName()
    {
        return 'form';
    }

    public function getArguments()
    {
        return array(
            'body' => $this->body,
        );
    }
}