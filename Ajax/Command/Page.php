<?php

namespace Briareos\AjaxBundle\Ajax\Command;

use Briareos\AjaxBundle\Ajax\Command\AjaxCommandInterface;

class Page implements AjaxCommandInterface
{
    private $title;

    private $body;

    private $segment;

    public function __construct($title, $body, $segment = 'body')
    {
        $this->title = $title;
        $this->body = $body;
        $this->segment = $segment;
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
            'segment' => $this->segment,
        );
    }
}
