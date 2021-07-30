<?php
    class Post{
        protected $pdo;

        public function __construct(\PDO $pdo) {
			$this->pdo = $pdo;
		}

    public function checkPhone($table, $filter_data) {

			$this->sql = "SELECT * FROM $table";

      if($filter_data != null && $table == "tbl_user") {
				$this->sql .= " WHERE phone_no=$filter_data";
			}

			$data = array(); $code = 0; $msg= ""; $remarks = "";
			try {
				if ($res = $this->pdo->query($this->sql)->fetchAll()) {
					foreach ($res as $rec) { array_push($data, $rec);}
					$res = null; $code = 200; $msg = "Successfully retrieved the requested records"; $remarks = "success";
				}
			} catch (\PDOException $e) {
				$msg = $e->getMessage(); $code = 401; $remarks = "failed";
			}
			return $this->sendPayload($data, $remarks, $filter_data, $code);
		}

    public function cart($table, $filter_data) {

			$this->sql = "SELECT * FROM $table INNER JOIN tbl_products ON tbl_cart.product_id=tbl_products.product_id" ;

      if($filter_data != null && $table == "tbl_cart") {
				$this->sql .= " WHERE  tbl_cart.checkout_st = 0 AND tbl_cart.user_id=$filter_data";
			}



			$data = array(); $code = 0; $msg= ""; $remarks = "";
			try {
				if ($res = $this->pdo->query($this->sql)->fetchAll()) {
					foreach ($res as $rec) { array_push($data, $rec);}
					$res = null; $code = 200; $msg = "Successfully retrieved the requested records"; $remarks = "success";
				}
			} catch (\PDOException $e) {
				$msg = $e->getMessage(); $code = 401; $remarks = "failed";
			}
			return $this->sendPayload($data, $remarks, $msg, $code);
		}

    public function checkOrders($table, $filter_data) {

			$this->sql = "SELECT * FROM $table INNER JOIN tbl_products ON tbl_cart.product_id=tbl_products.product_id" ;

      if($filter_data != null && $table == "tbl_cart") {
				$this->sql .= " WHERE  tbl_cart.checkout_st = 1 AND tbl_cart.deliver_st = 0 AND tbl_cart.user_id=$filter_data";
			}



			$data = array(); $code = 0; $msg= ""; $remarks = "";
			try {
				if ($res = $this->pdo->query($this->sql)->fetchAll()) {
					foreach ($res as $rec) { array_push($data, $rec);}
					$res = null; $code = 200; $msg = "Successfully retrieved the requested records"; $remarks = "success";
				}
			} catch (\PDOException $e) {
				$msg = $e->getMessage(); $code = 401; $remarks = "failed";
			}
			return $this->sendPayload($data, $remarks, $msg, $code);
		}

    public function orderTrans($table, $filter_data) {

			$this->sql = "SELECT * FROM $table WHERE  checkout_st = 1 AND deliver_st = 0 ORDER BY transaction_no DESC" ;


			$data = array(); $code = 0; $msg= ""; $remarks = "";
			try {
				if ($res = $this->pdo->query($this->sql)->fetchAll()) {
					foreach ($res as $rec) { array_push($data, $rec);}
					$res = null; $code = 200; $msg = "Successfully retrieved the requested records"; $remarks = "success";
				}
			} catch (\PDOException $e) {
				$msg = $e->getMessage(); $code = 401; $remarks = "failed";
			}
			return $this->sendPayload($data, $remarks, $msg, $code);
		}
  public function transactions($table, $filter_data) {

    $this->sql = "SELECT DISTINCT transaction_no, payment, checkout_time FROM tbl_cart" ;


    $data = array(); $code = 0; $msg= ""; $remarks = "";
    try {
      if ($res = $this->pdo->query($this->sql)->fetchAll()) {
        foreach ($res as $rec) { array_push($data, $rec);}
        $res = null; $code = 200; $msg = "Successfully retrieved the requested records"; $remarks = "success";
      }
    } catch (\PDOException $e) {
      $msg = $e->getMessage(); $code = 401; $remarks = "failed";
    }
    return $this->sendPayload($data, $remarks, $msg, $code);
  }

    public function checkUser($table, $filter_data) {

			$this->sql = "SELECT * FROM $table";

      if($filter_data != null && $table == "tbl_user") {
				$this->sql .= " WHERE email=$filter_data";
			}

			$data = array(); $code = 0; $msg= ""; $remarks = "";
			try {
				if ($res = $this->pdo->query($this->sql)->fetchAll()) {
					foreach ($res as $rec) { array_push($data, $rec);}
					$res = null; $code = 200; $msg = "Successfully retrieved the requested records"; $remarks = "success";
				}
			} catch (\PDOException $e) {
				$msg = $e->getMessage(); $code = 401; $remarks = "failed";
			}
			return $this->sendPayload($data, $remarks, $filter_data, $code);
		}

    public function login($filter_data) {

			$this->sql = "SELECT * FROM tbl_user WHERE email='$filter_data->email'";

			$data = array(); $code = 0; $msg= ""; $remarks = "";
			try {
				if ($res = $this->pdo->query($this->sql)->fetchAll()) {
					foreach ($res as $rec) { array_push($data, $rec);}
					$res = null; $code = 200; $msg = "Successfully retrieved the requested records"; $remarks = "success";
				}
			} catch (\PDOException $e) {
				$msg = $e->getMessage(); $code = 401; $remarks = "failed";
			}
			return $this->sendPayload($data, $remarks, $msg, $code);
		}


    public function checkout($table, $data, $conditionStringPassed){
			$fields=[]; $values=[];
			$setStr = "";
			foreach ($data as $key => $value) {
				array_push($fields, $key);
				array_push($values, $value);
			}
			try{
				$ctr = 0;
				$sqlstr = "UPDATE $table SET ";
					foreach ($data as $key => $value) {
						$sqlstr .="$key=?"; $ctr++;
						if($ctr<count($fields)){
							$sqlstr.=", ";
						}
					}
					$sqlstr .= " WHERE checkout_st=0 AND ".$conditionStringPassed;
					$sql = $this->pdo->prepare($sqlstr);
					$sql->execute($values);
				return array("code"=>200, "remarks"=>"success");
			}
			catch(\PDOException $e){
				$errmsg = $e->getMessage();
				$code = 403;
			}
			return array("code"=>$code, "errmsg"=>$errmsg);
		}

    public function sendPayload($payload, $remarks, $message, $code) {
			$status = array("remarks"=>$remarks, "message"=>$message);
			http_response_code($code);
			return array(
				"status"=>$status,
				"payload"=>$payload,
				'prepared_by'=>'Ayn Gandhi V. Uson, Developer',
				"timestamp"=>date_create());
		}
    }
