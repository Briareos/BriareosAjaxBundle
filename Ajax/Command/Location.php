<?php

namespace Briareos\AjaxBundle\Ajax\Command;

use Briareos\AjaxBundle\Ajax\CommandInterface;

class Location implements CommandInterface
{
    private $location;

    private $rewrite;

    public function __construct($location, $rewrite = false)
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