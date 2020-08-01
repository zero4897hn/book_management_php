<?php

namespace App\Http\Middleware;

use Closure;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Http\Response;

class VerifyJWTToken
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
            JWTAuth::toUser($request->bearerToken());
        } catch (JWTException $e) {
            if ($e instanceof \Tymon\JWTAuth\Exceptions\TokenExpiredException) {
                return response(['message' => 'Token has expired'], Response::HTTP_BAD_REQUEST);
            } else if ($e instanceof \Tymon\JWTAuth\Exceptions\TokenInvalidException) {
                return response(['message' => 'token_invalid'], Response::HTTP_BAD_REQUEST);
            } else {
                return response(['message' => 'Token is required'], Response::HTTP_BAD_REQUEST);
            }
        }
        return $next($request);
    }
}
