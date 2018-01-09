class RoomsController < ApplicationController
  before_action :require_login

  def index

  end

  def new

  end

  def show
    if session[:current_room_id].blank? || params['id'].to_i != session[:current_room_id]
      redirect_to new_usersession_path(room_id: params['id']) and return
    end
    Current.room = Room.find_by(id: params['id'])
    Current.room.users  << [Current.user] if RoomUser.where(user_id: Current.user.id, room_id: Current.room.id).blank?
  end

  private

end
