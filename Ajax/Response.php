<?php

namespace Briareos\AjaxBundle\Ajax;

use Symfony\Component\HttpFoundation\Response as BaseResponse;

class Response extends BaseResponse
{
    public function __construct($commands = array(), $status = 200, $headers = array())
    {
        $headers += array('Content-Type' => 'application/json; charset=utf-8');

        $commandsArray = array();
        /** @var $command \Briareos\AjaxBundle\Ajax\Command\AjaxCommandInterface */
        foreach ($commands as $command) {
            $commandsArray[] = array(
                'name' => $command->getName(),
                'arguments' => $command->getArguments(),
            );
        }

        parent::__construct(json_encode(array('commands' => $commandsArray)), $status, $headers);
    }
}