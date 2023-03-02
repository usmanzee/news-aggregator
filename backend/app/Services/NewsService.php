<?php
declare(strict_types=1);

namespace App\Services;
use App\Traits\BuildBaseRequest;
use App\Traits\CanSendGetRequest;
use App\ApiClients\NewsApiClient;
class NewsService {
    use BuildBaseRequest, CanSendGetRequest; 
    public function __construct(private string $baseUrl, private string $apiKey) {}
    public function records() : NewsApiClient {
        return new NewsApiClient(
            service: $this
        );
    }
}