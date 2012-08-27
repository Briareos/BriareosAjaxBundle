<?php

namespace Briareos\AjaxBundle\Ajax;

interface CommandInterface
{
    public function getName();

    public function getArguments();
}