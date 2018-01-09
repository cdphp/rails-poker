class PokerRecordSerializer < ActiveModel::Serializer
  include Current
  attributes :user_id, :display_name, :number, :status
  delegate :current_user, to: :scope

  def display_name
    object.user.display_name
  end

  def number
    object.room.finished? ? object.number : '*'
  end

  def status
    result = (object.room.ready? && object.number != '0') ? " played" : ''
  end

end
