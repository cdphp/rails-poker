# Be sure to restart your server when you modify this file.

# Rails.application.config.assets.paths << Rails.root.join('node_modules')

# Version of your assets, change this if you want to expire all your assets.
Rails.application.config.assets.version = '0.1'

# Add additional assets to the asset load path
# Rails.application.config.assets.paths << Emoji.images_path

# Precompile additional assets.
# application.js, application.css, and all non-JS/CSS in app/assets folder are already added.
# Rails.application.config.assets.precompile += %w( search.js )

Rails.application.config.assets.precompile += %w( jquery.js bootstrap.min.js marked.js)
Rails.application.config.assets.precompile += %w( bootstrap.min.css bootstrap-theme.min.css main.scss login.scss )
# Rails.application.config.assets.precompile += %w( * )

Rails.application.config.assets.precompile += %w( *.js *.css )