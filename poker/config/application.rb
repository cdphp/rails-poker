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
    config.web_console.whitelisted_ips = ['10.0.2.2', '172.18.0.0/16']

    config.sass.preferred_syntax = :sass
    config.sass.line_comments = false
    config.sass.cache = false

    config.encoding = "utf-8"

    config.autoload_paths += %W(#{config.root}/lib)

    config.react.server_renderer_pool_size  ||= 1  # ExecJS doesn't allow more than one on MRI
    config.react.server_renderer_timeout    ||= 20 # seconds
    config.react.server_renderer = React::ServerRendering::SprocketsRenderer
    config.react.server_renderer_options = {
      files: ["react-server.js", "components.js"], # files to load for prerendering
      replay_console: true,                 # if true, console.* will be replayed client-side
    }
  end
end
