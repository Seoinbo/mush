<?php
spl_autoload_register(
    function ($classname) {
    if (strpos($classname, "Doorisan") !== false) {
        $directory = __DIR__;
        $fileName = null;
        $nodes = explode('\\', $classname);
        $nodeCount = count($nodes);
        for ($i = 0; $i < $nodeCount - 1; $i++) {
            $node = strtolower($nodes[$i]);
            $directory .= '/' . $node;
        }
        $fileName = '/' . $nodes[$i];
        $path = $directory . $fileName . '.php';
        /** @noinspection PhpIncludeInspection */
        require ($path);
    }
});
