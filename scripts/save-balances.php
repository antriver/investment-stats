<?php

/**
 * This script fetches balances from Binance using the PHP SDK.
 * TODO: Switch to the Binance JS SDK.
 */

use InvestmentStats\Binance\BinanceApi;

require __DIR__.'/../vendor/autoload.php';

$env = Dotenv\Dotenv::parse(file_get_contents(__DIR__.'/../.env'));

$snapshotId = (int) $argv[1];
if (empty($snapshotId)) {
    die("Provide a snapshotId as the first argument");
}
echo "Saving for snapshotId {$snapshotId}".PHP_EOL;

$db = new \InvestmentStats\Database($env);

$api = new BinanceApi(__DIR__.'/../binance-credentials.json');
$balances = $api->getBalancesWithValues(['GBP', 'USDT']);
print_r($balances);

$insertQuery = $db->prepare(
    'INSERT INTO snapshot_assets (snapshotId, service, asset, amount, usdValue, gbpValue) VALUES (?, ?, ?, ?, ?, ?)'
);
foreach ($balances as $symbol => $asset) {
    $insertQuery->execute(
        [
            $snapshotId,
            'binance',
            $symbol,
            number_format(($asset['spot']['amount'] ?? 0) + ($asset['savings']['amount'] ?? 0), 10, '.', ''),
            number_format(($asset['spot']['USDT'] ?? 0) + ($asset['savings']['USDT'] ?? 0), 4, '.', ''),
            number_format(($asset['spot']['GBP'] ?? 0) + ($asset['savings']['GBP'] ?? 0), 4, '.', ''),
        ]
    );
}
