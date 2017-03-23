class DropAttendeeJob < ApplicationJob
  queue_as :default

  def perform(room_id, user)
    clear_user room_id, user.id
    ActionCable.server.broadcast "room_channel_#{room_id}", offline_message(user)
  end

  private
  def offline_message user
    attendee = ActiveModelSerializers::SerializableResource.new(user, {})
    ApplicationController.renderer.render json: {action: 'drop_attendee', attendee: attendee.as_json}
  end

  def clear_user room, user
    RoomUser.where(room_id: room, user_id: user).delete_all
  end

end