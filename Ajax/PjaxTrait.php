<?php

namespace Briareos\AjaxBundle\Ajax;

trait PjaxTrait
{
    protected function getPjaxContainers()
    {
        $pjax = $this->getRequest()->get('_pjax', array());
        if (!is_array($pjax)) {
            $pjax = array();
        }
        return $pjax;
    }

    protected function getPjaxParameters()
    {
        return array('_pjax' => $this->getPjaxContainers());
    }
}