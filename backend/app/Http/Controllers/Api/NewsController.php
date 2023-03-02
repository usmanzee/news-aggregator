<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\ApiClients\NewsApiClient;
use App\Http\Resources\NewsCollection;
use App\Http\Resources\NewsSourceColletion;
use App\ApiClients\GuardianApiClient;

class NewsController extends Controller
{
    public function __construct(
        private NewsApiClient $api,
        private GuardianApiClient $guardianApi
    ) {}

    public function getNewSources() {
        $url = 'top-headlines/sources?apiKey='.strval(config('services.newsapi.key'));
        $data = $this->api->newsList($url);
        $response = json_decode($data->getBody()->getContents());
        $res = new NewsSourceColletion($response->sources);
        return response()->json([
            'data' => $response->sources
        ]);
    }
    public function getNewsFeed(Request $request) {

        try {
            $url = "/top-headlines";
            $guardianUrl = "";
            $searchQuery =  $request->searchQuery;
            $fromDate =  $request->fromDate;
            $toDate =  $request->toDate;
            $category =  $request->category;
            $sources =  $request->sources;
    
            if(!$searchQuery && !$fromDate && !$toDate && !$category && !$sources) {
                $url .= '?country=us';
            } elseif (!$searchQuery && !$fromDate && !$toDate && $category && !$sources) {
                $url .= '?category='.$category;
            }
            if($searchQuery) {
                $url = "/everything?q=".$searchQuery;
                if ($fromDate && $toDate) {
                    $url .= '&from='.$fromDate.'&to='.$toDate;
                }
                if ($sources) {
                    $url .= '&sources='.$sources;
                }
            }
            if($sources && !$searchQuery) {
                $url = "/everything?sources=".$sources;
                if ($fromDate && $toDate) {
                    $url .= '&from='.$fromDate.'&to='.$toDate;
                }
            }
    
            if($searchQuery) {
                $guardianUrl .= '?q='.$searchQuery.'&api-key='.strval(config('services.guardianapi.key'));;
            } else {
                $guardianUrl .= '?api-key='.strval(config('services.guardianapi.key'));;
            }
            $url .= "&apiKey=".strval(config('services.newsapi.key'));
    
    
            /**
             * News org request
             */
            $data = $this->api->newsList($url);
            $response = json_decode($data->getBody()->getContents());
            /**
             * Guardian request
             */
            //  $guardianData = $this->guardianApi->guardianNewsList($guardianUrl);
            if($response->status === 'ok') {
                $res = new NewsCollection($response->articles);
                return response()->json($res);
            } else {
                return response()->json([
                    'data' => [
                        'message' => $response->message
                    ]
                ]);
            }
    
        } catch (\Exception $e) {
            return response()->json([
                'data' => [
                    'message' => 'Server Error!'
                ]
                
            ]);
        }
        
    }
}
