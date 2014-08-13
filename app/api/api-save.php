<?php

require_once("rest.inc.php");

class API extends REST {

    public $data = "";

    const DB_SERVER = "localhost";
    const DB_USER = "root";
    const DB_PASSWORD = "";
    const DB = "dbkeaboard";
	public $img_base= NULL;
//boul2014
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

    /*
     * Public method for access api.
     * This method dynmically call the method based on the query string
     *
     */

    /*public function processApi() {
        $func = strtolower(trim(str_replace("/", "", $_REQUEST['rquest'])));
        if ((int) method_exists($this, $func) > 0)
            $this->$func();
        else
            $this->response('processApi: Mehod not found', 404);    // If the method not exist with in this class, response would be "Page not found".
    }*/

    /*
     * Simple login API
     *  Login must be GET method
     *  email : <USER EMAIL>
     *  pwd : <USER PASSWORD>
     */


    /*
     * 	Encode array into JSON
     */

    private function json($data) {
        if (is_array($data)) {
            return json_encode($data);
        }
    }

    public function login($eamil, $password) {
        // Cross validation if the request method is GET else it will return "Not Acceptable" status
        if ($this->get_request_method() != "GET") {
            $this->response('', 406);
        }

        //$email = $this->_request['email'];
        //$password = $this->_request['pwd'];

        // Input validations
        if (!empty($email) and !empty($password)) {
            if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
                $sql = mysql_query("SELECT mail, login FROM user  WHERE  email = '$email' AND passwd = '" . md5($password) . "' LIMIT 1", $this->db);
                if (mysql_num_rows($sql) > 0) {
                    $result = mysql_fetch_array($sql, MYSQL_ASSOC);

                    // If success everythig is good send header as "OK" and user details
                    $this->response($this->json($result), 200);
                }
                $this->response('', 204); // If no records "No Content" status
            }
        }

        // If invalid inputs "Bad Request" status message and reason
        $error = array('status' => "Failed", "msg" => "Invalid Email address or Password");
        $this->response($this->json($error), 400);
        }

    public function getUsers() {
        // Cross validation if the request method is GET else it will return "Not Acceptable" status
        if ($this->get_request_method() != "GET") {
            $this->response('', 406);
        }
        $sql = mysql_query("SELECT mail, login FROM user ", $this->db);
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
            $sql = mysql_query("SELECT  id AS id_actities ,   name  ,    details  ,   keyboard   FROM activities ", $this->db);
			if (mysql_num_rows($sql) > 0  ) {
				$result = array();
				while ($rlt = mysql_fetch_array($sql, MYSQL_ASSOC)) {
///					echo $rlt['name'];	
					$result[] = $rlt;
				}

				echo $this->json($result);

               // If success everythig is good send header as "OK" and user details
                $this->response($this->json($result), 200);
            } else
                $this->response('No Content', 204); // If no records "No Content" status
        }

        // If invalid inputs "Bad Request" status message and reason
        $error = array('status' => "Failed", "msg" => "Invalid keyboard parameter ");
        $this->response($this->json($error), 400);
    }

    public function getSlides() {
        // Cross validation if the request method is GET else it will return "Not Acceptable" status
        if ($this->get_request_method() != "GET") {
            $this->response('', 406);
        }
        $sql = mysql_query("SELECT id, path FROM slides ", $this->db);
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
}	

?>