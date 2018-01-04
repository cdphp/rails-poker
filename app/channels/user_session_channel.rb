# Be sure to restart your server when you modify this file. Action Cable runs in a loop that does not support auto reloading.
class UserSessionChannel < ApplicationCable::Channel
  def subscribed
    stop_all_streams
    stream_from "user_session_channel"
  end

  def unsubscribed
    stop_all_streams
  end

  def register data
    p "channel register.rb"
    # ActionCable.server.broadcast "chat_channel_#{room_id}", render_message(message)
    ApplicationController.renderer.render json: {status: 1}
  end
end
