class ChatsController < ApplicationController

  def index
    session[:chat_user_id] = rand(::Sanguo.names.size)
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
    session[:user_id] ||= rand(::Sanguo.names.size)
    session[:user_name] ||= ::Sanguo.names[session[:user_id]]
    { id: session[:user_id], name: session[:user_name] }
  end
end
