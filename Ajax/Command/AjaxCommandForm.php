<?php

namespace Briareos\AjaxBundle\Ajax\Command;

use Briareos\AjaxBundle\Ajax\Command\AjaxCommandInterface;

class AjaxCommandForm implements AjaxCommandInterface
{
    private $id;

    private $body;

    public function __construct($id, $body)
    {
        $this->id = $id;
        $this->body = $body;
    }

    public function getName()
    {
        return 'form';
    }

    public function getArguments()
    {
        return array(
            'id' => $this->id,
            'body' => $this->body,
        );
    }
}