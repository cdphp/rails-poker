module ApplicationHelper

  def display_user message
    message.user_id > 0 ? message.user.name : "anonymous"
  end

  # def current_room
  #   params ||= {}
  #   if (room_id = params.try(:[], :room_id).to_i) > 0
  #     @current_room = Room.find_by_id(room_id)
  #     return @current_room if @current_room.present?
  #   end
  #   return @current_room = Room.first
  # end

end
