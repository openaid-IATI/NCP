Install Narrowcasting:
 - The Django root is in narrowcasting_server
 - Copy narrowcasting_server/local_settings.example.py to narrowcasting_server/local_settings.py and adjust accordingly (RSR URL, OIPA URL, DB settings)
 - Follow the standard procedure to install Django projects. (migrate, collectstatic)
 - Go to the static folder and run 'bower install' to create bower components
 - That should be all 
