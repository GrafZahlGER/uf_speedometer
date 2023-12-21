fx_version 'cerulean'
game 'gta5'  
lua54 'yes'

author '.GrafZahl#9999'
description 'UniqueFamily | Speedometer'
version 'v1.0'

ui_page 'ui/ui.html'

files {
    'ui/*.html',
    'ui/css/*.css',
    'ui/font/*.ttf',
    'ui/js/*.js',
    'ui/img/*.svg'
}

client_scripts {
    'client.lua',
    'config.lua'
}

escrow_ignore {
    'client.lua',
    'config.lua'
}