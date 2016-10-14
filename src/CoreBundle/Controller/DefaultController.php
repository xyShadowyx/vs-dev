<?php

namespace CoreBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

class DefaultController extends Controller
{
    /**
     * @Route("/", name="CoreBundle")
     */
    public function indexAction()
    {
        return $this->render('CoreBundle::firstBlog.html.twig');
    }
}
