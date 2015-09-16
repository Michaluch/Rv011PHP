<?php
namespace App\Http;

use Monolog\Logger as Logger;
use Monolog\Handler\StreamHandler as StreamHandler;
use Monolog\Formatter\LineFormatter as LineFormatter;

class CustomLogger {
    private static $logger;
    
    private function __construct(){}
    private function __clone(){}
    private function __invoke(){}
    
    /**
     * Adds a log record at an arbitrary level.
     *
     * @param  mixed   $level_name   The log level
     * @param  string  $message The log message
     * @param  array   $context The log context
     *
     */
     
    final public static function log($level_name, $message, array $context = null){
        if (static::$logger === null){
            static::$logger = new Logger('CustomLoger');
        }
        
        $logger = static::$logger;
        $level_code = $logger::toMonologLevel($level_name);
        $level = $logger::getLevelName($level_code);
        
        $log_dir = $_SERVER['DOCUMENT_ROOT'] . '/../' . 'logs/' . strtolower($level);
        if (!file_exists($log_dir)) {
            mkdir($log_dir, 0755);
        }
        $files = scandir($log_dir);
        $files_in_dir = array();
        foreach ($files as $file){
            if (is_file($log_dir . '/' . $file)){
                $file_name_pattern = '/^log_\d{4}-\d{2}-\d{2}_\d{2}-\d{2}-\d{2}.log$/';
                // check file name
                if (preg_match($file_name_pattern, $file)){
                    // remove file extention
                    $file_name = explode('.', $file);                
                    // get date from file name
                    $date_in_name = explode('_', $file_name[0]);
                    // file name as UNIX time
                    $file_name = strtotime($date_in_name[1] . ' ' . strtr($date_in_name[2], '-', ':'));
                    $files_in_dir[$file_name] = $file;
                }
            }
        }
        unset($file, $file_name, $date_in_name, $file_name_pattern);
        // there is no log files in this dir
        if (empty($files_in_dir)){
            $filename = 'log_' . date('Y-m-d_H-i-s') . '.log';
        } else {
            krsort($files_in_dir);
            $filename = array_shift($files_in_dir);
        }
        if (file_exists($log_dir . '/' . $filename)){
            if (filesize($log_dir . '/' . $filename) >= (1048576) - 100){
                $filename = 'log_' . date('Y-m-d_H-i-s') . '.log';
            }
        }
       
        $formater = new LineFormatter("[%datetime%] %level_name%: %message% %context%\n");
        $handler = new StreamHandler($log_dir . '/' . $filename);
        $handler->setFormatter($formater);
        $logger->pushHandler($handler);
        $logger->log($level, $message, $context);
    }
}