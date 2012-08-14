<?php

namespace Briareos\AjaxBundle\Ajax\Command;

use Briareos\AjaxBundle\Ajax\Command\AjaxCommandInterface;

class Location implements AjaxCommandInterface
{
    private $location;

    private $rewrite;

    public function __construct($location, $rewrite)
    {
        $this->location = $location;
        $this->rewrite = $rewrite;
    }

    public function getName()
    {
        return 'location';
    }

    public function getArguments()
    {
        return array(
            'location' => $this->location,
            'rewrite' => $this->rewrite,
        );
    }


}