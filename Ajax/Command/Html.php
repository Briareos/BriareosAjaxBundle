<?php

namespace Briareos\AjaxBundle\Ajax\Command;

use Briareos\AjaxBundle\Ajax\CommandInterface;

class Html implements CommandInterface
{
    private $selector;

    private $html;

    private $replace;

    public function __construct($selector, $html, $replace = false)
    {
        $this->selector = $selector;
        $this->html = $html;
        $this->replace = $replace;
    }

    public function getName()
    {
        return 'html';
    }

    public function getArguments()
    {
        return array(
            'selector' => $this->selector,
            'html' => $this->html,
            'replace' => $this->replace,
        );
    }

}