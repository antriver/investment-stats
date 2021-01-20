<?php

/**
 * This script fetches balances from Binance using the PHP SDK.
 * TODO: Switch to the Binance JS SDK.
 */

use InvestmentStats\Binance\BinanceApi;

require __DIR__.'/vendor/autoload.php';

$env = Dotenv\Dotenv::parse(file_get_contents(__DIR__.'/../.env'));

$api = new BinanceApi(__DIR__.'/../binance-credentials.json');

print_r($api->rawPrices());

//$balances = $api->getBalancesWithValues(['GBP', 'USDT']);
//print_r($balances);
