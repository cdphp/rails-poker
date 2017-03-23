class PlayBrocastJob < ApplicationJob
  queue_as :default

  def perform play_record
    ActionCable.server.broadcast "room_channel_#{play_record.room_id}", play_message(play_record)
  end

  private

  def play_message play_record
    record = ActiveModelSerializers::SerializableResource.new(play_record)
    ApplicationController.renderer.render json: {action: 'play_card', record: record.as_json}
  end
end
