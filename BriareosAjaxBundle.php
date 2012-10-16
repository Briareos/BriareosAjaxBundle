<?php

namespace Briareos\AjaxBundle;

use Symfony\Component\HttpKernel\Bundle\Bundle;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Briareos\AjaxBundle\DependencyInjection\Compiler\RegisterJavascriptSettingsInjectorsPass;

class BriareosAjaxBundle extends Bundle
{
    public function build(ContainerBuilder $container)
    {
        $container->addCompilerPass(new RegisterJavascriptSettingsInjectorsPass());
    }

}