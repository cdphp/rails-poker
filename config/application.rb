require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module PokerNew
  class Application < Rails::Application
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.

    config.sass.preferred_syntax = :sass
    config.sass.line_comments = false
    config.sass.cache = false

    config.encoding = "utf-8"

    # config.autoload_paths += %W(#{config.root}/lib)

    config.i18n.default_locale = :zh

    # config.browserify_rails.use_browserifyinc = false

    # Tell browserify-rails how to treat .js.jsx files
    # config.browserify_rails.commandline_options = "-t reactify --extension=\".js.jsx\""
    # Environments in which to generate source maps
    #
    # The default is none
    # config.browserify_rails.source_map_environments << "development"

    # Should the node_modules directory be evaluated for changes on page load
    #
    # The default is `false`
    # config.browserify_rails.evaluate_node_modules = true

    # Settings for the pool of renderers:
    config.react.server_renderer_pool_size  ||= 1  # ExecJS doesn't allow more than one on MRI
    config.react.server_renderer_timeout    ||= 20 # seconds
    config.react.server_renderer = React::ServerRendering::BundleRenderer
    config.react.server_renderer_options = {
        files: ["server_rendering.js"],       # files to load for prerendering
        replay_console: true,                 # if true, console.* will be replayed client-side
    }
    # Changing files matching these dirs/exts will cause the server renderer to reload:
    config.react.server_renderer_extensions = ["jsx", "js"]
    config.react.server_renderer_directories = ["/app/assets/javascripts", "/app/javascripts/"]
  end
end
