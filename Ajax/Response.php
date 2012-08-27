<?php

namespace Briareos\AjaxBundle\Ajax;

use Symfony\Component\HttpFoundation\Response as BaseResponse;
use Briareos\AjaxBundle\Ajax\CommandContainer;

class Response extends BaseResponse
{
    public function __construct(CommandContainer $commands, $status = 200, $headers = array())
    {
        $headers += array('Content-Type' => 'application/json; charset=utf-8');

        $response = array();

        /** @var $command \Briareos\AjaxBundle\Ajax\CommandInterface */
        foreach ($commands as $command) {
            $response['commands'][] = array(
                'name' => $command->getName(),
                'arguments' => $command->getArguments(),
            );
        }

        parent::__construct(json_encode($response), $status, $headers);
    }
}