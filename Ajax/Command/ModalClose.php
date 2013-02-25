<?php
/**
 * Created by JetBrains PhpStorm.
 * User: Fox
 * Date: 2/16/13
 * Time: 3:39 PM
 * To change this template use File | Settings | File Templates.
 */

namespace Briareos\AjaxBundle\Ajax\Command;

use Briareos\AjaxBundle\Ajax\CommandInterface;

class ModalClose implements CommandInterface
{

    private $id;

    function __construct($id = null)
    {
        $this->id = $id;
    }

    public function getName()
    {
        return 'modalClose';
    }

    public function getArguments()
    {
        return array(
            'id' => $this->id,
        );
    }
}