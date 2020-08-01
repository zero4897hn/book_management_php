<?php

namespace App\Http\Middleware;

use Closure;
use Facade\FlareClient\View;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Http\Response;

class IsAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        try {
            JWTAuth::setToken($request->bearerToken());
            $user = JWTAuth::toUser();
            if ($user->admin) {
                return $next($request);
            }
            return response(['message' => 'Need admin right'], Response::HTTP_BAD_REQUEST);
        } catch (JWTException $e) {
            if ($e instanceof \Tymon\JWTAuth\Exceptions\TokenExpiredException) {
                return response(['message' => 'Token has expired'], Response::HTTP_BAD_REQUEST);
            } else if ($e instanceof \Tymon\JWTAuth\Exceptions\TokenInvalidException) {
                return response(['message' => 'token_invalid'], Response::HTTP_BAD_REQUEST);
            } else {
                return response(['message' => 'A token is required'], Response::HTTP_BAD_REQUEST);
            }
        }
    }
}
