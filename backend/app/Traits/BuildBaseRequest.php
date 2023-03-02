<?php
declare(strict_types=1);
 
namespace App\Traits;
 
use Illuminate\Http\Client\PendingRequest;
use Illuminate\Support\Facades\Http;
 
trait BuildBaseRequest
{
  public function buildRequest(): PendingRequest {
    return $this->withBaseUrl()->timeout(
        seconds: 15,
    );
  }
  public function buildRequestWithToken(): PendingRequest {
    return $this->withBaseUrl()->timeout(
        seconds: 15,
    )->withToken(
        token: $this->apiKey,
    );
  }
  public function withBaseUrl(): PendingRequest
  {
    return Http::baseUrl(
        url: $this->baseUrl,
    );
  }
}