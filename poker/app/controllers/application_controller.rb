class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  helper_method :current_user, :current_room, :current_user_session
  around_action :set_current_user
  after_action :print_user_sessions

  serialization_scope :view_context

  CHARACTER_GROUP = ChatName.names.keys

  def require_login
    unless current_user && current_user.id && current_room && current_room.id
      redirect_to (controller_name == 'rooms') ? new_usersession_path(room_id: params[:id]) : new_usersession_path
    end
  end

  def require_user
    unless current_user && current_user.id
      redirect_to new_usersession_path
    end
  end

  def set_current_user
    Current.user = current_user
    Current.room = current_room
    yield
  end

  def current_user
    @_current_user ||= session[:current_user_id] &&
      User.find_by(id: session[:current_user_id])
  end

  def current_room
    @_current_room ||= session[:current_room_id] &&
      Room.find_by(id: session[:current_room_id])
  end

  def chat_session
    group_id, name_id = nil, nil
    group_id, name_id = PokerEncoder::decode(session[:chat_user_id]).split('x')
  ensure 
    unless group_id && name_id
      group_id   = rand(CHARACTER_GROUP.size)
      group_name = CHARACTER_GROUP[group_id]
      name_id    = rand(ChatName.names[group_name].size)
      session[:chat_user_id] = PokerEncoder::encode("#{group_id}x#{name_id}")
      session[:user_name]    = ChatName.names[group_name][name_id]
    end
  end

  private
  def print_user_sessions
    if Rails.env.eql? "development"
      puts "#{action_name}: #{'='*100}"
      puts "current user id: #{current_user.present? ? current_user.id : 0}; current room id: #{current_room.present? ? current_room.id : 0}"
      puts "#{action_name}: #{'-'*100}"
    end
  end
end
