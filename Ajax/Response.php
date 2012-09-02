<?php

namespace Briareos\AjaxBundle\Ajax;

use Symfony\Component\HttpFoundation\Response as BaseResponse;
use InvalidArgumentException;
use Symfony\Component\HttpFoundation\Request;
use Briareos\AjaxBundle\Ajax\CommandContainer;

class Response extends BaseResponse
{
    protected $ajaxContent;

    public function __construct(CommandContainer $commands, $status = 200, $headers = array())
    {
        $headers += array('Content-Type' => 'application/json');

        parent::__construct($commands, $status, $headers);
    }

    public function setContent($content)
    {
        if (!$content instanceof CommandContainer) {
            throw new \InvalidArgumentException("Content for Ajax response must be an instance of Briareos\AjaxBundle\Ajax\CommandContainer.");
        }
        $this->content = $content;
    }


    /**
     * @return CommandContainer
     */
    public function getContent()
    {
        return parent::getContent();
    }

}