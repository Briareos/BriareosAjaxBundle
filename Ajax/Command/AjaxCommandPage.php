<?php

namespace Briareos\AjaxBundle\Ajax\Command;

use Briareos\AjaxBundle\Ajax\Command\AjaxCommandInterface;

class AjaxCommandPage implements AjaxCommandInterface
{
    private $title;

    private $body;

    public function __construct($title, $body)
    {
        $this->title = $title;
        $this->body = $body;
    }

    public function getName()
    {
        return 'page';
    }

    public function getArguments()
    {
        return array(
            'title' => $this->title,
            'body' => $this->body,
        );
    }
}
