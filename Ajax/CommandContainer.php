<?php

namespace Briareos\AjaxBundle\Ajax;

use Briareos\AjaxBundle\Ajax\CommandInterface;

class CommandContainer implements \IteratorAggregate
{
    private $commands;

    public function add(CommandInterface $command)
    {
        $this->commands[] = $command;
    }

    /**
     * {@inheritdoc}
     */
    public function getIterator()
    {
        return new \ArrayIterator($this->commands);
    }

}