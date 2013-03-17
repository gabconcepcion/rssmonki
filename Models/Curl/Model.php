<?php

class Curl_Model
{
	function get($url, array $get = array(), array $options = array()) 
	{    
	    $defaults = array( 
	        CURLOPT_URL => $url. (strpos($url, '?') === FALSE ? '?' : ''). http_build_query($get), 
	        CURLOPT_HEADER => 0, 
	        CURLOPT_RETURNTRANSFER => TRUE, 
	        CURLOPT_TIMEOUT => 4 
	    ); 
	    
	    $ch = curl_init(); 
	    curl_setopt_array($ch, ($options + $defaults)); 
	    die(curl_exec($ch));
	    if( ! $result = curl_exec($ch)) 
	    { 
	        throw new Exception(curl_error($ch), 1);
	    } 
	    curl_close($ch); 
	    return $result; 
	} 
}