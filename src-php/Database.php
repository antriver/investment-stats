<?php

namespace InvestmentStats;

use PDO;

class Database extends PDO
{
    public function __construct(array $config)
    {
        parent::__construct(
            "mysql:host={$config['DB_HOST']};dbname={$config['DB_DATABASE']};charset=utf8;port=3306",
            $config['DB_USER'],
            $config['DB_PASS']
        );

        $this->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);
        $this->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }
}
