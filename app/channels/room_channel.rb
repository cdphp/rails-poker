class RoomChannel < ApplicationCable::Channel

  def subscribed
    stop_all_streams
    Current.room = Room.find_by(id: params['room_id'])
    recover_user params['room_id'], params['user_id']
    stream_from "room_channel_#{params['room_id']}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
    clear_user params['room_id'], params['user_id']
    stop_all_streams
  end

  def statistics
    StatisticsJob.perform_now(params['room_id'])
  end

  def play data
    record = PokerRecord.find_or_initialize_by(room_id: params['room_id'], user_id: params['user_id'])
    record.play pretreat_the_number(data)
  end

  def toggle_status data
    Current.room = Room.find_by(id: params['room_id'])
    Current.room.next_step
    Current.room.reload
    ActionCable.server.broadcast "room_channel_#{Current.room.id}", room_status_message(Current.room)
    StatisticsJob.perform_now(params['room_id']) if Current.room.finished?
  end

  def update_subject data
    Current.room = Room.find_by(id: params['room_id'])
    Current.room.set_subject data['subject']
    # Current.room.reload
    UpdateSubjectJob.perform_now(Current.room )
  end
  private

  def room_status_message room
    {code: 0, action: 'update_status', status_name: room.status_name }.to_json
  end

  def recover_user room, user
    RoomUser.find_or_create_by(room_id: room, user_id: user)
  end

  def clear_user room, user
    RoomUser.where(room_id: room, user_id: user).map{ |ru| ru.destroy }
  end

  def pretreat_the_number data
    # ? coffee
    actual = data['card_number'].to_i
    if actual > 0
      actual
    elsif data['card_number'] =~ /coffee/i
      'coffee'
    else
      '?'
    end
  end

end
