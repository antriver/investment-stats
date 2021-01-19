<?php

namespace InvestmentStats\Binance;

use Binance\API;
use Exception;

class BinanceApi extends API
{
    protected $caOverride = true; // /< set this if you donnot wish to use CA bundle auto download feature

    public function getSpotBalance($symbol): float
    {
        $balances = $this->balances();
        if (empty($balances[$symbol])) {
            throw new Exception("No balance info found for {$symbol}");
        }

        return $balances[$symbol]['available'];
    }

    public function getFlexibleSavingsProductPosition(string $symbol): array
    {
        return $this->httpRequest(
            "v1/lending/daily/token/position",
            "GET",
            [
                'sapi' => true,
                'asset' => $symbol,
            ],
            true
        );
    }

    public function redeemFlexibleSavingsProduct(string $productId, float $amount, string $type = 'FAST'): array
    {
        return $this->httpRequest(
            "v1/lending/daily/redeem",
            "POST",
            [
                'sapi' => true,
                'productId' => $productId,
                'amount' => $amount,
                'type' => $type,
            ],
            true
        );
    }

    public function getFlexibleSavingsProducts(): array
    {
        return $this->httpRequest("v1/lending/daily/product/list", "GET", ['sapi' => true], true);
    }

    public function getFixedSavingsProducts(): array
    {
        return $this->httpRequest("v1/lending/project/list", "GET", ['sapi' => true, 'type' => 'ACTIVITY'], true);
    }

    public function getFixedSavingsPositions(): array
    {
        return $this->httpRequest("v1/lending/project/position/list", "GET", ['sapi' => true], true);
    }

    public function getLendingAccount(): array
    {
        return $this->httpRequest("v1/lending/union/account", "GET", ['sapi' => true], true);
    }

    public function getLaunchpoolPositions(): array
    {
        return $this->httpRequest("v1/launchpool/positions", "GET", ['sapi' => true], true);
    }

    public function getBalancesWithValues(array $fiats): array
    {
        $ticker = $this->prices();

        $btcToFiats = array_combine($fiats, $fiats);
        $btcToFiats = array_map(
            function (string $fiat) use ($ticker) {
                return $ticker['BTC'.$fiat];
            },
            $btcToFiats
        );

        $assets = [];

        // Add spot balances
        $spotBalances = $this->balances($ticker);
        foreach ($spotBalances as $symbol => $spotBalance) {
            // Exclude empty balances
            if (!($spotBalance['available'] > 0)) {
                continue;
            }
            // Exclude lending balances that come from this endpoint
            if (preg_match('/^LD/', $symbol)) {
                continue;
            }

            // Handle BETH like ETH savings
            if ($symbol === 'BETH') {
                $symbol = 'ETH';
                $spotBalance['btcValue'] = $ticker['ETHBTC'] * $spotBalance['available'];

                @$assets[$symbol]['savings']['amount'] += $spotBalance['available'];
                @$assets[$symbol]['savings']['BTC'] += $spotBalance['btcValue'];
                continue;
            }

            @$assets[$symbol]['spot']['amount'] += $spotBalance['available'];
            @$assets[$symbol]['spot']['BTC'] += $spotBalance['btcValue'];
        }

        // Add savings balances
        $lendingBalances = $this->getLendingAccount();
        foreach ($lendingBalances['positionAmountVos'] as $lendingBalance) {
            // Exclude empty balances
            if (!($lendingBalance['amount'] > 0)) {
                continue;
            }

            $symbol = $lendingBalance['asset'];

            @$assets[$symbol]['savings']['amount'] += $lendingBalance['amount'];
            @$assets[$symbol]['savings']['BTC'] += $lendingBalance['amountInBTC'];
        }

        foreach ($assets as &$asset) {
            if (!empty($asset['spot'])) {
                foreach ($btcToFiats as $fiat => $btcToFiat) {
                    $asset['spot'][$fiat] = number_format($asset['spot']['BTC'] * $btcToFiat, 4, '.', '');
                }
            }
            if (!empty($asset['savings'])) {
                foreach ($btcToFiats as $fiat => $btcToFiat) {
                    $asset['savings'][$fiat] = number_format($asset['savings']['BTC'] * $btcToFiat, 4, '.', '');
                }
            }
        }

        ksort($assets);

        return $assets;
    }

    /**
     * balanceData Converts all your balances into a nice array
     * If priceData is passed from $api->prices() it will add btcValue & btcTotal to each symbol
     * This function sets $btc_value which is your estimated BTC value of all assets combined and $btc_total which
     * includes amount on order
     *
     * $candles = $api->candlesticks("BNBBTC", "5m");
     *
     * @param $array array of your balances
     * @param $priceData array of prices
     *
     * @return array containing the response
     */
    protected function balanceData(array $array, $priceData)
    {
        $balances = [];

        if (is_array($priceData)) {
            $btc_value = $btc_total = 0.00;
        }

        if (empty($array) || empty($array['balances'])) {
            // WPCS: XSS OK.
            echo "balanceData error: Please make sure your system time is synchronized: call \$api->useServerTime() before this function".PHP_EOL;
            echo "ERROR: Invalid request. Please double check your API keys and permissions.".PHP_EOL;

            return [];
        }

        foreach ($array['balances'] as $obj) {
            $asset = $obj['asset'];
            $balances[$asset] = [
                "available" => $obj['free'],
                "onOrder" => $obj['locked'],
                "btcValue" => 0.00000000,
                "btcTotal" => 0.00000000,
            ];

            if (is_array($priceData) === false) {
                continue;
            }

            if ($obj['free'] + $obj['locked'] < 0.00000001) {
                continue;
            }

            if ($asset === 'BTC') {
                $balances[$asset]['btcValue'] = $obj['free'];
                $balances[$asset]['btcTotal'] = $obj['free'] + $obj['locked'];
                $btc_value += $obj['free'];
                $btc_total += $obj['free'] + $obj['locked'];
                continue;
            } elseif ($asset === 'USDT' || $asset === 'USDC' || $asset === 'PAX' || $asset === 'BUSD') {
                $btcValue = $obj['free'] / $priceData['BTCUSDT'];
                $btcTotal = ($obj['free'] + $obj['locked']) / $priceData['BTCUSDT'];
                $balances[$asset]['btcValue'] = $btcValue;
                $balances[$asset]['btcTotal'] = $btcTotal;
                $btc_value += $btcValue;
                $btc_total += $btcTotal;
                continue;
            }

            $symbol = $asset.'BTC';
            $reversedSymbol = 'BTC'.$asset;

            if ($symbol === 'BTCUSDT') {
                $btcValue = number_format($obj['free'] / $priceData['BTCUSDT'], 8, '.', '');
                $btcTotal = number_format(($obj['free'] + $obj['locked']) / $priceData['BTCUSDT'], 8, '.', '');
            } elseif (isset($priceData[$symbol])) {
                $btcValue = number_format($obj['free'] * $priceData[$symbol], 8, '.', '');
                $btcTotal = number_format(($obj['free'] + $obj['locked']) * $priceData[$symbol], 8, '.', '');
            } elseif (isset($priceData[$reversedSymbol])) {
                $btcValue = number_format($obj['free'] * (1 / $priceData[$reversedSymbol]), 8, '.', '');
                $btcTotal = number_format(
                    ($obj['free'] + $obj['locked']) * (1 / $priceData[$reversedSymbol]),
                    8,
                    '.',
                    ''
                );
            } else {
                $btcValue = $btcTotal = 0;
            }

            $balances[$asset]['btcValue'] = $btcValue;
            $balances[$asset]['btcTotal'] = $btcTotal;
            $btc_value += $btcValue;
            $btc_total += $btcTotal;
        }
        if (is_array($priceData)) {
            uasort(
                $balances,
                function ($opA, $opB) {
                    return $opA['btcValue'] < $opB['btcValue'];
                }
            );
            $this->btc_value = $btc_value;
            $this->btc_total = $btc_total;
        }

        return $balances;
    }
}
