<?php 

require 'api.php';
if ( !empty( $_FILES ) ) {

    $tempPath = $_FILES[ 'file' ][ 'tmp_name' ];
    //$uploadPath = dirname( __FILE__ ) . DIRECTORY_SEPARATOR . 'uploads' . DIRECTORY_SEPARATOR . $_FILES[ 'file' ][ 'name' ];
    $api = new API();
	//echo $api->img_base.' Base';
	$idact=$_GET['id'];
	$img="";
	if( isset($_GET['qrcode'])){
		$img="qrcode";
	}else{
		$img="img";
	}
	$arPhotos=rglob("/opt/lampp/htdocs/fingertips/app/img/activities/",$img."_a_$idact"."_*",GLOB_BRACE);
	$num=count($arPhotos)+1;
	$extension = explode(".",$_FILES[ 'file' ][ 'name' ]);
	$fname="img/activities/".$img."_a_".$idact."_".$num.".$extension[1]";
	if(strcmp($img,'qrcode')==0)
		$fname="img/activities/".$img."_a_".$idact.".".$extension[1];
	$uploadPath =  "/opt/lampp/htdocs/fingertips/app/".$fname;

	move_uploaded_file( $tempPath, $uploadPath );
    {
        $serverPath=$fname;
        $api->setActFiles($serverPath,$idact);
    }
    $answer = array( 'answer' => 'File transfer completed' );
    $json = json_encode( $answer );

    echo $json;

} else {

    echo 'No files';

}
?>
