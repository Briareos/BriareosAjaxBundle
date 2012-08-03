<?php

namespace Briareos\AjaxBundle\Ajax;

use Symfony\Component\HttpFoundation\Response;

class AjaxResponse extends Response
{
    public function __construct($commands = array(), $status = 200, $headers = array())
    {
        $headers += array('Content-Type' => 'application/json');

        $commandsArray = array();
        /** @var $command \Briareos\AjaxBundle\Ajax\Command\AjaxCommandInterface */
        foreach ($commands as $command) {
            $commandsArray[$command->getName()] = $command->getArguments();
        }

        parent::__construct(json_encode($commandsArray), $status, $headers);
    }
}