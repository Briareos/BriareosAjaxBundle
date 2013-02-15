<?php

namespace Briareos\AjaxBundle\Ajax\Command;

use Briareos\AjaxBundle\Ajax\CommandInterface;

class Form implements CommandInterface
{
    private $id;

    private $body;

    public function __construct($body)
    {
        // jQuery 1.9+ treats newlines as DOM elements, so we need to get rid of them.
        $this->body = trim($body);
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