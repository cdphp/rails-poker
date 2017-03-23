class UserSerializer < ActiveModel::Serializer
  include Current

  attributes :id, :display_name, :status, :number, :avatar
  # delegate :current_user, :to => :scope

  def status
    result = "online"
    if Current.room.ready? && Current.room.poker_records.find_by(user_id: object.id).present?
      result += " played"
    end
    result
  end

  def number
    if !Current.room.finished?
      '*'
    elsif (redord = Current.room.poker_records.find_by(user_id: object.id)).present?
      redord.number
    else
      nil
    end
  end

end
