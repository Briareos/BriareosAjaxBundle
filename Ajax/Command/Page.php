<?php

namespace Briareos\AjaxBundle\Ajax\Command;

use Briareos\AjaxBundle\Ajax\CommandInterface;

class Page implements CommandInterface
{
    private $title;

    private $body;

    private $url;

    private $segment;

    public function __construct($title, $body, $url, $segment = 'body')
    {
        $this->title = $title;
        $this->body = $body;
        $this->url = $url;
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
            'url' => $this->url,
            'segment' => $this->segment,
        );
    }
}
