server {
        server_name  impressionen.catalogi.ru;
        listen 188.40.83.218;
        rewrite ^(.*) http://www.impressionen.catalogi.ru$1 permanent;
}

server {
        server_name ~^(?<subdomain>.*)\.impressionen\.catalogi\.ru;
        listen 188.40.83.218;

        location ~* ^.+\.(css|js|jpe?g|gif|png|avi|swf|ico)$ {
                rewrite ^(.*)$ http://$subdomain.impressionen.de$1 permanent;
        }

        location ~* ^.+\.(ttf|svg|css)$ {
                proxy_pass http://www.impressionen.de:80;
                proxy_redirect http://www.impressionen.de:80/ /;
                proxy_set_header Host www.impressionen.de;
        }

        location ^~ /static/ {
                root /var/www/impressionen;
        }

        location / {
                if ($allowed_country = no) {
                        rewrite ^/ http://www.impressionen.de/ permanent;
                }
                proxy_pass http://127.0.0.1:5057;
                proxy_redirect http://127.0.0.1:5057/ /;
                proxy_set_header Host $host;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header X-Forwarded-Proto $scheme;
                proxy_set_header X-Real-IP $remote_addr;
        }

        error_page 500 502 503 504 /50x.html;
        location = /50x.html {
                root /var/www;
                internal;
        }
}
