<?php

require_once("rest.inc.php");

class API extends REST {

    public $data = "";

    const DB_SERVER = "localhost";
    const DB_USER = "root";
    const DB_PASSWORD = "";
    const DB = "dbkeaboard";
	public $img_base= NULL;
    private $db = NULL;

    public function __construct() {
        parent::__construct();    // Init parent contructor
        $this->dbConnect();     // Initiate Database connection
		$this->img_base="/fingertips/app/";
    }

    /*
     *  Database connection 
     */

    private function dbConnect() {
        $this->db = mysql_connect(self::DB_SERVER, self::DB_USER, self::DB_PASSWORD);
        if ($this->db)
            mysql_select_db(self::DB, $this->db);
    }


    private function json($data) {
        if (is_array($data)) {
            return json_encode($data);
        }
    }

    public function login($email, $password) {
        // Cross validation if the request method is GET else it will return "Not Acceptable" status
        if ($this->get_request_method() != "GET") {
            $this->response('', 406);
        }
		//echo $email."  ".$password;
        //$email = $this->_request['email'];
        //$password = $this->_request['pwd'];

        // Input validations
        if (!empty($email) and !empty($password)) {
            if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
                $sql = mysql_query("SELECT mail, login, type FROM user  WHERE  mail = '$email' AND passwd = '" . md5($password) . "' LIMIT 1", $this->db);
                if(! $sql )
				{
					die('Could not enter data: ' . mysql_error());
				}
				if (mysql_num_rows($sql) > 0) {
                    $result = mysql_fetch_array($sql, MYSQL_ASSOC);

                    // If success everythig is good send header as "OK" and user details
                    $this->response($this->json($result), 200);
                }
                //$this->response('', 204); // If no records "No Content" status
            }
        }

        // If invalid inputs "Bad Request" status message and reason
        $error = array('status' => "Failed", "msg" => "Invalid Email address or Password");
        $this->response($this->json($error), 400);
        }

    public function addUser(){
			if ($this->get_request_method() != "POST" ) {
            $this->response('', 406);
        }else if( empty($_POST)){
			$_POST = json_decode(file_get_contents('php://input'), true);
			//echo json_last_error();
		}
		//var_dump($_POST);

		$data=$_POST;
		if(isset($data['email'])){
			$email=$data['email'];			
			$login =$data['login'];
			$passwd =$data['pass'];
			$retval = mysql_query("INSERT INTO `user` (`login`, `mail`, `passwd`) VALUES ('$login', '$email','".md5($passwd)."');", $this->db);
			if(! $retval )
			{
				die('Could not enter data: ' . mysql_error());
			}
			$sql = mysql_query("SELECT `login`, `mail` FROM `user` ", $this->db);
			if (mysql_num_rows($sql) > 0) {
				$result = mysql_fetch_array($sql, MYSQL_ASSOC);
				// If success everythig is good send header as "OK" and return list of users in JSON format
				$this->response($this->json($result), 200);
			}
		}
	}
	
	public function getUsers() {
        // Cross validation if the request method is GET else it will return "Not Acceptable" status
        if ($this->get_request_method() != "GET") {
            $this->response('', 406);
        }
        $sql = mysql_query("SELECT mail, login, type FROM user ", $this->db);
        if (mysql_num_rows($sql) > 0) {
            $result = array();
            while ($rlt = mysql_fetch_array($sql, MYSQL_ASSOC)) {
                $result[] = $rlt;
            }
            // If success everythig is good send header as "OK" and return list of users in JSON format
            $this->response($this->json($result), 200);
        }
        $this->response('', 204); // If no records "No Content" status
    }

    public function deleteUser() {
        // Cross validation if the request method is DELETE else it will return "Not Acceptable" status
        if ($this->get_request_method() != "DELETE") {
            $this->response('', 406);
        }
        $id = (int) $this->_request['mail'];
        if ($id > 0) {
            mysql_query("DELETE FROM user WHERE mail = $mail");
            $success = array('status' => "Success", "msg" => "Successfully one record deleted.");
            $this->response($this->json($success), 200);
        } else
            $this->response('', 204); // If no records "No Content" status
    }

//Activities methods
    public function getActivities($keyboard) {
        // Cross validation if the request method is POST else it will return "Not Acceptable" status
        if ($this->get_request_method() != "GET") {
            $this->response('', 406);
        }

        // Input validations
        if (!empty($keyboard)) {
            $sql = mysql_query("SELECT  id, name, details, keyboard, typeactivity.nom as type FROM activities, typeactivity WHERE keyboard='$keyboard' AND typeactivity.raccourci=activities.keyboard ORDER BY  activities.keyboard ASC ", $this->db);
            if (mysql_num_rows($sql) > 0) {
				$result = array();
				while ($rlt = mysql_fetch_array($sql, MYSQL_ASSOC)) {
					$rlt['name']= utf8_encode($rlt['name']);
					$rlt['details']= utf8_encode($rlt['details']);
					$result[] = $rlt;
				}
                // If success everythig is good send header as "OK" and user details
				//print_r( $result);
                $this->response($this->json($result), 200);
            } else
                $this->response('No Content', 204); // If no records "No Content" status
        }

        // If invalid inputs "Bad Request" status message and reason
        $error = array('status' => "Failed", "msg" => "Invalid keyboard parameter ");
        $this->response($this->json($error), 400);
    }
    
	public function setActFiles($actFiles, $idActivite){
		$paths= explode('.',$actFiles);
		$extension=$paths[1];
        $retval = mysql_query("INSERT INTO `photos` (`path`, `id_activity`,`extension`) VALUES ($paths[0],$idActivite,$extension );", $this->db);
     if(! $retval )
    {
        die('Could not enter data: ' . mysql_error());
     }
    echo "Entered data successfully\n";
    $this->response('Entered data successfully\n', 204); // If no records "No Content" status

    }
	
	public function setActivity(){
		global $app;
		if ($this->get_request_method() != "POST" ) {
            $this->response('', 406);
        }else if( empty($_POST)){
		
			$_POST = json_decode(file_get_contents('php://input'), true);
			//echo json_last_error();

		}
		//var_dump($_POST);
		$name=$_POST['name'];
		//echo $name;
		//$da = file_get_contents("php://input");
		//$data= explode('&',$da,4);
		//$dataj= json_decode($da);
		//var_dump($dataj);
		//echo $name;
		$data=$_POST;
		//parse_str($da, $data);
		//print_r($data);
		//echo $name."\n display name";
		//$this->response($data, 200);
		//$user = $objData -> name; 
		if(isset($data['name'])){
			$name= $data['name'];
			$details =utf8_encode($data['details']);
			$keyboard =$data['keyboard'];
			$more=$data['more'];
			$id_user=$data['id_user'];
			$retval = mysql_query("INSERT INTO `activities` (`id`, `name`, `details`, `id_user`, `keyboard`, `more`) VALUES (NULL, '$name','$details','$id_user','$keyboard','$more');", $this->db);
		
			if(! $retval )
			{
				die('Could not enter data: ' . mysql_error());
			}
			//SELECT `id` FROM `activities` WHERE `name`='erz' and `details`='erzaerez
			$sql = mysql_query("SELECT `id` FROM `activities` WHERE `name`='$name' and `details`='$details'", $this->db);
			//echo mysql_num_rows($sql);
			if (mysql_num_rows($sql) > 0) {
				$result = mysql_fetch_array($sql, MYSQL_ASSOC);
				//echo $result['id'];
				// If success everythig is good send header as "OK" and return list of users in JSON format
				$this->response($this->json($result), 200);
			}
		}
		//echo "Entered data successfully\n";
		//$this->response('Entered data successfully\n', 204); // If no records "No Content" status
	}
      
	public function getActivity($idActivity) {
        // Cross validation if the request method is POST else it will return "Not Acceptable" status
        if ($this->get_request_method() != "GET") {
            $this->response('', 406);
        }

        // Input validations
        if (!empty($idActivity)) {
			$qrcode="qrcode_a_".$idActivity ;	
			$sql = mysql_query("SELECT  id, name, activities.details as details, activities.more as more, typeactivity.nom as type, Concat(photos.path,'.',photos.extension) as qrcode, photos.path as images  FROM activities, photos, typeactivity WHERE activities.id='$idActivity'  AND  ( 1=1 OR (photos.path like '{$qrcode}' AND  (photos.id_activity=$idActivity ))) AND typeactivity.raccourci=activities.keyboard", $this->db);
			if (mysql_num_rows($sql) > 0) {
				$result = mysql_fetch_array($sql, MYSQL_ASSOC);
				$id_photo=$result["id"];
				$result['name']= utf8_encode($result['name']);
				$result['details']= utf8_encode($result['details']);

				//echo $result["details"];
				$result["images"]=array();
				$sql1 = mysql_query("SELECT Concat(photos.path,'.',photos.extension)  as path FROM photos WHERE id_activity=$id_photo AND id_product is NULL AND  photos.path not like '{$qrcode}' ORDER BY  photos.path ASC ", $this->db);
				if (mysql_num_rows($sql1) > 0) {
					$result1 = array();
					while ($rlt1 = mysql_fetch_array($sql1, MYSQL_ASSOC))
					{
						if(strpos($rlt1['path'],'qrcode')===false)
							$result1[]=$rlt1;
						else
						$result['qrcode']=$rlt1['path'];
					}
					$result["images"]=$result1;
				}
				//print_r( $result);
				// If success everythig is good send header as "OK" and user details
				$this->response($this->json($result), 200);
			} 
			else{
				$this->response('', 200); // If no records "No Content" status
				}
        }else{

        // If invalid inputs "Bad Request" status message and reason
			$error = array('status' => "Failed", "msg" => "Invalid keyboard parameter ");
			$this->response($this->json($error), 400);
		}
    }
	
	public function delActivity($idAct){
		//DELETE FROM `dbkeaboard`.`activities` WHERE `slides`.`id` = 5» ?
		$sql = mysql_query("SELECT * FROM products WHERE id_activity=".$idAct, $this->db);
		if (mysql_num_rows($sql) === 0) {
			$retval = mysql_query("DELETE FROM `activities` WHERE `activities`.`id`=".$idAct, $this->db);
			//echo $retval;
			if(! $retval )
			{
				die('Could not delete data: ' . mysql_error());
			}
			else{
			//DELETE FROM `dbkeaboard`.`photos` WHERE `photos`.`path` = 
				$path="/opt/lampp/htdocs".$this->img_base;
				$mask=$path."img/activities/img_a_".$idAct."*";
				$delFiles=glob( $mask );
				foreach($delFiles as $file){
					$fnames=explode('/',explode('.',$file)[0]);
					$fname= "img/activities/".$fnames[sizeof($fnames)-1];
					echo $fname;
					$retval = mysql_query("DELETE FROM `photos` WHERE `photos`.`path`= '$fname'", $this->db);
					if(! $retval )
					{	
						die('Could not delete data: ' . mysql_error());
					}
				}
				array_map( "unlink",  $delFiles);
				$mask=$path."img/activities/qrcode_a_".$idAct."*";
				$delFiles=glob( $mask );
				foreach($delFiles as $file){
					$fnames=explode('/',explode('.',$file)[0]);
					$fname= "img/activities/".$fnames[sizeof($fnames)-1];
					echo $fname;
					$retval = mysql_query("DELETE FROM `photos` WHERE `photos`.`path`= '$fname'", $this->db);
					if(! $retval )
					{	
						die('Could not delete data: ' . mysql_error());
					}
				}
				array_map( "unlink",  $delFiles);
			}	
			echo "Deleted data successfully\n";
			//$this->response('Deleted data successfully\n', 204); // If no records "No Content" status
		}
		else{
			echo "Could not delete activity $idAct\n";
			//$this->response('"Could not delete activity $idAct\n"', 200); 
		}
	}

	public function getProducts($idActivity,$typeProduct) {
        // Cross validation if the request method is POST else it will return "Not Acceptable" status
        if ($this->get_request_method() != "GET") {
            $this->response('', 406);
        }

        // Input validations
        if (!empty($idActivity)) {
		$qrcode="img/activities/qrcode_p_";	
		$sql = mysql_query("SELECT  id, name, details, price, Concat(photos.path,'.',photos.extension) as qrcode, photos.path as images  FROM products, photos WHERE products.id_activity='$idActivity' AND photos.id_product =products.id AND  photos.path like '{$qrcode}_' AND products.type='$typeProduct'", $this->db);
		if (mysql_num_rows($sql) > 0) {
			$respon=array();
			while($result = mysql_fetch_array($sql, MYSQL_ASSOC)){
				$id_photo=$result["id"];
				$result["images"]=array();
				$sql1 = mysql_query("SELECT Concat(photos.path,'.',photos.extension)  as path FROM photos WHERE id_product=$id_photo AND  photos.path not like '{$qrcode}_' ORDER BY  photos.path ASC ", $this->db);
				if (mysql_num_rows($sql1) > 0) {
					$result1 = array();
					while ($rlt1 = mysql_fetch_array($sql1, MYSQL_ASSOC))
					{
						$result1[]=$rlt1;
					}
					$result["images"]=$result1;
				}
				$respon[]=$result;
			}
			// If success everythig is good send header as "OK" and user details
			$this->response($this->json($respon), 200);
		} else
		$this->response('No Content', 204); // If no records "No Content" status
        }

        // If invalid inputs "Bad Request" status message and reason
        $error = array('status' => "Failed", "msg" => "Invalid keyboard parameter ");
        $this->response($this->json($error), 400);
    }

	public function getRDV($idProduit) {
        // Cross validation if the request method is POST else it will return "Not Acceptable" status
        if ($this->get_request_method() != "GET") {
            $this->response('', 406);
        }

        // Input validations
        if (!empty($idProduit)) {
		//$qrcode="img/activities/qrcode_p_";	
		$sql = mysql_query("SELECT `dateofapp` as dates, dateofapp as hours, \n"
    . "products.name as products\n"
    . "FROM `appointements`, products\n"
    . "WHERE\n"
    . "appointements.`id_products`= products.id AND products.id='$idProduit'\n"
    . "AND products.type=1 GROUP BY dateofapp ", $this->db);
		if (mysql_num_rows($sql) > 0) {
			$respon=array();
			while($result = mysql_fetch_array($sql, MYSQL_ASSOC)){
				$result["hours"]=array();
				$sql1 = mysql_query("SELECT hours.id, hours.start, hours.end FROM `hours`, appointements\n"
    . " WHERE appointements.id_products='$idProduit'\n"
    . "And appointements.id_hour=hours.id LIMIT 0, 30 ", $this->db);
				if (mysql_num_rows($sql1) > 0) {
					$result1 = array();
					while ($rlt1 = mysql_fetch_array($sql1, MYSQL_ASSOC))
					{
						$result1[]=$rlt1;
					}
					$result["hours"]=$result1;
				}
				$respon[]=$result;
			}
			// If success everythig is good send header as "OK" and user details
			$this->response($this->json($respon), 200);
		} else
		$this->response('No Content', 204); // If no records "No Content" status
    }
        // If invalid inputs "Bad Request" status message and reason
        $error = array('status' => "Failed", "msg" => "Invalid keyboard parameter ");
        $this->response($this->json($error), 400);
    }
	
    public function getAllActivities() {
        // Cross validation if the request method is POST else it will return "Not Acceptable" status
        if ($this->get_request_method() != "GET") {
            $this->response('', 406);
        }

        // Input validations
        
		$sql = mysql_query("SELECT  id, name,details,  keyboard, typeactivity.nom as type FROM activities, typeactivity WHERE typeactivity.raccourci=activities.keyboard ORDER BY  activities.keyboard ASC ", $this->db);
		if (mysql_num_rows($sql) > 0) {
			$result = array();
			while ($rlt = mysql_fetch_array($sql, MYSQL_ASSOC)) {
				$rlt['name']= utf8_encode($rlt['name']);
				$rlt['details']= utf8_encode($rlt['details']);
				$result[] = $rlt;
			}
			//print_r( $result);
			//echo json_encode($result);
			// If success everythig is good send header as "OK" and user details
			$this->response($this->json($result), 200);
		} 
		else $this->response('', 204); // If no records "No Content" status
	// If invalid inputs "Bad Request" status message and reason
        //$error = array('status' => "Failed", "msg" => "Invalid keyboard parameter ");
        //$this->response($this->json($error), 400);
    }
    
	public function getPhotosActivites($idActivite) {
        // Cross validation if the request method is GET else it will return "Not Acceptable" status
        if ($this->get_request_method() != "GET") {
            $this->response('', 406);
        }
        $sql = mysql_query("SELECT * FROM photos WHERE id_activity=$idActivite ORDER BY  photos.path ASC ", $this->db);
        if (mysql_num_rows($sql) > 0) {
            $result = array();
            while ($rlt = mysql_fetch_array($sql, MYSQL_ASSOC)) {
                $result[] = $rlt;
            }
            // If success everythig is good send header as "OK" and return list of users in JSON format
            $this->response($this->json($result), 200);
        }
        $this->response('', 204); // If no records "No Content" status
    }

    public function getSlides() {
        // Cross validation if the request method is GET else it will return "Not Acceptable" status
        if ($this->get_request_method() != "GET") {
            $this->response('', 406);
        }
        $sql = mysql_query("SELECT id, path FROM slides", $this->db);
        if (mysql_num_rows($sql) > 0) {
            $result = array();
            while ($rlt = mysql_fetch_array($sql, MYSQL_ASSOC)) {
                $result[] = $rlt;
            }
            // If success everythig is good send header as "OK" and return list of users in JSON format
            $this->response($this->json($result), 200);
        }
        $this->response('', 204); // If no records "No Content" status
				
    }
	
	public function setSlides($slide){
        $retval = mysql_query("INSERT INTO `slides` (`id`, `path`) VALUES (NULL, '".$slide."');", $this->db);
     if(! $retval )
    {
        die('Could not enter data: ' . mysql_error());
     }
    echo "Entered data successfully\n";
    $this->response('Entered data successfully\n', 204); // If no records "No Content" status

    }
	
	public function delSlides($slide){
		//DELETE FROM `dbkeaboard`.`slides` WHERE `slides`.`id` = 5» ?
		$sql = mysql_query("SELECT path FROM slides WHERE id=".$slide, $this->db);
		$fname=null;
		if (mysql_num_rows($sql) > 0) {
			$fname=mysql_fetch_row($sql, MYSQL_ASSOC);
		}
		$retval = mysql_query("DELETE FROM `slides` WHERE `slides`.`id`=".$slide, $this->db);
		if(! $retval )
		{
			
			die('Could not delete data: ' . mysql_error());
		}
		else{
			$path="".$this->img_base;
			unlink($path.$fname['path']);
		}	
		echo "Deleted data successfully\n";
		$this->response('Deleted data successfully\n', 204); // If no records "No Content" status

	 
	}

	public function getTypeActivity(){	
	// Cross validation if the request method is GET else it will return "Not Acceptable" status
	if($this->get_request_method() != "GET"){
		$this->response('',406);
	}
	$sql = mysql_query("SELECT * FROM typeactivity ", $this->db);
	if(mysql_num_rows($sql) > 0){
		$result = array();
		while($rlt = mysql_fetch_array($sql,MYSQL_ASSOC)){
			$result[] = $rlt;
		}
		// If success everythig is good send header as "OK" and return list of users in JSON format
		$this->response($this->json($result), 200);
	}
	$this->response('',204);	// If no records "No Content" status
}


}

?>
