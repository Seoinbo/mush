<?php
spl_autoload_register(function ($classname) {
    if (strpos($classname, "App") !== false) {
        $directory = __DIR__;
        $fileName = null;
        $nodes = explode('\\', $classname);
        $nodeCount = count($nodes);
        for ($i = 0; $i < $nodeCount - 1; $i++) {
            $node = strtolower($nodes[$i]);
            if ($node == 'app') {
                continue;
            }
            $directory .= '/' . $node;
        }
        $fileName = '/' . $nodes[$i];
        $path = $directory . $fileName . '.php';
        /** @noinspection PhpIncludeInspection */
        require ($path);
    }
});
