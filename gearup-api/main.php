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
      case 'adminLog':
        if (count($req) > 1) {
          echo json_encode($post->adminLog('tbl_admin', $req[1]), JSON_PRETTY_PRINT);
        } else {
          echo json_encode($post->adminLog('tbl_admin', null), JSON_PRETTY_PRINT);
        }
        break;
      case 'checkUser':
        if (count($req) > 1) {
          echo json_encode($post->checkUser('tbl_user', $req[1]), JSON_PRETTY_PRINT);
        } else {
          echo json_encode($post->checkUser('tbl_user', null), JSON_PRETTY_PRINT);
        }
        break;

        case 'UserTable':
          if (count($req) > 1) {
            echo json_encode($post->pullUser('tbl_user', $req[1]), JSON_PRETTY_PRINT);
          } else {
            echo json_encode($post->pullUser('tbl_user', null), JSON_PRETTY_PRINT);
          }
          break;

          case 'TransTable':
            if (count($req) > 1) {
              echo json_encode($post->pullUser('tbl_transactions', $req[1]), JSON_PRETTY_PRINT);
            } else {
              echo json_encode($post->pullUser('tbl_transactions', null), JSON_PRETTY_PRINT);
            }
            break;

      case 'cart':
        if (count($req) > 1) {
          echo json_encode($post->cart('tbl_cart', $req[1]), JSON_PRETTY_PRINT);
        } else {
          echo json_encode($post->cart('tbl_cart', null), JSON_PRETTY_PRINT);
        }
        break;
      case 'wish':
        if (count($req) > 1) {
          echo json_encode($post->wish('tbl_wish', $req[1]), JSON_PRETTY_PRINT);
        } else {
          echo json_encode($post->wish('tbl_wish', null), JSON_PRETTY_PRINT);
        }
        break;
      case 'orders':
        if (count($req) > 1) {
          echo json_encode($post->checkOrders('tbl_cart', $req[1]), JSON_PRETTY_PRINT);
        } else {
          echo json_encode($post->checkOrders('tbl_cart', null), JSON_PRETTY_PRINT);
        }
        break;
      case 'orderTrans':
        if (count($req) > 1) {
          echo json_encode($post->orderTrans('tbl_cart', $req[1]), JSON_PRETTY_PRINT);
        } else {
          echo json_encode($post->orderTrans('tbl_cart', null), JSON_PRETTY_PRINT);
        }
        break;
      case 'transactions':
        if (count($req) > 1) {
          echo json_encode($post->transactions('tbl_cart', $req[1]), JSON_PRETTY_PRINT);
        } else {
          echo json_encode($post->transactions('tbl_cart', null), JSON_PRETTY_PRINT);
        }
        break;
      case 'checkPhone':
        if (count($req) > 1) {
          echo json_encode($post->checkPhone('tbl_user', $req[1]), JSON_PRETTY_PRINT);
        } else {
          echo json_encode($post->checkPhone('tbl_user', null), JSON_PRETTY_PRINT);
        }
        break;

      case 'login':
        $d = json_decode((file_get_contents("php://input")));
        echo json_encode($post->login($d));
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
      case 'sales':
        if (count($req) > 1) {
          echo json_encode($post->sales('tbl_products', $req[1]), JSON_PRETTY_PRINT);
        } else {
          echo json_encode($post->sales('tbl_products', null), JSON_PRETTY_PRINT);
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
      case 'register':
        $d = json_decode(file_get_contents("php://input"));
        echo json_encode($gm->insert("tbl_user", $d), JSON_PRETTY_PRINT);
        return array("data" => $d);
        break;

      case 'addBrand':
          $d = json_decode(file_get_contents("php://input"));
          echo json_encode($gm->insert("tbl_brand", $d), JSON_PRETTY_PRINT);
          return array("data" => $d);
          break;
      case 'addCart':
        $d = json_decode(file_get_contents("php://input"));
        echo json_encode($gm->insert("tbl_cart", $d), JSON_PRETTY_PRINT);
        return array("data" => $d);
        break;
      case 'addWish':
        $d = json_decode(file_get_contents("php://input"));
        echo json_encode($gm->insert("tbl_wish", $d), JSON_PRETTY_PRINT);
        return array("data" => $d);
        break;

      case 'addCategory':
          $d = json_decode(file_get_contents("php://input"));
          echo json_encode($gm->insert("tbl_category", $d), JSON_PRETTY_PRINT);
          return array("data" => $d);
          break;
      case 'toCart':
        $d = json_decode(file_get_contents("php://input"));
        echo json_encode($gm->insert("tbl_cart", $d), JSON_PRETTY_PRINT);
        return array("data" => $d);
        break;




        //UPDATE sample
      case 'updateQty':
        $d = json_decode(file_get_contents("php://input"));
        echo json_encode($gm->update("tbl_cart", $d, 'cart_id=' . $req[1]), JSON_PRETTY_PRINT);
        break;
      case 'updateUser':
        $d = json_decode(file_get_contents("php://input"));
        echo json_encode($gm->update("tbl_user", $d, 'user_id=' . $req[1]), JSON_PRETTY_PRINT);
        break;
      case 'checkout':
        $d = json_decode(file_get_contents("php://input"));
        echo json_encode($post->checkout("tbl_cart", $d, 'user_id=' . $req[1]), JSON_PRETTY_PRINT);
        break;
      case 'updateRate':
        $d = json_decode(file_get_contents("php://input"));
        echo json_encode($gm->update("tbl_products", $d, 'product_id=' . $req[1]), JSON_PRETTY_PRINT);
        break;
      case 'updateTransaction':
        $d = json_decode(file_get_contents("php://input"));
        echo json_encode($gm->update("tbl_cart", $d, 'transaction_no=' . $req[1]), JSON_PRETTY_PRINT);
        break;




      //DELETE sample
      case 'deleteCart':
        if (count($req) > 1) {
          echo json_encode($gm->delete('tbl_cart', $req[1]), JSON_PRETTY_PRINT);
        } else {
          echo json_encode($gm->delete('tbl_cart', null), JSON_PRETTY_PRINT);
        }
        break;
      case 'deleteWish':
        if (count($req) > 1) {
          echo json_encode($gm->delete('tbl_wish', $req[1]), JSON_PRETTY_PRINT);
        } else {
          echo json_encode($gm->delete('tbl_wish', null), JSON_PRETTY_PRINT);
        }
        break;
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
