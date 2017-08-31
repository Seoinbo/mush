<?php
namespace Doorisan\Date;

/*
 * Jenssegers Date.
 * link - https://github.com/jenssegers/date
 */
use \Jenssegers\Date\Date as _date;

/**
 * Date class.
 * @package Doorisan\Date
 */
class Date extends _date
{
    const A_MINUTE = 60;
    const AN_HOUR = 3600;
    const A_DAY = 86400;
    const A_WEEK = 604800; // 60 * 60 * 24 * 7
    const DAYS_30 = 2592000; // 30일
}
