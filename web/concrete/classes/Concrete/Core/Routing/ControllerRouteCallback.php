<?
namespace Concrete\Core\Routing;
use Symfony\Component\HttpKernel;
use Response;
use View;
use Concrete\Controller;

class ControllerRouteCallback extends RouteCallback {

	public function execute(\Concrete\Core\Http\Request $request, \Concrete\Core\Routing\Route $route, $parameters) {
		$resolver = new HttpKernel\Controller\ControllerResolver();
	    $callback = $resolver->getController($request);
	    $arguments = $resolver->getArguments($request, $callback);
	    $controller = $callback[0];
	    $method = $callback[1];
		$controller->on_start();
		$response = $controller->runAction($method, $arguments);
		if ($response instanceof Response || $response instanceof RedirectResponse) {
			// note, our RedirectResponse doesn't extend Response, it extends symfony2 response
			return $response;
		}

	    $view = $controller->getViewObject();
	    if (is_object($view)) {
		    $view->setController($controller);
			if (isset($view) && $view instanceof View) {
				$content = $view->render();
			}
		}
		$response = new Response();
		$response->setContent($content);
		return $response;
	}

	public static function getRouteAttributes($callback) {
		$attributes = array();
		$attributes['_controller'] = $callback;
		$callback = new static($callback);
		$attributes['callback'] = $callback;
		return $attributes;
	}

}