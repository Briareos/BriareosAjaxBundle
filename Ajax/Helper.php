<?php

namespace Briareos\AjaxBundle\Ajax;

use Briareos\AjaxBundle\Ajax;
use Briareos\AjaxBundle\Twig\AjaxEngine;
use Symfony\Component\HttpFoundation\Request;

class Helper
{
    private $request;

    private $ajax;

    public function __construct(Request $request, AjaxEngine $ajax)
    {
        $this->request = $request;
        $this->ajax = $ajax;
    }

    public function getPjaxContainers()
    {
        $pjax = $this->request->get('_pjax', array());
        if (is_scalar($pjax) && strlen($pjax) > 0) {
            $pjax = explode(',', $pjax);
        } else {
            $pjax = array();
        }

        return $pjax;
    }

    public function getPjaxParameters()
    {
        return array('_pjax' => $this->getPjaxContainers());
    }

    public function renderPjaxBlock($templateFile, $templateParams, $url, $requestedContainer = 'body')
    {
        $commands = new Ajax\CommandContainer();
        $pjaxContainers = $this->getPjaxContainers();

        if (in_array($requestedContainer, $pjaxContainers)) {
            $container = $requestedContainer;
            $block = $container;
            if (strpos($block, '-') !== false) {
                $block = explode('-', $block)[0];
            }
        } else {
            $container = $block = 'body';
        }
        $title = $this->ajax->renderBlock($templateFile, 'title', $templateParams);
        $body = $this->ajax->renderBlock($templateFile, $block, $templateParams);
        $commands->add(new Ajax\Command\Page($title, $body, $url, $container));

        return new Ajax\Response($commands);
    }

    public function renderAjaxForm($templateFile, $templateParams)
    {
        $commands = new Ajax\CommandContainer();
        $commands->add(new Ajax\Command\Form($this->ajax->render($templateFile, $templateParams)));

        return new Ajax\Response($commands);
    }

    public function renderModal($templateFile, $templateParams)
    {
        $commands = new Ajax\CommandContainer();
        $commands->add(new Ajax\Command\Modal($this->ajax->render($templateFile, $templateParams)));

        return new Ajax\Response($commands);
    }

    public function isModal()
    {
        return (bool) $this->request->get('_modal', false);
    }

    public function renderSettings($name, $settings)
    {
        $commands = new Ajax\CommandContainer();
        $commands->add(new Ajax\Command\Settings($name, $settings));

        return new Ajax\Response($commands);
    }

    public function location($location)
    {
        $commands = new Ajax\CommandContainer();
        $commands->add(new Ajax\Command\Location($location));

        return new Ajax\Response($commands);
    }
}