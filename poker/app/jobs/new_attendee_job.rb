class NewAttendeeJob < ApplicationJob
  queue_as :default

  def perform(room_id, user)
    puts "room_channel_#{room_id}"
    ActionCable.server.broadcast "room_channel_#{room_id}", render_message(user)
  end

  private
  def render_message user
    attendee = ActiveModelSerializers::SerializableResource.new(user)
    ApplicationController.renderer.render json: {action: 'new_attendee', attendee: attendee.as_json}
  end

end