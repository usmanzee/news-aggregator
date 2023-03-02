<?php

declare(strict_types=1);
 
namespace App\Traits;
 
use Illuminate\Http\Client\PendingRequest;
use Illuminate\Http\Client\Response;
 
trait CanSendGetRequest {
  public function get(PendingRequest $request, string $url): Response {
    return $request->get(
        url: $url,
    );
  }
}