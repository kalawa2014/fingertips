<?php 

require 'api.php';
if ( !empty( $_FILES ) ) {

    $tempPath = $_FILES[ 'file' ][ 'tmp_name' ];
    //$uploadPath = dirname( __FILE__ ) . DIRECTORY_SEPARATOR . 'uploads' . DIRECTORY_SEPARATOR . $_FILES[ 'file' ][ 'name' ];
    $api = new API();
	//echo $api->img_base.' Base';
	$imgname=$REQUEST['imgname'];
	$uploadPath =  "/opt/lampp/htdocs/fingertips/app/img/chartes/".$imgname;
	move_uploaded_file( $tempPath, $uploadPath );
    {
    }
    $answer = array( 'answer' => 'File transfer completed' );
    $json = json_encode( $answer );

    echo $json;

} else {

    echo 'No files';

}
?>