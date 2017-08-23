class Chat < ApplicationRecord

  validates_length_of :message, :maximum => 246

  before_save :deal_before_save
  after_create_commit { ChatBroadcastJob.perform_later self}

  scope :of_room, ->(room_id) { where(room_id: room_id) }

  scope :new_chats, ->(number) { last(number) }

  SYSTEM_MESSAGE = ['joint', 'quit']

  def speaking
    unless (lc = Chat.last) && [lc.user_id, lc.message] == [self.user_id, self.message]
      self.save
    # else
    #   p "same message"
    end
  end

  def deal_before_save
    message.strip!
  end

  def clear_history
    if Chat.select('id').all.count > 100000
      Chat.where('id < ?',Chat.select('id').limit(50000).last.id).delete_all
    end
  end

  def chat_type
    SYSTEM_MESSAGE.include?(message) ? 'system' : 'user'
  end
end
