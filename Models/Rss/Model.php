<?php

class Rss_Model {

	private $_oCore;

	function __construct() {
		$this->_oCore = Core::getInstance();
		//$this->_oCore->_oDb->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	}

	public function getAllRss() {
		$r = array();		

		$sql = "
			SELECT *
			FROM rss
		";
		$stmt = $this->_oCore->_oDb->prepare($sql);

		if ($stmt->execute()) {
			$r = $stmt->fetchAll(PDO::FETCH_ASSOC);		   	
		} else {
			$r = false;
		}		
		return $r;
	}

	public function getRssById($id) {
		$r = array();		

		$sql = "
			SELECT *
			FROM rss WHERE id = :id
		";
		$stmt = $this->_oCore->_oDb->prepare($sql);
		$stmt->bindParam(':id', $id, PDO::PARAM_INT);

		if ($stmt->execute()) {
			$r = $stmt->fetchAll(PDO::FETCH_ASSOC);		   	
		} else {
			$r = false;
		}		
		return $r[0];
	}

	public function addRss($data) {
		try {
			$sql = "INSERT INTO rss (url) 
					VALUES (:url)";
			$stmt = $this->_oCore->_oDb->prepare($sql);
			$stmt->bindParam(':name', $data['url'], PDO::PARAM_STR);
			if ($stmt->execute()) {
				return $this->_oCore->_oDb->lastInsertId();;
			} else {
				return '0';
			}
		} catch(PDOException $e) {
        	return $e->getMessage();
    	}
	}

}