class Chat < ApplicationRecord

  validates_length_of :message, maximum: 255, minimum: 1, allow_blank: false, allow_nil: false

  # before_save :deal_before_save
  after_create_commit { ChatBroadcastJob.perform_later self}

  scope :of_room, ->(room_id) { where(room_id: room_id) }

  scope :new_chats, ->(number) { last(number) }

  SYSTEM_MESSAGE = ['joint', 'quit']

  def speaking
    deal_before_save
    unless (lc = Chat.last) && [lc.user_id, lc.message] == [self.user_id, self.message]
      self.save
    # else
    #   p "same message"
    end
  end

  def deal_before_save
    message.gsub!(/<.*?>/, '')
    message.strip!
    p "="*100
    p message
    p message.length
  end

  def clear_history
    if Chat.select('id').all.count > 100000
      Chat.where('id < ?',Chat.select('id').limit(50000).last.id).delete_all
    end
  end

  def display_message
    system_message? ? I18n.t(message) : message
  end

  def chat_type
    SYSTEM_MESSAGE.include?(message) ? 'system' : 'user'
  end

  def system_message?
    chat_type == 'system'
  end
end
