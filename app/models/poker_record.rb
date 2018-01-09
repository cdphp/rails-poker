class PokerRecord < ApplicationRecord
  belongs_to :user
  belongs_to :room

  def play number
    update_attribute :number, number
    PlayBrocastJob.perform_now(self)
  end

  def display_name
    self.user.display_name
  end
end
