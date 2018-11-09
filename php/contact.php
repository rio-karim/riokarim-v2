<?php
        $name = htmlspecialchars($_POST['name']);
        $email = htmlspecialchars($_POST['email']);
        $subject = htmlspecialchars($_POST['subject']);
        $message = htmlspecialchars($_POST['message']);
        $body = '
        <h4>Contact Details</h4>
        <ul>
            <li>First name:' .$name .'</li>
            <li>Email:' .$email .'</li>
            <li>Message:' .$message .'</li>
        </ul>
        ';
        $to = "rio.karim@gmail.com";
        $headers = "MIME-Version: 1.0" ."\r\n";
        $headers .="Content-Type:text/html;charset=UTF-8" ."\r\n";
        $headers .= "From: New Message <noreply@riokarim.co.uk>" ."\r\n";
        mail($to,$subject,$body,$headers);
        echo "<script> window.location.href = 'success.html';</script>";
?>
