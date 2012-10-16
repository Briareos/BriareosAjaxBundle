<?php

namespace Briareos\AjaxBundle\DependencyInjection\Compiler;

use Symfony\Component\DependencyInjection\Compiler\CompilerPassInterface;
use Symfony\Component\DependencyInjection\Reference;
use Symfony\Component\DependencyInjection\ContainerBuilder;

class RegisterJavascriptSettingsInjectorsPass implements CompilerPassInterface
{
    /**
     * {@inheritdoc}
     */
    public function process(ContainerBuilder $container)
    {
        if (!$container->has('javascript_settings.injector_container')) {
            return;
        }

        $injector = $container->getDefinition('javascript_settings.injector_container');

        $settings = $container->findTaggedServiceIds('javascript_settings');
        foreach ($settings as $id => $attributes) {
            $injector->addMethodCall('addJavascriptSettingsInjector', array(new Reference($id)));
        }
    }

}