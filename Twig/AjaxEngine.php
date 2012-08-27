<?php

namespace Briareos\AjaxBundle\Twig;

use Symfony\Bundle\TwigBundle\TwigEngine;

class AjaxEngine extends TwigEngine
{
    /**
     * @param $name
     * @return \Twig_TemplateInterface
     */
    public function renderBlock($templateName, $blockName, $variables = array())
    {
        // We can do this for free, since we always get the same template instance.
        /** @var $template \Twig_Template */
        $template = $this->environment->loadTemplate($templateName);
        return $template->renderBlock($blockName, array_merge($this->environment->getGlobals(), $variables));
    }
}