class ChatsController < ApplicationController

  def index
    load_chats
  end

  def new
    @current_room = current_room
  end

  private

  def load_chats
    # room_id = params.try(:[], room_id) || 1
    # @chats = Chat.of_room(room_id)
    chats = Chat.new_chats(100)
    render partial: "chats/chats.json", locals: {chats: chats}
  end
end
