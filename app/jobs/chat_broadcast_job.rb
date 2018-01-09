class ChatBroadcastJob < ApplicationJob
  queue_as :default

  def perform(message)
    ActionCable.server.broadcast "chat_channel_#{room_id}", render_message(message)
  end

  private
  def render_message message
    # chats = Chat.new_chats(10)
    # ApplicationController.renderer.render(partial: "chats/chats.json", locals: {chats: chats})
    ApplicationController.renderer.render(partial: "chats/chats.json", locals: {chats: [message]})
  end

  def room_id
    Current.room.present? ? Current.room.id : 1
  end
end
