server {
	server_name cdn.catalogi.ru *.cdn.catalogi.ru;
	listen 188.40.83.218;
	charset UTF-8;
	
	# LOGS
    #access_log /var/www/cdn/data/logs/cdn.catalogi.ru.access.log;
    #error_log /var/www/cdn/data/logs/cdn.catalogi.ru.error.log;
	
    #location ~* ^.+\.(jpg|jpeg|gif|png|svg|js|css|mp3|ogg|mpe?g|avi|zip|gz|bz2?|rar|swf)$ {
	#	root /var/www/cdn/data;
	#}
	
	location / {
		root /var/www/cdn/data;
        index index.html index.php;
        
        #location ~* ^.+\.(jpg|jpeg|gif|png|svg|js|css|mp3|ogg|mpe?g|avi|zip|gz|bz2?|rar|swf)$ {
		#	root /var/www/cdn/data/www/;
		#}
		
	    location ~ \.php$ {
	        try_files $uri =404;
	        fastcgi_pass unix:/var/run/php5-fpm.sock;
	        fastcgi_index index.php;
	        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
	        include fastcgi_params;    
	    }
    }
	
	error_page 500 502 503 504 /50x.html;
	location = /50x.html {
    	root /var/www;
    	internal;
	}
}