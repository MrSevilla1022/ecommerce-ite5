<?php
require_once("./config/Config.php");

$db = new Connection();
$pdo = $db->connect();
$gm = new GlobalMethods($pdo);
$auth = new Auth($pdo);
$post = new Post($pdo);

if (isset($_REQUEST['request'])) {
  $req = explode('/', rtrim(($_REQUEST['request']), '/'));
} else {
  $req = array("errorcatcher");
}

switch ($_SERVER['REQUEST_METHOD']) {


  case 'POST':
    switch ($req[0]) {
        //SELECT sample
      case 'user':
        if (count($req) > 1) {
          echo json_encode($gm->exec_query('tbl_' . $req[0], $req[1]), JSON_PRETTY_PRINT);
        } else {
          echo json_encode($gm->exec_query('tbl_' . $req[0], null), JSON_PRETTY_PRINT);
        }
        break;
      case 'category':
        if (count($req) > 1) {
          echo json_encode($gm->exec_query('tbl_' . $req[0], $req[1]), JSON_PRETTY_PRINT);
        } else {
          echo json_encode($gm->exec_query('tbl_' . $req[0], null), JSON_PRETTY_PRINT);
        }
        break;
      case 'brand':
        if (count($req) > 1) {
          echo json_encode($gm->exec_query('tbl_' . $req[0], $req[1]), JSON_PRETTY_PRINT);
        } else {
          echo json_encode($gm->exec_query('tbl_' . $req[0], null), JSON_PRETTY_PRINT);
        }
        break;
      case 'products':
        if (count($req) > 1) {
          echo json_encode($gm->exec_query('tbl_' . $req[0], $req[1]), JSON_PRETTY_PRINT);
        } else {
          echo json_encode($gm->exec_query('tbl_' . $req[0], null), JSON_PRETTY_PRINT);
        }
        break;

        // case 'showCollabJoin':
        //   if (count($req) > 1) {
        //     echo json_encode($post->selectCollabJoin($req[1]), JSON_PRETTY_PRINT);
        //   } else {
        //     echo json_encode($post->selectCollabJoin(null), JSON_PRETTY_PRINT);
        //   }
        //   break;


        //INSERT sample
      case 'addProduct':
        $d = json_decode(file_get_contents("php://input"));
        echo json_encode($gm->insert("tbl_products", $d), JSON_PRETTY_PRINT);
        return array("data" => $d);
        break;
      case 'registerGmail':
        $d = json_decode(file_get_contents("php://input"));
        echo json_encode($gm->insert("tbl_user", $d), JSON_PRETTY_PRINT);
        return array("data" => $d);
        break;



        //UPDATE sample
      case 'acceptCollab':
        $d = json_decode(file_get_contents("php://input"));
        echo json_encode($gm->update("collab_member_tbl", $d, 'member_rec_id=' . $req[1]), JSON_PRETTY_PRINT);
        break;




        //DELETE sample
        // case 'deleteTask':
        //   if (count($req) > 1) {
        //     echo json_encode($gm->delete('task_tbl', $req[1]), JSON_PRETTY_PRINT);
        //   } else {
        //     echo json_encode($gm->delete('task_tbl', null), JSON_PRETTY_PRINT);
        //   }

        //LOGIN
      case 'login':
        $d = json_decode(base64_decode(file_get_contents("php://input")));
        echo json_encode($auth->login($d));
        break;
    }
    break;

  default:
    http_response_code(403);
    echo "Please contact the Systems Administrator.";
    break;
}
