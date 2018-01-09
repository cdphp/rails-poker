class ChatsController < ApplicationController
  before_action :chat_session
  def index
    load_chats
  end

  def new
    @current_room = current_room
    @me = who_am_i
  end

  private

  def load_chats
    # room_id = params.try(:[], room_id) || 1
    # @chats = Chat.of_room(room_id)
    chats = Chat.new_chats(100)
    render partial: "chats/chats.json", locals: { chats: chats, me: who_am_i }
  end


  def who_am_i
    { id: session[:chat_user_id], name: session[:user_name] }
  end
end
