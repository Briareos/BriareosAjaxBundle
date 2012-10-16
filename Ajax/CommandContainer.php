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

    public function __toString()
    {
        $commands = array('commands' => array());
        /** @var $command CommandInterface */
        foreach ($this->commands as $command) {
            $commands['commands'][] = array(
                'name' => $command->getName(),
                'arguments' => $command->getArguments(),
            );
        }
        return json_encode($commands);
    }
}