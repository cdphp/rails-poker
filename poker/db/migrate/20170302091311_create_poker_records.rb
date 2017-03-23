class CreatePokerRecords < ActiveRecord::Migration[5.0]
  def change
    create_table :poker_records do |t|
      t.integer :user_id
      t.integer :room_id
      t.string :number

      t.timestamps
    end
  end
end
