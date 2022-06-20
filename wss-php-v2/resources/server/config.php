<?php return [
  'version' => '1.7.2',
  /* Default theme for new users */
  'def_theme' => '_light',
  /* Warn all/eu/no users of data usage. 'eu' queries https://ipapi.co/<ip address>/in_eu */
  'data_warn' => 'no',
  /* AuthMe Configuration */
  'am' => [
    'enabled' => false,
    'host' => '',
    'port' => '',
    'database' => '',
    'username' => '',
    'password' => '',
    'hash' => [
      'method' => 'sha256'
    ],
    'authsec' => [
      'enabled' => false,
      'failed_attempts' => 3,
      'threshold_hours' => 24
    ]
  ],
  /* SkinsRestorer Configuration */
  'sr' => [
    'host' => 'localhost',
    'port' => '3306',
    'database' => 'skinsrestorer',
    'skintable' => 'Skins',
    'playertable' => 'Players',
    'username' => 'Neiluj',
    'password' => 'mangaddl4'
  ],
  /* Cache Configuration */
  'cache_for_days' => 7,
  'cache_dir' => 'resources/cache/'
];?>