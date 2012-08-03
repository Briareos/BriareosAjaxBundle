<?php

namespace Briareos\AjaxBundle\Ajax\Command;

interface AjaxCommandInterface
{
    public function getName();

    public function getArguments();
}