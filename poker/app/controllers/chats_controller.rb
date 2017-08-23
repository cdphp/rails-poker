class ChatsController < ApplicationController

  def index
    session[:chat_user_id] = rand(Sanguo.names.size)
    load_chats
  end

  def new
    @current_room = current_room
    @me = current_user_id
  end

  private

  def load_chats
    # room_id = params.try(:[], room_id) || 1
    # @chats = Chat.of_room(room_id)
    chats = Chat.new_chats(100)
    render partial: "chats/chats.json", locals: { chats: chats, me: current_user_id }
  end


  def current_user_id
    session[:user_id] ||= rand(Sanguo.names.size)
  end
end
